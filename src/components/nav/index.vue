<template>
  <div class="Nav">
    <ul class="top">
      <li class="left">
        <p v-for="(item,index) in getNavData" :key="index" :class="openTitle===item.title?now:noo" @click="menuClick(index)">{{item.title}}</p>
        <!-- <p>借贷管理</p>
        <p>还款管理</p>
        <p>资金管理</p>
        <p>会员管理</p>
        <p class="now">权限管理</p>
        <p>系统配置</p> -->
      </li>
      <li class="right">

      </li>
    </ul>
    <div class="bottom" v-if="openChildren">
      <ul class="left">
        <li v-for="(item,index) in openChildren" :key="index">
          <router-link :to="item.url">{{item.title}}</router-link>
        </li>
        <!-- <li class="now">角色管理</li>
        <li>|</li>
        <li>模块管理</li>
        <li>|</li>
        <li>用户管理</li> -->
      </ul>
      <ul class="right">
        <div class="searchIput">
          <input type="text" v-model="input" placeholder="全局板块搜索">
          <span class="el-icon-search"></span>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>

import { fetchNav } from "./../../api";
import { mapState,mapGetters,mapMutations,mapActions } from "vuex";

export default {

  name:"Nav",
  
  components:{},

  data(){
    return{
      now:"now",
      noo:"",
      input:"",
      openTitle:"",
      openChildren:[]
    }
  },

  computed:{
    // this.navData = [],
    ...mapGetters(['getNavData']),
  },

  methods:{
    ...mapActions(['doUpdateNavData','doUpdateNavIsopenTrue']),
    menuClick(index){
      // console.log(index);
      this.doUpdateNavIsopenTrue(index);
      this.getNavData.forEach(element => {
          if(element.isOpen){
            // return element.children;
            this.openChildren=element.children;
            this.openTitle=element.title;
          }
        });
    }
  },

  created(){
    this.axios(fetchNav).then(
      res => {
        // console.log(res.data);
        this.doUpdateNavData(res.data);
        this.getNavData.forEach(element => {
          if(element.isOpen){
            // return element.children;
            this.openChildren=element.children;
            this.openTitle=element.title;
          }
        });
      }
    ).catch(
      error => {
        // console.log(error);
      }
    );
  },

}
</script>

<style lang="stylus" scope>
  @import "./../../assets/stylus/nav.styl";
</style>