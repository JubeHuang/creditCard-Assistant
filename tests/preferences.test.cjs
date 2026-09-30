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
const context = vm.createContext({
  document: {
    getElementById: id => elements[id] || null,
    querySelector: selector => {
      assert.ok(!selector.includes('weekend-group'));
      return selector.includes('channel-group') ? { dataset: { val: 'online' } } : null;
    },
    querySelectorAll: () => [], addEventListener() {},
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
