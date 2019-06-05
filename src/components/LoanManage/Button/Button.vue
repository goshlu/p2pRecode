<template>
  <el-button :type="btnType" :class="iconClass" @click="fun">{{btnText}}</el-button>
</template>

<script>
    export default {
        name: "Button",
      props:["btnType","btnText","funName","iconClass"],
      methods:{
        fun(){
          if(this.funName != undefined){
            this.$emit(this.funName);
          }
        }
      },
      data(){
          return {

          }
      }
    }
</script>

<style scoped>
  .el-button{
    width: 120px;
    height: 45px;
  }
  .el-button:hover{
    box-shadow: 2px 2px 5px #adadad;
  }
</style>
