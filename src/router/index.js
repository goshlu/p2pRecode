import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [{
    path: "/",
    name: "Content",
    redirect: "/Home",
    component: () => import("@/components/Content"),
    children: [{
        meta: {
          isLogin: true
        },
        path: "/Home",
        name: "Home",
        component: () => import("@/components/Home/"),
      },
      {
        meta: {
          isLogin: true
        },
        path: "/PowerMa",
        name: "PowerMa",
        redirect: "/PowerMaJueSe",
        component: () => import("@/components/PowerMa"),
        children: [{
              meta: {
                isLogin: true
              },
          path: "/PowerMaJueSe",
          name: "PowerMaJueSe",
          component: () => import("@/components/PowerMa/powerMaJueSe/PowerMaBu"),
        }, {
          meta: {
            isLogin: true
          },
          path: "/PowerMaBuMen",
          name: "PowerMaBuMen",
          component: () => import("@/components/PowerMa/PowerMaBuMen"),
        }, {
          meta: {
            isLogin: true
          },
          path: "/PowerMaZhiWei",
          name: "PowerMaZhiWei",
          component: () => import("@/components/PowerMa/PowerMaZhiWei"),
        }, {
          meta: {
            isLogin: true
          },
          path: "/PowerMaYuanGong",
          name: "PowerMaYuanGong",
          component: () => import("@/components/PowerMa/PowerMaYuanGong"),
        }, {
          meta: {
            isLogin: true
          },
          path: "/PowerMaMoKuai",
          name: "PowerMaMoKuai",
          component: () => import("@/components/PowerMa/PowerMaMoKuai"),
        }, {
          meta: {
            isLogin: true
          },
          path: "/PowerMaGongNeng",
          name: "PowerMaGongNeng",
          component: () => import("@/components/PowerMa/PowerMaGongNeng"),
        }, {
          meta: {
            isLogin: true
          },
          path: "/PowerMaZiYuan",
          name: "PowerMaZiYuan",
          component: () => import("@/components/PowerMa/PowerMaZiYuan"),
        }]
      },
      //新增借款页面路由
      {
        meta: {
          isLogin: true
        },
        path: '/NewLoans',
        name: 'NewLoans',
        component: () => import('@/components/LoanManage/NewLoans.vue')
      },
      //新标维护页面路由
      {
        meta: {
          isLogin: true
        },
        path: '/NewStence',
        name: 'NewStence',
        redirect: '/Stence',
        component: () => import('@/components/LoanManage/NewStence.vue'),
        children: [{
            meta: {
              isLogin: true
            },
            path: "/Stence",
            name: "Stence",
            component: () => import('@/components/LoanManage/StenceChild/Stence.vue'),
          },
          {
            meta: {
              isLogin: true
            },
            path: "Edit",
            name: "Edit",
            component: () => import('@/components/LoanManage/StenceChild/Edit.vue'),
          }
        ]
      },
      //借款审核页面路由
      {
        meta: {
          isLogin: true
        },
        path: '/LoanAuid',
        name: 'LoanAuid',
        redirect: '/Auid',
        component: () => import('@/components/LoanManage/LoanAuid.vue'),
        children: [{
          meta: {
            isLogin: true
          },
          path: "/Auid",
          name: "Auid",
          component: () => import('@/components/LoanManage/AuidChild/Auid.vue'),

        }, {
          meta: {
            isLogin: true
          },
          path: "Examine",
          name: "Examine",
          component: () => import('@/components/LoanManage/AuidChild/Examine.vue'),
        }]
      },
      //标的上架
      {
        meta: {
          isLogin: true
        },
        path: '/BidFrame',
        name: 'BidFrame',
        redirect: '/BidFrameHome',
        component: () => import('@/components/LoanManage/BidFrame.vue'),
        children: [{
            meta: {
              isLogin: true
            },
            path: '/BidFrameHome',
            name: 'BidFrameHome',
            component: () => import('@/components/LoanManage/MaintainChild/BidFrameHome.vue'),
          },
          {
            meta: {
              isLogin: true
            },
            path: 'Maintain',
            name: 'Maintain',
            component: () => import('@/components/LoanManage/MaintainChild/Maintain.vue'),
          }
        ]
      },
      //充值记录页面路由
      { // 充值路由 Recharge
        meta: {
          isLogin: true
        },
        path: '/Recharge',
        redirect: '/RechargeRecord',
        component: () => import('@/components/RecordMa/Recharge.vue'),
        children: [{ // 充值记录 RechargeRecord
            meta: {
              isLogin: true
            },
            path: '/RechargeRecord',
            name: 'RechargeRecord',
            component: () => import('@/components/RecordMa/RechargeRecord.vue'),
          },
          { // 详情子路由 Details
            meta: {
              isLogin: true
            },
            path: 'Details',
            name: 'Details',
            component: () => import('@/components/RecordMa/Details.vue'),
          }
        ]
      },
      //提现记录页面路由
      { // 提现路由 Withdraw
        meta: {
          isLogin: true
        },
        path: '/Withdraw',
        redirect: '/WithdrawRecord',
        component: () => import('@/components/RecordMa/Withdraw.vue'),
        children: [{ // 提现记录 WithdrawRecord
            meta: {
              isLogin: true
            },
            path: '/WithdrawRecord',
            name: 'WithdrawRecord',
            component: () => import('@/components/RecordMa/WithdrawRecord.vue'),
          },
          { // 详情子路由 Details
            meta: {
              isLogin: true
            },
            path: 'Details',
            name: 'Details',
            component: () => import('@/components/RecordMa/Details.vue'),
          }
        ]
      },
      //提现审核页面路由
      { // 审核路由 Review
        meta: {
          isLogin: true
        },
        path: '/Review',
        redirect: '/WithdrawReview',
        component: () => import('@/components/RecordMa/Review.vue'),
        children: [{ // 提现审核 WithdrawReview
            meta: {
              isLogin: true
            },
            path: '/WithdrawReview',
            name: 'WithdrawReview',
            component: () => import('@/components/RecordMa/WithdrawReview.vue'),
          },
          { // 提现审核详情子路由 Reviewdetails
            meta: {
              isLogin: true
            },
            path: 'Reviewdetails',
            name: 'Reviewdetails',
            component: () => import('@/components/RecordMa/Reviewdetails.vue'),
          },
          { // 详情子路由 Details
            meta: {
              isLogin: true
            },
            path: 'Details',
            name: 'Details',
            component: () => import('@/components/RecordMa/Details.vue'),
          }
        ]
      },
      //进行中标的管理路由
      {
        meta: {
          isLogin: true
        },
        path: '/TenderingManage',
        name: 'TenderingManage',
        component: () => import('@/components/LoanManage/TenderingManage.vue'),
        children: [{
            meta: {
              isLogin: true
            },
            path: '/',
            name: 'TenderingManageHome',
            component: () => import('@/components/LoanManage/TenderingManageChildren/TenderingManageHome.vue')
          },
          {
            meta: {
              isLogin: true
            },
            path: '/TenderingManageModify',
            name: 'TenderingManageModify',
            component: () => import('@/components/LoanManage/TenderingManageChildren/TenderingManageModify.vue')
          }

        ]
      },
      //满标复审路由
      {
        meta: {
          isLogin: true
        },
        path: '/TenderFullReview',
        name: 'TenderFullReview',
        redirect: '/TenderFullReviewHome',
        component: () => import('@/components/LoanManage/TenderFullReview.vue'),
        children: [{
            meta: {
              isLogin: true
            },
            path: '/TenderFullReviewHome',
            name: 'TenderFullReviewHome',
            component: () => import('@/components/LoanManage/TenderFullReviewChildren/TenderFullReviewHome.vue'),
          },
          {
            meta: {
              isLogin: true
            },
            path: '/TenderFullReviewRedo',
            name: 'TenderFullReviewRedo',
            component: () => import('@/components/LoanManage/TenderFullReviewChildren/TenderFullReviewRedo.vue'),
          }
        ]
      },
      //所有借款标路由
      {
        meta: {
          isLogin: true
        },
        path: '/TenderAll',
        name: 'TenderAll',
        component: () => import('@/components/LoanManage/TenderAll.vue')
      },
      //投资记录路由
      {
        meta: {
          isLogin: true
        },
        path: '/InvestRecord',
        name: 'InvestRecord',
        component: () => import('@/components/LoanManage/InvestRecord.vue')
      },
      //借款标分类路由
      {
        meta: {
          isLogin: true
        },
        path: '/TenderCategory',
        name: 'TenderCategory',
        component: () => import('@/components/LoanManage/TenderCategory.vue'),
      },
      //引入会员管理/新增借款用户
      {
        meta: {
          isLogin: true
        },
        path: '/AddUser',
        name: 'AddUser',
        component: () => import('@/components/Member/AddUser.vue'),
      },
      //引git会员管理/借款用户管理
      {
        meta: {
          isLogin: true
        },
        path: '/BorrowUserHome',
        name: 'BorrowUserHome',
        redirect: '/BorrowUser',
        component: () => import('@/components/Member/BorrowUserHome.vue'),
        children: [{
            meta: {
              isLogin: true
            },
            path: '/BorrowUser',
            name: 'BorrowUser',
            component: () => import('@/components/Member/BorrowUser.vue'),
          },
          {
            meta: {
              isLogin: true
            },
            path: 'BorrowUserChild',
            name: 'BorrowUserChild',
            component: () => import('@/components/Member/child_member/BorrowUserChild.vue'),
          }
        ]
      },
      //引入会员管理/投资用户管理+子路由修改用户管理
      {
        meta: {
          isLogin: true
        },
        path: '/InvUser',
        name: 'InvUser',
        redirect: '/InvUserChildren1',
        component: () => import('@/components/Member/InvUser.vue'),

        children: [{
            path: '/InvUserChildren1',
            name: 'InvUserChildren1',
            component: () => import('@/components/Member/InvUserChild1.vue'),
          }, {
            path: '/inv_update01',
            name: 'inv_update01',
            component: () => import('@/components/Member/child_member/inv_update01.vue'),
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
        meta: {
          isLogin: true
        },
        path: '/UserCapital',
        name: "UserCapital",
        component: () => import('@/components/RecordMa/UserCapital.vue')
      },
      //引入资金日志
      {
        meta: {
          isLogin: true
        },
        path: '/CapitalJournal',
        name: "CapitalJournal",
        component: () => import('@/components/RecordMa/CapitalJournal.vue')
      },
      //引入平台资金
      {
        meta: {
          isLogin: true
        },
        path: '/Platformfunds',
        name: "Platformfunds",
        component: () => import('@/components/RecordMa/Platformfunds.vue')
      },
      //还款记录
      {
        meta: {
          isLogin: true
        },
        path: '/RepaymentManagement',
        name: "RepaymentManagement",
        component: () => import('@/components/Repayment/RepaymentManagement')
      },
      //还款记录
      {
        meta: {
          isLogin: true
        },
        path: '/RepaymentHistory',
        name: "RepaymentHistory",
        component: () => import('@/components/Repayment/RepaymentHistory')
      },

      //系统配置页面
      {
        meta: {
          isLogin: true
        },
        path: '/Config',
        name: 'Config',
        component: () => import('@/components/config/config.vue'),
      },
      //消息中心
      {
        meta:{
          isLogin:true
        },
        path:"/Message",
        name:"Message",
        component: () => import('@/components/Message'),
      },
      //登录
      {
        path: "/Login",
        name: "Login",
        component: () => import('@/components/Login/Login'),
      }
    ],
  }, ]
});

