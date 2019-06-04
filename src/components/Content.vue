<template>
  <div class="Content">
    <Nav></Nav>
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
  .ContentBox
    margin 10px
    >div
      padding 10px
      background-color #fff
</style>