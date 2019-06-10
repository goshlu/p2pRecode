
<template>
  <div id="table">
    <el-table
      :data="data"
      :stripe="true"
      :border="false"
      ref="multipleTable"
      tooltip-effect="dark"
      style="width:100%"
      :header-cell-style="{color:'#333',backgroundColor:'#e9e9eb'}"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="memberName" label="借款方"></el-table-column>
      <el-table-column prop="status" label="会员状态"></el-table-column>
      <el-table-column prop="periods" label="还款期数"></el-table-column>
      <el-table-column prop="shouldTime" label="应还款时间" min-width="140"></el-table-column>
      <el-table-column prop="stay" label="待还金额（￥）" min-width="130"></el-table-column>
      <el-table-column prop="should" label="实际还款金额（￥）" min-width="150"></el-table-column>
      <el-table-column prop="principal" label="本金（￥）" min-width="100"></el-table-column>
      <el-table-column prop="payment" label="罚息（￥）" min-width="130"></el-table-column>
      <el-table-column prop="payment" label="是否逾期"></el-table-column>
      <!-- <el-table-column label="操作" width="200" align="left">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row == 2"
            @click="handleChangeStatus(scope.row, 1)"
            type="text"
            size="small">1</el-button>
          <el-button
            v-if="scope.row == 1"
            @click="handleChangeStatus(scope.row, 2)"
            type="text"
            size="small">2</el-button> -->
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        <!-- </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<style>
#table {
  padding: 20px 20px 0px 20px;
  width: 1218px;
}
.dialog {
  width: 500px;
  position: absolute;
  left: calc(50% - 250px);
}
p {
  padding: 15px;
}
.el-btn {
  color: red;
  width: 50px;
  height: 50px;
}
#opration el-button {
  float: left;
}
</style>

<script>
import { updateStatus } from "@/api/mock";

export default {
  props: ["data", "loading"],
  methods: {
    async handleChangeStatus(row, targetStatus) {
      try {
        await this.$confirm("是否平台垫付?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });

        await updateStatus(row.id, targetStatus);
        this.$emit("reload");

        this.$message({
          type: "success",
          message: "成功!"
        });
      } catch (error) {
        // ...
      }
    }
  }
};
</script>
