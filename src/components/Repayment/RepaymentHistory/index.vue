<template>
  <div>
    <Title :navArr="navArr"/>
    <!-- <h2>还款记录</h2> -->
    <RepaymentToolbar :search="search"/>
    <RepaymentTable :data="tableData" @reload="fetchData"/>
    <RepaymentPage :count="count" :search="search"
    @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"/>
  </div>
</template>

<style scope>
h2{
  color:#fff;
  background-color: #006d75;
  padding-left: 10px;
  font-size: 24px;
  line-height: 40px;
}
body{
  padding: 0px;
  margin: 0px;
}
</style>


<script>
import RepaymentTable from "./components/RepaymentHistoryTable";
import RepaymentToolbar from "./components/RepaymentHistoryToolbar";
import RepaymentPage from "../common/RepaymentPage";
import Title from './../../commonComponents/headerTitle';
import { fetchRest } from "@/api/mock";

export default {
  data() {
    return {
      search:{
        memeberName:"",
        status:"",
        page:1,
        limit:5
      },

      tableData: [],
      tableDataOrigin:[],
      navArr: ["还款管理", "还款记录"],
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
  //     handler: "fetchData"
  //   }
  // },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const { data,count } = await fetchRest();
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
      let index = (page-1)*this.search.limit;
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
};
</script>