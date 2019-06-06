<template>
  <div class="Loans">
    <div class="title">
      <h2>新增借款</h2>
    </div>
    <div class="content">
      <div class="EssentialInfo">
        <div class="EssentialTitle">
          <h4>基本信息</h4>
        </div>
        <el-form ref="form" :model="form" label-width="150px">
          <!-- *标名： -->
          <el-form-item label="*标名：">
            <el-input v-model="loan"></el-input>
          </el-form-item>
          <!-- *风险等级： -->
          <el-form-item label="*风险等级：">
            <el-select v-model="value" placeholder="请选择">
              <el-option label="极低" value="ExtremelyLow"></el-option>
              <el-option label="较低" value="Lower"></el-option>
              <el-option label="中等" value="Secondary"></el-option>
              <el-option label="中高" value="RisingFall"></el-option>
              <el-option label="高" value="High"></el-option>
            </el-select>
          </el-form-item>
          <!-- *借款方： -->
          <el-form-item label="*借款方：">
            <el-input v-model="debtor"></el-input>
          </el-form-item>
          <!-- *借款总金额： -->
          <el-form-item label="*借款总金额：">
            <el-input v-model="sum"></el-input>
          </el-form-item>
          <!-- *年利率： -->
          <el-form-item label="*年利率：">
            <el-input v-model="rate"></el-input>
          </el-form-item>
          <!-- *还款方式： -->
          <el-form-item label="*还款方式：">
            <el-select v-model="method" placeholder="请选择">
              <el-option value="Disposable" label="一次性还款"></el-option>
              <el-option value="Equal" label="等额本息"></el-option>
              <el-option value="Monthly" label="按月付息到期还本"></el-option>
              <el-option value="Repayment" label="到期还本"></el-option>
            </el-select>
          </el-form-item>
          <!-- *期限类型： -->
          <el-form-item label="*期限类型：">
            <el-radio v-model="radio" label="month">月</el-radio>
            <el-radio v-model="radio" label="day">天</el-radio>
          </el-form-item>
          <!-- **还款方式： -->
          <el-form-item label="*还款方式：">
            <el-input v-model="repayment"></el-input>
          </el-form-item>                 
          <!-- *借款起息方式： -->
          <el-form-item label="*借款起息方式：">
            <el-radio v-model="radio1" label="1">成立利息</el-radio>
          </el-form-item>
          <!-- *借款管理费月率： -->
          <el-form-item label="*借款管理费月率：">
            <el-input v-model="cost"></el-input>
          </el-form-item>
          <!-- *逾期罚息利率： -->
          <el-form-item label="*逾期罚息利率：">
            <el-input v-model="penalty"></el-input>
          </el-form-item>
          <!-- *借款类型： -->
          <el-form-item label="*借款类型：">
            <el-select v-model="Loan" placeholder="请选择">
              <el-option value="Add"  label="新增"></el-option>
              <el-option value="Continued"  label="续贷"></el-option>
              <el-option value="Handle"  label="资产处理"></el-option>
            </el-select>
          </el-form-item>
          <!-- 资金用途： -->
          <el-form-item label="资金用途：">
            <el-select v-model="capital" placeholder="请选择">
              <el-option value="Short" label="短期周转"></el-option>
              <el-option value="Business" label="生意周转"></el-option>
              <el-option value="Shopping" label="购物消费"></el-option>
              <el-option value="Long" label="长期周转"></el-option>
              <el-option value="Other" label="其他用途"></el-option>
            </el-select>
          </el-form-item>
          <!-- 还款来源： -->
          <el-form-item label="还款来源：">
            <el-input v-model="source"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <div class="GuaranteeInfo">
        <div class="GuaranteeTitle">
          <h4>担保信息</h4>
        </div>
        <el-form ref="form" :model="form" label-width="150px">
          <!-- 是否担保： -->
          <el-form-item label="是否担保：">
            <el-radio v-model="radio" label="false">否</el-radio>
            <el-radio v-model="radio" label="true">是</el-radio>
          </el-form-item>
          <!-- 担保机构： -->
          <el-form-item label="*担保机构：">
            <el-select v-model="Chanism" placeholder="请选择">
              <el-option value="1" label="上海泽润典当有限公司"></el-option>
            </el-select>
          </el-form-item>
          <!-- 抵押类型： -->
          <el-form-item label="抵押类型：">
            <el-radio v-model="radio" label="Nothing">无</el-radio>
            <el-radio v-model="radio" label="HousingLoan">房贷</el-radio>
            <el-radio v-model="radio" label="CarLoan">车贷</el-radio>
            <el-radio v-model="radio" label="Civilian">民品抵</el-radio>
          </el-form-item>
          <!-- 抵押物材料 -->
          <el-form-item label="抵押物材料：">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <div class="BorrowingInfo">
        <div class="BorrowingTitle">
          <h4>借款资料</h4>
        </div>
        <el-form ref="form" :model="form" label-width="150px">
          <!-- *上传借款资料: -->
          <el-form-item label="*上传借款资料：">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>
          </el-form-item>
        </el-form>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewLoans",
  components: {},
  data() {
    return {
      form: {},
      loan: "",
      debtor: "",
      sum:"",
      rate:"",
      repayment:"",
      cost:"",
      penalty:"",
      source:"",
      capital: "",
      Loan: "",
      method:"",
      Chanism:"",
      value: "",
      radio: "false",
      radio1: "1",
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
.Loans {
  width: 100%;
  margin: 0 auto;
}

.title {
  width: 100%;
  height: 40px;
  background-color: #006d75;
}

h2 {
  color: #fff;
  margin-left: 10px;
  line-height: 40px;
}

.content {
  background-color: #fff;
}

.from1,
.from2,
.from3 {
  padding-top: 10px;
  width: 100%;
  margin: 0 auto;
}

.EssentialTitle,
.GuaranteeTitle,
.BorrowingTitle {
  padding: 20px 0 10px 10px;
}

.el-form-item {
  display: inline-block;
  width: 49%;
}

.el-select,
.el-input {
  width: 70%;
}

select,
input {
  width: 100%;
}

/* 按钮 */
.el-row {
  width: 80%;
  margin: 0 auto;
  padding-bottom:10px;
}
</style>
