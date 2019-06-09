import Vue from 'vue';
import Vuex from 'vuex';

import nav from './modules/nav'
import loanManage from './modules/loanManage'

Vue.use(Vuex);

const store = new Vuex.Store(
  {
    modules:{
      nav,
      loanManage
    }
  }
);

export default store;
