<template>
  <div class="Loans">
    <!-- <div class="title">
      <h2>新增借款</h2>
    </div> -->
    <Title :navArr="navArr"/>
    <div class="content">
      <div class="EssentialInfo">
        <div class="EssentialTitle">
          <h4>基本信息</h4>
        </div>
        <el-form ref="form" :model="form" label-width="150px">
          <!-- *标名： -->
          <el-form-item required label="标名：">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <!-- *风险等级： -->
          <el-form-item required label="风险等级：">
            <el-select v-model="rkId" placeholder="请选择">
              <el-option label="极低" value="1"></el-option>
              <el-option label="较低" value="2"></el-option>
              <el-option label="中等" value="3"></el-option>
              <el-option label="中高" value="4"></el-option>
              <el-option label="高" value="5"></el-option>
            </el-select>
          </el-form-item>
          <!-- *借款方： -->
          <el-form-item required label="借款方：">
            <el-input v-model="debtor"></el-input>
          </el-form-item>
          <!-- *借款总金额： -->
          <el-form-item required label="借款总金额：">
            <el-input v-model="sum"></el-input>
          </el-form-item>
          <!-- *年利率： -->
          <el-form-item required label="年利率：">
            <el-input v-model="rate"></el-input>
          </el-form-item>
          <!-- *还款方式： -->
          <el-form-item required label="还款方式：">
            <el-select v-model="method" placeholder="请选择">
              <el-option value="Disposable" label="一次性还款"></el-option>
              <el-option value="Equal" label="等额本息"></el-option>
              <el-option value="Monthly" label="按月付息到期还本"></el-option>
              <el-option value="Repayment" label="到期还本"></el-option>
            </el-select>
          </el-form-item>

          <!-- *借款管理费月率： -->
          <el-form-item required label="借款管理费月率：">
            <el-input v-model="cost"></el-input>
          </el-form-item>
          <!-- *逾期罚息利率： -->
          <el-form-item required label="逾期罚息利率：">
            <el-input v-model="penalty"></el-input>
          </el-form-item>
          <!-- *借款类型： -->
          <el-form-item required label="借款类型：">
            <el-select v-model="LoanType" placeholder="请选择">
              <el-option value="1" label="新增"></el-option>
              <el-option value="2" label="续贷"></el-option>
              <el-option value="3" label="资产处理"></el-option>
            </el-select>
          </el-form-item>
          <!-- 资金用途： -->
          <el-form-item label="资金用途：">
            <el-select v-model="capital" placeholder="请选择">
              <el-option value="1" label="短期周转"></el-option>
              <el-option value="2" label="生意周转"></el-option>
              <el-option value="3" label="购物消费"></el-option>
              <el-option value="4" label="长期周转"></el-option>
              <el-option value="5" label="其他用途"></el-option>
            </el-select>
          </el-form-item>
          <!-- 还款来源： -->
          <el-form-item label="还款来源：">
            <el-input v-model="source"></el-input>
          </el-form-item>
          <!-- **还款方式： -->
          <el-form-item required label="借款天数：">
            <el-input v-model="day"></el-input>
          </el-form-item>
          <!-- *借款起息方式： -->
          <el-form-item required label="借款起息方式：">
            <el-radio v-model="way" label="0">成立利息</el-radio>
          </el-form-item>
          <!-- *期限类型： -->
          <el-form-item required label="期限类型：">
            <el-radio v-model="type" label="0">月</el-radio>
            <el-radio v-model="type" label="1">天</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <div class="GuaranteeInfo">
        <div class="GuaranteeTitle">
          <h4>担保信息</h4>
        </div>
        <el-form ref="form" :model="form" label-width="150px">
          <!-- 担保机构： -->
          <el-form-item required label="担保机构：">
            <el-select v-model="Chanism" placeholder="请选择">
              <el-option value="0" label="上海泽润典当有限公司"></el-option>
            </el-select>
          </el-form-item>
          <!-- 是否担保： -->
          <el-form-item label="是否担保：">
            <el-radio v-model="isEnsure" label="0">否</el-radio>
            <el-radio v-model="isEnsure" label="1">是</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <div class="CheakBtn">
        <el-row>
          <el-button type="primary" @click="handleUpdate">提交审核</el-button>
          <el-button>保存</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "./../../commonComponents/headerTitle"
import baseUrl from "../../../api/baseUrl";
export default {
  name: "NewLoans",
  components: {
    Title,
  },
  data() {
    return {
      navArr:['借贷管理','新增贷款','新增贷款修改'],
      form: {},
      name: "",
      rkId:"",
      debtor: "",
      sum: "",
      rate: "",
      method:"",
      cost:"",
      penalty:"",
      LoanType:"",
      capital:"",
      source:"",
      day:"",
      way:"0",
      type:"0",
      Chanism:"0",
      isEnsure:"0",
    };
  },
  methods: {

    //确定编辑
    handleUpdate(){
      let row = this.$route.query.row;
      console.log(row);
      //删除
      this.Axios.post(baseUrl.BASE_URL+'/element/elements',row).then(res => {
        console.log(res);
        // this.tableData = res.data.data;
        // 总页数
        // this.paginations.total = this.tableData.length;
      }).catch((err)=>{console.log(err)});
    },
  }
};
</script>

<style scoped>
.Loans {
  width: 100%;
  margin: 0 auto;
}


h2 {
  color: #fff;
  margin-left: 10px;
  line-height: 40px;
}

.content {
  background-color: #fff;
}

.EssentialTitle,
.GuaranteeTitle {
  padding: 30px 0 10px 280px;
  font-size:20px;
  letter-spacing: 2px;
}

.el-form {
  width: 70%;
  margin: 0 auto;
  padding-top:20px;
}
.el-form-item {
  display: inline-block;
  width: 48%;
}

.el-select,
.el-input {
  width: 80%;
}

select,
input {
  width: 100%;
}

/* 按钮 */
.el-row {
 text-align: center;
 padding-top:20px;
 padding-bottom: 20px;
}
</style>
