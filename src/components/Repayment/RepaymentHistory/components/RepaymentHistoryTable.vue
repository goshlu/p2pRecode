<template>
  <div id="table">
    <el-table 
        
        :data="data" 
        :stripe="true"
        :border="false"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width:100%"
        :header-cell-style="{color:'#333',backgroundColor:'#e9e9eb'}">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="memberName" label="借款方"></el-table-column>
      <el-table-column prop="statusId" label="还款方式" ></el-table-column>
      <el-table-column prop="periods" label="期数"></el-table-column>
      <el-table-column prop="shouldTime" label="应还款时间" min-width="140"></el-table-column>
      <el-table-column prop="realityTime" label="实际还款时间" min-width="100"></el-table-column>
      <el-table-column prop="stayMoney" label="待还金额(￥)" min-width="100"></el-table-column>
      <el-table-column prop="realityMoney" label="实际还款金额(￥)" min-width="120"></el-table-column>
      <el-table-column prop="priecipal" label="本金(￥)"></el-table-column>
      <el-table-column prop="interest" label="利息"></el-table-column>
      <el-table-column prop="payment" label="逾期罚息(￥)" min-width="100"></el-table-column>
      <el-table-column prop="status" label="是否逾期" min-width="80"></el-table-column>
    </el-table>
  </div>
</template>

<style>

#table{
  padding: 20px 20px 0px 20px;
  width:1218px;
}
</style>

<script>
export default {
  props: ["data"]
};
</script>
