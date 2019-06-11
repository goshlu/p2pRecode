<template>
  <div id="MaintainWrap">
    <Title :navArr="navArr"/>
    <div class="content">
      <!-- 基本信息 -->
      <div class="EssentialInfo">
        <div class="EssentialTitle">
          <h4>基本信息</h4>
        </div>
        <el-form ref="from1" :model="from1" label-width="150px">
          <el-form-item label="标名：" required>
            <span>{{iName}}</span>
          </el-form-item>
          <el-form-item label="风险等级：" required>
            <span>{{rkId}}</span>
          </el-form-item>
          <el-form-item label="借款方：" required>
            <span>{{mId}}</span>
          </el-form-item>
          <el-form-item label="借款方名称：" required>
            <span>{{iLName}}</span>
          </el-form-item>
          <el-form-item label="借款总金额：" required>
            <span>{{sum}}元</span>
          </el-form-item>
          <el-form-item label="年利率：" required>
            <span>{{rate}}</span>
          </el-form-item>
          <el-form-item label="还款方式：" required>
            <span>{{cost}}</span>
          </el-form-item>
          <el-form-item label="借款期限：" required>
            <span>{{day}}天</span>
          </el-form-item>
          <el-form-item label="借款起息方式：" required>
            <span>成立计息</span>
          </el-form-item>
          <el-form-item label="借款管理费月率：" required>
            <span>{{monthRate}}</span>
          </el-form-item>
          <el-form-item label="逾期罚息利率：" required>
            <span>{{penalty}}</span>
          </el-form-item>
          <el-form-item label="借款类型：" required>
            <span>{{bId}}</span>
          </el-form-item>
          <el-form-item label="资金用途：">
            <span>{{uId}}</span>
          </el-form-item>
          <el-form-item label="还款来源：">
            <span>{{rsId}}</span>
          </el-form-item>
        </el-form>
      </div>
      <!-- 担保信息 -->
      <div class="GuaranteeInfo">
        <div class="GuaranteeTitle">
          <h4>担保信息</h4>
        </div>
        <el-form ref="from1" :model="from1" label-width="150px">
          <el-form-item label="是否担保：">
            <span>{{(isEnsure === 1) ? '是' : '否'}}</span>
          </el-form-item>
          <el-form-item label="担保机构：">
            <span>{{coId}}</span>
          </el-form-item>
        </el-form>
      </div>
      <!-- 审核 -->
      <div class="ToExamine">
        <div class="ToExamineTitle">
          <h4>审核</h4>
        </div>
        <el-form ref="from1" :model="from1" label-width="150px">
          <el-form-item label="是否通过：">
            <el-radio v-model="radio" label="4">通过</el-radio>
            <el-radio v-model="radio" label="3">不通过</el-radio>
          </el-form-item>
          <el-form-item label></el-form-item>
          <el-form-item label="备注：">
            <textarea
              name="notes"
              id="notes"
              cols="100"
              rows="4"
              style="resize: none;border-radius:4px;padding:10px;border: 1px solid #dcdfe6;"
            ></textarea>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <el-row>
        <el-button type="primary" @click="ToExamine">提交</el-button>
        <el-button @click="goBack">返回</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import Title from "./../../commonComponents/headerTitle";
import baseUrl from "../../../api/baseUrl";

export default {
  components: {
    Title
  },
  data() {
    return {
      from1: {},
      from2: {},
      radio: "4",
      navArr: ["借贷管理", "借款审核", "借款审核详情"]
    };
  },
  created() {
    this.iName = this.$route.query.row.iName;
    this.iLName = this.$route.query.row.iLName;
    this.rkId = this.$route.query.row.riskName;
    this.mId = this.$route.query.row.borrowName;
    this.sum = this.$route.query.row.balance;
    this.rate = this.$route.query.row.yearRateName;
    this.rtId = this.$route.query.row.rtId;
    this.cost = this.$route.query.row.refundMethod;
    this.penalty = this.$route.query.row.overtimeRateName;
    this.monthRate = this.$route.query.row.manageMonthRateName;
    this.bId = this.$route.query.row.borrowTypeName;
    this.uId = this.$route.query.row.moneyUseName;
    this.rsId = this.$route.query.row.refundSourceName;
    this.day = this.$route.query.row.deadline;
    this.way = this.$route.query.row.rId + "";
    this.type = this.$route.query.row.deadlineTypeId + "";
    this.coId = this.$route.query.row.coName;
    this.isEnsure = this.$route.query.row.isConId + "";
  },
  methods: {
    ToExamine() {
      let id = this.$route.query.row.id;
      let params = {
        status: this.radio,
        id: id
      };
      this.Axios.post(baseUrl.BASE_URL + "/auditTender", params)
        .then(res => {
          console.log(res);
          this.$message({
            message: "提交成功",
            type: "success"
          });
          // this.tableData = res.data.data;
          this.$router.push({ name: "Auid" });
          window.location.reload();
          // 总页数
          // this.paginations.total = this.tableData.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.content {
  background-color: #fff;
}
/* TopNav */

h2 {
  color: #fff;
  margin-left: 10px;
  line-height: 40px;
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
/* 表单 */
.el-form {
  width: 70%;
  margin: 0 auto;
  padding-top: 20px;
}
.el-form-item {
  display: inline-block;
  width: 48%;
  color: #222;
}
/* 基本信息 */
.EssentialTitle,
.GuaranteeTitle,
.BorrowingTitle,
.ToExamineTitle {
  padding: 20px 0 10px 280px;
  font-size: 20px;
  letter-spacing: 2px;
}
/* 备注 */
.el-textarea__inner {
  width: 223%;
  height: 140px;
}
/* 按钮 */
.el-row {
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
