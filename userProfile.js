// 信用卡回饋助理 — 使用者固定資格
// 此檔案只描述持卡人的固定狀態，不屬於銀行公開權益資料。
// 未來自動更新信用卡權益時，不應修改此檔案。

const USER_PROFILE = {
  "sinopac_bibei_usd": {
    "user_level": "level2",
    "level2_prerequisites_always_met": true,
    "task_completed": true
  },
  "sinopac_sport": {
    "sport_task_always_met": true,
    "task_completed": true
  },
  "sinopac_dawho": {
    "dawho_level": "premium",
    "task_completed": true
  },
  "esun_ubear": {
    "e_statement_enabled": true,
    "pxpay_treated_as_online": true
  },
  "esun_kumamon_jpy": {},
  "dbs_eco": {
    "task_completed": true
  },
  "dbs_aov": {
    "exclude_new_user_rules": true,
    "has_dbs_digital_account": true,
    "autopay_enabled": true,
    "do_not_track_cap_usage": true
  },
  "taishin_richart": {
    "user_level": "level2",
    "autopay_enabled": true
  },
  "cathay_cube": {
    "user_level": "level2"
  }
};

function userRequirementValueMatches(actual, expected) {
  if (Array.isArray(expected)) return expected.includes(actual);

  if (expected && typeof expected === "object") {
    if (!actual || typeof actual !== "object") return false;
    return Object.entries(expected).every(([key, value]) =>
      userRequirementValueMatches(actual[key], value)
    );
  }

  return actual === expected;
}

function userRequirementsMet(card, requires = {}) {
  const profile = USER_PROFILE[card.card_id] || {};
  return Object.entries(requires).every(([key, expected]) =>
    userRequirementValueMatches(profile[key], expected)
  );
}

// app.js 目前只依 reward_rules 計算。
// 在 app.js 載入前，先依固定 USER_PROFILE 移除資格不符的規則。
for (const card of CARDS) {
  card.user_profile = USER_PROFILE[card.card_id] || {};
  card.reward_rules = card.reward_rules.filter(rule =>
    userRequirementsMet(card, rule.requires || {})
  );
}
