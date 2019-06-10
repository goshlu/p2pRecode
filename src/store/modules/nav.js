const navStore = {
  state:{
    navData: sessionStorage.getItem("menu") ? sessionStorage.getItem("menu"):[],
  },
  getters:{
    getNavData(state){
      return state.navData
    }
  },
  mutations:{
    updateNavData(state,data){
      state.navData = data;
    },
    updateNavIsopenTrue(state, index){
      state.navData.forEach((element,i) => {
        if(i===index){
          element.open = 1;
        }else{
          element.open = 0;
        }
      });
      // state.navData[index].isOpen=true;
    }
  },
  actions:{
    doUpdateNavData(context,data){
      context.commit('updateNavData',data);
    },
    doUpdateNavIsopenTrue(context, index){
      context.commit('updateNavIsopenTrue', index);
    }
  },
}

export default navStore;