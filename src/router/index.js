import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Content",
      redirect: "/Home",
      component: () => import("@/components/Content"),
      children: [
        {
          path: "/Home",
          name: "Home",
          component: () => import("@/components/Home/"),
        }, 
        {
          path: "/PowerMa",
          name: "PowerMa",
          redirect: "/PowerMaJueSe",
          component: () => import("@/components/PowerMa"),
          children:[
            {
              path: "/PowerMaJueSe",
              name: "PowerMaJueSe",
              component: () => import("@/components/PowerMa/powerMaJueSe/PowerMaBu"),
            }, {
              path: "/PowerMaBuMen",
              name: "PowerMaBuMen",
              component: () => import("@/components/PowerMa/PowerMaBuMen"),
            }, {
              path: "/PowerMaZhiWei",
              name: "PowerMaZhiWei",
              component: () => import("@/components/PowerMa/PowerMaZhiWei"),
            }, {
              path: "/PowerMaYuanGong",
              name: "PowerMaYuanGong",
              component: () => import("@/components/PowerMa/PowerMaYuanGong"),
            }, {
              path: "/PowerMaMoKuai",
              name: "PowerMaMoKuai",
              component: () => import("@/components/PowerMa/PowerMaMoKuai"),
            }, {
              path: "/PowerMaGongNeng",
              name: "PowerMaGongNeng",
              component: () => import("@/components/PowerMa/PowerMaGongNeng"),
            }, {
              path: "/PowerMaZiYuan",
              name: "PowerMaZiYuan",
              component: () => import("@/components/PowerMa/PowerMaZiYuan"),
            }
          ]
        },
        //新增借款页面路由
        {
          path: '/NewLoans',
          name: 'NewLoans',
          component: () => import('@/components/LoanManage/NewLoans.vue')
        },
        //新标维护页面路由
        {
          path: '/NewStence',
          name: 'NewStence',
          component: () => import('@/components/LoanManage/NewStence.vue')
        },
        //借款审核页面路由
        {
          path: '/LoanAuid',
          name: 'LoanAuid',
          redirect: '/Auid',
          component: () => import('@/components/LoanManage/LoanAuid.vue'),
          children: [{
            path: "/Auid",
            name: "Auid",
            component: () => import('@/components/LoanManage/AuidChild/Auid.vue'),

          }, {
            path: "Examine",
            name: "Examine",
              component: () => import('@/components/LoanManage/AuidChild/Examine.vue'),
          }]
        },
        //标的上架
        {
          path: '/BidFrame',
          name: 'BidFrame',
          redirect: '/BidFrameHome',
          component: () => import('@/components/LoanManage/BidFrame.vue'),
          children: [{
            path: '/BidFrameHome',
            name: 'BidFrameHome',
            component: () => import('@/components/LoanManage/MaintainChild/BidFrameHome.vue'),
          },
          {
            path: 'Maintain',
            name: 'Maintain',
            component: () => import('@/components/LoanManage/MaintainChild/Maintain.vue'),
          }
          ]
        },
        //充值记录页面路由
        {
          path: '/RechargeRecord',
          name: 'RechargeRecord',
          component: () => import('@/components/RecordMa/RechargeRecord.vue'),
        },
        //提现记录页面路由
        {
          path: '/WithdrawRecord',
          name: 'WithdrawRecord',
          component: () => import('@/components/RecordMa/WithdrawRecord.vue'),
        },
        //提现审核页面路由
        {
          path: '/WithdrawReview',
          redirect: '/Withdraw',
          component: () => import('@/components/RecordMa/Withdraw.vue'),
          children: [{
            path: '/Withdraw',
            name: 'Withdraw',
            component: () => import('@/components/RecordMa/WithdrawReview.vue'),
          },
          { // 提现审核详情子路由
            path: 'Reviewdetails',
            name: 'Reviewdetails',
            component: () => import('@/components/RecordMa/Reviewdetails.vue'),
          }
          ]
        },
        //进行中标的管理路由
        {
          path: '/TenderingManage',
          name: 'TenderingManage',
          component: () => import('@/components/LoanManage/TenderingManage.vue'),
          children: [{
            path: '/',
            name: 'TenderingManageHome',
            component: () => import('@/components/LoanManage/TenderingManageChildren/TenderingManageHome.vue')
          },
          {
            path: '/TenderingManageModify',
            name: 'TenderingManageModify',
            component: () => import('@/components/LoanManage/TenderingManageChildren/TenderingManageModify.vue')
          }

          ]
        },
        //满标复审路由
        {
          path: '/TenderFullReview',
          name: 'TenderFullReview',
          redirect: '/TenderFullReviewHome',
          component: () => import('@/components/LoanManage/TenderFullReview.vue'),
          children: [
            {
              path: '/TenderFullReviewHome',
              name: 'TenderFullReviewHome',
              component: () => import('@/components/LoanManage/TenderFullReviewChildren/TenderFullReviewHome.vue'),
            },
            {
              path: '/TenderFullReviewRedo',
              name: 'TenderFullReviewRedo',
              component: () => import('@/components/LoanManage/TenderFullReviewChildren/TenderFullReviewRedo.vue'),
            }]
        },
        //所有借款标路由
        {
          path: '/TenderAll',
          name: 'TenderAll',
          component: () => import('@/components/LoanManage/TenderAll.vue')
        },
        //投资记录路由
        {
          path: '/InvestRecord',
          name: 'InvestRecord',
          component: () => import('@/components/LoanManage/InvestRecord.vue')
        },
        //借款标分类路由
        {
          path: '/TenderCategory',
          name: 'TenderCategory',
          component: () => import('@/components/LoanManage/TenderCategory.vue'),
        },
        //引入会员管理/新增借款用户
        {
          path: '/AddUser',
          name: 'AddUser',
          component: () => import('@/components/Member/AddUser.vue'),
        },
        //引git会员管理/借款用户管理
        {
          path: '/BorrowUserHome',
          name: 'BorrowUserHome',
          redirect: '/BorrowUser',
          component: () => import('@/components/Member/BorrowUserHome.vue'),
          children: [{
            path: '/BorrowUser',
            name: 'BorrowUser',
            component: () => import('@/components/Member/BorrowUser.vue'),
          },
          {
            path: 'BorrowUserChild',
            name: 'BorrowUserChild',
            component: () => import('@/components/Member/child_member/BorrowUserChild.vue'),
          }
          ]
        },
        //引入会员管理/投资用户管理+子路由修改用户管理
        {
          path: '/InvUser',
          name: 'InvUser',
          redirect: '/InvUserChildren1',
          component: () => import('@/components/Member/InvUser.vue'),

          children: [{
            path: '/InvUserChildren1',
            name: 'InvUserChildren1',
            component: () => import('@/components/Member/InvUserChild1.vue'),
          }, {
            path: '/inv_update',
            name: 'inv_update',
            component: () => import('@/components/Member/child_member/inv_update.vue'),
          },
          {
            path: '/inv_pwd',
            name: 'inv_pwd',
            component: () => import('@/components/Member/child_member/inv_pwd.vue')
          }
          ]
        },
        //引入用户资金
        {
          path: '/UserCapital',
          name: "UserCapital",
          component: () => import('@/components/RecordMa/UserCapital.vue')
        },
        //引入资金日志
        {
          path: '/CapitalJournal',
          name: "CapitalJournal",
          component: () => import('@/components/RecordMa/CapitalJournal.vue')
        },
        //引入平台资金
        {
          path: '/Platformfunds',
          name: "Platformfunds",
          component: () => import('@/components/RecordMa/Platformfunds.vue')
        }, 
        //还款记录
        {
          path: '/RepaymentManagement',
          name: "RepaymentManagement",
          component: () => import('@/components/Repayment/RepaymentManagement')
        }, 
        //还款记录
        {
          path: '/RepaymentHistory',
          name: "RepaymentHistory",
          component: () => import('@/components/Repayment/RepaymentHistory')
        },

        //系统配置页面
        {
          path: '/Config',
          name: 'Config',
          component: () => import('@/components/config/config.vue'),
        }
      ],
    },
  ]
});

