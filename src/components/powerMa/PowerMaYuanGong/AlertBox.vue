<template>
  <div class="alertBox">
    <div class="title">修改员工信息</div>
    <div class="box">
      <div>
        <span>姓名：</span>
        <div>
          <el-input v-model="name" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div>
        <span>性别：</span>
        <div>
          <el-radio v-model="gender" label="1">男</el-radio>
          <el-radio v-model="gender" label="0">女</el-radio>
        </div>
      </div>
      <div>
        <span>所属部门：</span>
        <el-select v-model="bumen" placeholder="请选择">
          <el-option
            v-for="item in bumens"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!-- <div>
        <span>职位：</span>
        <el-select v-model="zhiwei" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div> -->

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
          <el-button type="primary">确定</el-button>
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
      bumens: [{
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
        name: '',
        bumen: '',
        zhiwei: '',
        textarea: '',
        gender:'1',
    }
  },
  props:["title","id"],
  methods: {
    cancle(){
      this.$emit("datailCancle",false);
    }
  },
  created(){
    // console.log(this.id);
  }
}
</script>

<style lang="stylus" scope="this api replaced by slot-scope in 2.5.0+">
  @import './../../../assets/stylus/PowerMaAlert/jueSeAlert.styl';
</style>