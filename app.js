// 信用卡回饋助理 — 計算邏輯與 UI
// 卡片資料請編輯 cards.js


// ============================================================
// ============================================================
// Helpers
// ============================================================
const MERCHANT_ALIASES = {
  '7-eleven': '7-11',
  '7eleven': '7-11',
  '7 eleven': '7-11',
  '蝦皮購物': '蝦皮',
  '全家便利商店': '全家',
};

const MERCHANT_DISPLAY_NAMES = {
  '7-11': '7-11',
  '蝦皮': '蝦皮',
  '全家': '全家',
};

function normMerchant(str) {
  const s = String(str || '').trim().toLowerCase();
  return MERCHANT_ALIASES[s] || s;
}

function getMerchantDisplayName(str) {
  const normalized = normMerchant(str);
  return MERCHANT_DISPLAY_NAMES[normalized] || str;
}

// All merchants for autocomplete
// ============================================================
const ALL_MERCHANTS = (() => {
  const map = {};
  for (const card of CARDS) {
    if (!card.merchant_groups) continue;
    for (const merchants of Object.values(card.merchant_groups)) {
      for (const merchant of merchants) {
        const displayName = getMerchantDisplayName(merchant);
        if (!map[displayName]) map[displayName] = [];
        if (!map[displayName].includes(card.card_name)) map[displayName].push(card.card_name);
      }
    }
  }
  return map;
})();

function isPaymentAllowed(pm, merchant, card) {
  if (!merchant) return true;
  const restrictions = card.merchant_payment_restrictions || {};
  const nm = normMerchant(merchant);
  for (const [key, rules] of Object.entries(restrictions)) {
    const nk = normMerchant(key);
    if (nm === nk || nm.includes(nk) || nk.includes(nm)) {
      if (!(pm in rules)) return true;
      return rules[pm].includes(card.bank);
    }
  }
  return true;
}

function merchantInGroup(merchant, card, groupKey) {
  const groups = card.merchant_groups || {};
  const list = groups[groupKey] || [];
  const nm = normMerchant(merchant);
  return list.some(m => normMerchant(m) === nm || nm.includes(normMerchant(m)) || normMerchant(m).includes(nm));
}

function scopeMatches(scope, ctx, card) {
  // country
  if (scope.country && scope.country !== 'ANY') {
    if (ctx.country !== scope.country) return false;
  }
  // foreign
  if (scope.foreign !== undefined) {
    const isForeign = ctx.country !== 'TW';
    if (scope.foreign !== isForeign) return false;
  }
  // channel
  if (scope.channel && scope.channel.length > 0) {
    if (!scope.channel.includes(ctx.channel)) return false;
  }
  // country_in
  if (scope.country_in) {
    if (!scope.country_in.includes(ctx.country)) return false;
  }
  // Use _allowedPayments (filtered by merchant restrictions) if available
  const effPay = ctx._allowedPayments !== undefined ? ctx._allowedPayments : ctx.payments;
  // payment_method (single — exact match required)
  if (scope.payment_method) {
    if (!effPay || !effPay.includes(scope.payment_method)) return false;
  }
  // payment_method_in — ctx must include at least one from list
  if (scope.payment_method_in) {
    if (!effPay || !effPay.some(p => scope.payment_method_in.includes(p))) return false;
  }
  // merchant_group
  if (scope.merchant_group) {
    if (!ctx.merchant) return false;
    if (!merchantInGroup(ctx.merchant, card, scope.merchant_group)) return false;
  }
  // merchant_group_in — merchant must match at least one group
  if (scope.merchant_group_in) {
    if (!ctx.merchant) return false;
    const matched = scope.merchant_group_in.some(gk => merchantInGroup(ctx.merchant, card, gk));
    if (!matched) return false;
  }
  // requires_plan_switch — needs merchant to match a plan group AND payment to be eligible
  // (this is handled by the merchant_group_in + payment_method_in checks above, so just pass)
  // weekday
  if (scope.weekday === 'weekend_or_holiday') {
    if (!ctx.isWeekend) return false;
  }
  return true;
}

