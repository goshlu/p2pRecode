<template>
  <div class="Nav">
    <ul class="top">
      <li class="left">
        <p>借贷管理</p>
        <p>还款管理</p>
        <p>资金管理</p>
        <p>会员管理</p>
        <p class="now">权限管理</p>
        <p>系统配置</p>
      </li>
      <li class="right">

      </li>
    </ul>
    <div class="bottom">
      <ul class="left">
        <li class="now">角色管理</li>
        <li>|</li>
        <li>模块管理</li>
        <li>|</li>
        <li>用户管理</li>
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

export default {

  name:"Nav",
  
  components:{},

  data(){
    return{
      input:"",
      navData:[]
    }
  },

  created(){
    this.axios(fetchNav).then(
      res => {
        // console.log(res);
        this.navData=res.data
      }
    ).catch();
  },

}
</script>

<style lang="stylus" scope>
  @import "./../../assets/stylus/nav.styl";
</style>