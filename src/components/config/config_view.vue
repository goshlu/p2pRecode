<template>
  <div>
    <Title :navArr="navArr"/>
    <div class="add">
      <el-select v-model="form.addListValue" placeholder="请选择模块">
        <el-option
          v-for="(item,index) in addList"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div>
        <el-button class="add_mess" @click="up_date(1)" type="primary">添加信息</el-button>
        <el-button
          class="add_mess"
          type="danger"
          @click="delete_All([refund_type[0], refund_type[1]])"
        >删除信息</el-button>
      </div>
    </div>
    <div>
      <el-table
        :data="refund_type"
        ref="multipleTable"
        style="width: 100%"
        :header-cell-style="{color:'#333',backgroundColor:'#EBEEF5'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="id" width="180"></el-table-column>
        <el-table-column prop="url" label="url" width="180"></el-table-column>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="status" label="是否可用"></el-table-column>
        <!-- 操作 -->
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope" style="display:flex">
            <el-button
              @click="up_date(2,scope.row)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
            >编辑</el-button>
            <el-button
              @click="delet(scope.row,scope.index)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加 -->
    <div class="roter_view">
      <router-view></router-view>
    </div>

    <!-- 显示隐藏 -->

    <div v-show="isShow" class="view">
      <h4 class="view_title">修改/添加</h4>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="类型">
          <el-select v-model="form.addListValue" placeholder="请选择添加类型">
            <el-option
              v-for="(item,index) in addList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>

        <el-form-item label="是否可用">
          <el-radio-group v-model="form.statusValue">
            <el-radio v-for="(item,i) in statusList" :key="i" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button :plain="true" @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--  -->

    <!-- 分页 -->
    <div class="footer">
      <div class="el-input__inner el-input--mini footer_num">共{{this.total}}条</div>
      <el-pagination
        background
        layout="sizes,prev, pager, next"
        :page-sizes="[5, 8, 10, 20, 50]"
        :page-size="pagesize"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="current_change"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>



