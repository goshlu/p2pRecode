<template>
  <div id="MaintainWrap">
    <!-- <div class="title">
      <h2>上架维护</h2>
    </div> -->
    <Title  :navArr="navArr"/>
    <div class="content">
      <div class="EssentialInfo">
        <div class="EssentialTitle">
          <h4>
            基本信息
            <p @click="isShow = !isShow" class="show">
              收起
              <i class="el-icon-arrow-down el-icon--right"></i>
            </p>
          </h4>
        </div>
        <el-form ref="from1" :model="from1" label-width="150px" v-if="isShow">
          <el-form-item label="借款名称：">
            <span>上海xx公司</span>
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
          <el-form-item label="资金用途：">
            <span>供应链周转</span>
          </el-form-item>
          <el-form-item label="借款期限：">
            <span>30天</span>
          </el-form-item>
          <el-form-item label="起息方式：">
            <span>成立计息</span>
          </el-form-item>
          <el-form-item label="还款方式：">
            <span>一次性还款</span>
          </el-form-item>
          <el-form-item label="借款管理费：">
            <span>0%</span>
          </el-form-item>
          <el-form-item label="利息管理费：">
            <span>0%</span>
          </el-form-item>
          <el-form-item label="逾期罚息利率：">
            <span>0%</span>
          </el-form-item>
        </el-form>
      </div>

      <div class="GuaranteeInfo">
        <div class="GuaranteeTitle">
          <h4>
            担保信息
            <p class="show" @click="isGuarantee = !isGuarantee">
              收起
              <i class="el-icon-arrow-down el-icon--right"></i>
            </p>
          </h4>
        </div>
        <el-form ref="from2" :model="from2" label-width="150px" v-if="isGuarantee">
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
      <!-- 标的信息 -->
      <div class="LoansInfo">
        <div class="LoansTitle">
          <h4>标的信息</h4>
        </div>
        <el-form ref="from2" :model="from2" label-width="150px">
          <el-form-item label="标名：">
            <span>新手1号</span>
          </el-form-item>
          <el-form-item label="标的类型：">
            <span>新手1号</span>
          </el-form-item>
          <el-form-item label="最低起投金额：">
            <span>新手1号</span>
          </el-form-item>
          <el-form-item label="递增金额：">
            <span>新手1号</span>
          </el-form-item>
          <!-- *最大可投金额： -->
          <el-form-item label="最大可投金额：">
            <span>新手1号</span>
          </el-form-item>
          <!-- *募集时间： -->
          <el-form-item label="募集时间：">
            <span>新手1号</span>
          </el-form-item>
          <!-- *上架时间： -->
          <el-form-item label="上架时间：">
            <span>新手1号</span>
          </el-form-item>
          <!-- *开售时间： -->
          <el-form-item label="开售时间：">
            <span>新手1号</span>
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
            <el-radio v-model="radio" label="1">通过</el-radio>
            <el-radio v-model="radio" label="2">不通过</el-radio>
          </el-form-item>
          <el-form-item label="">
          </el-form-item>
          <el-form-item label="备注：">
            <textarea name="notes" id="notes" cols="100" rows="4" style="resize: none;border-radius:4px;padding:10px;border: 1px solid #dcdfe6;"></textarea>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <el-row>
        <el-button type="primary">提交</el-button>
        <el-button>保存</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Title from "./../../commonComponents/headerTitle"

  export default {
    name: "Maintain",
    components:{
      Title
    },
    data() {
      return {
        isShow: true,
        isGuarantee: true,
        checkList: ["高收益"],
        from1: {},
        from2:{},
        input: "新手1号",
        LoanName: "",
        LoanType: "",
        Minimum: "",
        Incremental: "",
        Maximum: "",
        Raise: "",
        Shelf: "",
        Opening: "",
        textarea: "",
        radio: "0",
        value: "",
        options: [
          {
            value: "选项1",
            label: "车贷宝"
          },
          {
            value: "选项2",
            label: "房贷宝"
          },
          {
            value: "选项3",
            label: "新手标"
          },
          {
            value: "选项4",
            label: "供应链金融"
          }
        ],
        option: [
          {
            value: "选项1",
            label: "100元"
          },
          {
            value: "选项2",
            label: "200元"
          },
          {
            value: "选项3",
            label: "500元"
          },
          {
            value: "选项4",
            label: "1000元"
          }
        ],
        navArr:['借贷管理','标的上架','标的上架维护']
      };
    },
    methods: {
      handleCommand(command) {
        this.$message("click on item " + command);
      }
    }
  };
</script>

<style scoped>
  #review-main-wrap >>> a {
    text-decoration: none;
    color: #409eff;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 14px;
  }

  h2 {
    color: #fff;
    margin-left: 10px;
    line-height: 40px;
  }

  .show {
    font-size: 14px;
    font-weight: normal;
    margin-left: 10px;
    cursor: pointer;
    display:inline-block;
  }
  .content {
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

  .el-form {
    width: 75%;
    margin: 0 auto;
    padding-top: 20px;
  }

  .el-form-item {
    display: inline-block;
    width: 49%;
  }

  .el-select,
  .el-input {
    width: 70%;
  }

  .EssentialTitle,
  .GuaranteeTitle,
  .LoansTitle{
    padding: 20px 0 10px 200px;
    font-size:20px;
    letter-spacing: 2px;
    color:#333;
  }

  .el-textarea__inner{
    width: 223%;
    height: 140px;
  }

  .el-row {
    text-align: center;
    padding: 20px 0;
  }

  .ToExamineTitle {
    padding: 20px 0 10px 280px;
    font-size: 20px;
    letter-spacing: 2px;
  }
</style>
