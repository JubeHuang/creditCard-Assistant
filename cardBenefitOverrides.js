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

// ===== HTML TEST: 星展傳說對決 2026 下半年 =====
(function applyAovTestOverrides() {
  const card = CARDS.find(card => card.card_id === "dbs_aov");
  if (!card) return;

  card.promo_until = "2026-12-31";

  for (const rule of card.reward_rules) {
    if (
      rule.rule_id === "aov_lifestyle_selected_bonus_9pct_cap500" ||
      rule.rule_id === "aov_overseas_offline_bonus_4pct_cap500"
    ) {
      rule.shared_cap_group = "aov_bonus_monthly_500";
    }
  }
})();

// ===== HTML TEST: Richart Level 2 =====
(function applyRichartTestOverrides() {
  const card = CARDS.find(card => card.card_id === "taishin_richart");
  if (!card) return;

  card.merchant_groups = {
    ...card.merchant_groups,

    tian_tian_shua: [
      "萬家福", "樂家康", "大買家", "唐吉訶德", "LOPIA", "智生活",
      "臺鐵", "高鐵", "台灣大車隊", "LINEGO", "Yoxi", "Uber", "台灣Bolt",
      "中油直營", "全國加油", "全國特急電", "源點EVOASIS", "華城電能EVALUE",
      "USPACE", "Autopass(車麻吉)",
      "寶雅", "康是美", "屈臣氏", "杏一醫療", "大樹藥局", "丁丁藥局",
      "佑全保健藥妝", "健康人生藥局"
    ],

    tian_tian_shua_taishinpay_only: ["7-11", "全家"],

    da_bi_shua: [
      ...(card.merchant_groups.da_bi_shua || []).filter(m => m !== "漢神洲際"),
      "漢神洲際"
    ],

    wan_lv_shua: (card.merchant_groups.wan_lv_shua || [])
      .filter(m => !m.startsWith("海外消費(")),

    chill_10pct: [
      "詹記", "萬客什鍋", "海底撈", "屋馬", "茶六", "新村站著吃", "燒肉政宗",
      "碳佐麻里", "雞湯大叔", "gonna", "BRUN", "CAFE ACME", "The Antipodean",
      "貳樓", "樂子", "Fake Sober", "Draft Land", "臺虎精釀", "ABV", "Bar TCRC",
      "Bar Home", "Phowa", "MOONROCK",
      "50嵐", "得正", "五桐號", "龜記", "UG TEA", "叮哥", "CAFE!N", "%Arabica",
      "COMPOSE COFFEE", "台灣代駕", "Motodomo"
    ],

    chill_5pct: [
      "饗饗", "NAGOMI",
      "WEVERSE", "K-MONSTAR", "微樂客", "五大唱片", "仙女樹", "FANME", "NOL",
      "巴哈姆特", "BOOK WALKER", "Animate", "樂天KOBO", "Readmoo", "Netflix",
      "Disney+", "愛爾達",
      "好好生醫", "POPCARE", "營養師輕食", "VITABOX", "MYPROTEIN", "UrMart",
      "Anytime Fitness", "健身工廠", "World Gym", "超核心", "KX PILATES", "虎鐵", "17FIT",
      "Adidas", "New Balance", "PUMA", "Onitsuka Tiger", "Nike", "HOKA",
      "Salomon", "lululemon", "Pinkoi"
    ],

    chill_3_3pct: [
      "Apple 直營", "Studio A", "DJI", "Insta360", "GoPro",
      "蝦皮", "淘寶", "酷澎", "Uber Eats"
    ]
  };

  const level2 = { user_level: "level2", autopay_enabled: true };

  card.reward_rules = [
    {
      rule_id: "richart_base_0_3pct",
      scope: { channel: ["online", "offline"] },
      rate: 0.003,
      cap: null,
      stackable: true,
      priority: 1,
      description: "一般消費 0.3%（無上限）"
    },
    {
      rule_id: "richart_5plans_bonus_3pct",
      scope: {
        requires_plan_switch: true,
        plan_in: ["tian_tian_shua", "da_bi_shua", "hao_xiang_shua", "shu_qu_shua", "wan_lv_shua"],
        payment_method_in: ["physical_card", "taishin_pay", "apple_pay", "google_wallet", "samsung_pay"],
        merchant_group_in: ["tian_tian_shua", "da_bi_shua", "hao_xiang_shua", "shu_qu_shua", "wan_lv_shua"]
      },
      rate: 0.03,
      cap: null,
      stackable: true,
      priority: 3,
      requires: level2,
      exclusive_group: "richart_plan_bonus",
      description: "五大方案指定通路加碼 +3.0%（與一般 0.3% 合計 3.3%；需切方案）"
    },
    {
      rule_id: "richart_tiantian_convenience_taishinpay_bonus_3pct",
      scope: {
        requires_plan_switch: true,
        plan: "tian_tian_shua",
        payment_method: "taishin_pay",
        merchant_group: "tian_tian_shua_taishinpay_only"
      },
      rate: 0.03,
      cap: null,
      stackable: true,
      priority: 3,
      requires: level2,
      exclusive_group: "richart_plan_bonus",
      description: "天天刷：7-11／全家使用台新Pay加碼 +3.0%（合計 3.3%；需切方案）"
    },
    {
      rule_id: "richart_wanlv_foreign_currency_bonus_3pct",
      scope: {
        requires_plan_switch: true,
        plan: "wan_lv_shua",
        foreign_currency: true
      },
      rate: 0.03,
      cap: null,
      stackable: true,
      priority: 3,
      requires: level2,
      exclusive_group: "richart_plan_bonus",
      description: "玩旅刷：外幣交易加碼 +3.0%（與一般 0.3% 合計 3.3%；需切方案）"
    },
    {
      rule_id: "richart_payzhe_taishinpay_bonus_3_5pct",
      scope: {
        plan: "pay_zhe_shua",
        payment_method: "taishin_pay",
        channel: ["online", "offline"]
      },
      rate: 0.035,
      cap: null,
      stackable: true,
      priority: 3,
      requires: level2,
      exclusive_group: "richart_plan_bonus",
      description: "Pay著刷：台新Pay加碼 +3.5%（與一般 0.3% 合計 3.8%；需切方案）"
    },
    {
      rule_id: "richart_payzhe_linepay_bonus_2pct",
      scope: {
        plan: "pay_zhe_shua",
        payment_method_in: ["line_pay", "fullpay"],
        channel: ["online", "offline"]
      },
      rate: 0.02,
      cap: null,
      stackable: true,
      priority: 3,
      requires: level2,
      exclusive_group: "richart_plan_bonus",
      description: "Pay著刷：LINE Pay／全盈+Pay加碼 +2.0%（與一般 0.3% 合計 2.3%；需切方案）"
    },
    {
      rule_id: "richart_payzhe_taishinpayplus_jpkr_bonus_3_5pct",
      scope: {
        plan: "pay_zhe_shua",
        payment_method: "taishin_pay_plus",
        country_in: ["JP", "KR"]
      },
      rate: 0.035,
      cap: null,
      stackable: true,
      priority: 4,
      requires: level2,
      exclusive_group: "richart_plan_bonus",
      description: "Pay著刷：台新Pay+ 日本／韓國加碼 +3.5%（與一般 0.3% 合計 3.8%；免 1.5% 國外交易服務費）"
    },
    {
      rule_id: "richart_weekend_shua_bonus_1_7pct",
      scope: {
        plan: "weekend_shua",
        country: "TW",
        weekday: "weekend_or_holiday",
        payment_method_in: [
          "physical_card", "taishin_pay", "apple_pay", "google_wallet",
          "samsung_pay", "line_pay", "fullpay"
        ],
        channel: ["online", "offline"]
      },
      rate: 0.017,
      cap: null,
      stackable: true,
      priority: 3,
      requires: level2,
      exclusive_group: "richart_plan_bonus",
      description: "假日刷加碼 +1.7%（與一般 0.3% 合計 2.0%；需切方案）"
    },
    {
      rule_id: "richart_chill_10pct_total",
      scope: {
        requires_plan_switch: true,
        plan: "chill_shua",
        merchant_group: "chill_10pct"
      },
      rate: 0.097,
      cap: null,
      stackable: true,
      priority: 4,
      requires: level2,
      exclusive_group: "richart_plan_bonus",
      valid_until: "2026-12-31",
      description: "Chill刷指定通路加碼 +9.7%（與一般 0.3% 合計 10%；需切方案）"
    },
    {
      rule_id: "richart_chill_5pct_total",
      scope: {
        requires_plan_switch: true,
        plan: "chill_shua",
        merchant_group: "chill_5pct"
      },
      rate: 0.047,
      cap: null,
      stackable: true,
      priority: 4,
      requires: level2,
      exclusive_group: "richart_plan_bonus",
      valid_until: "2026-12-31",
      description: "Chill刷指定通路加碼 +4.7%（與一般 0.3% 合計 5%；需切方案）"
    },
    {
      rule_id: "richart_chill_3_3pct_total",
      scope: {
        requires_plan_switch: true,
        plan: "chill_shua",
        merchant_group: "chill_3_3pct"
      },
      rate: 0.03,
      cap: null,
      stackable: true,
      priority: 4,
      requires: level2,
      exclusive_group: "richart_plan_bonus",
      valid_until: "2026-12-31",
      description: "Chill刷指定通路加碼 +3.0%（與一般 0.3% 合計 3.3%；需切方案）"
    }
  ];

  card.fee_waiver_by_payment = {
    ...(card.fee_waiver_by_payment || {}),
    taishin_pay_plus: true
  };

  card.payment_dictionary = {
    supported_default: [
      "physical_card", "apple_pay", "google_wallet", "samsung_pay",
      "line_pay", "fullpay", "taishin_pay", "taishin_pay_plus"
    ]
  };
})();
