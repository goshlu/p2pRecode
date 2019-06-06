<template>
  <div id="table">
    <el-table :data="data" :stripe="true" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="rep_state" label="借款方"></el-table-column>
      <el-table-column prop="rep_method" label="还款方式"></el-table-column>
      <el-table-column prop="num_period" label="期数"></el-table-column>
      <el-table-column prop="rep_time" label="应还款时间" min-width="130"></el-table-column>
      <el-table-column prop="rep_act_time" label="实际还款时间" min-width="130"></el-table-column>
      <el-table-column prop="rep_amt_money" label="待还金额（￥）" min-width="130"></el-table-column>
      <el-table-column prop="rep_act_money" label="实际还款金额（￥）" min-width="150"></el-table-column>
      <el-table-column prop="rep_principal" label="本金（￥）"></el-table-column>
      <el-table-column prop="rep_interest" label="利息"></el-table-column>
      <el-table-column prop="rep_late_charage" label="逾期罚息（￥）" min-width="130"></el-table-column>
      <el-table-column prop="rep_isover" label="是否逾期"></el-table-column>
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
    return{

    };
  },
  props: ["data"],
  methods: {
  
  }
  
};
</script>
