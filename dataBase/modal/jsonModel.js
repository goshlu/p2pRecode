let yuangong = {
  count: 8,
  data: [{
    name: "admin",
    gender: "男",
    bumen: "总经理办公室",
    time: '2017-10-10',
    role: '全部权限',
  },
    {
      name: "花花",
      gender: "男",
      bumen: "新标运营部",
      time: '2018-09-22',
      role: '新标上架',
    }, {
      name: "草草",
      gender: "男",
      bumen: "还款管理部",
      time: '2018-03-22',
      role: '贷款审核',
    }, {
      name: "草草",
      gender: "男",
      bumen: "投资运营部",
      time: '2018-03-22',
      role: '贷款审核',
    }, {
      name: "草草",
      gender: "男",
      bumen: "新标运营部",
      time: '2018-03-22',
      role: '贷款审核',
    }, {
      name: "草草",
      gender: "男",
      bumen: "还款管理部",
      time: '2018-03-22',
      role: '贷款审核',
    }, {
      name: "草草",
      gender: "男",
      bumen: "会员管理部",
      time: '2018-03-22',
      role: '贷款审核',
    }, {
      name: "草草",
      gender: "男",
      bumen: "新标运营部",
      time: '2018-03-22',
      role: '贷款审核',
    }, {
      name: "草草",
      gender: "男",
      bumen: "会员管理部",
      time: '2018-03-22',
      role: '贷款审核',
    }, {
      name: "草草",
      gender: "男",
      bumen: "人事管理部",
      time: '2018-03-22',
      role: '贷款审核',
    }, {
      name: "草草",
      gender: "男",
      bumen: "新标运营部",
      time: '2018-03-22',
      role: '贷款审核',
    }, {
      name: "草草",
      gender: "男",
      bumen: "会员管理部",
      time: '2018-03-22',
      role: '贷款审核',
    }, {
      name: "草草",
      gender: "男",
      bumen: "人事管理部",
      time: '2018-03-22',
      role: '贷款审核',
    }, {
      name: "草草",
      gender: "男",
      bumen: "人事管理部",
      time: '2018-03-22',
      role: '贷款审核',
    }, {
      name: "草草",
      gender: "男",
      bumen: "新标运营部",
      time: '2018-03-22',
      role: '贷款审核',
    }
  ]
};

