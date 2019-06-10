<template>
  <div>
    <Title :navArr="navArr"/>
    <RepaymentToolbar :search="search"/>
    <RepaymentTable :data="tableData" :loading="loading" @reload="fetchData"/>
    <RepaymentPage :count="count" :search="search" 
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"/>
  </div>
</template>
<script>
import RepaymentTable from "./components/RepaymentManagementTable";
import RepaymentToolbar from "./components/RepaymentManagementToolbar";
import RepaymentPage from "../common/RepaymentPage";
import Title from './../../commonComponents/headerTitle';
import { fetchRecode } from "@/api/mock";

export default {
  data() {
    return {
      search:{
        memberName:"",
        status:"",
        page:1,
        limit:5
      },
      tableData: [],
      tableDataOrigin:[],
      navArr: ["还款管理", "还款管理"],
      count:0,
    };
  },
  created(){
    this.fetchData();
  },
  // watch: {
  //   search: {
  //     deep: true,
  //     immediate: true,
  //     handler: "fetchData",
  //   }//获取数据
  // },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const { data,count } = await fetchRecode();
        this.tableDataOrigin = data;
        this.count = count;
        let loopCount = 0;
        for(let i=0; i<count;i++){
          if(loopCount == 5){
            break;
          }
          this.tableData.push(this.tableDataOrigin[i]);
          loopCount++;
        }
      } catch (error) {
        // ...处理错误
        console.log(error);
      }
      this.loading = false;
    },
    handleCurrentChange(page) {
      this.tableData = [];
      // 当前页
      this.search.page = page;
      let index = 5*(page-1)*this.search.limit;
      let loopCount = 0;
      for(let i=index; i<this.count;i++){
          if(loopCount == this.search.limit){
            break;
          }
          this.tableData.push(this.tableDataOrigin[i]);
          loopCount++;
        }
    },
    handleSizeChange(limit) {
      this.tableData = [];
      // 切换size
      let page = this.search.page = 1;
      this.search.limit = limit;
      // 当前页1
      for(let i=0; i<limit;i++){
          this.tableData.push(this.tableDataOrigin[i]);
      }
    },
  },
  components: {
    RepaymentTable,
    RepaymentToolbar,
    RepaymentPage,
    Title
  }
}
</script>

<style scope>
h2 {
  color: #fff;
  background-color: #006d75;
  padding-left: 10px;
  font-size: 24px;
  line-height: 40px;
}
body {
  padding: 0px;
  margin: 0px;
}
</style>