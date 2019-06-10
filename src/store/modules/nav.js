const navStore = {
  state:{
    navData: sessionStorage.getItem("menu") ? JSON.parse(sessionStorage.getItem("menu")) : [],
    openChildren:[],
  },
  getters:{
    getNavData(state){
      return state.navData
    },
    getOpenChildren(state){
      return state.openChildren;
    }
  },
  mutations:{
    updateNavData(state,data){
      state.navData = data;
    },
    updateOpenChildren(state, data) {
      state.openChildren = data;
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
    doUpdateOpenChildren(context, data) {
      context.commit('updateOpenChildren', data);
    },
    doUpdateNavIsopenTrue(context, index){
      context.commit('updateNavIsopenTrue', index);
    }
  },
}

export default navStore;