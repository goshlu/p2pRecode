<template>
  <div class="alertBox">
    <div class="title">新增资源</div>
    <div class="box">
      <div>
        <span>功能名称：</span>
        <div>
          <el-input v-model="value1" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div>
        <span>所属模块：</span>
        <el-select v-model="value2" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div>
        <span>描述：</span>
        <div>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
          </el-input>
        </div>
      </div>

      <div>
        <span></span>
        <div>
          <el-button type="primary" @click="addnew">确定</el-button>
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
        value1: '',
        value2: '',
        value3: '',
        // checkList: ['复选框 A','复选框 B'],
        textarea: '',
        radio:'1',
    }
  },
  props:["title","id"],
  methods: {
    cancle(){
      this.$emit("datailCancle",false);
    },
    addnew(){
      this.Axios.post("http://172.16.6.72:8080/resource/info",{
        name:"test",
        uri:"/test/test"
      }).then(
        res => {
          console.log(res.data);
          
        }
      ).catch(
        error=>{
          console.log(error);
          
        }
      )
    }
  },
  created(){
    console.log(this.id);
    
  }
}
</script>

<style lang="stylus" scope="this api replaced by slot-scope in 2.5.0+">
  @import './../../../assets/stylus/PowerMaAlert/jueSeAlert.styl';
</style>