const loanManageStore = {
  state:{
    //新标维护数据列表
    dataModule1:{},
  },
  getters:{
    getDataModule1(state,data){
      return state.dataModule1
    }
  },
  mutations:{
    updateDataModule1(state,data){
      state.dataModule1 = data;
    }
  },
  actions:{
    doUpdateDataModule1(context,data){
      context.commit('updateDataModule1',data);
    }
  },
}

export default loanManageStore;
