<template>
  <div>
    <Title :navArr="navArr"/>
    <RepaymentToolbar :search="search"/>
    <RepaymentTable :data="tableData" :loading="loading"/>
    <RepaymentPage :count="count" :search="search"/>
  </div>
</template>
<script>
import RepaymentTable from "./components/RepaymentManagementTable";
import RepaymentToolbar from "./components/RepaymentManagementToolbar";
import RepaymentPage from "../common/RepaymentPage";
import Title from './../../commonComponents/headerTitle';
import { fetchRecode } from "@/api";

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
      navArr: ["还款管理", "还款管理"],
      count:0,
    };
  },
  watch: {
    search: {
      deep: true,
      immediate: true,
      handler: "fetchData",
    }//获取数据
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const { data,count } = await fetchRecode();
        this.tableData = data;
      } catch (error) {
        // ...处理错误
        console.log(error);
    
      }
      this.loading = false;
    }
  },
  // created(){
  //   this.Axios.get("http://rap2api.taobao.org/app/mock/177576/rest").then(
  //     res => {
  //       this.tableData = res.data.datas;
  //       console.log(res);
        
  //     }
  //   ).catch(
  //     error => {
  //       console.log(error);
        
  //     }
  //   );
  // },
  components: {
    RepaymentTable,
    RepaymentToolbar,
    RepaymentPage,
    Title
  }
};
</script>

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