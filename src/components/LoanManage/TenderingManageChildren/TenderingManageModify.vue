<template>
  <div id="MaintainWrap">
    <div class="title">
      <h2>标的修改</h2>
    </div>
    <div class="content">
      <div class="from1">
        <div class="title1">
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

      <div class="from2">
        <div class="title1">
          <h4>
            担保信息
            <span class="show">
              收起
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </h4>
        </div>
        <el-form ref="from2" :model="from2" label-width="150px">
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

      <div class="from3">
        <div class="title1">
          <h4>
            借款资料
            <span class="show">
              收起
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </h4>
        </div>
        <el-form ref="from2" :model="from2" label-width="150px">
          <el-form-item label="是否担保：">
            <img src alt>
          </el-form-item>
        </el-form>
      </div>

      <!-- 标的信息 -->
      <div class="from4">
        <div class="title3">
          <p>标的信息</p>
        </div>
        <el-form ref="from2" :model="from2" label-width="150px">
          <el-form-item label="*标名：">
            <el-input v-model="input" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="*标的类型：">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="*最低起投金额：">
            <el-input placeholder="请输入0-99999的整数" v-model="input1"></el-input>
          </el-form-item>
          <!--递增金额：-->
          <el-form-item label="*递增金额：">
            <el-select v-model="value" placeholder="请选择">
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
            <el-input placeholder="请输入>=最小可投且<=借款总额的正整数" v-model="input1"></el-input>
          </el-form-item>
          <!-- *募集时间： -->
          <el-form-item label="*募集时间：">
            <div class="block">
              <!-- <span class="demonstration"></span> -->
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </el-form-item>
          <!-- *上架时间： -->
          <el-form-item label="*上架时间：">
            <div class="block">
              <!-- <span class="demonstration"></span> -->
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </el-form-item>
          <!-- *开售时间： -->
          <el-form-item label="*开售时间：">
            <div class="block">
              <!-- <span class="demonstration"></span> -->
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
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
            <el-checkbox v-model="checked">PC</el-checkbox>
            <el-checkbox v-model="checked">APP</el-checkbox>
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
          <!-- <el-form-item label="*标签：">

          </el-form-item>-->
        </el-form>
      </div>

      <!-- 项目介绍 -->
      <div class="from5">
        <div class="title1">
          <p>项目介绍</p>
        </div>
        <div class="text1">
          <textarea name id cols="30" rows="10"></textarea>
        </div>
      </div>
      <!--  -->
      <div class="from6">
        <div class="title1">
          <p>风控措施</p>
        </div>
        <div class="text1">
          <textarea name id cols="30" rows="10" ></textarea>
        </div>
      </div>

      <el-divider></el-divider>
      <el-button type="primary">提交审核</el-button>
      <el-button >保存</el-button>
    </div>

    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
  const cityOptions = [
    "高收益",
    "低风险",
    "官方标",
    "红包可用",
    "新用户仅限一次",
    "限时抢投"
  ];
  export default {
    name: "TenderingManageModify",

    data() {
      return {
        isShow: true,
        checkedCities: [],
        cities: cityOptions,
        // isshow1: true,
        from1: {},
        from2: {},
        input: "新手1号",
        input1: "",
        value1: "",
        radio: "1",
        checked: "",
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
  /* TopNav */
  .title{
    width: 100%;
    height: 40px;
    background-color: #006d75;
  }
  h2{
    color: #fff;
    margin-left:10px;
    line-height: 40px;
  }
  /* 下拉 */
  h4 {
    margin-top: 20px;
  }
  .show {
    font-size: 14px;
    /* color: aliceblue; */
    font-weight: normal;
    margin-left: 10px;
    /* margin-top:15px; */
  }
  .content {
    background-color: #fff;
  }
  /* from1 */
  .el-form {
    margin-top: 30px;
    /* border: 1px solid #000; */
  }
  .el-form-item {
    display: inline-block;
    width: 49%;
  }
  .el-select,
  .el-input {
    width: 70%;
  }
  /* title3 */
  textarea {
    width: 100%;
  }
  .text1 {
    /* margin: 0 auto; */
    width: 78%;
    margin-left:50px;
    margin-top:20px;
  }
</style>
