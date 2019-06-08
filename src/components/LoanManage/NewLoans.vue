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
          <el-form-item label="*借款方：" >
            <input type="text" style="display: inline-block">
            <el-button type="primary" style="display: inline-block" @click="showModal">选择</el-button>
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
          <el-form-item label="抵押类型：">
            <el-radio v-model="radio4" label="0">无</el-radio>
            <el-radio v-model="radio4" label="1">房贷</el-radio>
            <el-radio v-model="radio4" label="2">车贷</el-radio>
            <el-radio v-model="radio4" label="3">民品抵</el-radio>
          </el-form-item>
          <!--&lt;!&ndash; 抵押物材料 &ndash;&gt;
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
          </el-form-item>-->
        </el-form>
      </div>
      <el-divider></el-divider>
      <div class="CheakBtn">
        <el-row>
          <el-button type="primary">提交</el-button>
          <el-button>返回</el-button>
        </el-row>
      </div>
    </div>
<!--    选择弹出框-->
    <div class="modal" v-show="isShowModal">
      <div class="modal-content">
        <div class="title">
          <span>选择借款人</span>
          <i class="el-icon-close" style="cursor: pointer;font-size: 30px;" @click="showModal"></i>
        </div>
        <div class="main">
          <el-input v-model="SName" placeholder="搜索借款人姓名：" icon="el-icon-search"></el-input>
          <template>
            <el-table :data="tableData" height="350" border style="width: 100%">
              <el-table-column prop="name" label="真实姓名" width="180"></el-table-column>
              <el-table-column prop="phone" label="手机号码/用户名" width="180"></el-table-column>
              <el-table-column prop="status" label="用户状态"></el-table-column>
              <el-table-column prop="type" label="身份类型"></el-table-column>
              <el-table-column prop="time" label="添加时间"></el-table-column>
              <el-table-column label="操作"></el-table-column>
            </el-table>
          </template>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
import Title from "./../commonComponents/headerTitle"
export default {
  name: "NewLoans",
  components: {
    Title,
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
      dialogVisible: false,
      isShowModal:false,
      SName:"",
      tableData:[{
        name:"",
        phone:"",
        status:"",
        type:"",
        time:"",
      }]
    };
  },
  methods: {

    showModal() {
      this.isShowModal = !this.isShowModal;
    },

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
/*  选择*/
input{
  border: 1px solid #DCDFE6;
  height: 40px;
  width: 50%;
  border-radius:4px;
  padding: 0 15px;
  box-sizing: border-box;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(66, 66, 66, .5);
  width: 100%;
  height: 100%;
  z-index: 99;
}
.modal .modal-content {
  width: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
}

.modal .modal-content {
  box-shadow: 2px 2px 5px #adadad;
}
.modal .modal-content .title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  background-color: rgba(242, 242, 242, 1);
  font-size: 20px;
  color: #555555;
  border-bottom: 1px solid #d5d5d5;
}
.modal .modal-content .el-input{
  width: 30%;
  margin: 10px 10px;
}
</style>
