<template>
  <div id="MaintainWrap">
    <div class="title">
      <h2>借款审核详情</h2>
    </div>
    <div class="content">
      <!-- 基本信息 -->
      <div class="EssentialInfo">
        <div class="EssentialTitle">
          <h4>基本信息</h4>
        </div>
        <el-form ref="from1" :model="from1" label-width="150px">
          <el-form-item label="*标名：">
            <span>典当宝-100期</span>
          </el-form-item>
          <el-form-item label="风险等级：">
            <span>较低等级</span>
          </el-form-item>
          <el-form-item label="借款方：">
            <span>上海x x x公司(13599090001)</span>
          </el-form-item>
          <el-form-item label="借款总金额：">
            <span>10000元</span>
          </el-form-item>
          <el-form-item label="年利率：">
            <span>12%</span>
          </el-form-item>
          <el-form-item label="*还款方式：">
            <span>一次性还款</span>
          </el-form-item>
          <el-form-item label="*借款期限：">
            <span>30天</span>
          </el-form-item>
          <el-form-item label="*借款起息方式：">
            <span>成立计息</span>
          </el-form-item>
          <el-form-item label="*借款管理费月率：">
            <span>0%</span>
          </el-form-item>
          <el-form-item label="*利息管理费月率：">
            <span>0%</span>
          </el-form-item>
          <el-form-item label="*逾期罚息利率：">
            <span>0%</span>
          </el-form-item>
          <el-form-item label="*逾期罚息利率：">
            <span>新增</span>
          </el-form-item>
          <el-form-item label="资金用途：">
            <span>供应链周转</span>
          </el-form-item>
          <el-form-item label="还款来源：">
            <span>营业收入</span>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <!-- 担保信息 -->
      <div class="GuaranteeInfo">
        <div class="GuaranteeTitle">
          <h4>担保信息</h4>
        </div>
        <el-form ref="from1" :model="from1" label-width="150px">
          <el-form-item label="是否担保：">
            <span>是</span>
          </el-form-item>
          <el-form-item label="担保机构：">
            <span>上海泽润典当</span>
          </el-form-item>
          <el-form-item label="是否抵押：">
            <span>否</span>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <!-- 借款资料 -->
      <div class="BorrowingInfo">
        <div class="BorrowingTitle">
          <h4>借款资料</h4>
        </div>
        <el-form ref="from1" :model="from1" label-width="150px">
          <el-form-item label="是否担保：">
            <el-image></el-image>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <!-- 审核 -->
      <div class="ToExamine">
        <div class="ToExamineTitle">
          <h4>审核</h4>
        </div>
        <el-form ref="from1" :model="from1" label-width="150px">
          <el-form-item label="是否通过：">
            <el-radio v-model="radio" label="1">通过</el-radio>
            <el-radio v-model="radio" label="2">不通过</el-radio>
          </el-form-item>
        </el-form>
        <el-form class="Remarks">
          <el-form-item label="*备注：">
            <el-input type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <el-row>
        <el-button type="primary">提交</el-button>
        <el-button>返回</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      from1: {},
      from2: {},
      radio: "1"
    };
  }
};
</script>

<style scoped>
.content {
  background-color: #fff;
}
/* TopNav */
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
/* 表单 */
.el-form {
  width: 80%;
  margin: 0 auto;
}
.el-form-item {
  display: inline-block;
  width: 49%;
}
/* 基本信息 */
.EssentialTitle,
.GuaranteeTitle,
.BorrowingTitle,
.ToExamineTitle {
  padding: 20px 0 10px 10px;
}
/* 备注 */
.Remarks {
  margin-left:180px;
}
/* 按钮 */
.el-row{
  width:80%;
  margin:0 auto;
  padding-bottom: 10px;
}
</style>