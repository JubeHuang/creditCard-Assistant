// 2026 下半年權益覆寫
// 此檔案用於逐張更新 cards.js 內既有卡片，全部卡片核對完成後可再合併回單一資料檔。

(function applyCardBenefitOverrides() {
  const card = CARDS.find(card => card.card_id === "sinopac_bibei_usd");
  if (!card) return;

  card.promo_until = "2026-12-31";

  card.merchant_groups = {
    ...card.merchant_groups,
    bibei_selected: [
      "SUICA",
      "PASMO",
      "ICOCA",
      "大國藥妝",
      "Sugi藥妝",
      "Rakuten",
      "Mercari",
      "Amazon",
      "iHerb",
      "Selfridges",
      "eBay",
      "淘寶",
      "Gmarket",
      "Olive Young",
      "航空公司",
      "旅行社",
      "Booking.com",
      "Agoda",
      "Hotels",
      "Expedia",
      "Trip.com",
      "Airbnb",
      "Klook",
      "KKDAY",
      "Trivago",
      "AsiaYo",
      "歐特儀松山機場停車"
    ],
    bibei_insurance: [
      "保費",
      "壽險",
      "產險"
    ]
  };

  card.reward_rules = [
    {
      rule_id: "bibei_domestic_base_1pct",
      scope: { country: "TW" },
      rate: 0.01,
      cap: null,
      stackable: true,
      priority: 1,
      description: "國內一般消費 1%（無上限）"
    },
    {
      rule_id: "bibei_foreign_base_2pct",
      scope: { foreign: true },
      rate: 0.02,
      cap: null,
      stackable: true,
      priority: 1,
      description: "國外一般消費 2%（無上限）"
    },
    {
      rule_id: "bibei_selected_bonus_4pct_cap800",
      scope: { merchant_group: "bibei_selected" },
      rate: 0.04,
      cap: {
        period: "statement_cycle",
        max_reward_twd: 800,
        cap_applies_to: "this_rule_only"
      },
      requires: { task_completed: true },
      shared_cap_group: "bibei_selected_4pct_bonus",
      exclusive_group: "bibei_selected_4pct",
      stackable: true,
      priority: 3,
      description: "精選通路加碼 +4%（每帳單週期上限 800；需完成指定任務）"
    },
    {
      rule_id: "bibei_foreign_offline_bonus_4pct_cap800",
      scope: {
        foreign: true,
        channel: ["offline"]
      },
      rate: 0.04,
      cap: {
        period: "statement_cycle",
        max_reward_twd: 800,
        cap_applies_to: "this_rule_only"
      },
      requires: { task_completed: true },
      shared_cap_group: "bibei_selected_4pct_bonus",
      exclusive_group: "bibei_selected_4pct",
      stackable: true,
      priority: 3,
      description: "國外實體一般消費加碼 +4%（每帳單週期上限 800；需完成指定任務）"
    },
    {
      rule_id: "bibei_insurance_1_2pct",
      scope: { merchant_group: "bibei_insurance" },
      rate: 0.012,
      cap: null,
      stackable: false,
      priority: 10,
      description: "保費 1.2% 現金回饋（無上限；不與一般消費回饋重複計算）"
    }
  ];
})();
