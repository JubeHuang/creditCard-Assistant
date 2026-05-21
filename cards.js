// 信用卡回饋助理 — 卡片資料
// 更新卡片優惠時只需編輯此檔案

const CARDS = [
  {
    "card_id": "sinopac_bibei_usd",
    "promo_until": "2026-06-30",
    "bank": "永豐銀行",
    "card_name": "幣倍卡（美元）",
    "card_network": "Mastercard",
    "billing_currency": "USD",
    "foreign_transaction_fee": 0.015,
    "reward_currency": "cashback",
    "assumptions": {
      "user_level": "level2",
      "level2_prerequisites_always_met": true
    },
    "merchant_groups": {
      "bibei_selected": [
        "SUICA",
        "PASMO",
        "ICOCA",
        "Amazon",
        "Rakuten",
        "Mercari",
        "iHerb",
        "淘寶",
        "Agoda",
        "Booking.com",
        "Klook",
        "KKDAY",
        "大國藥妝",
        "Sugi藥妝",
        "Selfridge",
        "eBay",
        "Gmarket",
        "Olive Young",
        "航空公司",
        "旅行社",
        "Hotels",
        "Expedia",
        "Trip.com",
        "Airbnb",
        "Trivago",
        "AsiaYo",
        "歐特儀松山機場停車"
      ]
    },
    "reward_rules": [
      {
        "rule_id": "bibei_domestic_base_1pct",
        "scope": {
          "country": "TW"
        },
        "rate": 0.01,
        "cap": null,
        "stackable": true,
        "priority": 1,
        "description": "國內一般消費 1%（無上限；可與任務/精選加碼疊加）"
      },
      {
        "rule_id": "bibei_domestic_task_bonus_1pct_cap200",
        "scope": {
          "country": "TW"
        },
        "rate": 0.01,
        "cap": {
          "period": "calendar_month",
          "max_reward_twd": 200,
          "cap_applies_to": "this_rule_only"
        },
        "requires": {
          "task_completed": true
        },
        "stackable": true,
        "priority": 2,
        "description": "任務加碼 +1%（每月上限 200；與基本 1% 疊加）"
      },
      {
        "rule_id": "bibei_foreign_base_2pct",
        "scope": {
          "foreign": true
        },
        "rate": 0.02,
        "cap": null,
        "stackable": true,
        "priority": 1,
        "description": "海外一般消費 2%（無上限；可與任務/精選加碼疊加）"
      },
      {
        "rule_id": "bibei_foreign_task_bonus_1pct",
        "scope": {
          "foreign": true
        },
        "rate": 0.01,
        "cap": null,
        "requires": {
          "task_completed": true
        },
        "stackable": true,
        "priority": 2,
        "description": "海外任務加碼 +1%（無上限；與海外基本 2% 疊加）"
      },
      {
        "rule_id": "bibei_selected_bonus_4pct_cap300",
        "scope": {
          "merchant_group": "bibei_selected"
        },
        "rate": 0.04,
        "cap": {
          "period": "calendar_month",
          "max_reward_twd": 800,
          "cap_applies_to": "this_rule_only"
        },
        "shared_cap_group": "bibei_4pct_bonus",
        "stackable": true,
        "priority": 3,
        "description": "精選商家加碼 +4%（每月上限 800；可與基本/任務疊加）"
      },
      {
        "rule_id": "bibei_foreign_offline_4pct_cap300",
        "scope": {
          "foreign": true,
          "channel": ["offline"]
        },
        "rate": 0.04,
        "cap": {
          "period": "calendar_month",
          "max_reward_twd": 800,
          "cap_applies_to": "this_rule_only"
        },
        "shared_cap_group": "bibei_4pct_bonus",
        "stackable": true,
        "priority": 3,
        "description": "海外實體消費加碼 +4%（每月上限 800；可與基本/任務疊加）"
      }
    ],
    "payment_dictionary": {
      "supported_default": [
        "physical_card"
      ]
    },
    "merchant_payment_restrictions": {
      "7-11": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "7-eleven": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家便利商店": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      }
    }
  },
  {
    "card_id": "sinopac_sport",
    "promo_until": "2026-06-30",
    "bank": "永豐銀行",
    "card_name": "SPORT 卡",
    "card_network": "Mastercard",
    "billing_currency": "TWD",
    "foreign_transaction_fee": 0.015,
    "reward_currency": "points",
    "assumptions": {
      "sport_task_always_met": true
    },
    "reward_rules": [
      {
        "rule_id": "sport_base_1pct",
        "scope": {},
        "rate": 0.01,
        "stackable": true,
        "priority": 1,
        "description": "一般消費 1%（無上限）"
      },
      {
        "rule_id": "sport_mobile_pay_4pct_cap300",
        "scope": {
          "payment_method_in": [
            "apple_pay"
          ]
        },
        "rate": 0.04,
        "cap": {
          "period": "calendar_month",
          "max_reward_twd": 300
        },
        "stackable": true,
        "priority": 2,
        "description": "Apple Pay 加碼 +4%（與基本 1% 疊加，最高 5%；每月上限 300）"
      }
    ],
    "payment_dictionary": {
      "supported_default": [
        "physical_card",
        "apple_pay"
      ]
    },
    "merchant_payment_restrictions": {
      "7-11": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "7-eleven": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家便利商店": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      }
    }
  },
  {
    "card_id": "sinopac_dawho",
    "promo_until": "2026-06-30",
    "bank": "永豐銀行",
    "card_name": "DAWHO 現金回饋卡",
    "card_network": "Mastercard",
    "billing_currency": "TWD",
    "foreign_transaction_fee": 0.015,
    "reward_currency": "cashback",
    "assumptions": {
      "dawho_level": "premium"
    },
    "merchant_groups": {
      "easycard_auto_topup": [
        "悠遊卡自動加值"
      ]
    },
    "reward_rules": [
      {
        "rule_id": "dawho_domestic_1pct",
        "scope": {
          "country": "TW"
        },
        "rate": 0.01,
        "stackable": true,
        "priority": 1,
        "description": "國內一般消費 1%（無上限；可與任務加碼疊加）"
      },
      {
        "rule_id": "dawho_foreign_2pct",
        "scope": {
          "foreign": true
        },
        "rate": 0.02,
        "stackable": true,
        "priority": 1,
        "description": "海外一般消費 2%（無上限；可與任務加碼疊加）"
      },
      {
        "rule_id": "dawho_task_2_5pct_cap400",
        "scope": {},
        "rate": 0.025,
        "cap": {
          "period": "calendar_month",
          "max_reward_twd": 400,
          "cap_applies_to": "this_rule_only"
        },
        "stackable": true,
        "priority": 2,
        "description": "任務加碼 +2.5%（國內合計 3.5%、海外合計 4.5%；每月加碼上限 400）"
      },
      {
        "rule_id": "dawho_easycard_3pct_cap100",
        "scope": {
          "merchant_group": "easycard_auto_topup"
        },
        "rate": 0.03,
        "cap": {
          "period": "calendar_month",
          "max_reward_twd": 100
        },
        "stackable": false,
        "priority": 10,
        "description": "悠遊卡自動加值 3%（每月上限 100；通常不與一般回饋疊加）"
      }
    ],
    "payment_dictionary": {
      "supported_default": [
        "physical_card"
      ]
    },
    "merchant_payment_restrictions": {
      "7-11": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "7-eleven": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家便利商店": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      }
    }
  },
  {
    "card_id": "esun_ubear",
    "promo_until": "2026-08-31",
    "bank": "玉山銀行",
    "card_name": "U Bear 卡",
    "card_network": "Mastercard",
    "billing_currency": "TWD",
    "foreign_transaction_fee": 0.015,
    "reward_currency": "cashback",
    "assumptions": {
      "e_statement_enabled": true,
      "pxpay_treated_as_online": true
    },
    "merchant_groups": {
      "ubear_online": [
        "全支付",
        "街口支付",
        "LINE Pay",
        "momo",
        "蝦皮"
      ],
      "ubear_streaming": [
        "Netflix",
        "Disney+",
        "Nintendo",
        "PlayStation"
      ]
    },
    "reward_rules": [
      {
        "rule_id": "ubear_base_1pct",
        "scope": {},
        "rate": 0.01
      },
      {
        "rule_id": "ubear_online_2pct_cap150",
        "description": "線上指定通路 2% 回饋（上限 150 TWD／期）",
        "scope": {
          "merchant_group": "ubear_online"
        },
        "rate": 0.02,
        "cap": {
          "period": "statement_cycle",
          "max_reward_twd": 150
        }
      },
      {
        "rule_id": "ubear_streaming_10pct_cap100",
        "description": "串流媒體 10% 回饋（上限 100 TWD／期）",
        "scope": {
          "merchant_group": "ubear_streaming"
        },
        "rate": 0.1,
        "cap": {
          "period": "statement_cycle",
          "max_reward_twd": 100
        }
      }
    ],
    "payment_dictionary": {
      "supported_default": [
        "physical_card"
      ]
    },
    "merchant_payment_restrictions": {
      "7-11": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "7-eleven": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家便利商店": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      }
    }
  },
  {
    "card_id": "esun_kumamon_jpy",
    "promo_until": "2026-06-30",
    "bank": "玉山銀行",
    "card_name": "熊本熊卡（日圓雙幣）",
    "card_network": "JCB",
    "billing_currency": "JPY",
    "foreign_transaction_fee": 0.015,
    "reward_currency": "cashback",
    "merchant_groups": {
      "kumamon_japan_specified": [
        "SUICA",
        "PASMO",
        "ICOCA",
        "BicCamera",
        "松本清",
        "唐吉訶德",
        "UNIQLO",
        "GU",
        "Yodobashi",
        "大國藥妝",
        "無印良品",
        "勝烈亭",
        "敘敘苑",
        "牛角",
        "力丸燒肉",
        "六歌仙燒肉",
        "shake shack",
        "DOUTOR Coffee",
        "Fuglen",
        "鳥貴族",
        "一蘭拉麵",
        "松屋",
        "SUKIYA",
        "壽司郎",
        "藏壽司",
        "東京迪士尼樂園",
        "東京華納兄弟哈利波特影城",
        "日本環球影城",
        "豪斯登堡",
        "九州非洲獅樂園",
        "名古屋樂高樂園",
        "吉伊卡哇樂園",
        "JR鐵路公司",
        "日本航空",
        "樂天旅遊",
        "東橫INN",
        "星野集團"
      ]
    },
    "reward_rules": [
      {
        "rule_id": "kumamon_japan_2_5pct",
        "scope": {
          "country": "JP"
        },
        "rate": 0.025
      },
      {
        "rule_id": "kumamon_japan_specified_6pct_cap500",
        "description": "日本指定通路 6% 回饋（上限 500 TWD／期）",
        "scope": {
          "country": "JP",
          "merchant_group": "kumamon_japan_specified"
        },
        "rate": 0.06,
        "cap": {
          "period": "statement_cycle",
          "max_reward_twd": 500
        }
      },
      {
        "rule_id": "kumamon_paypay_3_5pct_cap100",
        "scope": {
          "country": "JP",
          "payment_method": "paypay"
        },
        "rate": 0.035,
        "cap": {
          "period": "quarter",
          "max_reward_twd": 100
        },
        "description": "PayPay 3.5%（每季上限 100，優惠至 6/30）",
        "fee_waiver": true,
        "stackable": false,
        "priority": 10,
        "valid_until": "2026-06-30"
      }
    ],
    "fee_waiver_by_payment": {
      "paypay": true
    },
    "payment_dictionary": {
      "supported_default": [
        "physical_card",
        "paypay"
      ]
    },
    "merchant_payment_restrictions": {
      "7-11": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "7-eleven": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家便利商店": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      }
    }
  },
  {
    "card_id": "dbs_eco",
    "promo_until": "2026-12-31",
    "bank": "星展銀行",
    "card_name": "ECO 永續卡",
    "card_network": "Mastercard",
    "billing_currency": "TWD",
    "foreign_transaction_fee": 0.015,
    "reward_currency": "cashback",
    "assumptions": {
      "task_completed": false
    },
    "merchant_groups": {
      "dbs_eco_merchants": [
        "Tesla 充電資費",
        "Gogoro 電池資費",
        "鮮乳坊",
        "茶籽堂",
        "禾乃川",
        "直接跟農夫買",
        "綠藤生機",
        "艾瑪絲"
      ]
    },
    "reward_rules": [
      {
        "rule_id": "eco_base_1pct",
        "scope": {},
        "rate": 0.01
      },
      {
        "rule_id": "eco_overseas_offline_4pct_cap600",
        "description": "海外指定國實體消費 4% 回饋（上限 600 TWD／期）",
        "scope": {
          "foreign": true,
          "channel": [
            "offline"
          ],
          "country_in": [
            "JP",
            "KR",
            "TH",
            "SG",
            "EU",
            "US"
          ]
        },
        "rate": 0.04,
        "cap": {
          "period": "statement_cycle",
          "max_reward_twd": 600
        }
      },
      {
        "rule_id": "eco_merchant_10pct_cap300",
        "description": "永續指定通路 10% 回饋（上限 300 TWD／期）",
        "scope": {
          "merchant_group": "dbs_eco_merchants"
        },
        "rate": 0.1,
        "cap": {
          "period": "statement_cycle",
          "max_reward_twd": 300
        }
      }
    ],
    "payment_dictionary": {
      "supported_default": [
        "physical_card"
      ]
    },
    "merchant_payment_restrictions": {
      "7-11": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "7-eleven": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家便利商店": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      }
    }
  },
  {
    "card_id": "dbs_aov",
    "promo_until": "2026-06-30",
    "bank": "星展銀行",
    "card_name": "傳說對決聯名卡",
    "card_network": "Mastercard",
    "billing_currency": "TWD",
    "foreign_transaction_fee": 0.015,
    "reward_currency": "points",
    "assumptions": {
      "exclude_new_user_rules": true,
      "has_dbs_digital_account": true,
      "autopay_enabled": true,
      "do_not_track_cap_usage": true
    },
    "merchant_groups": {
      "dbs_aov_lifestyle_selected": [
        "App Store",
        "Google Play",
        "Garena",
        "GASH",
        "MyCard",
        "Nintendo",
        "PlayStation",
        "Steam",
        "Acer",
        "ASUS",
        "Logitech",
        "NOVA",
        "三創生活園區",
        "寬宏售票",
        "KKTIX",
        "年代售票",
        "拓元售票",
        "YouTube Premium",
        "Apple TV",
        "Netflix",
        "Disney+",
        "Spotify",
        "Twitch",
        "愛奇藝",
        "Catchplay",
        "KKBOX",
        "KKTV",
        "LINE TV",
        "LiTV",
        "愛爾達電視",
        "Uber Eats",
        "foodpanda",
        "麥當勞",
        "肯德基",
        "摩斯漢堡",
        "21 世紀風味館",
        "美墨炸雞",
        "拿坡里",
        "Pizza Hut",
        "蝦皮"
      ]
    },
    "excluded_categories": [
      "bill_payment_platform",
      "utilities",
      "tuition",
      "medical",
      "parking",
      "insurance",
      "investment_platform",
      "gambling",
      "topup_or_prepaid",
      "electronic_ticket_auto_topup",
      "pxmart_and_pxpay",
      "tax_and_government_fee",
      "bank_related_fees"
    ],
    "reward_rules": [
      {
        "rule_id": "aov_domestic_base_1_2pct_autopay",
        "scope": {
          "country": "TW",
          "exclude_categories": "excluded_categories"
        },
        "rate": 0.012,
        "cap": null,
        "stackable": true,
        "priority": 1,
        "description": "國內一般消費 1.2%（Autopay）"
      },
      {
        "rule_id": "aov_foreign_base_2_5pct_autopay",
        "scope": {
          "foreign": true,
          "exclude_categories": "excluded_categories"
        },
        "rate": 0.025,
        "cap": null,
        "stackable": true,
        "priority": 1,
        "description": "海外一般消費 2.5%（Autopay）"
      },
      {
        "rule_id": "aov_lifestyle_selected_bonus_8_8pct_domestic_cap1000",
        "scope": {
          "country": "TW",
          "merchant_group": "dbs_aov_lifestyle_selected",
          "exclude_categories": "excluded_categories"
        },
        "rate": 0.088,
        "cap": {
          "period": "calendar_month",
          "max_reward_twd": 1000
        },
        "stackable": true,
        "priority": 2,
        "description": "生活玩家精選 +8.8%（上限 1,000）",
        "exclusive_group": "aov_domestic_bonus_8_8"
      },
      {
        "rule_id": "aov_linepay_bonus_8_8pct_domestic_cap1000",
        "scope": {
          "country": "TW",
          "payment_method": "line_pay",
          "exclude_categories": "excluded_categories"
        },
        "rate": 0.088,
        "cap": {
          "period": "calendar_month",
          "max_reward_twd": 1000
        },
        "stackable": true,
        "priority": 2,
        "exclusive_group": "aov_domestic_bonus_8_8",
        "description": "LINE Pay 加碼 +8.8%（上限 1,000）"
      }
    ],
    "payment_dictionary": {
      "supported_default": [
        "physical_card",
        "line_pay"
      ]
    },
    "merchant_payment_restrictions": {
      "7-11": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "7-eleven": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家便利商店": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      }
    }
  },
  {
    "card_id": "taishin_richart",
    "promo_until": "2026-06-30",
    "bank": "台新銀行",
    "card_name": "Richart 卡",
    "card_network": "Mastercard",
    "billing_currency": "TWD",
    "foreign_transaction_fee": 0.015,
    "reward_currency": "points",
    "assumptions": {
      "user_level": "level2",
      "autopay_enabled": true
    },
    "merchant_groups": {
      "tian_tian_shua": [
        "7-11",
        "全家",
        "家樂福",
        "大買家",
        "唐吉訶德",
        "LOPIA",
        "臺鐵",
        "高鐵",
        "台灣大車隊",
        "LINEGO",
        "Yoxi",
        "Uber",
        "台灣Bolt",
        "中油直營",
        "全國加油",
        "全國特急電",
        "源點EVOASIS",
        "華城電能EVALUE",
        "USPACE",
        "Autopass(車麻吉)",
        "寶雅",
        "康是美",
        "屈臣氏",
        "杏一醫療",
        "大樹藥局",
        "丁丁藥局",
        "佑全保健藥妝",
        "健康人生藥局"
      ],
      "da_bi_shua": [
        "新光三越(含skm pay)",
        "遠東百貨",
        "遠東SOGO",
        "漢神巨蛋",
        "漢神百貨",
        "微風",
        "台北101",
        "遠東巨城",
        "廣三SOGO",
        "南紡購物中心",
        "誠品生活(含線上)",
        "京站",
        "三創生活",
        "夢時代",
        "統一時代(含DREAM PLAZA)",
        "中友百貨",
        "Mitsui Shopping Park LaLaport(南港/台中)",
        "MITSUI OUTLET PARK(林口/台中港/台南)",
        "華泰名品城",
        "SKM Park Outlets",
        "IKEA",
        "特力屋",
        "HOLA",
        "宜得利",
        "瑪黑家居",
        "UNIQLO",
        "GU",
        "ZARA",
        "NET",
        "lululemon"
      ],
      "hao_xiang_shua": [
        "全臺餐飲(不含餐券)",
        "王品瘋Pay",
        "Uber Eats",
        "Foodpanda",
        "拓元售票",
        "KKTIX",
        "年代售票",
        "寬宏售票",
        "OPENTIX兩廳院文化生活",
        "FunNow",
        "錢櫃",
        "好樂迪",
        "ONCOR",
        "sing!go",
        "享溫馨",
        "晶華國際酒店集團",
        "雲朗觀光",
        "台灣萬豪國際集團旗下飯店",
        "煙波國際觀光集團",
        "老爺酒店集團",
        "福華集團",
        "漢來飯店事業群",
        "台北君悅酒店",
        "高雄洲際酒店",
        "臺中勤美洲際酒店",
        "礁溪寒沐酒店"
      ],
      "shu_qu_shua": [
        "蝦皮",
        "momo",
        "酷澎(Coupang)",
        "PChome",
        "淘寶",
        "Amazon",
        "東森",
        "博客來",
        "Richart Mart",
        "PayEasy",
        "iHerb",
        "SHEIN",
        "Farfetch",
        "Olive Young",
        "知識衛星",
        "Amazing Talker",
        "Tutor ABC",
        "Hahow",
        "PressPlay",
        "MyCard",
        "遊戲橘子",
        "Steam",
        "PlayStation",
        "Nintendo",
        "Netflix",
        "Disney+",
        "ChatGPT",
        "Notion",
        "Canva",
        "Perplexity",
        "Claude"
      ],
      "wan_lv_shua": [
        "海外消費(含實體及線上、歐洲國家交易)",
        "中華航空",
        "長榮航空",
        "星宇航空",
        "台灣虎航",
        "國泰航空",
        "華信航空",
        "立榮航空",
        "樂桃航空",
        "阿聯酋航空",
        "亞洲航空",
        "酷航",
        "捷星航空",
        "新加坡航空",
        "日本航空",
        "越捷航空",
        "Uber",
        "Grab",
        "SUICA",
        "ICOCA",
        "PASMO",
        "WOWPASS",
        "AIRSIM",
        "Klook",
        "KKday",
        "Agoda",
        "Booking.com",
        "Trip.com",
        "Airbnb",
        "Hotels.com",
        "Expedia",
        "雄獅旅遊",
        "易遊網",
        "東南旅遊",
        "可樂旅遊",
        "長汎假期",
        "五福旅遊",
        "喜鴻假期",
        "易飛旅遊",
        "燦星旅遊",
        "加利利旅行社",
        "鳳凰國際旅行社",
        "山富旅遊",
        "行健旅遊"
      ],
      "pay_zhe_shua_taishinpay_3_8_merchants": [
        "7-11",
        "全家",
        "萊爾富",
        "OK超商",
        "寶雅",
        "康是美",
        "馬光中醫",
        "小北百貨",
        "楓康超市",
        "九乘九",
        "光南",
        "撥筋堂",
        "佑全保健藥妝",
        "健康人生藥局",
        "新光三越",
        "IKEA",
        "中友百貨",
        "486團購",
        "adidas",
        "卡多摩",
        "華山1914",
        "SO NICE",
        "50% Fifty Percent",
        "比漾廣場",
        "IROO",
        "摩曼頓",
        "Richart Mart",
        "NET",
        "ATT",
        "捷運",
        "55688",
        "歐特儀停車",
        "漢堡王",
        "屋馬",
        "采盟免稅店",
        "Louisa",
        "怡客",
        "金韓食",
        "色鼎",
        "涮屋馬"
      ]
    },
    "reward_rules": [
      {
        "rule_id": "richart_base_0_3pct",
        "scope": {
          "country": "TW",
          "channel": [
            "online",
            "offline"
          ]
        },
        "rate": 0.003,
        "cap": null,
        "stackable": true,
        "priority": 1,
        "description": "一般消費 0.3%（無上限）"
      },
      {
        "rule_id": "richart_payzhe_taishinpay_3_5pct",
        "scope": {
          "plan": "pay_zhe_shua",
          "payment_method": "taishin_pay",
          "channel": [
            "online",
            "offline"
          ],
          "merchant_group_in": [
            "pay_zhe_shua_taishinpay_3_8_merchants"
          ]
        },
        "rate": 0.032,
        "cap": null,
        "stackable": true,
        "priority": 2,
        "requires": {
          "user_level": "level2",
          "autopay_enabled": true
        },
        "description": "Pay著刷：台新Pay +3.2%（合計 3.5%；需切方案）",
        "exclusive_group": "richart_plan_bonus"
      },
      {
        "rule_id": "richart_payzhe_linepay_2_3pct",
        "scope": {
          "plan": "pay_zhe_shua",
          "payment_method": "line_pay",
          "channel": [
            "online",
            "offline"
          ]
        },
        "rate": 0.02,
        "cap": null,
        "stackable": true,
        "priority": 2,
        "requires": {
          "user_level": "level2",
          "autopay_enabled": true
        },
        "description": "Pay著刷：LINE Pay +2.0%（合計 2.3%；需切方案）",
        "exclusive_group": "richart_plan_bonus"
      },
      {
        "rule_id": "richart_5plans_bonus_3_3pct",
        "scope": {
          "requires_plan_switch": true,
          "plan_in": [
            "tian_tian_shua",
            "da_bi_shua",
            "hao_xiang_shua",
            "shu_qu_shua",
            "wan_lv_shua"
          ],
          "payment_method_in": [
            "physical_card",
            "taishin_pay",
            "apple_pay",
            "google_wallet",
            "samsung_pay"
          ],
          "merchant_group_in": [
            "tian_tian_shua",
            "da_bi_shua",
            "hao_xiang_shua",
            "shu_qu_shua",
            "wan_lv_shua"
          ]
        },
        "rate": 0.03,
        "cap": null,
        "stackable": true,
        "priority": 3,
        "requires": {
          "user_level": "level2",
          "autopay_enabled": true
        },
        "description": "五大方案 +3.0%（合計 3.3%；需切方案）",
        "exclusive_group": "richart_plan_bonus"
      },
      {
        "rule_id": "richart_weekend_shua_2pct",
        "scope": {
          "plan": "weekend_shua",
          "country": "TW",
          "weekday": "weekend_or_holiday",
          "payment_method_in": [
            "physical_card",
            "taishin_pay",
            "apple_pay",
            "google_wallet",
            "samsung_pay",
            "line_pay"
          ],
          "channel": [
            "online",
            "offline"
          ]
        },
        "rate": 0.017,
        "cap": null,
        "stackable": true,
        "priority": 3,
        "requires": {
          "user_level": "level2",
          "autopay_enabled": true
        },
        "description": "假日刷 +1.7%（合計 2.0%；需切方案）",
        "exclusive_group": "richart_plan_bonus"
      },
      {
        "rule_id": "richart_payzhe_paypay_japan_3_8pct",
        "scope": {
          "plan": "pay_zhe_shua",
          "requires_plan_switch": true,
          "payment_method": "paypay",
          "country": "JP"
        },
        "rate": 0.038,
        "cap": null,
        "stackable": true,
        "priority": 2,
        "requires": {
          "user_level": "level2",
          "autopay_enabled": true
        },
        "description": "Pay著刷：PayPay 日本 3.8%（免手續費；需切方案）",
        "exclusive_group": "richart_plan_bonus"
      }
    ],
    "fee_waiver_by_payment": {
      "paypay": true
    },
    "payment_dictionary": {
      "supported_default": [
        "physical_card",
        "apple_pay",
        "google_wallet",
        "samsung_pay",
        "line_pay",
        "taishin_pay",
        "paypay"
      ]
    },
    "merchant_payment_restrictions": {
      "7-11": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "7-eleven": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家便利商店": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      }
    }
  },
  {
    "card_id": "cathay_cube",
    "promo_until": "2026-06-30",
    "bank": "國泰世華銀行",
    "card_name": "CUBE 卡",
    "card_network": "Mastercard",
    "billing_currency": "TWD",
    "foreign_transaction_fee": 0.015,
    "reward_currency": "points",
    "assumptions": {
      "user_level": "level2"
    },
    "merchant_groups": {
      "play_digital": [
        "ChatGPT",
        "Perplexity",
        "Notion",
        "Canva",
        "Claude",
        "Speak",
        "Duolingo",
        "Gamma",
        "Apple 媒體服務",
        "Google Play",
        "Disney+",
        "Netflix",
        "Spotify",
        "YouTube Premium",
        "Max",
        "蝦皮購物",
        "momo",
        "PChome 24h購物",
        "小樹購",
        "淘寶",
        "天貓",
        "Coupang 酷澎"
      ],
      "le_savor": [
        "Uber Eats",
        "Foodpanda",
        "王品瘋Pay",
        "拓元售票",
        "KKTIX",
        "年代售票",
        "寬宏售票",
        "OPENTIX 兩廳院文化生活",
        "FunNow",
        "錢櫃",
        "好樂迪",
        "ONCOR",
        "sing!go",
        "享溫馨"
      ],
      "fun_travel": [
        "高鐵",
        "臺鐵",
        "Uber",
        "Grab",
        "SUICA",
        "ICOCA",
        "PASMO",
        "Klook",
        "KKday",
        "Agoda",
        "Booking.com",
        "Trip.com",
        "Airbnb",
        "Hotels.com",
        "Expedia"
      ],
      "selected": [
        "IKEA 宜家家居",
        "家樂福",
        "全聯福利中心",
        "7-ELEVEN",
        "全家便利商店",
        "台灣中油 直營站",
        "U-POWER",
        "EVOASIS",
        "EVALUE",
        "TAIL",
        "iCharging",
        "車麻吉",
        "uTagGo"
      ]
    },
    "reward_rules": [
      {
        "rule_id": "cube_base_0_3pct",
        "scope": {
          "channel": [
            "online",
            "offline"
          ],
          "country": "ANY"
        },
        "rate": 0.003,
        "cap": null,
        "stackable": true,
        "priority": 1,
        "description": "一般消費 0.3%（無上限）"
      },
      {
        "rule_id": "cube_level2_specified_3pct",
        "scope": {
          "requires_plan_switch": true,
          "plan_in": [
            "play_digital",
            "le_savor",
            "fun_travel"
          ],
          "merchant_group_in": [
            "play_digital",
            "le_savor",
            "fun_travel"
          ]
        },
        "rate": 0.027,
        "cap": null,
        "stackable": true,
        "priority": 2,
        "requires": {
          "user_level": "level2"
        },
        "description": "玩數位／樂饗購／趣旅行 +2.7%（合計 3%；需切方案）"
      },
      {
        "rule_id": "cube_selected_2pct",
        "scope": {
          "requires_plan_switch": true,
          "plan": "selected",
          "merchant_group": "selected"
        },
        "rate": 0.017,
        "cap": null,
        "stackable": true,
        "priority": 2,
        "description": "集精選 +1.7%（合計 2%；需切方案）"
      }
    ],
    "payment_dictionary": {
      "supported_default": [
        "physical_card",
        "apple_pay",
        "google_wallet",
        "samsung_pay",
        "line_pay"
      ]
    },
    "merchant_payment_restrictions": {
      "7-11": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "7-eleven": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      },
      "全家便利商店": {
        "line_pay": [
          "台新銀行"
        ],
        "apple_pay": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "physical_card": [
          "國泰世華銀行",
          "玉山銀行",
          "台新銀行",
          "永豐銀行"
        ],
        "taishin_pay": [
          "台新銀行"
        ]
      }
    }
  }
];