router.beforeEach(
  (to, from, next) => {

    // next()
    if(false){
      next()
    }else{
      if(to.meta.isLogin){
        next({
          path: "/Login"
        });
      }else{
        next();
      }
    }

  }
)

export default router;

// {
//   [
//     {
//       "id": "1",
//       "title": "借贷管理",
//       "isOpen": false,
//       "children": [
//         {
//           "id": "1-1",
//           "title": "新增借贷",
//           "isOpen": false,
//           "children": [],
//           "url": "/NewLoans"
//         },
//         {
//           "id": "1-2",
//           "title": "新标维护",
//           "isOpen": false,
//           "children": [],
//           "url": "/NewStence"
//         },
//         {
//           "id": "1-3",
//           "title": "借贷审核",
//           "isOpen": false,
//           "children": [],
//           "url": "/LoanAuid"
//         },
//         {
//           "id": "1-4",
//           "title": "新标上架",
//           "isOpen": false,
//           "children": [],
//           "url": "/BidFrame"
//         },
//         {
//           "id": "1-5",
//           "title": "进行中标的管理",
//           "isOpen": false,
//           "children": [],
//           "url": "/TenderingManage"
//         },
//         {
//           "id": "1-6",
//           "title": "满标审核",
//           "isOpen": false,
//           "children": [],
//           "url": "/TenderFullReview"
//         },
//         {
//           "id": "1-7",
//           "title": "所有借款标",
//           "isOpen": false,
//           "children": [],
//           "url": "/TenderAll"
//         },
//         {
//           "id": "1-8",
//           "title": "投资记录",
//           "isOpen": false,
//           "children": [],
//           "url": "/InvestRecord"
//         },
//         {
//           "id": "1-9",
//           "title": "借款标类别",
//           "isOpen": false,
//           "children": [],
//           "url": "/TenderCategory"
//         }
//       ],
//       "url": ""
//     },
//     {
//       "id": "2",
//       "title": "还款管理",
//       "isOpen": false,
//       "children": [
//         {
//           "id": "2-1",
//           "title": "还款管理",
//           "isOpen": false,
//           "children": [],
//           "url": "/RepaymentManagement"
//         },
//         {
//           "id": "2-2",
//           "title": "还款记录",
//           "isOpen": false,
//           "children": [],
//           "url": "/RepaymentHistory"
//         }
//       ],
//       "url": ""
//     },
//     {
//       "id": "3",
//       "title": "资金管理",
//       "isOpen": false,
//       "children": [
//         {
//           "id": "3-1",
//           "title": "充值记录",
//           "isOpen": false,
//           "children": [],
//           "url": "/RechargeRecord"
//         },
//         {
//           "id": "3-2",
//           "title": "提现记录",
//           "isOpen": false,
//           "children": [],
//           "url": "/WithdrawRecord"
//         },
//         {
//           "id": "3-3",
//           "title": "提现审核",
//           "isOpen": false,
//           "children": [],
//           "url": "/WithdrawReview"
//         },
//         {
//           "id": "3-4",
//           "title": "用户资金",
//           "isOpen": false,
//           "children": [],
//           "url": "/UserCapital"
//         },
//         {
//           "id": "3-5",
//           "title": "资金日志",
//           "isOpen": false,
//           "children": [],
//           "url": "/CapitalJournal"
//         },
//         {
//           "id": "3-6",
//           "title": "平台资金",
//           "isOpen": false,
//           "children": [],
//           "url": "/Platformfunds"
//         }
//       ],
//       "url": ""
//     },
//     {
//       "id": "4",
//       "title": "会员管理",
//       "isOpen": false,
//       "children": [
//         {
//           "id": "4-1",
//           "title": "新增用户",
//           "isOpen": false,
//           "children": [],
//           "url": "/AddUser"
//         },
//         {
//           "id": "4-2",
//           "title": "投资用户管理",
//           "isOpen": false,
//           "children": [],
//           "url": "/InvUser"
//         },
//         {
//           "id": "4-2",
//           "title": "借款用户管理",
//           "isOpen": false,
//           "children": [],
//           "url": "/BorrowUserHome"
//         }
//       ],
//       "url": ""
//     },
//     {
//       "id": "5",
//       "title": "权限管理",
//       "isOpen": true,
//       "children": [
//         {
//           "id": "5-1",
//           "title": "部门管理",
//           "isOpen": false,
//           "children": [],
//           "url": "/PowerMaBuMen"
//         },
//         {
//           "id": "5-2",
//           "title": "员工管理",
//           "isOpen": false,
//           "children": [],
//           "url": "/PowerMaYuanGong"
//         },
//         {
//           "id": "5-3",
//           "title": "职位管理",
//           "isOpen": false,
//           "children": [],
//           "url": "/PowerMaZhiWei"
//         },
//         {
//           "id": "5-4",
//           "title": "角色管理",
//           "isOpen": false,
//           "children": [],
//           "url": "/PowerMaJueSe"
//         },
//         {
//           "id": "5-5",
//           "title": "模块管理",
//           "isOpen": false,
//           "children": [],
//           "url": "/PowerMaMoKuai"
//         },
//         {
//           "id": "5-6",
//           "title": "功能管理",
//           "isOpen": false,
//           "children": [],
//           "url": "/PowerMaGongNeng"
//         },
//         {
//           "id": "5-7",
//           "title": "资源管理",
//           "isOpen": false,
//           "children": [],
//           "url": "/PowerMaZiYuan"
//         }
//       ],
//       "url": "/"
//     },
//     {
//       "id": "6",
//       "title": "系统设置",
//       "isOpen": false,
//       "children": [
//         {
//           "id": "6-1",
//           "title": "系统设置",
//           "isOpen": false,
//           "children": [],
//           "url": "/Config"
//         }
//       ],
//       "url": "/Config"
//     }
//   ]
// }
