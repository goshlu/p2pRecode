
<template>
  <div id="table">
    <el-table :data="data" :stripe="true" style="width: 100%" height="450px">
      <el-table-column fixed type="selection" width="55"></el-table-column>
      <el-table-column fixed prop="rep_state" label="借款方"></el-table-column>
      <el-table-column prop="rep_method" label="还款方式"></el-table-column>
      <el-table-column prop="num_period" label="期数"></el-table-column>
      <el-table-column prop="rep_time" label="应还款时间"></el-table-column>
      <el-table-column prop="rep_act_time" label="实际还款时间"></el-table-column>
      <el-table-column prop="rep_amt_money" label="待还金额（￥）"></el-table-column>
      <el-table-column prop="rep_act_money" label="实际还款金额（￥）"></el-table-column>
      <el-table-column prop="rep_principal" label="本金（￥）"></el-table-column>
      <el-table-column prop="rep_interest" label="利息"></el-table-column>
      <el-table-column prop="rep_late_charage" label="逾期罚息（￥）"></el-table-column>
      <el-table-column flex="right" prop="rep_isover" label="是否逾期"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120" align="left" >
        <template>
          <div id="opration">
            <el-button type="text" size=small @click="alter = true">操作还款</el-button>
            <el-button type="text" size=small @click="makesure = true">确认还款</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 定义弹出框 -->
      <el-dialog align= "center" :visible.sync="alter" class="dialog">
          <p>是否平台垫付</p>
          <br/>
          <el-button type="primary" @click="alter = false">是</el-button>
          <el-button @click="alter = false">否</el-button>
      </el-dialog>

    <!-- 定义弹出框 -->
        <el-dialog align= "center" :visible.sync="makesure" class="dialog" >
            <p>是否确认还款</p>
            <br/>
            <el-button type="primary" @click="makesure = false">确认</el-button>
            <el-button  @click="makesure = false">取消</el-button>
        </el-dialog>
  </div>
</template>

<style>
#table{
  width: 100%;
}
.dialog{
  width: 500px;
  position: absolute;
  left: calc(50% - 250px);
}
p{
  padding: 15px;
}
#opration >.el-button+.el-button {
    margin-left: 0px;
}
</style>

<script>
export default {
  data() {
     return{
      "makesure":false,
      "alter":false
    };
    },
  props: ["data"],
  methods: {
   
  }
};
</script>
