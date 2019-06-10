<template>
  <div class="alertBox">
    <div class="title">删除角色</div>
    <div class="box">
      <div class="deleteMessage">
        <span>角色将被删除，且不可恢复，确认删除？</span>
      </div>
      <div>
        <div class="deleteBtn">
          <el-button @click="deleteMe" type="primary">确定</el-button>
          <el-button @click="cancle">取消</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name:'Delet',
  data(){
    return{
    }
  },
  props:["title","id"],
  methods: {
    cancle(){
      this.$emit("datailCancle",false);
    },
    deleteMe(){
      //单个删除
      this.Axios.delete("http://172.16.6.72:8080/autority/info/").then(
          res => {
            console.log(res.data);
            
          }).catch(
          error=>{
            console.log(error);
            
      })

      //批量删除
      this.Axios.delete("http://172.16.6.72:8080/role/group").then(
          res => {
            console.log(res.data);
            
          }).catch(
          error=>{
            console.log(error);
            
      })
    }
  },
  created(){
    
  }
}
</script>

<style lang="stylus" scope="this api replaced by slot-scope in 2.5.0+">
  @import './../../../assets/stylus/PowerMaAlert/jueSeAlert.styl';
  .deleteMessage
    padding 20px 0
    display flex
    flex-flow row nowrap
    justify-content center
    span
      width 100%
      font-size 17px !important
      text-align center !important
      color #111
  .deleteBtn
    display flex
    flex-flow row nowrap
    justify-content center
</style>