function calcRewardForCard(card, ctx, fxRate) {
  // Pre-filter payments by merchant restrictions
  const _allowedPayments = ctx.payments
    ? ctx.payments.filter(pm => isPaymentAllowed(pm, ctx.merchant, card))
    : null;
  if (ctx.payments && ctx.merchant && _allowedPayments.length === 0) {
    return {
      card,
      amountTWD: ctx.currency === 'TWD' ? ctx.amount : ctx.amount * fxRate,
      netRewardTWD: 0,
      effectiveRate: 0,
      ruleDetails: [],
      notes: [{ type: 'warning', text: '此通路不支援這張卡' }],
      needsPlanSwitch: false,
      fxFee: 0,
      usedPayments: ctx.payments,
    };
  }
  const effectiveCtx = { ...ctx, _allowedPayments };
  const amountTWD = ctx.currency === 'TWD'
    ? ctx.amount
    : ctx.amount * fxRate;

  // Foreign tx fee
  const isForeign = ctx.country !== 'TW';
  const feeWaiverByPayment = card.fee_waiver_by_payment || {};
  const paymentHasFeeWaiver = ctx.payments && ctx.payments.some(p => feeWaiverByPayment[p]);
  const fxFee = (isForeign && card.foreign_transaction_fee != null && !paymentHasFeeWaiver)
    ? card.foreign_transaction_fee * amountTWD : 0;

  // ctx.payments is an array of selected payment methods
  // Filter applicable rules
  const applicableRules = card.reward_rules.filter(r => scopeMatches(r.scope || {}, effectiveCtx, card));

  // Exclusive group handling: among same exclusive_group, keep max rate
  const exclusiveGroups = {};
  const nonExclusiveRules = [];
  for (const rule of applicableRules) {
    if (rule.exclusive_group) {
      if (!exclusiveGroups[rule.exclusive_group]) exclusiveGroups[rule.exclusive_group] = [];
      exclusiveGroups[rule.exclusive_group].push(rule);
    } else {
      nonExclusiveRules.push(rule);
    }
  }

  // Pick best from each exclusive group
  const chosenExclusive = Object.values(exclusiveGroups).map(rules =>
    rules.sort((a, b) => b.rate - a.rate)[0]
  );

  const allChosen = [...nonExclusiveRules, ...chosenExclusive];

  // If any non-stackable rule with priority >= 10, use that alone
  const highPriorityNonStack = allChosen.filter(r => r.stackable === false && (r.priority || 0) >= 10);
  let finalRules;
  if (highPriorityNonStack.length > 0) {
    finalRules = [highPriorityNonStack[0]];
  } else {
    finalRules = allChosen;
  }

  // Calculate reward per rule
  let totalRewardTWD = 0;
  const ruleDetails = [];

  for (const rule of finalRules) {
    let reward = rule.rate * amountTWD;
    if (rule.cap) {
      reward = Math.min(reward, rule.cap.max_reward_twd);
    }
    totalRewardTWD += reward;
    ruleDetails.push({ rule, rewardTWD: reward });
  }

  const netRewardTWD = totalRewardTWD - fxFee;
  const effectiveRate = amountTWD > 0 ? (netRewardTWD / amountTWD) : 0;

  const needsPlanSwitch = finalRules.some(r => r.scope && r.scope.requires_plan_switch);
  const planSwitchRules = finalRules.filter(r => r.scope && r.scope.requires_plan_switch);

  // Plan name lookup map
  const PLAN_NAMES = {
    tian_tian_shua: '天天刷', da_bi_shua: '大筆刷', hao_xiang_shua: '好饗刷',
    shu_qu_shua: '數趣刷', wan_lv_shua: '玩旅刷', pay_zhe_shua: 'Pay著刷',
    weekend_shua: '假日刷', play_digital: '玩數位', le_savor: '樂饗購',
    fun_travel: '趣旅行', selected: '集精選',
  };

  const notes = [];
  if (fxFee > 0) notes.push({ type: 'warning', text: `含海外手續費扣除 -${fxFee.toFixed(0)} TWD` });
  if (isForeign && paymentHasFeeWaiver) notes.push({ type: 'action', text: '本次使用 PayPay，免收 1.5% 國外交易服務費' });
  if (needsPlanSwitch) {
    // Collect all plan names from matched rules
    const planNames = new Set();
    for (const r of planSwitchRules) {
      const scope = r.scope || {};
      const plans = scope.plan_in || (scope.plan ? [scope.plan] : []);
      // Find which plan matched the merchant
      for (const p of plans) {
        const groupKey = p; // plan keys match merchant_group keys
        if (merchantInGroup(ctx.merchant, card, groupKey)) {
          planNames.add(PLAN_NAMES[p] || p);
        }
      }
      if (planNames.size === 0) {
        // fallback: show all plan options
        plans.forEach(p => planNames.add(PLAN_NAMES[p] || p));
      }
    }
    const planLabel = planNames.size > 0 ? [...planNames].join('／') : '對應方案';
    notes.push({ type: 'action', text: `需切換方案：${planLabel}` });
  }
  const cappedRules = finalRules.filter(r => r.cap && r.rate * amountTWD > r.cap.max_reward_twd);
  for (const r of cappedRules) {
    notes.push({ type: 'warning', text: `${(r.description || '此優惠').split('（')[0]} 已達上限 ${r.cap.max_reward_twd} TWD` });
  }

  return {
    card,
    amountTWD,
    netRewardTWD: Math.max(0, netRewardTWD),
    effectiveRate,
    ruleDetails,
    notes,
    needsPlanSwitch,
    fxFee,
    usedPayments: ctx.payments,
  };
}

