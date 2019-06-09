
<template>
  <div>
    <Title :navArr="navArr"/>

    <!-- 选择和添加 -->
    <div class="add">
      <div class="block">
        <el-cascader
          v-model="lianji"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        ></el-cascader>
      </div>

      <!-- 操作 -->
      <div>
        <el-button class="add_mess" @click="AddMessage(1)" type="primary">添加信息</el-button>
        <el-button class="add_mess" type="danger">删除信息</el-button>
      </div>
    </div>

    <!-- 表 -->
    <div class="table">
      <el-table
        :data="refund_type"
        ref="multipleTable"
        style="width: 100%"
        :header-cell-style="{color:'#333',backgroundColor:'#EBEEF5'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="id" width="180"></el-table-column>
        <!--  ==============================================================================这里URL绑定有点儿问题,表格双向绑定未解决 -->
        <el-table-column label="Url" width="180">{{All_Url}}</el-table-column>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="status" label="是否可用"></el-table-column>

        <!-- 操作 -->
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope" style="display:flex">
            <el-button
              @click="AddMessage(2,scope.row)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
            >编辑</el-button>
            <el-button
              @click="delet(scope.row,scope.$index)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑框显示/隐藏 -->

    <div v-show="isShow" class="view">
      <h4 class="view_title">修改/添加</h4>
      <el-form ref="form" :model="DJ_value" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="DJ_value.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="DJ_value.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button :plain="true" @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 分页 -->
    <div class="footer">
      <div class="el-input__inner el-input--mini footer_num">共{{this.total}}条</div>
      <el-pagination
        background
        layout="sizes,prev, pager, next"
        :page-sizes="[10, 20, 50]"
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
// 引入组件--title
import Title from "./../commonComponents/headerTitle";
export default {
  name: "config_view",
  components: {
    Title
  },
  data() {
    return {
      // 标题导航
      navArr: ["系统设置", "系统设置"],
      // 联动菜单
      lianji: [],
      options: [
        {
          value: "1",
          label: "借贷配置",
          children: [
            {
              value: "a1",
              label: "借款类型"
            },
            {
              value: "a2",
              label: "担保类型"
            },
            {
              value: "a3",
              label: "起息方式"
            },
            {
              value: "a4",
              label: "资金用途"
            },
            {
              value: "a5",
              label: "风险等级"
            },
            {
              value: "a6",
              label: "还款来源"
            }
          ]
        },
        {
          value: "2",
          label: "还款配置",
          children: [
            {
              value: "b1",
              label: "还款类型"
            },
            {
              value: "b2",
              label: "逾期状态"
            },
            {
              value: "b3",
              label: "还款来源"
            }
          ]
        },
        {
          value: "3",
          label: "会员配置",
          children: [
            {
              value: "c1",
              label: "账户状态"
            },
            {
              value: "c2",
              label: "信用评级"
            },
            {
              value: "c3",
              label: "注册来源"
            },
            {
              value: "c4",
              label: "充值方式"
            }
          ]
        },
        {
          value: "4",
          label: "标信息配置",
          children: [
            {
              value: "d1",
              label: "竞标状态"
            },
            {
              value: "d2",
              label: "竞标类型"
            },
            {
              value: "d3",
              label: "投资方式"
            },
            {
              value: "d4",
              label: "收益方式"
            },
            {
              value: "d5",
              label: "投资状态"
            },
            {
              value: "d6",
              label: "标类型"
            },
            {
              value: "d7",
              label: "金额递增"
            },
            {
              value: "d8",
              label: "宣传标签"
            },
            {
              value: "d9",
              label: "上架渠道"
            },
            {
              value: "d10",
              label: "审核"
            }
          ]
        }
      ],

      // 真实数据
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

      //   显示隐藏
      isShow: false,

      //添加 编辑 数据绑定
      form: {
        // id: "",
        type: "",
        name: "",
        description: "",
        status: ""
      },
      // 暂存状态和数据
      Dj_status: "",
      DJ_value: "",
      rows: "",
      All_Url: "/account/status",
      total: 0,
      currentPage: 1,
      pagesize: 5
    };
  },

  // 加载默认请求账户状态数据
  created() {
    this.Axios.get(`http://主机地址/account/status`).then(respon => {
      //======================================================================================== 更改 主机地址
      this.refund_type = respon.data.data;
    });
  },

  methods: {
    //判断选择哪一个，拿出url
    handleChange(value) {
      let PAGE_url;
      switch (value[1]) {
        case "a1":
          PAGE_url = "/borrow/type";
          break;
        case "a2":
          PAGE_url = "/collateral/type";
          break;
        case "a3":
          PAGE_url = "/rate/type";
          break;
        case "a4":
          PAGE_url = "/member/use/funds/type";
          break;
        case "a5":
          PAGE_url = "/risk/type";
          break;
        case "a6":
          PAGE_url = "/refund/source";
          break;

        //   b
        case "b1":
          PAGE_url = "/borrow/refund/type";
          break;
        case "b2":
          PAGE_url = "/overdue/status";
          break;
        case "b3":
          PAGE_url = "/refund/source";
          break;

        //   c
        case "c1":
          PAGE_url = "/account/status";
          break;
        case "c2":
          PAGE_url = "/member/credit/level";
          break;
        case "c3":
          PAGE_url = "/member/registered/source";
          break;
        case "c4":
          PAGE_url = "/account/pay/type";
          break;

        //   d
        case "d1":
          PAGE_url = "/borrow/element/status";
          break;
        case "d2":
          PAGE_url = "/borrow/element/type";
          break;
        case "d3":
          PAGE_url = "/investment/channel";
          break;
        case "d4":
          PAGE_url = "/eatnings/type";
          break;
        case "d5":
          PAGE_url = "/investment/type";
          break;
        case "d6":
          PAGE_url = "/borrow/element";
          break;
        case "d7":
          PAGE_url = "/increament/fund/type";
          break;
        case "d8":
          PAGE_url = "/borrow/public/tips/type";
          break;
        case "d9":
          PAGE_url = "/borrow/put/way/type";
          break;
        case "d10":
          PAGE_url = "/borrow/element/audit";
          break;
      }
      this.All_Url = PAGE_url;
      this.Axios.get(`http://主机地址${this.All_Url}`).then(respon => {
        //======================================================================================== 更改 主机地址
        this.refund_type = respon.data.data;
      });

      //   c
    },

    // 添加 和编辑判断
    AddMessage(index, row) {
      console.log(index, row);
      //   点击添加?编辑判断
      let obj = {};
      if (index == 1) {
        console.log("进入添加(if)分支,下一步调用新增函数");
      } else if (index == 2) {
        console.log("进入编辑(else if)分支,下一步调用编辑函数");
        for (let key in row) {
          obj[key] = row[key];
        }
        this.form = obj;
        this.rows = row;
      }
      this.isShow = true;
      //  暂时存起来
      this.Dj_status = index;
      this.DJ_value = obj;
    },

    // 点击提交按钮，判断执行添加还是编辑
    onSubmit() {
      //   询问是否提交;
      this.$confirm("此操作将永久提交该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log("确认提交信息,正在判断你是提交还是编辑");

          if (this.Dj_status == 1) {
            console.log("提交信息");
            // 执行提交信息
            this.onNewMessage();
          } else if (this.Dj_status == 2) {
            console.log("编辑信息");
            // 进入编辑信息
            this.onEditMessage();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "您,已取消提交"
          });
        });
    },

    // 新增信息模块
    onNewMessage() {
      console.log("调用新增函数成功,进行添加操作");
      if (this.DJ_value.name != "") {
        console.log("名字不为空,正在执行submit提交函数");
        // 提交
        this.submit();
      } else {
        this.$message({
          type: "error",
          message: "名字不能为空,请重新提交"
        });
      }
    },

    //   编辑信息
    onEditMessage() {
      let eqal;
      //   判断是否相同
      for (var index in this.DJ_value) {
        if (this.DJ_value[index] != this.rows[index]) {
          eqal = true;
          index++;
        }
      }
      //
      if (eqal) {
        //   不相同执行提交函数
        this.submit();
      } else {
        this.$message("你没有修改数据");
      }
    },

    // 提交函数,地址还没有拼接
    submit() {
      console.log(`正在像${this.All_Url}提交信息`);
      let postL, typeP, typeU, typeH; // 提交的数据
      // 判断请求
      if (this.Dj_status == 1) {
        typeP = "post";
        postL = {
          name: this.form.name,
          description: this.form.description
        };
        typeH = {
          "Content-Type": "application/json"
        };
      } else if (this.Dj_status == 2) {
        //   put请求
        typeP = "put";
        postL = {
          id: this.DJ_value.id,
          name: this.form.name,
          description: this.form.description
        };
        typeH = {
          "Content-Type": "application/x-www-form-urlencoded"
        };
      }

      //   Axios请求
      this.Axios({
        method: typeP,
        url: `http://http://主机地址${this.All_Url}`, //=============================== 更改 主机地址
        data: postL,
        heaers: typeH
      })
        .then(res => {
          console.log(`提交数据了,我看看状态码为:${res.status}`);

          this.isShow = false;
          if (res.status == 200) {
            this.Axios.get(`http://http://主机地址${this.All_Url}`).then(
              resp => {
                //   ===========sssssssss======================================= 更改 主机地址
                this.refund_type = resp.data.data;
              }
            );
          }
        })
        .catch(err => {
          console.log(`提交出现了错误,错误为:${err}`);
        });
    },

    delet(row, index) {
      // 是否确定删除
      this.$confirm("你确定需要删除次条记录，这将永久删除？", "删除信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "保存",
        cancelButtonText: "保留"
      }).then(() => {
        this.$message({
          showClose: true,
          type: "success",
          message: "删除成功，不能再次恢复了哦"
        });
        // 这是本地删除了
        this.refund_type.splice(index, 1);

        // 请求成功确认后删除;
        this.Axios.delete(
          `http://http://主机地址${this.All_Url}/${row.id}` //==========================================更改 主机地址
        ).then(res => {
          if (res.status == 200) {
            this.Axios.get(`http://主机地址${this.All_Url}`).then(res => {
              //   ===========sssssssss================================================================= 更改 主机地址
              this.refund_type = res.data.data;
            });
          }
        });
      });
    },

    // 取消提交
    close() {
      this.isShow = false;
    },

    // 分页
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
    }
  }
};
</script>


<style lang="less" scoped>
.table {
  margin: 0 20px;
}
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
  //   position: relative;
  display: flex;
  justify-content: space-between;
  margin: 30px 20px 0px 20px;
  padding-bottom: 30px;
  //   z-index: 100;
  .footer_num {
    width: 100px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    margin-left: 20px;
  }
}
</style>

