<template>
  <div>
    <h2>还款管理</h2>
    <RepaymentToolbar />
    <RepaymentTable :data="tableData"/>
    <RepaymentPage />
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
import RepaymentTable from "./components/RepaymentManagementTable";
import RepaymentToolbar from "./components/RepaymentManagementToolbar";
import RepaymentPage from "./components/RepaymentManagementPage";
import { fetchRest } from "@/api";

export default {
  data() {
    return {
      tableData: []
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
    async fetchData() {
      this.loading = true;
      try {
        const { data } = await fetchRest();
        this.tableData = data;
      } catch (error) {
        // ...处理错误
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
    RepaymentPage
  }
};
</script>