<template>
  <div id="MaintainWrap">
    <div class="title">
      <h2>标的修改</h2>
    </div>
    <div class="content">
      <div class="EssentialInfo">
        <div class="EssentialTitle">
          <h4>
            基本信息
            <span @click="isShow = !isShow" class="show">
              收起
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
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

      <el-divider></el-divider>

      <div class="GuaranteeInfo">
        <div class="GuaranteeTitle">
          <h4>
            担保信息
            <span class="show" @click="isGuarantee = !isGuarantee">
              收起
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
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

      <el-divider></el-divider>

      <div class="BorrowingInfo">
        <div class="BorrowingTitle">
          <h4>
            借款资料
            <span class="show" @click="isBorrow = !isBorrow">
              收起
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </h4>
        </div>
        <el-form ref="from2" :model="from2" label-width="150px" v-if="isBorrow">
          <el-form-item label="是否担保：">
            <el-image></el-image>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <!-- 标的信息 -->
      <div class="LoansInfo">
        <div class="LoansTitle">
          <p>标的信息</p>
        </div>
        <el-form ref="from2" :model="from2" label-width="150px">
          <el-form-item label="*标名：">
            <el-input v-model="input" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="*标的类型：">
            <el-select v-model="LoanType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="*最低起投金额：">
            <el-input placeholder="请输入0-99999的整数" v-model="Minimum"></el-input>
          </el-form-item>

          <el-form-item label="*递增金额：">
            <el-select v-model="Incremental" placeholder="请选择">
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- *最大可投金额： -->
          <el-form-item label="*最大可投金额：">
            <el-input placeholder="请输入>=最小可投且<=借款总额的正整数" v-model="Maximum"></el-input>
          </el-form-item>

          <!-- *募集时间： -->
          <el-form-item label="*募集时间：">
            <div class="block">
              <!-- <span class="demonstration"></span> -->
              <el-date-picker v-model="Raise" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </el-form-item>

          <!-- *上架时间： -->
          <el-form-item label="*上架时间：">
            <div class="block">
              <!-- <span class="demonstration"></span> -->
              <el-date-picker v-model="Shelf" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </el-form-item>

          <!-- *开售时间： -->
          <el-form-item label="*开售时间：">
            <div class="block">
              <!-- <span class="demonstration"></span> -->
              <el-date-picker v-model="Opening" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </el-form-item>

          <!-- *投资计息方式： -->
          <el-form-item label="*投资计息方式：">
            <el-radio v-model="radio" label="1">成交日</el-radio>
            <el-radio v-model="radio" label="2">T+1</el-radio>
            <el-radio v-model="radio" label="3">T+2</el-radio>
            <el-radio v-model="radio" label="4">成立计息</el-radio>
          </el-form-item>

          <!-- *上架渠道： -->
          <el-form-item label="*上架渠道：">
            <el-checkbox v-model="PC">PC</el-checkbox>
            <el-checkbox v-model="APP">APP</el-checkbox>
          </el-form-item>

          <!-- *设置精选： -->
          <el-form-item label="*设置精选：">
            <el-radio v-model="radio" label="1">否</el-radio>
            <el-radio v-model="radio" label="2">是</el-radio>
          </el-form-item>

          <!-- *新手专享： -->
          <el-form-item label="*设置精选：">
            <el-radio v-model="radio" label="1">否</el-radio>
            <el-radio v-model="radio" label="2">是</el-radio>
          </el-form-item>
          <!-- 标签 -->
          <el-form-item label="*标签：">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="高收益"></el-checkbox>
              <el-checkbox label="低风险"></el-checkbox>
              <el-checkbox label="官方标"></el-checkbox>
              <el-checkbox label="红包可用"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <!-- 项目介绍 -->
      <div class="ProjectInfo">
        <div class="ProjectTitle">
          <p>项目介绍</p>
        </div>
        <div class="text1">
          <el-input type="textarea"></el-input>
        </div>
      </div>
      <!--  -->
      <div class="RiskMeasure">
        <div class="RiskMeasureTitle">
          <p>风控措施</p>
        </div>
        <div class="text1">
          <el-input v-model="textarea" type="textarea"></el-input>
        </div>
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
  export default {
    name: "Maintain",

    data() {
      return {
        isShow: true,
        isGuarantee: true,
        isBorrow: true,
        checkList: ["高收益"],
        from1: {},
        from2: {},
        input: "新手1号",
        LoanName:"",
        LoanType:"",
        Minimum:"",
        Incremental:"",
        Maximum:"",
        Raise:"",
        Shelf:"",
        Opening:"",
        textarea: "",
        radio: "1",
        APP: "",
        PC: "",
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
        ]
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

  .show {
    font-size: 14px;
    font-weight: normal;
    margin-left: 10px;
    cursor: pointer;
  }
  .content {
    background-color: #fff;
  }

  .el-form {
    margin-top: 30px;
    width: 90%;
    margin: 0 auto;
  }

  .el-form-item {
    display: inline-block;
    width: 49%;
  }

  .el-select,
  .el-input {
    width: 70%;
  }

  .text1 {
    width: 78%;
    margin-left: 50px;
    margin-top: 20px;
  }

  .EssentialTitle,
  .GuaranteeTitle,
  .BorrowingTitle,
  .LoansTitle,
  .ProjectTitle,
  .RiskMeasureTitle {
    padding: 20px 0 10px 10px;
  }

  .el-row {
    width: 80%;
    margin: 0 auto;
    padding-bottom: 10px;
  }
</style>
