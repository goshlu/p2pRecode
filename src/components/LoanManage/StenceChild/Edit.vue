<template>
  <div class="Loans">
    <!-- <div class="title">
      <h2>新增借款</h2>
    </div>-->
    <Title :navArr="navArr"/>
    <div class="content" v-if="options.length > 0">
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
          <el-form-item label="风险等级：" required>
            <el-select v-model="rkId" placeholder="请选择">
              <el-option
                v-for="item in options[0].children"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- *借款方： -->
          <el-form-item required label="借款方：">
            <el-input v-model="mId"></el-input>
          </el-form-item>
          <!-- 借款名称： -->
          <el-form-item label="借款名称：" required>
            <el-input v-model="iLName" placeholder="请输入借款名称"></el-input>
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
          <el-form-item label="还款方式：" required>
            <el-select v-model="rtId" placeholder="请选择">
              <el-option
                v-for="item in options[2].children"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
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
          <el-form-item label="借款类型：" required>
            <el-select v-model="bId" placeholder="请选择">
              <el-option
                v-for="item in options[5].children"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 资金用途： -->
          <el-form-item label="资金用途：">
            <el-select v-model="uId" placeholder="请选择">
              <el-option
                v-for="item in options[6].children"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 还款来源： -->
          <el-form-item label="还款来源：">
            <el-select v-model="rsId" placeholder="请选择">
              <el-option
                v-for="item in options[7].children"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- **还款方式： -->
          <el-form-item required label="借款天数：">
            <el-input v-model="day"></el-input>
          </el-form-item>
          <!-- *借款起息方式： -->
          <el-form-item required label="借款起息方式：">
            <el-radio v-model="way" label="57">成立利息</el-radio>
          </el-form-item>
          <!-- *期限类型： -->
          <el-form-item required label="期限类型：">
            <el-radio v-model="type" label="78">月</el-radio>
            <el-radio v-model="type" label="79">天</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <div class="GuaranteeInfo">
        <div class="GuaranteeTitle">
          <h4>担保信息</h4>
        </div>
        <el-form ref="form" :model="form" label-width="150px">
          <!-- 担保机构： -->
          <el-form-item label="担保机构：" required>
            <el-select v-model="coId" placeholder="请选择">
              <el-option
                v-for="item in options[8].children"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
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
          <el-button type="primary" @click="handleUpdate">提交</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "./../../commonComponents/headerTitle";
import baseUrl from "../../../api/baseUrl";
export default {
  name: "NewLoans",
  components: {
    Title
  },
  data() {
    return {
      navArr: ["借贷管理", "新增贷款", "新增贷款修改"],
      form: {},
      name: "",
      iLName: "",
      rkId: "",
      mId: "",
      sum: "",
      rate: "",
      rtId: "",
      cost: "",
      penalty: "",
      bId: "",
      uId: "",
      rsId: "",
      day: "",
      way: "0",
      type: "0",
      coId: "",
      isEnsure: "0",
      options: []
    };
  },
  created() {
    // console.log('aaaa')
    // console.log(this.$route.query);
    // let id = this.$route.query.row.id;
    this.name = this.$route.query.row.iName;
    this.iLName = this.$route.query.row.iLName;
    this.rkId = this.$route.query.row.rkId;
    this.mId = this.$route.query.row.mId;
    this.sum = this.$route.query.row.balance;
    this.rate = this.$route.query.row.yearRateId;
    this.rtId = this.$route.query.row.rtId;
    this.cost = this.$route.query.row.manageMonthRateId;
    this.penalty = this.$route.query.row.overtimeRateId;
    this.bId = this.$route.query.row.bId;
    this.uId = this.$route.query.row.uId;
    this.rsId = this.$route.query.row.rsId;
    this.day = this.$route.query.row.deadline;
    this.way = this.$route.query.row.rId + "";
    this.type = this.$route.query.row.deadlineTypeId + "";
    this.coId = this.$route.query.row.coId;
    this.isEnsure = this.$route.query.row.isConId + "";
    // this.isEnsure='1';
    // console.log('aaabbb')
    // console.log(this.$route.query.row.isConId)

    this.Axios.get(baseUrl.BASE_URL + "/getDictionaries").then(res => {
      let resData = this.toTreeData(res.data);
      // console.log(resData);
      this.options = resData;
      // console.log(this.options[2].children);
    });
  },
  methods: {
    //确定编辑
    handleUpdate() {
      let row = this.$route.query.row;
      console.log(row);
      let id = this.$route.query.row.id;
      let params = {
        id:id,
        iName: this.name,
        iLName: this.iLName,
        mId: this.mId,
        balance:this.sum,
        yearRateId:this.rate,
        rtId:this.rtId,
        manageMonthRateId:this.cost,
        overtimeRateId:this.penalty,
        bId:this.bId,
        uId:this.uId,
        rsId:this.rsId,
        deadline:this.dey,
        rId:this.way,
        deadlineTypeId:this.type,
        coId:this.coId,
        isConId:this.isEnsure
      };
      this.Axios.post(baseUrl.BASE_URL + "/editTender", params)
        .then(res => {
          console.log(res);
          this.$message({
              message: "修改成功",
              type: "success"
            });
          // this.tableData = res.data.data;
          this.$router.push({name:'Stence'})
          window.location.reload();
          // 总页数
          // this.paginations.total = this.tableData.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goBack(){
      this.$router.back();
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
  font-size: 20px;
  letter-spacing: 2px;
}

.el-form {
  width: 70%;
  margin: 0 auto;
  padding-top: 20px;
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
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