// Try all supported payment combinations to find best result for a card
function calcWithBestPayment(card, ctx, fxRate) {
  const supported = card.payment_dictionary
    ? Object.values(card.payment_dictionary).flat()
    : ['physical_card'];
  // Filter by merchant payment restrictions
  const uniquePayments = [...new Set(supported)].filter(pm =>
    isPaymentAllowed(pm, ctx.merchant, card)
  );
  if (ctx.merchant && uniquePayments.length === 0) {
    return {
      card,
      amountTWD: ctx.currency === 'TWD' ? ctx.amount : ctx.amount * fxRate,
      netRewardTWD: 0,
      effectiveRate: 0,
      ruleDetails: [],
      notes: [{ type: 'warning', text: '此通路不支援這張卡' }],
      needsPlanSwitch: false,
      fxFee: 0,
      usedPayments: null,
      suggestedPayment: null,
    };
  }
  let best = null;
  for (const pm of uniquePayments) {
    const result = calcRewardForCard(card, { ...ctx, payments: [pm] }, fxRate);
    if (!best || result.netRewardTWD > best.netRewardTWD) {
      best = { ...result, suggestedPayment: pm };
    }
  }
  if (ctx.payments && ctx.payments.length > 0) {
    const allowedSpecified = ctx.payments.filter(pm => isPaymentAllowed(pm, ctx.merchant, card));
    if (allowedSpecified.length > 0) {
      const result = calcRewardForCard(card, { ...ctx, payments: allowedSpecified }, fxRate);
      if (!best || result.netRewardTWD >= best.netRewardTWD) {
        best = { ...result, suggestedPayment: allowedSpecified[0] };
      }
    }
  }
  if (!best) {
    best = { ...calcRewardForCard(card, { ...ctx, payments: ['physical_card'] }, fxRate), suggestedPayment: 'physical_card' };
  }
  return best;
}

// ============================================================
// Payment display names
// ============================================================
const PAY_NAMES = {
  line_pay: 'LINE Pay',
  apple_pay: 'Apple Pay',
  physical_card: '實體卡',
  taishin_pay: '台新Pay',
  paypay: 'PayPay',
};