<script>
import Title from "./../commonComponents/headerTitle";
export default {
  name: "config",
  components: {
    Title
  },
  data() {
    return {
      // show
      navArr: ["系统设置", "系统设置"],
      isShow: false,
      whatOperate: -1,

      //   选模块
      //   MoKuai: {
      //     mk_name
      //   },

      //   接口全
      addList: [
        // refund_type 还款类型 /borrow/refund/type
        // borrow_type 借款类型 /borrow/type
        // element_status 竞标状态 /borrow/element/status
        // element_type 竞标类型 /borrow/element/type
        // investment_channel 投资方式 /investment/channel
        // eatnings_type 收益方式 /eatnings/type
        // investment_type 投资状态 /investment/type
        // overdue 逾期状态 /overdue/status
        // collateral_type 担保类型 /collateral/type
        // rate_type 起息方式 /rate/type
        // use_fund_type 资金用途 /member/use/funds/type
        // refund_source 还款来源 /refund/source
        // risk_type 风险等级 /risk/type
        // element_type 标类型 /borrow/element
        // increament_fund_type 金额递增 /increament/fund/type
        // public_tips_type 宣传标签 /borrow/public/tips/type
        // put_way_type 上架渠道 /borrow/put/way/type
        // account_status 账户状态 /account/status
        // creadit_level 信用评级 /member/credit/level
        // registered_source 注册来源 /member/registered/source
        // pay_type 充值方式 /account/pay/type
        // audit 审核 /borrow/element/audit

        { label: "还款类型", value: 0 },
        { label: "借款类型", value: 1 },
        { label: "竞标状态", value: 2 },
        { label: "竞标类型", value: 3 },
        { label: "投资方式", value: 4 },
        { label: "收益方式", value: 5 },
        { label: "投资状态", value: 6 },
        { label: "逾期状态", value: 7 },
        { label: "担保类型", value: 8 },
        { label: "起息方式", value: 9 },
        { label: "资金用途", value: 10 },
        { label: "还款来源", value: 11 },
        { label: "风险等级", value: 12 },
        { label: "标类型", value: 13 },
        { label: "金额递增", value: 14 },
        { label: "宣传标签", value: 15 },
        { label: "上架渠道", value: 16 },
        { label: "账户状态", value: 17 },
        { label: "信用评级", value: 18 },
        { label: "注册来源", value: 19 },
        { label: "充值方式", value: 20 },
        { label: "审核", value: 21 }
      ],

      statusList: [{ label: "可用", value: 0 }, { label: "不可用", value: 1 }],
      form: {
        id: "",
        addListValue: "",
        statusValue: "",
        name: "",
        desc: ""
      },

      newArr: {
        id: "",
        type: "",
        name: "",
        description: "",
        status: ""
      },

      // 还款类型
      addMse: {
        id: "",
        name: "",
        description: ""
      },
      //   信息
      refund_type: [
        {
          id: 1,
          name: "100",
          url: "/borrow/refund/type",
          description: "aduyaldidkgjbhfslbjcsclsglccuilskcs;iukuil",
          status: "1"
        },
        {
          id: 2,
          name: "200",
          url: "/borrow/type",
          description: "aduyaldidkgjbhfslbjcsclsglccuilskcs20000",
          status: "0"
        },
        {
          id: 3,
          name: "300",
          url: "/borrow/type",
          description: "aduyaldidkgjbhfslbjcsclsglccuilskcs20000",
          status: "0"
        }
      ],
      total: 0,
      currentPage: 1,
      pagesize: 5
    };
  },

  //   shuju
  created() {
    this.Axios({
      methods: "get",
      url: "http://172.16.6.64:8080/borrow/element/audit"
    }).then(res => {
      console.log(res);
      this.refund_type = res.data.data;
    });
  },

  //方法
  methods: {
    up_date(whatOperate, row) {
      this.isShow = true;
      this.whatOperate = whatOperate;
      //   this.form.id = row.id;
      if (whatOperate === 2) {
        // 更新
        this.form.addListValue = row.type;
        this.form.statusValue = Number(row.status);
        this.form.name = row.name;
        this.form.desc = row.description;
        //   需要传的值
        let up_message = {
          id: row.id,
          name: this.form.name,
          description: this.form.desc
        };
        console.log("edit");
      } else if (whatOperate === 1) {
        // add的值
        //添加
        console.log("add");
      }
    },

    // 类型检查

    // 删除
    delet(row, index) {
      this.newArr.id = row.id;
      this.newArr.name = this.form.name;
      this.newArr.description = this.form.desc;
      this.newArr.type = this.form.addListValue;
      this.newArr.status = this.form.statusValue;
      // 是否确定删除
      this.$confirm("你确定需要删除次条记录，这将永久删除？", "删除信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "保存",
        cancelButtonText: "保留"
      })
        .then(() => {
          this.$message({
            showClose: true,
            type: "success",
            message: "删除成功，不能再次恢复了哦"
          });
          /* 本地测试的删除
          ==========================================
              this.refund_type.splice(this.newArr.id, 1);
          */
          this.refund_type.splice(index, 1);
          console.log(index);
          // 请求成功确认后删除;
          this.Axios.delete(
            "http://172.16.6.64:8080/borrow/element/audit/" + this.newArr.id
          )
            .then(res => {
              console.log(res);

              /* 这里判断返回值，是否删除
                ==========================================
                 if (res.msg == 200) {
                   this.refund_type.splice(this.newArr.id, 1);
                 }
                 */
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message: action === "cancel" ? "我舍不得删除" : "停留在当前页面"
          });
        });
    },

    // 添加和编辑提交
    onSubmit() {
      console.log(this.whatOperate);
      if (this.whatOperate === 1) {
        this.onAdd();
      } else if (this.whatOperate === 2) {
        this.onEdit();
      }
    },

    //添加方式
    onAdd() {
      this.newArr.id = this.form.id;
      this.newArr.name = this.form.name;
      this.newArr.description = this.form.desc;
      this.newArr.status = this.form.statusValue;

      if (this.newArr.name != "") {
        //   存储需要提交的值
        let postList = {
          name: this.newArr.name,
          description: this.newArr.description
        };

        let MAN =
          "您正在添加一条数据，提交信息为 名称：" +
          postList.name +
          "的数据, 是否继续?";

        // 确人是否提交
        this.$confirm(MAN, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "提交成功!"
            });

            // 确定后使用axios post提交到服务端
            this.Axios.post(
              "http://172.16.6.64:8080/borrow/element/audit",
              postList
            )
              .then(function(res) {
                console.log(res);
              })
              // 提交错误
              .catch(function(err) {
                console.log(err);
              });
          })
          // 取消提交
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });

            // 清空
            this.form.id = null;
            this.form.name = null;
            this.form.desc = null;
            this.form.addListValue = null;
            this.form.statusValue = null;
          });
      } else {
        this.$message({
          showClose: true,
          message: "添加数据的 名称 不能为空",
          type: "error"
        });
      }
      this.isShow = false;
    },

    // 编辑方法
    onEdit() {
      this.newArr.id = this.form.id;
      this.newArr.name = this.form.name;
      this.newArr.description = this.form.desc;
      this.newArr.type = this.form.addListValue;
      this.newArr.status = this.form.statusValue;

      let put_mes = {
        id: this.newArr.id,
        name: this.newArr.name,
        description: this.newArr.description
      };

      //   编辑
      this.Axios.put("http://172.16.6.64:8080/borrow/element/audit", put_mes, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        console.log(res);
        // 清空
        this.form.id = null;
        this.form.name = null;
        this.form.desc = null;
        this.form.addListValue = null;
        this.form.statusValue = null;
      });
      this.isShow = false;
    },

    // 关闭方法
    close() {
      this.isShow = false;
      this.$message("取消操作");
      //   清空
      this.form.id = null;
      this.form.name = null;
      this.form.desc = null;
      this.form.addListValue = null;
      this.form.statusValue = null;
    },

    //分页方法
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
    },

    // 删除所有or选择删除 的方法
    delete_All(rows) {
      console.log(rows);
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /*
    =========================
    */
    change_event(e) {
      console.log(e.target);
    }
  }
};
</script>




<style lang="less" scoped>
.view {
  //   border: 1px red solid;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 30vw;
  padding: 3vw 5vw 3vw 2vw;
  position: absolute;
  background: white;
  .view_title {
    margin: 0px 0 30px 30px;
    color: rgb(64, 158, 255);
    font-weight: normal;
  }
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.add {
  display: flex;
  justify-content: space-between;
  margin: 20px;
}
.refund_type {
  display: flex;

  .refund_mess {
    padding: 10px 20px;
    border: 1px black solid;
  }
  .operation {
    padding: 2px 4px;
    width: 50px;
    height: 20px;
    font-size: 12px;
  }
}
.footer {
  display: flex;
  justify-content: space-between;
  margin: 30px 20px 50px 20px;
  .footer_num {
    width: 100px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    margin-left: 20px;
  }
}
</style>


















