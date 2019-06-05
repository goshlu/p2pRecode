<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <!-- <div class="title"><h2>招标管理</h2></div> -->
      <el-table
        :data="tableData"
        stripe
        :header-cell-style="{color:'#333',backgroundColor:'#EBEEF5'}"
        style="width: 100%"
      >
        <el-table-column fixed prop="reId" label="充值单号" width="120"></el-table-column>
        <el-table-column prop="userPhone" label="用户手机" width="120"></el-table-column>
        <el-table-column prop="userName" label="真实姓名" width="120"></el-table-column>
        <el-table-column prop="userSource" label="用户来源" width="120"></el-table-column>
        <el-table-column prop="appSource" label="应用来源" width="100"></el-table-column>
        <el-table-column prop="reAmount" label="充值金额" width="100"></el-table-column>
        <el-table-column prop="arrivalAmount" label="到账金额" width="100"></el-table-column>
        <el-table-column prop="reHandlingFee" label="手续费" width="80"></el-table-column>
        <el-table-column prop="reMode" label="充值方式" width="100"></el-table-column>
        <el-table-column prop="tradingFlowNum" label="交易流水号" width="150"></el-table-column>
        <el-table-column prop="orderTime" label="订单时间" width="160"></el-table-column>
        <el-table-column prop="arrivalTime" label="到账时间" width="160"></el-table-column>
        <el-table-column fixed="right" prop="status" label="状态" width="100"></el-table-column>
      </el-table>
      <!--分页-->
      <!--<Pagination></Pagination>-->
    </div>
  </div>
</template>

<script>
// import Pagination from './Pagination/Pagination';

export default {
  name: "Atable",
  components: {
    // Pagination
  },
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },

  data() {
    return {
      tableData: [
        {
          reId: "2017040031",
          userPhone: "13845456767",
          userName: "陈一",
          userSource: "Android注册",
          appSource: "IERFA2.0",
          reAmount: "￥1000.99",
          reHandlingFee: "￥10.99",
          arrivalAmount: "￥1000.99",
          reMode: "在线充值",
          tradingFlowNum: "1213213132132",
          orderTime: "2015-02-10 10:08:34",
          arrivalTime: "2015-02-10 11:08:34",
          status: "充值成功"
        }
      ]
    };
  }
};
</script>

<style scoped>
.wrapper {
  /* width: 80%; */
  padding-top: 30px;
  /* border: 1px solid red; */
  /* margin: 0 auto; */
}

</style>