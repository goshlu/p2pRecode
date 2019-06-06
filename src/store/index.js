import Vue from 'vue';
import Vuex from 'vuex';

import nav from './modules/nav'

Vue.use(Vuex);

const store = new Vuex.Store(
  {
    modules:{
      nav,
    }
  }
);

export default store;