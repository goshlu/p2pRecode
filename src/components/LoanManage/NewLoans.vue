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
          <el-form-item label="标名：" required>
            <el-input v-model="iName" placeholder="请输入标名"></el-input>
          </el-form-item>
          <!-- 借款名称： -->
          <el-form-item label="借款名称：" required>
            <el-input v-model="iLName" placeholder="请输入借款名称"></el-input>
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
          <el-form-item label="借款方：" required style="height:40px;">
            <span
              style="display:inline-block;width: 180px;height: 40px;border-radius: 4px;padding: 0 15px;color: #888;border: 1px solid #dcdfe6;"
            >{{sName}}</span>
            <el-button type="primary" @click="showModal" style="float: right;margin-right: 71px;">选择</el-button>
          </el-form-item>
          <!-- *借款总金额： -->
          <el-form-item label="借款总金额：">
            <el-input v-model="balance" required placeholder="请输入借款总金额"></el-input>
          </el-form-item>
          <!-- *年利率： -->
          <el-form-item label="年利率：" required>
            <el-select v-model="rate" placeholder="请选择">
              <el-option
                v-for="item in options[1].children"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
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
          <el-form-item label="借款管理费月率：" required>
            <el-select v-model="cost" placeholder="请选择">
              <el-option
                v-for="item in options[3].children"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- *逾期罚息利率： -->
          <el-form-item label="逾期罚息利率：" required>
            <el-select v-model="penalty" placeholder="请选择">
              <el-option
                v-for="item in options[4].children"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
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
          <!-- *借款期限： -->
          <el-form-item label="借款期限：" required>
            <el-input v-model="deadline"></el-input>
          </el-form-item>
          <!-- *借款起息方式： -->
          <el-form-item label="借款起息方式：" required>
            <el-radio v-model="rId" label="57">成立利息</el-radio>
          </el-form-item>
          <!-- *期限类型： -->
          <el-form-item label="期限类型：" required>
            <el-radio v-model="deadlineTypeId" label="78">月</el-radio>
            <el-radio v-model="deadlineTypeId" label="79">天</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <div class="GuaranteeInfo">
        <div class="GuaranteeTitle">
          <h4>担保信息</h4>
        </div>
        <el-form ref="Guarantee" :model="Guarantee" label-width="150px">
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
            <el-radio v-model="isConId" label="0">否</el-radio>
            <el-radio v-model="isConId" label="1">是</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <div class="CheakBtn">
        <el-row>
          <el-button type="primary" @click="handleAdd">提交审核</el-button>
          <el-button @click="handleSave">保存</el-button>
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
          <el-input v-model="SName" placeholder="搜索借款人姓名：" clearable>
            <el-button slot="append" @click="serachName" icon="el-icon-search"></el-button>
          </el-input>
          <template>
            <el-table :data="tableData" height="350" style="width: 100%" align="center">
              <el-table-column prop="name" label="真实姓名" width="180" align="center"></el-table-column>
              <el-table-column prop="phone" label="手机号码/用户名" width="150" align="center"></el-table-column>
              <el-table-column prop="status" label="用户状态" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.status == 1 ? '正常' :'锁定'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="userTypeName" label="身份类型" align="center"></el-table-column>
              <el-table-column prop="registTime" label="添加时间" width="200" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.registTime | dateFormat}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="handleClick(scope.row)">选择借款人</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Title from "./../commonComponents/headerTitle";
  import baseUrl from "../../api/baseUrl";
  import {mapState, mapGetters, mapMutations, mapActions} from "vuex";

  export default {
    name: "NewLoans",
    components: {
      Title
    },
    created() {
      this.Axios.get(baseUrl.BASE_URL + "/getDictionaries").then(res => {
        let resData = this.toTreeData(res.data);
        // console.log(resData);
        this.options = resData;
        // console.log(this.options[2].children);
      });

      // 获取列表 status=1&page=1&limit=5 sName sPhone
      // this.Axios.get(baseUrl.BASE_URL + "/investment/type?page=1&limit=5")
      //   .then(res => {
      //     console.log(res);
      //     this.tableData = res.data;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      // 借款方列表 /member/borrow/members
      /*this.Axios.get(baseUrl.BASE_URL+'/investment/type?page=1&limit=5').then(res => {
        console.log(res);
        this.tableData = res.data;
      }).catch((err)=>{console.log(err)}) ;*/
    },
    data() {
      return {
        navArr: ["借贷管理", "新增贷款"],

        form: {},
        Guarantee: {},
        iName: "",
        sName: "",
        mId: "",
        iLName: "",
        bId: "",
        rsId: "",
        rId: "57",
        rkId: "",
        balance: "",
        rtId: "",
        uId: "",
        deadline: "",
        coId: "",
        isConId: "0",
        rate: "",
        cost: "",
        penalty: "",
        deadlineTypeId: "78",
        status: "",
        moduleTypeId: "",
        isShowModal: false,
        SName: "",
        value: "",
        tableData: [
          // {
          //   name: "企业1号",
          //   phone: "13700000000",
          //   status: "正常",
          //   userTypeId: "个人用户",
          //   registTime: "2017-01-01"
          // }
        ],
        options: []
      };
    },
    computed:{
      ...mapGetters(['getDataModule1'])
    },
    methods: {
      ...mapActions(['doUpdateDataModule1']),
      showModal() {
        this.isShowModal = !this.isShowModal;

        this.Axios.get(baseUrl.BASE_URL + "/getBorrows").then(res => {
          // console.log(res);
          this.tableData = res.data;
        });
      },
      handlePictureCardPreview(file) {
        /* this.dialogImageUrl = file.url;
        this.dialogVisible = true;*/
      },
      serachName() {
        let params = this.SName;
        this.Axios.get(baseUrl.BASE_URL + "/getBorrows?name=" + params).then(
          res => {
            // console.log(res);
            this.tableData = res.data;
          }
        );
      },
      handleAdd() {
        this.status = 1;
        let moduleTypeId = 1;
        let params = {
          iName: this.iName, // 标名
          iLName: this.iLName, //借款名称
          mId: this.mId, //借款方id
          bId: this.bId, //借款类型id： 1 个人贷款；2 集体企业贷款；3 私营企业贷款；4 国有企业贷款
          rsId: this.rsId, //还款来源id：
          rId: this.rId, //起息方式id
          rkId: this.rkId, //风险等级id
          balance: this.balance, //借款金额
          rtId: this.rtId, //还款方式id
          uId: this.uId, //资金用途id
          deadline: this.deadline,
          deadlineTypeId: this.deadlineTypeId, //借款时间：xx月/天
          coId: this.coId, //担保机构id
          isConId: this.isConId, //是否担保 1是，0否
          yearRateId: this.rate, //年利率
          manageMonthRateId: this.cost, //借款管理费月率
          overtimeRateId: this.penalty, //逾期罚息利率
          status: this.status
        };
        this.Axios.post(baseUrl.BASE_URL + "/addTender", params, {
          headers: {"Content-Type": "application/x-www-form-urlencoded"}
        })
          .then(res => {
            this.$message({
              message: "添加成功",
              type: "success"
            });

            //请求新标维护数据列表
            this.reqDataModule1();
            this.$router.push({name:'Stence'})
          })
          .catch(err => {
            console.log(err);
          });
      },
      handleSave() {
        this.status = 2;
        let moduleTypeId = 1;
        let params = {
          iName: this.iName, // 标名
          iLName: this.iLName, //借款名称
          mId: this.mId, //借款方id
          bId: this.bId, //借款类型id： 1 个人贷款；2 集体企业贷款；3 私营企业贷款；4 国有企业贷款
          rsId: this.rsId, //还款来源id：
          rId: this.rId, //起息方式id
          rkId: this.rkId, //风险等级id
          balance: this.balance, //借款金额
          rtId: this.rtId, //还款方式id
          uId: this.uId, //资金用途id
          deadline: this.deadline, //还款期限
          deadlineTypeId: this.deadlineTypeId, //借款时间：xx月/天
          coId: this.coId, //担保机构id
          isConId: this.isConId, //是否担保 1是，0否
          yearRateId: this.rate, //年利率
          manageMonthRateId: this.cost, //借款管理费月率
          overtimeRateId: this.penalty, //逾期罚息利率
          status: this.status
        };
        this.Axios.post(baseUrl.BASE_URL + "/addTender", params, {
          headers: {"Content-Type": "application/x-www-form-urlencoded"}
        })
          .then(res => {
            this.$message({
              message: "保存成功",
              type: "success"
            });

            //请求新标维护数据列表
            this.reqDataModule1();
            this.$router.push({name:'Stence'})
          })
          .catch(err => {
            console.log(err);
          });
      },
      handleClick(row) {
        this.mId = row.id;
        this.sName = row.name;
        this.showModal();
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
      },
      // 请求新标维护数据列表
      reqDataModule1() {
        this.Axios.get(baseUrl.BASE_URL + "/getTenderAll?page=1&limit=5&moduleTypeId=1")
          .then(res => {
            this.doUpdateDataModule1(res);
            console.log("数据："+this.getDataModule1);
          })
          .catch(err => {
            console.log(err);
          });
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

  /*  选择*/
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(66, 66, 66, 0.5);
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
    padding: 2px 15px;
    background-color: #646973;
    font-size: 20px;
    color: #fff;
    height: 40px;
    border-bottom: 1px solid #d5d5d5;
  }

  .modal .modal-content .el-input {
    width: 30%;
    margin: 10px 10px;
  }
</style>
