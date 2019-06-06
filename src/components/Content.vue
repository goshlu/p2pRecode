<template>
  <div class="Content">
    <div class="navBox">
      <Nav></Nav>
    </div>
    <div class="ContentBox">
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

import Nav from './nav';

export default {
  name:'Content',
  components:{
    Nav
  },
  data(){
    return{}
  }  
}
</script>

<style lang="stylus">
  .navBox
    // position: fixed
    width: 100%
    // top: 0
    // left: 0
    // z-index 100
  .ContentBox
    // margin-top: 10px
    height calc(100vh - 121px)
    overflow auto
    background-color: #f2f2f2
    /* 设置滚动条的样式 */
    &::-webkit-scrollbar 
      width: 2px;

    /* 滚动槽 */
    &::-webkit-scrollbar-track 
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.6);
      border-radius: 2px;

    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb 
      border-radius: 2px;
      background: rgba(0, 0, 0, 0.1);
      -webkit-box-shadow: inset 0 0 6 pxrgba(0, 0, 0, 0.6);
    >div
      margin 10px
      background-color #fff
</style>