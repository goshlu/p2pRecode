<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <div class="title">
        <h2>标的上架</h2>
      </div>
      <!-- search -->
      <div class="searchWrap">
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="借款方" value="1"></el-option>
              <el-option label="借款方手机" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
      <!-- table -->
      <el-table
        :data="getLoansList"
        stripe
        border
        :header-cell-style="{color:'#333',backgroundColor:'#EBEEF5'}"
        style="width: 100%"
      >
        <el-table-column fixed prop="loan_id" label="编号" width="120"></el-table-column>
        <el-table-column prop="loan_use" label="借款方" width="120"></el-table-column>
        <el-table-column prop="phone" label="借款人手机" width="120"></el-table-column>
        <el-table-column prop="Name" label="标名" width="120"></el-table-column>
        <el-table-column prop="address" label="担保机构" width="120"></el-table-column>
        <el-table-column prop="zip" label="类型" width="120"></el-table-column>
        <el-table-column prop="loan_money" label="借款金额" width="120"></el-table-column>
        <el-table-column prop="loan_money_rate" label="年化利率" width="120"></el-table-column>
        <el-table-column prop="payments_mode" label="还款方式" width="120"></el-table-column>
        <el-table-column prop="loan_deadline" label="期限" width="120"></el-table-column>
        <el-table-column prop="loan_date" label="审核时间" width="180"></el-table-column>
        <el-table-column prop="state" label="状态" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template>
            <el-button type="text" align="center" size="small">
              <router-link :to="{name:'Maintain'}">上架</router-link>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination></Pagination>
      <!--分页-->
    </div>

  </div>
</template>

<script>

import Pagination from '../Child/Pagination'

export default {
  name: "BidFrame",
  components: {
    Pagination
  },
  data() {
    return {
      input5: "",
      select: "",
      getLoansList: [
        {
          loan_id: 201709091123,
          loan_use: "企业1号",
          phone: "13800009999",
          Name: "新手1号",
          address: "上海泽润典当",
          zip: "续贷",
          loan_money: "¥20000",
          loan_money_rate: "11.5%",
          payments_mode: "按月付息",
          loan_deadline: "5天",
          loan_date: "2017-01-01 12:23:33",
          state: "待上架"
        }
      ]
    };
  }
};
</script>

<style scoped>
/* table */
.wrapper {
  width: 100%;
  margin: 0 auto;
}
.wrapper-content {
  width: 100%;
  margin: 0 auto;
}
.el-table{
  margin-top: 20px;
}
.title{
  width: 100%;
  height: 40px;
  background-color: #006d75;
  padding: 10px;
}
h2{
  color: #fff;
  line-height: 40px;
  margin-left:10px;
}
.searchWrap {
  display: flex;
}
.searchWrap > div {
  flex-basis: 30%;
}
.searchWrap >>> .el-select .el-input {
  width: 130px;
}
.searchWrap >>> .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>