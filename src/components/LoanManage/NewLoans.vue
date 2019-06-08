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
              <el-option value="Add" label="新增"></el-option>
              <el-option value="Continued" label="续贷"></el-option>
              <el-option value="Handle" label="资产处理"></el-option>
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
          <!-- **还款方式： -->
          <el-form-item label="*借款时间：">
            <el-input v-model="repayment"></el-input>
          </el-form-item>
          <!-- *借款起息方式： -->
          <el-form-item label="*借款起息方式：">
            <el-radio v-model="radio2" label="0">成立利息</el-radio>
          </el-form-item>
          <!-- *期限类型： -->
          <el-form-item label="*期限类型：">
            <el-radio v-model="radio1" label="0">月</el-radio>
            <el-radio v-model="radio1" label="1">天</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <div class="GuaranteeInfo">
        <div class="GuaranteeTitle">
          <h4>担保信息</h4>
        </div>
        <el-form ref="form" :model="form" label-width="150px">
          <!-- 担保机构： -->
          <el-form-item label="*担保机构：">
            <el-select v-model="Chanism" placeholder="请选择">
              <el-option value="1" label="上海泽润典当有限公司"></el-option>
            </el-select>
          </el-form-item>
          <!-- 是否担保： -->
          <el-form-item label="是否担保：">
            <el-radio v-model="radio3" label="0">否</el-radio>
            <el-radio v-model="radio3" label="1">是</el-radio>
          </el-form-item>

          <!-- 抵押类型： -->
          <!--<el-form-item label="抵押类型：">
            <el-radio v-model="radio4" label="0">无</el-radio>
            <el-radio v-model="radio4" label="1">房贷</el-radio>
            <el-radio v-model="radio4" label="2">车贷</el-radio>
            <el-radio v-model="radio4" label="3">民品抵</el-radio>
          </el-form-item>-->
          <!-- 抵押物材料 -->
          <!--<el-form-item label="抵押物材料：">
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
          </el-form-item>-->
        </el-form>
      </div>
      <el-divider></el-divider>
      <div class="CheakBtn">
        <el-row>
          <el-button type="primary" @click="handleAdd">提交</el-button>
          <el-button>返回</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "./../commonComponents/headerTitle"
import baseUrl from "../../api/baseUrl";

export default {
  name: "NewLoans",
  components: {
    Title,
  },
  created(){
    // 获取列表 status=1&page=1&limit=5 sName sPhone
    this.Axios.get(baseUrl.BASE_URL+'/investment/type?page=1&limit=5').then(res => {
      console.log(res);
      this.tableData = res.data;

    }).catch((err)=>{console.log(err)});


    // 借款方列表 /member/borrow/members
    /*this.Axios.get(baseUrl.BASE_URL+'/investment/type?page=1&limit=5').then(res => {
      console.log(res);
      this.tableData = res.data;
    }).catch((err)=>{console.log(err)});*/
  },
  data() {
    return {
      navArr:['贷款管理','新增贷款'],
      form: {},
      loan: "",
      debtor: "",
      sum: "",
      rate: "",
      repayment: "",
      cost: "",
      penalty: "",
      source: "",
      capital: "",
      Loan: "",
      method: "",
      Chanism: "",
      value: "",
      radio: "0",
      radio1: "0",
      radio2: "0",
      radio3: "0",
      radio4: "0",
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
    },
    handleAdd(){
      let params = {
        iName:"家具制造项目",// 标名
        mId:1,//借款方id
        bId:1,//借款类型id： 1 个人贷款；2 集体企业贷款；3 私营企业贷款；4 国有企业贷款
        rsId:1,//还款来源id：
        rId:1,//起息方式id
        rkId:1,//风险等级id
        balance:1988,//借款金额
        rtId:1,//还款方式id
        uId:1,//资金用途id
        deadline:10,//借款时间：xx月/天
        coId:1,//担保机构id
        isConId:1,//是否担保 1是，0否
      };
      this.Axios.post(baseUrl.BASE_URL+'/borrow/Info',params).then(res => {
        console.log(res);
      }).catch((err)=>{console.log(err)});
    }
  }
};
</script>

<style scoped>
.Loans {
  width: 100%;
  margin: 0 auto;
}

/* .title {
  width: 100%;
  height: 40px;
  background-color: #006d75;
} */

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
