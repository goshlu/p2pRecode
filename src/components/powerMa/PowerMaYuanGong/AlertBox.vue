<template>
  <div class="alertBox">
    <div class="title">修改部门</div>
    <div class="box">
      <div>
        <span>部门名称：</span>
        <div>
          <el-input v-model="value" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div>
        <span>负责人：</span>
        <div>
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
        </div>
      </div>
      <div>
        <span>部门员工：</span>
        <div>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div>
        <span>部门描述：</span>
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
        checkList: ['复选框 A','复选框 B'],
        textarea: '',
        radio:'1',
    }
  },
  props:["title","id"],
  methods: {
    cancle(){
      this.$emit("datailCancle",false);
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