{
// [
//   {
//     "id": "1",
//     "title": "借贷管理",
//     "isOpen": false,
//     "children": [
//       {
//         "id": "1-1",
//         "title": "新增借贷",
//         "isOpen": false,
//         "children": [],
//         "url": "/NewLoans"
//       },
//       {
//         "id": "1-2",
//         "title": "新标维护",
//         "isOpen": false,
//         "children": [],
//         "url": "/NewStence"
//       },
//       {
//         "id": "1-3",
//         "title": "借贷审核",
//         "isOpen": false,
//         "children": [],
//         "url": "/LoanAuid"
//       },
//       {
//         "id": "1-4",
//         "title": "新标上架",
//         "isOpen": false,
//         "children": [],
//         "url": "/BidFrame"
//       },
//       {
//         "id": "1-5",
//         "title": "进行中标的管理",
//         "isOpen": false,
//         "children": [],
//         "url": "/TenderingManage"
//       },
//       {
//         "id": "1-6",
//         "title": "满标审核",
//         "isOpen": false,
//         "children": [],
//         "url": "/TenderFullReview"
//       },
//       {
//         "id": "1-7",
//         "title": "所有借款标",
//         "isOpen": false,
//         "children": [],
//         "url": "/TenderAll"
//       },
//       {
//         "id": "1-8",
//         "title": "投资记录",
//         "isOpen": false,
//         "children": [],
//         "url": "/InvestRecord"
//       },
//       {
//         "id": "1-9",
//         "title": "借款标类别",
//         "isOpen": false,
//         "children": [],
//         "url": "/TenderCategory"
//       }
//     ],
//     "url": ""
//   },
//   {
//     "id": "2",
//     "title": "还款管理",
//     "isOpen": false,
//     "children": [
//       {
//         "id": "2-1",
//         "title": "还款管理",
//         "isOpen": false,
//         "children": [],
//         "url": "/RepaymentManagement"
//       },
//       {
//         "id": "2-2",
//         "title": "还款记录",
//         "isOpen": false,
//         "children": [],
//         "url": "/RepaymentHistory"
//       }
//     ],
//     "url": ""
//   },
//   {
//     "id": "3",
//     "title": "资金管理",
//     "isOpen": false,
//     "children": [
//       {
//         "id": "3-1",
//         "title": "充值记录",
//         "isOpen": false,
//         "children": [],
//         "url": "/RechargeRecord"
//       },
//       {
//         "id": "3-2",
//         "title": "提现记录",
//         "isOpen": false,
//         "children": [],
//         "url": "/WithdrawRecord"
//       },
//       {
//         "id": "3-3",
//         "title": "提现审核",
//         "isOpen": false,
//         "children": [],
//         "url": "/WithdrawReview"
//       },
//       {
//         "id": "3-4",
//         "title": "用户资金",
//         "isOpen": false,
//         "children": [],
//         "url": "/UserCapital"
//       },
//       {
//         "id": "3-5",
//         "title": "资金日志",
//         "isOpen": false,
//         "children": [],
//         "url": "/CapitalJournal"
//       },
//       {
//         "id": "3-6",
//         "title": "平台资金",
//         "isOpen": false,
//         "children": [],
//         "url": "/Platformfunds"
//       }
//     ],
//     "url": ""
//   },
//   {
//     "id": "4",
//     "title": "会员管理",
//     "isOpen": false,
//     "children": [
//       {
//         "id": "4-1",
//         "title": "新增用户",
//         "isOpen": false,
//         "children": [],
//         "url": "/AddUser"
//       },
//       {
//         "id": "4-2",
//         "title": "投资用户管理",
//         "isOpen": false,
//         "children": [],
//         "url": "/InvUser"
//       },
//       {
//         "id": "4-2",
//         "title": "借款用户管理",
//         "isOpen": false,
//         "children": [],
//         "url": "/BorrowUserHome"
//       }
//     ],
//     "url": ""
//   },
//   {
//     "id": "5",
//     "title": "权限管理",
//     "isOpen": true,
//     "children": [
//       {
//         "id": "5-1",
//         "title": "部门管理",
//         "isOpen": false,
//         "children": [],
//         "url": "/PowerMaBuMen"
//       },
//       {
//         "id": "5-2",
//         "title": "员工管理",
//         "isOpen": false,
//         "children": [],
//         "url": "/PowerMaYuanGong"
//       },
//       {
//         "id": "5-3",
//         "title": "职位管理",
//         "isOpen": false,
//         "children": [],
//         "url": "/PowerMaZhiWei"
//       },
//       {
//         "id": "5-4",
//         "title": "角色管理",
//         "isOpen": false,
//         "children": [],
//         "url": "/PowerMaJueSe"
//       },
//       {
//         "id": "5-5",
//         "title": "模块管理",
//         "isOpen": false,
//         "children": [],
//         "url": "/PowerMaMoKuai"
//       },
//       {
//         "id": "5-6",
//         "title": "功能管理",
//         "isOpen": false,
//         "children": [],
//         "url": "/PowerMaGongNeng"
//       },
//       {
//         "id": "5-7",
//         "title": "资源管理",
//         "isOpen": false,
//         "children": [],
//         "url": "/PowerMaZiYuan"
//       }
//     ],
//     "url": "/"
//   },
//   {
//     "id": "6",
//     "title": "系统设置",
//     "isOpen": false,
//     "children": [
//       {
//         "id": "6-1",
//         "title": "系统设置",
//         "isOpen": false,
//         "children": [],
//         "url": "/Config"
//       }
//     ],
//     "url": "/Config"
//   }
// ]
}