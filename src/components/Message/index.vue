<template>
  <div class="Message">
    <div class="ContentBoxBox">
      <Title :navArr="navArr"/>

    </div>

  </div>
</template>

<script>
  import Title from './../commonComponents/headerTitle';
  export default {
    name:'Message',
    components:{
      Title
    },
    data(){
      return{
        navArr:[{
          title:"消息中心",
          url:"Message"
        }]
      }
    },
    methods:{
    }
  }
</script>

<style lang="stylus">

</style>

