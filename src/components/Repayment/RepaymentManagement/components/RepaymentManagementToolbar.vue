<template>
  <!-- 搜索 -->
  <div id="search">
    <div style="padding: 10px 0px">
      <el-input placeholder="请输入借款方" v-model="search.memberName" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="fetchName"></el-button>
      </el-input>
      <el-select v-model="search.status" clearable placeholder="是否逾期">
        <el-option label="是" value="1"></el-option>
        <el-option label="否" value="2"></el-option>
      </el-select>
    </div>
    <!-- 选择状态 -->
    <div class="flex-item">
      <el-button size="small">自定义列</el-button>
      <el-button size="small">导出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["search"],
  data() {
    return {
      stateOptions: [
        {
          value: "cuikuanzhong",
          label: "催款中"
        },
        {
          value: "daihuankuan",
          label: "待还款"
        }
      ],
      value: "",
      dialogVisible: false,
      input1: "",
      input2: "",
      select: ""
    };
  },
   watch: {
      deep: true,
      immediate: true,
      handler: "searchData",
    },
  methods:{
    async searchData() {
      try {
        // const { data,count } = await fetchRecode();
        // this.tableData = data;
        // this.count = count;
        const memberName = this.search.memberName;
        const status = this.search.status;
        console.log(memberName,status);
      } catch (error) {
        // ...处理错误
        console.log(error);
    
      }
      this.loading = false;
    },
    fetchName(){

    }
  }
};
</script>

<style scope>
#search {
  display: flex;
  justify-content: space-between;
  margin: 5px 20px;
}
.el-input {
  width: 200px;
}

body {
  padding: 0px;
  margin: 0px;
}
</style>