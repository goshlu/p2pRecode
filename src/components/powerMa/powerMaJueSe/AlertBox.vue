<template>
  <div class="alertBox">
    <div class="title">修改角色</div>
    <div class="box">
      <div>
        <span>角色名称：</span>
        <div>
          <el-input v-model="value" placeholder="请输入内容"></el-input>
        </div>
      </div>

      <!-- <div>
        <span>所属职位：</span>
        <el-select v-model="value3" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div> -->

      <div>
        <span>角色名称：</span>
        <div class="status">
          <el-radio v-model="radio" label="1">可用</el-radio>
          <el-radio v-model="radio" label="2">不可用</el-radio>
        </div>
        
      </div>

      <div>
        <span>备注：</span>
        <div>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
          </el-input>
        </div>
      </div>

      <div>
        <span></span>
        <div>
          <el-button @click="editMe" type="primary">确定</el-button>
          <el-button @click="cancle">取消</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name:'AlertBox',
  data(){
    return{
      radio:"1",
      value:"",
      options1: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      options: [
        {
          value: '选项1',
          label: '超级管理员'
        }, {
          value: '选项2',
          label: '管理员'
        }, {
          value: '选项3',
          label: '审核专员'
        }, {
          value: '选项4',
          label: '修改专员'
        }],
        value: '',
        value2: '',
        value3: '',
        checkList: ['复选框 A','复选框 B','复选框 C'],
        textarea: '',
    }
  },
  props:["title","detail"],
  methods: {
    cancle(){
      this.$emit("datailCancle",false);
    },
    editMe(){
      this.Axios.put("http://172.16.6.72:8080/role/info",{
        
      }).then(
          res => {
            console.log(res.data);
            
          }).catch(
          error=>{
            console.log(error);
            
      })
    }
  },
  beforeCreate() {
    
  },
  created(){
    // console.log(this.id);
    this.value = this.detail.name;
    this.textarea = this.detail.description;
    this.radio = this.detail.status==="不可用"?"2":"1";
  }
}
</script>

<style lang="stylus" scope="this api replaced by slot-scope in 2.5.0+">
  @import './../../../assets/stylus/PowerMaAlert/jueSeAlert.styl';
  .status
    margin-left 5px
</style>