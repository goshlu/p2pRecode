<template>
  <div id="table">
    <el-table :data="data" border :stripe="true" style="width: 100%" height="450px" align="center">
      <el-table-column fixed type="selection" width="55"></el-table-column>
      <el-table-column fixed prop="per_name" label="借款方"></el-table-column>
      <el-table-column prop="per_phone" label="借款电话"></el-table-column>
      <el-table-column prop="tender_name" label="标名"></el-table-column>
      <el-table-column prop="lend_money" label="借款金额（￥）"></el-table-column>
      <el-table-column prop="per_" label="期限"></el-table-column>
      <el-table-column prop="rep_methoed" label="还款方式"></el-table-column>
      <el-table-column prop="num_period" label="期数"></el-table-column>
      <el-table-column prop="rep_time" label="应还款时间"></el-table-column>
      <el-table-column prop="rep_act_time" label="实际还款时间"></el-table-column>
      <el-table-column prop="pre_rep_money" label="预还款金额（￥）"></el-table-column>
      <el-table-column prop="rep_amt_money" label="待还金额（￥）"></el-table-column>
      <el-table-column prop="rep_act_money" label="实际还款金额（￥）"></el-table-column>
      <el-table-column prop="rep_principal" label="本金（￥）"></el-table-column>
      <el-table-column prop="rep_interest" label="利息"></el-table-column>
      <el-table-column prop="rep_late_charage" label="逾期罚息（￥）"></el-table-column>
      <el-table-column flex="right" prop="rep_isover" label="是否逾期"></el-table-column>
    </el-table>
  </div>
</template>

<style>
#table{
  width: 100%;
  padding: 0px;
  margin: 0px;
}
</style>

<script>
export default {
  data(){
    
  },
  props: ["data"],
  methods: {
  
  }
};
</script>
