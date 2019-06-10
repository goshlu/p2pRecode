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
        <!-- <div class="message"></div> -->
        <div class="mine">
          <span @click="getMoreBox">李大钊</span>
          <span class="el-icon-caret-bottom" @click="getMoreBox"></span>
          <div class="imgBox" @click="getMoreBox">
            <span></span>
            <img src="" alt="">
          </div>
          <div class="moreBoxBox" v-if="isShowMoreBox">
            <ul class="moreBox">
              <li @click="getMessage">消息(2)</li>
              <li>个人资料</li>
              <li>修改密码</li>
              <li>退出</li>
            </ul>
            <div class="moreBoxBg" @click="getMoreBox"></div>
          </div>
        </div>
        <div :class="!isFullScreen?'fullScreen':'outFullScreen'" @click="getFullScreen"></div>
      </li>
    </ul>
    <div class="bottom" v-if="openChildren">
      <ul class="left">
        <li :class="openChild===item.title?now:noo" v-for="(item,index) in openChildren" :key="index" @click="childClick(item.title)">
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
      isShowMoreBox:false,
      now:"now",
      noo:"",
      input:"",
      openTitle:"",
      openChild:"",
      openChildren:[],
      isFullScreen:false,
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
    },
    childClick(title){
      this.openChild=title;
    },
    getMoreBox(){
      this.isShowMoreBox = !this.isShowMoreBox;
    },
    getFullScreen(){
      if(!this.isFullScreen){
        // console.log(document.getElementById("app"));
        document.getElementById("app").requestFullscreen();
      }else{
        document.exitFullscreen();
      }
      this.isFullScreen = !this.isFullScreen
    },
    getMessage(){
      this.$router.push({
        name:"Message",
      })
    }
  },

  created(){
    this.Axios(`https://5cd808f00cc5100014f1e33e.mockapi.io/${fetchNav}`).then(
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