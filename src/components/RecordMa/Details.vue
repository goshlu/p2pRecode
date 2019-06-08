<template>
  <div id="details_app">
    <!-- 标题 -->
    <Title :navArr="this.$route.params.navArr"/>
    <!-- 内容 -->
    <div class="app_content">
      <!-- 详细信息 -->
      <div class="from1">
        <div class="basicInfo">
          <h4>提现信息</h4>
        </div>
        <el-form ref="from1" label-width="150px">
          <el-form-item label="提现单号：">
            <span>{{formData.id}}</span>
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
      <!-- 按钮 -->
      <el-row>
        <el-button type="primary" @click="open">确定</el-button>
        <el-button @click="goBack">返回</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import Title from "./../commonComponents/headerTitle";

export default {
  name: "Details",
  components: {
    Title
  },
  props: ["navArr"],
  data() {
    return {
      formData: "",
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
      // navArr: ["资金管理", "提现审核", "详情"]
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
  },
  created() {
    let formData = this.$route.params.formArr;
    console.log(typeof formData);
    console.log(formData);
  }
};
</script>

<style scoped>
.app_content {
  background-color: #fff;
}
span {
  display: inline-block;
  width: 70%;
  height: 40px;
  border-radius: 4px;
  padding: 0 15px;
  color: #888;
  border: 1px solid #dcdfe6;
}
#details_app >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #fff;
}
.el-form {
  width: 70%;
  margin: 0 auto;
  padding-top: 20px;
}
.el-form-item {
  display: inline-block;
  width: 48%;
  color: #222;
  /* width: 49%; */
}
.basicInfo,
.userAssets,
.withdrawalsRecord,
.review {
  padding: 20px 0 10px 280px;
  font-size: 20px;
  letter-spacing: 2px;
}
.el-row {
  text-align: right;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-right: 360px;
}
.from3 .el-form-item {
  display: inline-block;
  width: 80%;
}
.from4 .el-form-item {
  display: block;
  width: 48%;
}
</style>