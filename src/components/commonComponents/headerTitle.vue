<template>
  <div class="title">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :style="`${item.url?'cursor:pointer':''}`" v-for="(item,index) in navArr" :to="item.url?{path:`/${item.url}`}:''" :key="index" class="nextMenu">{{item.title?item.title:item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>


  export default {
    data(){
      return{

      }
    },
    props:[
      'navArr'
    ]
  }
</script>

<style lang="stylus" scope="this api replaced by slot-scope in 2.5.0+">
  @import './../../assets/stylus/public.styl';
  .title
    height 80px
    position relative
    div
      width calc(100% - 40px)
      height 40px
      // margin 20px 10px
      left 20px
      top 20px
      // z-index 1
      box-sizing border-box
      padding-left 10px
      position absolute
      box-sizing border-box
      background-color $cNavtopClearC
      .nextMenu
        span
          color #eee !important
      span 
        font-size 15px
        color #fff !important
        line-height 40px
        margin 0 5px
</style>
