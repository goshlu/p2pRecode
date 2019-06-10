<template>
  <div>
    <Title :navArr="navArr"/>
    <!-- <h2>还款记录</h2> -->
    <RepaymentToolbar @searchChange="DataChange" :search="search"/>
    <RepaymentTable :data="tableData" :loading="loading"/>
    <RepaymentPage :count="count" :search="search"/>
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
import { fetchRest } from "@/api";

export default {
  data() {
    return {
      search:{
        name:"",
        status:"",
        page:1,
        limit:5
      },
      loading:false,
      tableData: [],
      navArr: ["还款管理", "还款记录"],
      count:0,
    };
  },
  watch: {
    search: {
      deep: true,
      immediate: true,
      handler: "fetchData"
    }
  },
  methods: {
    DataChange(data){
      console.log(data);
    },
    async fetchData() {
      this.loading = true;
      try {
        const { data,count } = await fetchRest();
        this.tableData = data;//获取到的数据 count
      } catch (error) {
        // ...处理错误
        console.log(error);
      }
      this.loading = false;
    }
  },
  components: {
    RepaymentTable,
    RepaymentToolbar,
    RepaymentPage,
    Title
  }
};
</script>