function getPaymentActionText(result, paymentMethod) {
  const payName = PAY_NAMES[paymentMethod] || paymentMethod;
  const requiresApplePayForSport = result.card.card_id === 'sinopac_sport' && paymentMethod === 'apple_pay';
  return requiresApplePayForSport ? `必須使用 ${payName}` : `建議使用 ${payName}`;
}

// ============================================================
// UI helpers
// ============================================================
function setToggle(groupId, el) {
  document.querySelectorAll(`#${groupId} .toggle`).forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function toggleMulti(el) {
  el.classList.toggle('active');
}

function getToggleVal(groupId) {
  const active = document.querySelector(`#${groupId} .toggle.active`);
  return active ? active.dataset.val : '';
}

function getMultiToggleVals(groupId) {
  return [...document.querySelectorAll(`#${groupId} .toggle.active`)].map(t => t.dataset.val);
}

// Fetch FX rate from open exchange rate API
async function fetchFxRate() {
  const currency = document.getElementById('currency').value;
  if (currency === 'TWD' || currency === 'OTHER') return;

  const btn = document.getElementById('fetch-rate-btn');
  const status = document.getElementById('fx-rate-status');
  btn.disabled = true;
  btn.textContent = '抓取中…';
  status.textContent = '';

  try {
    const code = currency.toLowerCase();
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${code}.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('網路錯誤');
    const data = await res.json();
    const rate = data[code]?.twd;
    if (!rate) throw new Error('找不到匯率');
    const rounded = Math.round(rate * 100) / 100;
    document.getElementById('fx-rate').value = rounded;
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
    status.textContent = `已更新 ${timeStr}`;
    status.style.color = 'var(--green)';
  } catch (e) {
    status.textContent = '抓取失敗，請手動輸入';
    status.style.color = 'var(--red)';
  } finally {
    btn.disabled = false;
    btn.textContent = '自動抓取';
  }
}

// Card list rendering
function renderCardList() {
  const body = document.getElementById('card-list-body');
  const countEl = document.getElementById('card-list-count');
  const today = new Date();
  today.setHours(0,0,0,0);

  countEl.textContent = CARDS.length;

  body.innerHTML = CARDS.map(card => {
    const promoDates = [];

    // Card-level promo_until
    if (card.promo_until) {
      const expiry = new Date(card.promo_until);
      const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
      if (daysLeft >= 0) promoDates.push({ date: card.promo_until, daysLeft, label: '優惠活動' });
    }

    // Rule-level valid_until (only if different from card-level)
    card.reward_rules.filter(r => r.valid_until && r.valid_until !== card.promo_until).forEach(r => {
      const expiry = new Date(r.valid_until);
      const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
      if (daysLeft >= 0) promoDates.push({ date: r.valid_until, daysLeft, label: r.description?.split('（')[0] || '限時優惠' });
    });

    const promos = promoDates.map(({ date, daysLeft, label }) => {
      const dateStr = date.slice(5).replace('-', '/');
      const text = daysLeft <= 30
        ? `⚠ ${label}剩 ${daysLeft} 天（至 ${dateStr}）`
        : `✓ ${label}至 ${dateStr}`;
      const cls = daysLeft <= 30 ? 'expiring-soon' : 'active';
      return `<span class="promo-tag ${cls}">${text}</span>`;
    });

    return `
      <div class="card-chip">
        <div class="card-chip-name" title="${card.card_name}">${card.card_name}</div>
        <div class="card-chip-bank">${card.bank} · ${card.card_network}</div>
        ${promos.length ? `<div class="card-chip-promos">${promos.join('')}</div>` : ''}
      </div>`;
  }).join('');
}

function toggleCardList() {
  const body = document.getElementById('card-list-body');
  const toggle = document.getElementById('card-list-toggle');
  body.classList.toggle('hidden');
  toggle.classList.toggle('open');
}

// PayPay only available in Japan
function updatePayPayAvailability() {
  const country = document.getElementById('country').value;
  const paypayBtn = document.querySelector('#payment-group .toggle[data-val="paypay"]');
  if (!paypayBtn) return;
  if (country !== 'JP') {
    paypayBtn.classList.remove('active');
    paypayBtn.disabled = true;
    paypayBtn.style.opacity = '0.35';
    paypayBtn.style.cursor = 'not-allowed';
    paypayBtn.title = '僅限日本消費';
  } else {
    paypayBtn.disabled = false;
    paypayBtn.style.opacity = '';
    paypayBtn.style.cursor = '';
    paypayBtn.title = '';
  }
}
document.getElementById('country').addEventListener('change', updatePayPayAvailability);
updatePayPayAvailability();
renderCardList();

// Currency FX row
document.getElementById('currency').addEventListener('change', function() {
  const fxRow = document.getElementById('fx-row');
  const label = document.getElementById('fx-currency-label');
  if (this.value !== 'TWD') {
    fxRow.style.display = 'flex';
    label.textContent = this.value;
  } else {
    fxRow.style.display = 'none';
  }
});

// Autocomplete
const merchantInput = document.getElementById('merchant');
const autocompleteList = document.getElementById('autocomplete-list');

merchantInput.addEventListener('input', function() {
  const val = this.value.trim().toLowerCase();
  if (!val) { autocompleteList.classList.remove('visible'); return; }
  const matches = Object.entries(ALL_MERCHANTS)
    .filter(([m]) => m.toLowerCase().includes(val))
    .slice(0, 8);
  if (matches.length === 0) { autocompleteList.classList.remove('visible'); return; }
  autocompleteList.innerHTML = matches.map(([m, cards]) =>
    `<div class="autocomplete-item" onclick="selectMerchant('${m.replace(/'/g, "\\'")}')">
      <span>${m}</span>
      <span class="autocomplete-tag">${cards.length} 張卡有優惠</span>
    </div>`
  ).join('');
  autocompleteList.classList.add('visible');
});

document.addEventListener('click', e => {
  if (!e.target.closest('.merchant-input-wrap')) autocompleteList.classList.remove('visible');
});

function selectMerchant(name) {
  merchantInput.value = name;
  autocompleteList.classList.remove('visible');
}

// ============================================================
// Main calculate
// ============================================================
function calculate() {
  const amount = parseFloat(document.getElementById('amount').value);
  const currency = document.getElementById('currency').value;
  const merchant = document.getElementById('merchant').value.trim();
  const country = document.getElementById('country').value;
  const channel = getToggleVal('channel-group') || 'online';
  const isWeekend = getToggleVal('weekend-group') === 'weekend';
  const specifiedPayments = getMultiToggleVals('payment-group'); // array, may be empty

  if (!amount || amount <= 0) {
    showError('請輸入有效的消費金額');
    return;
  }

  let fxRate = 1;
  if (currency !== 'TWD') {
    fxRate = parseFloat(document.getElementById('fx-rate').value);
    if (!fxRate || fxRate <= 0) {
      showError(`請輸入 ${currency} 對台幣的即時匯率`);
      return;
    }
  }

  const ctx = { amount, currency, country, channel, isWeekend, merchant, payments: specifiedPayments.length > 0 ? specifiedPayments : null };
  const amountTWD = currency === 'TWD' ? amount : amount * fxRate;

  // Calculate all cards
  const results = CARDS.map(card => {
    if (ctx.payments && ctx.payments.length > 0) {
      // Try each selected payment individually, return the best result
      let best = null;
      for (const pm of ctx.payments) {
        const r = calcRewardForCard(card, { ...ctx, payments: [pm] }, fxRate);
        if (!best || r.netRewardTWD > best.netRewardTWD) {
          best = { ...r, suggestedPayment: pm };
        }
      }
      return best;
    } else {
      return calcWithBestPayment(card, ctx, fxRate);
    }
  });

  results.sort((a, b) => b.netRewardTWD - a.netRewardTWD);

  const top3 = results.slice(0, 3);
  renderResults(top3, ctx, amountTWD, currency, fxRate, results);
}

function showError(msg) {
  document.getElementById('results').innerHTML = `<div class="error-box">⚠ ${msg}</div>`;
}

function renderResults(top3, ctx, amountTWD, currency, fxRate, allResults) {
  const rankLabels = ['#1 最佳', '#2 次選', '#3 備選'];
  const rankClasses = ['rank-1', 'rank-2', 'rank-3'];

  let html = `<div class="results-header">
    <span class="results-title">回饋排名</span>
    <span class="context-summary">${ctx.merchant || '一般消費'} · ${amountTWD.toFixed(0)} TWD</span>
  </div>`;

  for (let i = 0; i < top3.length; i++) {
    const r = top3[i];
    if (r.netRewardTWD <= 0 && i > 0) continue;

    // Rate breakdown pills
    const pills = r.ruleDetails.map((rd, idx) => {
      const pct = (rd.rule.rate * 100).toFixed(1);
      if (idx === 0) return `<span class="rate-pill main">${pct}%</span>`;
      return `<span class="rate-pill plus">+${pct}%</span>`;
    });
    if (r.fxFee > 0 && r.amountTWD > 0) {
      const feePct = (r.fxFee / r.amountTWD * 100).toFixed(1);
      pills.push(`<span class="rate-pill fee">-${feePct}% 手續費</span>`);
    }
    if (r.ruleDetails.length > 1 || r.fxFee > 0) {
      const totalRate = (r.effectiveRate * 100).toFixed(2);
      pills.push(`<span class="rate-pill total">= ${totalRate}%</span>`);
    }

    // Payment suggestion — only if user didn't specify, and best payment isn't physical card
    if (!ctx.payments && r.suggestedPayment && r.suggestedPayment !== 'physical_card') {
      r.notes = [...(r.notes || [])];
      r.notes.push({ type: 'action', text: getPaymentActionText(r, r.suggestedPayment) });
    }

    const notesHtml = (r.notes || []).map(n =>
      `<div class="note ${n.type}"><span class="note-icon">${n.type === 'warning' ? '⚠' : n.type === 'action' ? '→' : '·'}</span><span>${n.text}</span></div>`
    ).join('');

    html += `
    <div class="card-result ${rankClasses[i]}">
      <div class="rank-badge"></div>
      <div class="card-result-inner">
        <div class="card-header">
          <div class="card-info">
            <div class="rank-label">${rankLabels[i]}</div>
            <div class="card-name">${r.card.card_name}</div>
            <div class="card-bank">${r.card.bank}</div>
          </div>
          <div class="reward-amount">
            <div class="reward-value">NT$ ${Math.round(r.netRewardTWD)}</div>
            <div class="reward-label">預估回饋</div>
          </div>
        </div>
        <div class="rate-breakdown">${pills.join('')}</div>
        ${notesHtml ? `<div class="divider"></div><div class="card-notes">${notesHtml}</div>` : ''}
      </div>
    </div>`;
  }

  // Best recommendation sentence
  const best = top3[0];
  const bestPayName = (!ctx.payments && best.suggestedPayment) ? PAY_NAMES[best.suggestedPayment] || best.suggestedPayment : null;
  const requiresSpecificPayment = !ctx.payments && best.suggestedPayment && best.card.card_id === 'sinopac_sport' && best.suggestedPayment === 'apple_pay';
  const payTip = bestPayName && bestPayName !== '實體卡'
    ? `${requiresSpecificPayment ? '，必須使用' : '，使用'} <strong>${bestPayName}</strong>`
    : '';
  const planTip = best.needsPlanSwitch ? '（請記得切換對應方案）' : '';

  html += `<div class="best-rec">
    💡 建議刷 <strong>${best.card.card_name}</strong>${payTip}，可獲回饋 <strong>NT$${Math.round(best.netRewardTWD)}</strong>（約 ${(best.effectiveRate * 100).toFixed(2)}%）${planTip}。
    ${best.notes.some(n => n.type === 'warning') ? '<br><span style="color:var(--text2);font-size:12px">⚠ 部分規則已達上限，實際回饋以當期剩餘額度為準。</span>' : ''}
  </div>`;

  document.getElementById('results').innerHTML = html;
}
