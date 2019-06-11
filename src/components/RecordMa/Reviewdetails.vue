<template>
  <div id="details_app">
    <!-- 标题 -->
    <Title :navArr="navArr"/>
    <!-- 内容 -->
    <div class="app_content">
      <!-- 提现信息 -->
      <div class="from1">
        <div class="basicInfo">
          <h4>提现信息</h4>
        </div>
        <!-- 
               <el-table-column prop="payNumber" label="提现单号" width="145px"></el-table-column>
            <el-table-column prop="pePhone" label="用户手机" ></el-table-column>
            <el-table-column prop="username" label="真实姓名"></el-table-column>
            <el-table-column prop="orMoney" label="提现金额"></el-table-column>
         -->
        <el-form ref="from1" label-width="150px">
          <el-form-item label="提现单号：">
            <span>{{formData.payNumber}}</span>
          </el-form-item>
          <el-form-item label="用户手机号码：">
            <span>{{formData.pePhone}}</span>
          </el-form-item>
          <el-form-item label="真实姓名：">
            <span>{{formData.username}}</span>
          </el-form-item>
          <el-form-item label="用户类型：">
            <span>{{formData.pePhone}}</span>
          </el-form-item>
          <el-form-item label="提现银行：">
            <span>招商银行</span>
          </el-form-item>
          <el-form-item label="银行账号：">
            <span>473821747823782</span>
          </el-form-item>
          <el-form-item label="提现金额：">
            <span>¥{{formData.orMoney}}</span>
          </el-form-item>
          <el-form-item label="提现手续费：">
            <span>¥2.00(2%)</span>
          </el-form-item>
          <!-- <el-form-item label="预计到账金额：">
            <span>¥98.00</span>
          </el-form-item> -->
          <!-- <el-form-item label="提交时间：">
            <span>2015-02-10 10:00:00</span>
          </el-form-item> -->
        </el-form>
      </div>

      <!-- 用户资产 -->
      <div class="from2">
        <div class="userAssets">
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

      <!-- 审核 -->
      <div class="from4">
        <div class="review">
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
          <!-- <el-form-item label="备注：" required style="padding-bottom: 20px;">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item> -->
          <el-form-item label="备注：" required>
            <textarea name="notes" id="notes" cols="95" rows="4" style="resize: none;border-radius:4px;padding:10px;border: 1px solid #dcdfe6;"></textarea>
          </el-form-item>

          <!-- 分割线 -->
        </el-form>
        <el-divider></el-divider>
        <!-- 按钮 -->
        <el-row>
          <el-button type="primary" @click="open">提交</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "./../commonComponents/headerTitle";

export default {
  name: "Reviewdetails",
  components: {
    Title
  },
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
      },
      navArr: ["资金管理", "提现审核", "提现审核详情"]
    };
  },
  methods: {
    // 修改 (pageSize, currentPage)
    edit() {},
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
          var val = this.form.resource === "通过"?1:2;
          console.log("orid");
          console.log(this.formData.orid);
          console.log(val);
          // "http://172.16.6.60:8080/order/audit?id="+val+"&aId="+val, 
          this.Axios.put("http://172.16.6.72:8080/order/audit?id="+`${this.formData.orid}&aId=${val}`,{
            header:{
              ['Content-Type'] : 'application/x-www-form-urlencoded'
            }
          })
            .then(res => {
              console.log(res);
              console.log("object");
            })
            .catch(err => {
              console.log(err);
              console.log("err");
            });
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
    // let formData = this.$route.params.formArr;
    this.formData = {
      ...this.$route.params.formArr
    };
    
  
    console.log("this.formData");
    console.log(typeof this.formData);
    console.log(this.formData);
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
  /* width: 739px; */
}
</style>