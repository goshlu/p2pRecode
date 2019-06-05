<template>
  <div id="details_app">
    <!-- 标题 -->
    <div class="tilte">
      <h2>提现审核详情</h2>
    </div>

    <!-- 内容 -->
    <div class="de_app_content">
      <!-- 提现信息 -->
      <div class="from1">
        <div class="title1">
          <h4>提现信息</h4>
        </div>
        <el-form ref="from1" label-width="150px">
          <el-form-item label="提现单号：">
            <span>1231231</span>
          </el-form-item>
          <el-form-item label="用户手机号码：">
            <span>13800000001</span>
          </el-form-item>
          <el-form-item label="真实姓名：">
            <span>陈一二</span>
          </el-form-item>
          <el-form-item label="用户类型：">
            <span>理财用户</span>
          </el-form-item>
          <el-form-item label="提现银行：">
            <span>招商银行</span>
          </el-form-item>
          <el-form-item label="银行账号：">
            <span>473821747823782</span>
          </el-form-item>
          <el-form-item label="提现金额：">
            <span>¥100.00</span>
          </el-form-item>
          <el-form-item label="提现手续费：">
            <span>¥2.00(2%)</span>
          </el-form-item>
          <el-form-item label="预计到账金额：">
            <span>¥98.00</span>
          </el-form-item>
          <el-form-item label="提交时间：">
            <span>2015-02-10 10:00:00</span>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>

      <!-- 用户资产 -->
      <div class="from2">
        <div class="title1">
          <h4>用户资产</h4>
        </div>
        <el-form ref="from1" label-width="150px">
          <el-form-item label="总资产：">
            <span>¥12312.00</span>
          </el-form-item>
          <el-form-item label="冻结资金：">
            <span>¥0.00</span>
          </el-form-item>
          <el-form-item label="待收利息：">
            <span>¥12.00</span>
          </el-form-item>
          <el-form-item label="可提现金额：">
            <span>¥120.00</span>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>

      <!-- 提现记录 -->
      <div class="from3">
        <div class="title1">
          <h4>最近提现记录</h4>
        </div>
        <el-form ref="from1" label-width="150px">
          <el-form-item>
            <el-table :data="tableData" :header-cell-style="{background:'#f2f2f2',color:'#606266'}">
              style="width: 100%">
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" width="180"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>

      <!-- 审核 -->
      <div class="from4">
        <div class="title1">
          <h4>审核</h4>
        </div>
        <el-form ref="form" :model="form" label-width="150px">
          <!-- 单选按钮 -->
          <el-form-item label="是否通过：">
            <el-radio-group v-model="form.resource">
              <el-radio label="通过"></el-radio>
              <el-radio label="不通过"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 备注 -->
          <el-form-item label="备注：" required style="padding-bottom: 20px;">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <!-- 分割线 -->
          <el-divider></el-divider>
          <!-- 按钮 -->
          <el-form-item style="padding-top: 20px;">
            <el-button type="primary" @click="open">提交</el-button>
            <el-button @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reviewdetails",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ],
      form: {
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    goBack() {
      this.$router.back();
    },
    open() {
      this.$confirm("是否提交审核信息？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message({
            type: "info",
            message: "提交成功"
          });
          setTimeout(() => {
            this.$router.back();
          }, 500);
        })
        .catch(action => {
          this.$message({
            type: "info",
            message:
              action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面"
          });
        });
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped>
.de_app_content {
  background-color: #fff;
}
h4 {
  margin-top: 20px;
}
#details_app >>> .title {
  height: 40px;
  background-color: #006d75;
  padding: 10px;
}
#details_app >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #fff;
}
.el-form {
  margin-top: 30px;
}
.el-form-item {
  display: inline-block;
  width: 49%;
}
.from3 .el-form-item {
  display: inline-block;
  width: 80%;
}
.de_app_content {
  padding-bottom: 70px;
}
.from4 .el-form-item {
  display: block;
  width: 80%;
}
</style>