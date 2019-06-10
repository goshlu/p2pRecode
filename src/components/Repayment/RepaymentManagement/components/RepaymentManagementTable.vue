
<template>
  <div id="table">
    <el-table :data="data" 
        :stripe="true"
        :border="false"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width:100%"
        :header-cell-style="{color:'#333',backgroundColor:'#e9e9eb'}"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="member.username" label="会员用户名"></el-table-column>
      <el-table-column prop="member.status" label="会员状态"></el-table-column>
      <el-table-column prop="periods" label="还款期数"></el-table-column>
      <el-table-column prop="should" label="应还款时间" min-width="130"></el-table-column>
      <el-table-column prop="stay" label="待还金额（￥）" min-width="130"></el-table-column>
      <el-table-column prop="should" label="实际还款金额（￥）" min-width="150"></el-table-column>
      <el-table-column prop="principal" label="本金（￥）" min-width="100"></el-table-column>
      <el-table-column prop="payment" label="罚息（￥）" min-width="130"></el-table-column>
      <el-table-column prop="overdue.status" label="是否逾期"></el-table-column>
      <el-table-column label="操作" width="200" align="left">
        <template>
          <div id="opration">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button size=mini @click="alter = true" type="primary" icon="el-icon-edit">操作</el-button>
            <el-button size=mini @click="makesure = true" type="primary" icon="el-icon-edit">确认</el-button>
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
  padding: 20px 20px 0px 20px;
  width:1218px;
}
.dialog{
  width: 500px;
  position: absolute;
  left: calc(50% - 250px);
}
p{
  padding: 15px;
}
#opration el-button{
  float: left;
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
  props: ["data","loading"],
   methods: {
    handleClick(row) {
      // eslint-disable-next-line
      console.log(row);
    }
  }
};
</script>
