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
          redirect: "/PowerMaBu",
          component: () => import("@/components/PowerMa"),
          children:[
            {
              path: "/PowerMaBu",
              name: "PowerMaBu",
              component: () => import("@/components/PowerMa/powerMaJueSe/PowerMaBu"),
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
      ],
    },
  ]
});