let bumen = {
  count: 6,
  data: [{
    name: '新标运营部',
    time: '2017-10-22',
    num: 8,
    info: '负责代款，新标维护',
    men: '李栓蛋',
    roles: [
      "新增贷款", "贷款审核", "新标上架", "新标维护"
    ],
    url: [{
      "id": "1",
      "title": "借贷管理",
      "isOpen": true,
      "children": [
        {
          "id": "1-3",
          "title": "借贷审核",
          "isOpen": false,
          "children": [],
          "url": "/LoanAuid"
        },
        {
          "id": "1-4",
          "title": "新标上架",
          "isOpen": false,
          "children": [],
          "url": "/BidFrame"
        },
        {
          "id": "1-5",
          "title": "进行中标的管理",
          "isOpen": false,
          "children": [],
          "url": "/TenderingManage"
        },
        {
          "id": "1-6",
          "title": "满标审核",
          "isOpen": false,
          "children": [],
          "url": "/TenderFullReview"
        },
        {
          "id": "1-7",
          "title": "所有借款标",
          "isOpen": false,
          "children": [],
          "url": "/TenderAll"
        }
      ],
      "url": ""
    }, {
      "id": "2",
      "title": "还款管理",
      "isOpen": false,
      "children": [{
        "id": "2-1",
        "title": "还款管理",
        "isOpen": false,
        "children": [],
        "url": "/RepaymentManagement"
      },
        {
          "id": "2-2",
          "title": "还款记录",
          "isOpen": false,
          "children": [],
          "url": "/RepaymentHistory"
        }
      ],
      "url": ""
    }, {
      "id": "6",
      "title": "系统设置",
      "isOpen": false,
      "children": [{
        "id": "6-1",
        "title": "系统设置",
        "isOpen": false,
        "children": [],
        "url": "/Config"
      }],
      "url": "/Config"
    }]
  }, {
    name: '投资运营部',
    time: '2017-10-22',
    num: 5,
    info: '负责投资，满标维护',
    men: '王小二',
    roles: [
      "满标复审", "投资激励", "进行中的标管理"
    ],
    url: [{
      "id": "1",
      "title": "借贷管理",
      "isOpen": false,
      "children": [{
        "id": "1-1",
        "title": "新增借贷",
        "isOpen": false,
        "children": [],
        "url": "/NewLoans"
      },
        {
          "id": "1-2",
          "title": "新标维护",
          "isOpen": false,
          "children": [],
          "url": "/NewStence"
        },
        {
          "id": "1-3",
          "title": "借贷审核",
          "isOpen": false,
          "children": [],
          "url": "/LoanAuid"
        },
        {
          "id": "1-4",
          "title": "新标上架",
          "isOpen": false,
          "children": [],
          "url": "/BidFrame"
        },
        {
          "id": "1-5",
          "title": "进行中标的管理",
          "isOpen": false,
          "children": [],
          "url": "/TenderingManage"
        },
        {
          "id": "1-6",
          "title": "满标审核",
          "isOpen": false,
          "children": [],
          "url": "/TenderFullReview"
        },
        {
          "id": "1-7",
          "title": "所有借款标",
          "isOpen": false,
          "children": [],
          "url": "/TenderAll"
        },
        {
          "id": "1-8",
          "title": "投资记录",
          "isOpen": false,
          "children": [],
          "url": "/InvestRecord"
        },
        {
          "id": "1-9",
          "title": "借款标类别",
          "isOpen": false,
          "children": [],
          "url": "/TenderCategory"
        }
      ],
      "url": ""
    }, {
      "id": "2",
      "title": "还款管理",
      "isOpen": false,
      "children": [{
        "id": "2-1",
        "title": "还款管理",
        "isOpen": false,
        "children": [],
        "url": "/RepaymentManagement"
      },
        {
          "id": "2-2",
          "title": "还款记录",
          "isOpen": false,
          "children": [],
          "url": "/RepaymentHistory"
        }
      ],
      "url": ""
    }, {
      "id": "3",
      "title": "资金管理",
      "isOpen": false,
      "children": [{
        "id": "3-1",
        "title": "充值记录",
        "isOpen": false,
        "children": [],
        "url": "/RechargeRecord"
      },
        {
          "id": "3-2",
          "title": "提现记录",
          "isOpen": false,
          "children": [],
          "url": "/WithdrawRecord"
        },
        {
          "id": "3-3",
          "title": "提现审核",
          "isOpen": false,
          "children": [],
          "url": "/WithdrawReview"
        },
        {
          "id": "3-4",
          "title": "用户资金",
          "isOpen": false,
          "children": [],
          "url": "/UserCapital"
        },
        {
          "id": "3-5",
          "title": "资金日志",
          "isOpen": false,
          "children": [],
          "url": "/CapitalJournal"
        },
        {
          "id": "3-6",
          "title": "平台资金",
          "isOpen": false,
          "children": [],
          "url": "/Platformfunds"
        }
      ],
      "url": ""
    }, {
      "id": "6",
      "title": "系统设置",
      "isOpen": false,
      "children": [{
        "id": "6-1",
        "title": "系统设置",
        "isOpen": false,
        "children": [],
        "url": "/Config"
      }],
      "url": "/Config"
    }]
  }, {
    name: '还款管理部',
    time: '2017-10-26',
    num: 7,
    info: '负责还款，资金管理',
    men: '哈哈哈',
    roles: [
      "还款记录", "还款管理", "提现管理", "充值管理"
    ],
    url: [{
      "id": "1",
      "title": "借贷管理",
      "isOpen": false,
      "children": [{
        "id": "1-1",
        "title": "新增借贷",
        "isOpen": false,
        "children": [],
        "url": "/NewLoans"
      },
        {
          "id": "1-2",
          "title": "新标维护",
          "isOpen": false,
          "children": [],
          "url": "/NewStence"
        },
        {
          "id": "1-3",
          "title": "借贷审核",
          "isOpen": false,
          "children": [],
          "url": "/LoanAuid"
        },
        {
          "id": "1-4",
          "title": "新标上架",
          "isOpen": false,
          "children": [],
          "url": "/BidFrame"
        },
        {
          "id": "1-5",
          "title": "进行中标的管理",
          "isOpen": false,
          "children": [],
          "url": "/TenderingManage"
        },
        {
          "id": "1-6",
          "title": "满标审核",
          "isOpen": false,
          "children": [],
          "url": "/TenderFullReview"
        },
        {
          "id": "1-7",
          "title": "所有借款标",
          "isOpen": false,
          "children": [],
          "url": "/TenderAll"
        },
        {
          "id": "1-8",
          "title": "投资记录",
          "isOpen": false,
          "children": [],
          "url": "/InvestRecord"
        },
        {
          "id": "1-9",
          "title": "借款标类别",
          "isOpen": false,
          "children": [],
          "url": "/TenderCategory"
        }
      ],
      "url": ""
    }, {
      "id": "2",
      "title": "还款管理",
      "isOpen": false,
      "children": [{
        "id": "2-1",
        "title": "还款管理",
        "isOpen": false,
        "children": [],
        "url": "/RepaymentManagement"
      },
        {
          "id": "2-2",
          "title": "还款记录",
          "isOpen": false,
          "children": [],
          "url": "/RepaymentHistory"
        }
      ],
      "url": ""
    }, {
      "id": "6",
      "title": "系统设置",
      "isOpen": false,
      "children": [{
        "id": "6-1",
        "title": "系统设置",
        "isOpen": false,
        "children": [],
        "url": "/Config"
      }],
      "url": "/Config"
    }]
  }, {
    name: '会员管理部',
    time: '2017-10-24',
    num: 7,
    info: '负责会员维护管理',
    men: '嘻嘻嘻',
    roles: [
      "新增会员", "借款会员管理", "投资会员管理"
    ],
    url: [{
      "id": "1",
      "title": "借贷管理",
      "isOpen": false,
      "children": [{
        "id": "1-1",
        "title": "新增借贷",
        "isOpen": false,
        "children": [],
        "url": "/NewLoans"
      },
        {
          "id": "1-2",
          "title": "新标维护",
          "isOpen": false,
          "children": [],
          "url": "/NewStence"
        },
        {
          "id": "1-3",
          "title": "借贷审核",
          "isOpen": false,
          "children": [],
          "url": "/LoanAuid"
        },
        {
          "id": "1-4",
          "title": "新标上架",
          "isOpen": false,
          "children": [],
          "url": "/BidFrame"
        },
        {
          "id": "1-5",
          "title": "进行中标的管理",
          "isOpen": false,
          "children": [],
          "url": "/TenderingManage"
        },
        {
          "id": "1-6",
          "title": "满标审核",
          "isOpen": false,
          "children": [],
          "url": "/TenderFullReview"
        },
        {
          "id": "1-7",
          "title": "所有借款标",
          "isOpen": false,
          "children": [],
          "url": "/TenderAll"
        },
        {
          "id": "1-8",
          "title": "投资记录",
          "isOpen": false,
          "children": [],
          "url": "/InvestRecord"
        },
        {
          "id": "1-9",
          "title": "借款标类别",
          "isOpen": false,
          "children": [],
          "url": "/TenderCategory"
        }
      ],
      "url": ""
    }, {
      "id": "4",
      "title": "会员管理",
      "isOpen": false,
      "children": [{
        "id": "4-1",
        "title": "新增用户",
        "isOpen": false,
        "children": [],
        "url": "/AddUser"
      },
        {
          "id": "4-2",
          "title": "投资用户管理",
          "isOpen": false,
          "children": [],
          "url": "/InvUser"
        },
        {
          "id": "4-2",
          "title": "借款用户管理",
          "isOpen": false,
          "children": [],
          "url": "/BorrowUserHome"
        }
      ],
      "url": ""
    }, {
      "id": "6",
      "title": "系统设置",
      "isOpen": false,
      "children": [{
        "id": "6-1",
        "title": "系统设置",
        "isOpen": false,
        "children": [],
        "url": "/Config"
      }],
      "url": "/Config"
    }]
  }, {
    name: '人事管理部',
    time: '2017-10-14',
    num: 4,
    info: '负责人事管理',
    men: '呵呵呵',
    roles: [
      "部门管理", "员工管理", "权限管理"
    ],
    url: [{
      "id": "1",
      "title": "借贷管理",
      "isOpen": false,
      "children": [{
        "id": "1-1",
        "title": "新增借贷",
        "isOpen": false,
        "children": [],
        "url": "/NewLoans"
      },
        {
          "id": "1-2",
          "title": "新标维护",
          "isOpen": false,
          "children": [],
          "url": "/NewStence"
        },
        {
          "id": "1-3",
          "title": "借贷审核",
          "isOpen": false,
          "children": [],
          "url": "/LoanAuid"
        },
        {
          "id": "1-4",
          "title": "新标上架",
          "isOpen": false,
          "children": [],
          "url": "/BidFrame"
        },
        {
          "id": "1-5",
          "title": "进行中标的管理",
          "isOpen": false,
          "children": [],
          "url": "/TenderingManage"
        },
        {
          "id": "1-6",
          "title": "满标审核",
          "isOpen": false,
          "children": [],
          "url": "/TenderFullReview"
        },
        {
          "id": "1-7",
          "title": "所有借款标",
          "isOpen": false,
          "children": [],
          "url": "/TenderAll"
        },
        {
          "id": "1-8",
          "title": "投资记录",
          "isOpen": false,
          "children": [],
          "url": "/InvestRecord"
        },
        {
          "id": "1-9",
          "title": "借款标类别",
          "isOpen": false,
          "children": [],
          "url": "/TenderCategory"
        }
      ],
      "url": ""
    }, {
      "id": "4",
      "title": "会员管理",
      "isOpen": false,
      "children": [{
        "id": "4-1",
        "title": "新增用户",
        "isOpen": false,
        "children": [],
        "url": "/AddUser"
      },
        {
          "id": "4-2",
          "title": "投资用户管理",
          "isOpen": false,
          "children": [],
          "url": "/InvUser"
        },
        {
          "id": "4-2",
          "title": "借款用户管理",
          "isOpen": false,
          "children": [],
          "url": "/BorrowUserHome"
        }
      ],
      "url": ""
    }, {
      "id": "5",
      "title": "权限管理",
      "isOpen": true,
      "children": [{
        "id": "5-1",
        "title": "部门管理",
        "isOpen": false,
        "children": [],
        "url": "/PowerMaBuMen"
      },
        {
          "id": "5-2",
          "title": "员工管理",
          "isOpen": false,
          "children": [],
          "url": "/PowerMaYuanGong"
        },
        {
          "id": "5-3",
          "title": "职位管理",
          "isOpen": false,
          "children": [],
          "url": "/PowerMaZhiWei"
        },
        {
          "id": "5-4",
          "title": "角色管理",
          "isOpen": false,
          "children": [],
          "url": "/PowerMaJueSe"
        },
        {
          "id": "5-5",
          "title": "模块管理",
          "isOpen": false,
          "children": [],
          "url": "/PowerMaMoKuai"
        },
        {
          "id": "5-6",
          "title": "功能管理",
          "isOpen": false,
          "children": [],
          "url": "/PowerMaGongNeng"
        },
        {
          "id": "5-7",
          "title": "资源管理",
          "isOpen": false,
          "children": [],
          "url": "/PowerMaZiYuan"
        }
      ],
      "url": "/"
    }, {
      "id": "6",
      "title": "系统设置",
      "isOpen": false,
      "children": [{
        "id": "6-1",
        "title": "系统设置",
        "isOpen": false,
        "children": [],
        "url": "/Config"
      }],
      "url": "/Config"
    }]
  }, {
    name: '总经理办公室',
    time: '2017-10-10',
    num: 4,
    info: '超级管理员',
    men: '嘟嘟嘟',
    roles: [
      "全部权限"
    ],
    url: [{
      "id": "1",
      "title": "借贷管理",
      "isOpen": true,
      "children": [{
        "id": "1-1",
        "title": "新增借贷",
        "isOpen": false,
        "children": [],
        "url": "/NewLoans"
      },
        {
          "id": "1-2",
          "title": "新标维护",
          "isOpen": false,
          "children": [],
          "url": "/NewStence"
        },
        {
          "id": "1-3",
          "title": "借贷审核",
          "isOpen": false,
          "children": [],
          "url": "/LoanAuid"
        },
        {
          "id": "1-4",
          "title": "新标上架",
          "isOpen": false,
          "children": [],
          "url": "/BidFrame"
        },
        {
          "id": "1-5",
          "title": "进行中标的管理",
          "isOpen": false,
          "children": [],
          "url": "/TenderingManage"
        },
        {
          "id": "1-6",
          "title": "满标审核",
          "isOpen": false,
          "children": [],
          "url": "/TenderFullReview"
        },
        {
          "id": "1-7",
          "title": "所有借款标",
          "isOpen": false,
          "children": [],
          "url": "/TenderAll"
        },
        {
          "id": "1-8",
          "title": "投资记录",
          "isOpen": false,
          "children": [],
          "url": "/InvestRecord"
        }
      ],
      "url": ""
    }, {
      "id": "2",
      "title": "还款管理",
      "isOpen": false,
      "children": [{
        "id": "2-1",
        "title": "还款管理",
        "isOpen": false,
        "children": [],
        "url": "/RepaymentManagement"
      },
        {
          "id": "2-2",
          "title": "还款记录",
          "isOpen": false,
          "children": [],
          "url": "/RepaymentHistory"
        }
      ],
      "url": ""
    }, {
      "id": "3",
      "title": "资金管理",
      "isOpen": false,
      "children": [{
        "id": "3-1",
        "title": "充值记录",
        "isOpen": false,
        "children": [],
        "url": "/RechargeRecord"
      },
        {
          "id": "3-2",
          "title": "提现记录",
          "isOpen": false,
          "children": [],
          "url": "/WithdrawRecord"
        },
        {
          "id": "3-3",
          "title": "提现审核",
          "isOpen": false,
          "children": [],
          "url": "/WithdrawReview"
        },
        {
          "id": "3-4",
          "title": "用户资金",
          "isOpen": false,
          "children": [],
          "url": "/UserCapital"
        },
        {
          "id": "3-5",
          "title": "资金日志",
          "isOpen": false,
          "children": [],
          "url": "/CapitalJournal"
        },
        {
          "id": "3-6",
          "title": "平台资金",
          "isOpen": false,
          "children": [],
          "url": "/Platformfunds"
        }
      ],
      "url": ""
    }, {
      "id": "4",
      "title": "会员管理",
      "isOpen": false,
      "children": [{
        "id": "4-1",
        "title": "新增用户",
        "isOpen": false,
        "children": [],
        "url": "/AddUser"
      },
        {
          "id": "4-2",
          "title": "投资用户管理",
          "isOpen": false,
          "children": [],
          "url": "/InvUser"
        },
        {
          "id": "4-2",
          "title": "借款用户管理",
          "isOpen": false,
          "children": [],
          "url": "/BorrowUserHome"
        }
      ],
      "url": ""
    }, {
      "id": "5",
      "title": "权限管理",
      "isOpen": false,
      "children": [{
        "id": "5-1",
        "title": "部门管理",
        "isOpen": false,
        "children": [],
        "url": "/PowerMaBuMen"
      },
        {
          "id": "5-2",
          "title": "员工管理",
          "isOpen": false,
          "children": [],
          "url": "/PowerMaYuanGong"
        },
        {
          "id": "5-3",
          "title": "职位管理",
          "isOpen": false,
          "children": [],
          "url": "/PowerMaZhiWei"
        },
        {
          "id": "5-4",
          "title": "角色管理",
          "isOpen": false,
          "children": [],
          "url": "/PowerMaJueSe"
        },
        {
          "id": "5-5",
          "title": "模块管理",
          "isOpen": false,
          "children": [],
          "url": "/PowerMaMoKuai"
        },
        {
          "id": "5-6",
          "title": "功能管理",
          "isOpen": false,
          "children": [],
          "url": "/PowerMaGongNeng"
        },
        {
          "id": "5-7",
          "title": "资源管理",
          "isOpen": false,
          "children": [],
          "url": "/PowerMaZiYuan"
        }
      ],
      "url": "/"
    }, {
      "id": "6",
      "title": "系统设置",
      "isOpen": false,
      "children": [{
        "id": "6-1",
        "title": "系统设置",
        "isOpen": false,
        "children": [],
        "url": "/Config"
      }],
      "url": "/Config"
    }]
  }]
};

module.exports = {
  yuangong,bumen
}
