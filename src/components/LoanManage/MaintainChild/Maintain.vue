<template>
  <div id="MaintainWrap">
    <!-- <div class="title">
      <h2>上架维护</h2>
    </div>-->
    <Title :navArr="navArr"/>
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
          <el-form-item label="借款方名称：" required>
            <span>{{iLName}}</span>
          </el-form-item>
          <el-form-item label="风险等级：" required>
            <span>{{rkId}}</span>
          </el-form-item>
          <el-form-item label="借款方：" required>
            <span>{{mId}}</span>
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
            <span>{{(isEnsure === 1) ? '是' : '否'}}</span>
          </el-form-item>
          <el-form-item label="担保机构：">
            <span>{{coId}}</span>
          </el-form-item>
        </el-form>
      </div>
      <!-- 标的信息 -->
      <div class="LoansInfo">
        <div class="LoansTitle">
          <h4>标的信息</h4>
        </div>
        <el-form ref="from2" :model="from2" label-width="150px">
          <el-form-item label="标名：" required>
            <el-input v-model="iName" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="标的类型：" required>
            <el-select v-model="LoanType" placeholder="请选择">
              <el-option
                v-for="item in options[79].children"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最低起投金额：" required>
            <el-input placeholder="请输入0-99999的整数" v-model="Minimum"></el-input>
          </el-form-item>
          <el-form-item label="递增金额：" required>
            <el-select v-model="Incremental" placeholder="请选择">
              <el-option
                v-for="item in options[9].children"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- *最大可投金额： -->
          <el-form-item label="最大可投金额：" required>
            <el-input placeholder="请输入>=最小可投且<=借款总额的正整数" v-model="Maximum"></el-input>
          </el-form-item>
          <!-- *上架时间： -->
          <el-form-item label="上架时间：" required>
            <div class="block">
              <el-date-picker v-model="Shelf" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </el-form-item>
          <!-- *开售时间： -->
          <el-form-item label="开售时间：" required>
            <div class="block">
              <el-date-picker v-model="Opening" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </el-form-item>
          <!-- *结束时间： -->
          <el-form-item label="结束时间：" required>
            <div class="block">
              <el-date-picker v-model="Raise" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </el-form-item>
          <!-- *投资计息方式： -->
          <el-form-item label="投资计息方式：" required>
            <el-radio v-model="type" label="0">成交日</el-radio>
            <el-radio v-model="type" label="1">T+1</el-radio>
            <el-radio v-model="type" label="2">T+2</el-radio>
            <el-radio v-model="type" label="3">成立计息</el-radio>
          </el-form-item>
          <!-- *上架渠道： -->
          <el-form-item label="上架渠道：" required>
            <el-checkbox-group v-model="channel">
              <el-checkbox label="PC"></el-checkbox>
              <el-checkbox label="APP"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!-- *设置精选： -->
          <el-form-item label="设置精选：" required>
            <el-radio v-model="Selected" label="0">否</el-radio>
            <el-radio v-model="Selected" label="1">是</el-radio>
          </el-form-item>
          <!-- *新手专享： -->
          <el-form-item label="新手专享：" required>
            <el-radio v-model="Novice" label="0">否</el-radio>
            <el-radio v-model="Novice" label="1">是</el-radio>
          </el-form-item>
          <!-- 标签 -->
          <el-form-item label="标签：" required>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="高收益"></el-checkbox>
              <el-checkbox label="低风险"></el-checkbox>
              <el-checkbox label="官方标"></el-checkbox>
              <el-checkbox label="红包可用"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <!-- 备注 -->
      <div class="RiskMeasure">
        <el-form ref="from2" :model="from2" label-width="150px">
          <el-form-item label="项目介绍：">
            <textarea
              name="notes"
              id="introduce"
              cols="100"
              rows="4"
              style="resize: none;border-radius:4px;padding:10px;border: 1px solid #dcdfe6;"
              v-model="introduce"
            ></textarea>
          </el-form-item>
          <el-form-item>
            <!-- <el-input type="textarea"></el-input> -->
          </el-form-item>
          <el-form-item label="风控措施：">
            <textarea
              name="notes"
              id="measures"
              cols="100"
              rows="4"
              style="resize: none;border-radius:4px;padding:10px;border: 1px solid #dcdfe6;"
              v-model="Measures"
            ></textarea>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <el-row>
        <el-button type="primary" @click="getUpdate">提交</el-button>
        <el-button>保存</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import Title from "./../../commonComponents/headerTitle";
import baseUrl from "../../../api/baseUrl";

export default {
  name: "Maintain",
  components: {
    Title
  },
  data() {
    return {
      navArr: ["借贷管理", "标的上架", "标的上架维护"],
      isShow: true,
      isGuarantee: true,
      checkList: ["高收益"],
      channel: ["PC"],
      from1: {},
      from2: {},
      introduce: "",
      Measures: "",
      input: "新手1号",
      LoanName: "",
      LoanType: "",
      Minimum: "",
      Incremental: "",
      Maximum: "",
      Raise: "",
      Shelf: "",
      Opening: "",
      radio: "0",
      type: "0",
      Selected: "0",
      Novice: "0",
      value: "",
      options: []
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
    this.Axios.get(baseUrl.BASE_URL + "/getDictionaries").then(res => {
      let resData = this.toTreeData(res.data);
      // console.log(resData);
      this.options = resData;
      // console.log(this.options[2].children);
    });
  },
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    //修改
    getUpdate() {
      let id = this.$route.query.row.id;
      let params = {
        id:id,
        
      };
      this.Axios.put(baseUrl.BASE_URL + "/editTender", params)
        .then(res => {
          console.log(res);
          // this.tableData = res.data.data;
          // 总页数
          // this.paginations.total = this.tableData.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
    toTreeData(resData) {
      // let obj = {};
      let tree = [];
      for (let i = 0; i < resData.length; i++) {
        if (resData[i].parentId === 0) {
          for (let j = 0; j < resData.length; j++) {
            if (resData[i].id == resData[j].parentId) {
              tree.push(resData[j]);
            }
          }
          resData[i].children = tree;
          tree = [];
        }
      }
      return resData;
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
  display: inline-block;
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
.LoansTitle {
  padding: 20px 0 10px 200px;
  font-size: 20px;
  letter-spacing: 2px;
  color: #333;
}

.el-textarea__inner {
  width: 223%;
  height: 140px;
}

.el-row {
  text-align: center;
  padding: 20px 0;
}
</style>
