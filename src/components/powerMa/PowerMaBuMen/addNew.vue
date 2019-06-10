<template>
  <div class="alertBox">
    <div class="title">新增部门</div>
    <div class="box">
      <div>
        <span>部门名称：</span>
        <div>
          <el-input v-model="value1" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div>
        <span>负责人：</span>
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
        <span>部门描述：</span>
        <div>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
          </el-input>
        </div>
      </div>
      <div>
        <span>部门员工：</span>
        <div class="yuangongItem">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            type="info"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">添加员工</el-button>
        </div>
      </div>
      
      <div>
        <span></span>
        <div>
          <el-button @click="addMe" type="primary">确定</el-button>
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
      options1: [
      {
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
      }
      ],
      options: [
        {
          value: '选项1',
          label: '超级管理员'
        }, {
          value: '',
          label: '管理员'
        }, {
          value: '选项3',
          label: '审核专员'
        }, {
          value: '选项4',
          label: '修改专员'
        }],
        dynamicTags: ['标签一', '标签二', '标签三','标签四','标签五',],
        value1: '',
        value2:'',
        textarea: '',
        inputVisible: false,
        inputValue: '',
    }
  },
  props:["title","id"],
  methods: {
    cancle(){
      this.$emit("datailCancle",false);
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    addMe(){
    //新增
      this.Axios.post("http://172.16.6.72:8080/role/group",{

      }).then(
          res => {
            console.log(res.data);
            
          }).catch(
          error=>{
            console.log(error);
            
      })
    }
  },
  created(){
    console.log(this.id);
    
  }
}
</script>

<style lang="stylus" scope="this api replaced by slot-scope in 2.5.0+">
  @import './../../../assets/stylus/PowerMaAlert/jueSeAlert.styl';
  .yuangongItem
    >span 
      margin 0 13px 10px 0
      &:nth-of-type(4n)
        margin-right 0;
  .button-new-tag
    span 
      margin 0
</style>