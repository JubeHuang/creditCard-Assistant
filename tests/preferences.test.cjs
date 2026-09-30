const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const elements = Object.fromEntries([...html.matchAll(/id="([^"]+)"/g)].map(([, id]) => [id, {
  value: '', innerHTML: '', style: {}, dataset: {},
  classList: { remove() {}, add() {}, toggle() {} }, addEventListener() {},
}]));
Object.assign(elements.amount, { value: '1000' });
elements.currency.value = 'TWD';
elements.country.value = 'TW';
elements.merchant.value = '海底撈';
const paymentButtons = [...html.matchAll(/data-val="([^"]+)" onclick="toggleMulti/g)].map(([, val]) => {
  const classes = new Set();
  return { dataset: { val }, hidden: false, disabled: false,
    classList: { add: c => classes.add(c), remove: c => classes.delete(c), contains: c => classes.has(c) } };
});
const context = vm.createContext({
  document: {
    getElementById: id => elements[id] || null,
    querySelector: selector => {
      assert.ok(!selector.includes('weekend-group'));
      return selector.includes('channel-group') ? { dataset: { val: 'online' } } : null;
    },
    querySelectorAll: selector => selector === '#payment-group .toggle' ? paymentButtons
      : selector === '#payment-group .toggle.active' ? paymentButtons.filter(b => b.classList.contains('active')) : [],
    addEventListener() {},
  },
  // Keep activity-label tests independent of the date the test is run.
  Date: class extends Date { constructor(...args) { super(...(args.length ? args : ['2026-09-30T00:00:00+08:00'])); } },
});
for (const file of ['cards.js', 'cardBenefitOverrides.js', 'userProfile.js', 'app.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}
const run = code => vm.runInContext(code, context);

test('removed payment methods and Android store do not remain in active card data', () => {
  assert.doesNotMatch(run('JSON.stringify(CARDS)'), /google_wallet|samsung_pay|Google Play/i);
  assert.doesNotMatch(run('JSON.stringify(ALL_MERCHANTS)'), /Google Play/i);
});

test('Chill tiers retain merchant-specific rates and a single shared label', () => {
  for (const [merchant, rate] of [['海底撈', 0.10], ['Netflix', 0.05], ['蝦皮', 0.033]]) {
    const result = run(`calcRewardForCard(CARDS.find(c => c.card_id === 'taishin_richart'), {
      amount: 1000, currency: 'TWD', country: 'TW', channel: 'online',
      merchant: ${JSON.stringify(merchant)}, payments: ['physical_card']
    }, 1)`);
    assert.ok(Math.abs(result.effectiveRate - rate) < 1e-10, merchant);
    assert.equal(result.netRewardTWD, 1000 * rate);
    assert.equal(result.notes.filter(n => n.text === 'Chill刷指定通路加碼').length, 1);
    assert.equal(result.ruleDetails.filter(d => d.rule.scope.plan === 'chill_shua').length, 1);
  }
  assert.equal((elements['card-list-body'].innerHTML.match(/Chill刷指定通路加碼/g) || []).length, 1);
});

test('page initializes and calculates without a holiday input', () => {
  assert.doesNotMatch(html, /weekend-group|是否假日／國定假日/);
  assert.equal(elements['card-list-count'].textContent, 9);
  run('calculate()');
  assert.match(elements.results.innerHTML, /回饋排名/);
  assert.match(elements.results.innerHTML, /Chill刷指定通路加碼/);
  assert.equal(run("scopeMatches({weekday: 'weekend_or_holiday'}, {}, {})"), false);
  elements.merchant.value = '';
  run('calculate()');
  assert.match(elements.results.innerHTML, /一般消費/);
});


test('country changes show exactly the requested payments and clear hidden selections', () => {
  const expected = {
    TW: ['line_pay', 'apple_pay', 'physical_card', 'taishin_pay', 'fullpay'],
    JP: ['line_pay', 'apple_pay', 'physical_card', 'taishin_pay_plus', 'paypay'],
    KR: ['line_pay', 'apple_pay', 'physical_card', 'taishin_pay_plus'],
  };
  for (const country of ['TW', 'JP', 'KR', 'US', 'EU', 'TH', 'SG', 'OTHER', 'TW']) {
    paymentButtons.forEach(b => b.classList.add('active'));
    elements.country.value = country;
    run('updatePaymentAvailability()');
    const allowed = expected[country] || ['apple_pay', 'physical_card'];
    assert.deepEqual(paymentButtons.filter(b => !b.hidden).map(b => b.dataset.val), allowed);
    paymentButtons.filter(b => b.hidden).forEach(b => {
      assert.equal(b.disabled, true);
      assert.equal(b.classList.contains('active'), false);
    });
    assert.doesNotMatch(elements.results.innerHTML, /card-result|results-header/);
    const results = run(`CARDS.map(card => calcWithBestPayment(card, {
      amount: 1000, currency: 'TWD', country: '${country}', channel: 'offline', merchant: '', payments: null
    }, 1))`);
    for (const r of results) assert.ok(allowed.includes(r.suggestedPayment), r.suggestedPayment);
  }
  paymentButtons.forEach(b => b.classList.remove('active'));
});

test('new official merchants are searchable and receive the correct card bonus', () => {
  for (const merchant of ['日本MITSUI', 'LaLaport', 'Montbell', 'Alpen', '人形町今半']) {
    assert.equal(run(`Boolean(ALL_MERCHANTS[${JSON.stringify(merchant)}])`), true);
    const result = run(`calcRewardForCard(CARDS.find(c => c.card_id === 'esun_kumamon_jpy'), {
      amount: 1000, currency: 'JPY', country: 'JP', channel: 'offline',
      merchant: ${JSON.stringify(merchant)}, payments: ['physical_card']
    }, 1)`);
    assert.equal(result.netRewardTWD, 70, merchant);
    assert.ok(result.ruleDetails.some(d => d.rule.rule_id === 'kumamon_japan_specified_bonus_6pct_cap500'));
  }
  const sport = run(`calcRewardForCard(CARDS.find(c => c.card_id === 'sinopac_sport'), {
    amount: 1000, currency: 'TWD', country: 'TW', channel: 'offline',
    merchant: '喬山生機', payments: ['physical_card']
  }, 1)`);
  assert.equal(sport.netRewardTWD, 50);
});


test('spending limits use each bonus rate and its period, including shared caps', () => {
  for (const [id, merchant, payment, expected] of [
    ['sinopac_dawho', '', 'physical_card', '每帳單週期刷卡上限約 NT$16,000'],
    ['sinopac_sport', '', 'apple_pay', '每月刷卡上限約 NT$5,000'],
    ['sinopac_sport', '', 'apple_pay', '每月刷卡上限約 NT$10,000'],
    ['esun_ubear', 'Netflix', 'physical_card', '每帳單週期刷卡上限約 NT$1,000'],
    ['sinopac_bibei_usd', 'Amazon', 'physical_card', '每帳單週期刷卡上限約 NT$20,000'],
  ]) {
    const result = run(`calcRewardForCard(CARDS.find(c => c.card_id === '${id}'), {
      amount: 1000, currency: 'TWD', country: 'TW', channel: 'online',
      merchant: ${JSON.stringify(merchant)}, payments: ['${payment}']
    }, 1)`);
    assert.ok(result.notes.some(n => n.text.includes(expected)), expected);
  }
  const shared = run(`getSpendingLimitNotes([
    {rule: {rule_id: 'a', rate: 0.01, shared_cap_group: 'same', cap: {max_reward_twd: 100, period: 'quarter'}}},
    {rule: {rule_id: 'b', rate: 0.03, shared_cap_group: 'same', cap: {max_reward_twd: 100, period: 'quarter'}}}
  ])`);
  assert.match(shared[0].text, /每季刷卡上限約 NT\$2,500/);
  assert.match(shared[0].text, /共用額度/);
  elements.country.value = 'TW';
  elements.merchant.value = '';
  run('calculate()');
  assert.match(elements.results.innerHTML, /刷卡上限約 NT\$16,000/);
});
