<template>
  <el-container>
    <Title :navArr="navArr"/>

    <!-- <h1>InvUser</h1> -->
    <el-header>
      <el-row class="top">
        <div style="display: inline-block;">
          <!-- 搜索选项 -->
          <el-input placeholder="请输入内容" v-model="phone" @input="search" class="input-with-select">
            <el-select v-model="value" @change="value_status" slot="prepend" placeholder="全部状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button @click="getSearchList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <el-col :span="2" :offset="15" style="display:flex">
          <el-button plain size="mini">自定义导出</el-button>
          <el-button plain size="mini">导出</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width:100%"
        :stripe="true"
        :border="false"
        @selection-change="handleSelectionChange"
        :header-cell-style="{color:'#333',backgroundColor:'#EBEEF5'}"
      >
        <el-table-column type="selection" width="55" select-all="selection"></el-table-column>
        <el-table-column prop="id" label="用户编号" width="100"></el-table-column>
        <el-table-column prop="username" label="姓名" width="100"></el-table-column>
        <el-table-column prop="phone" label="手机" width="140"></el-table-column>
        <el-table-column prop="account_status" label="实名状态" width="120"></el-table-column>
        <!-- <el-table-column prop="enPhone" label="身份证号码" width="225"></el-table-column> -->
        <el-table-column prop="eaName" label="性别" width="100"></el-table-column>
        <el-table-column prop="enrings" label="银行卡" width="160"></el-table-column>
        <!-- <el-table-column prop="sharer" label="推荐人" width="100"></el-table-column> -->
        <el-table-column prop="status" label="锁定状态" width="80"></el-table-column>
        <el-table-column prop="register_time" label="注册时间" width="160"></el-table-column>
        <el-table-column prop="login _time" label="最近登录" width="160"></el-table-column>
        <el-table-column prop="registered_source" label="用户来源" width="100"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope" style="display:flex">
            <el-button
              @click="dialogForm(scope.row)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
            >编辑</el-button>
            <el-button
              @click="update(scope.row)"
              v-if="scope.row.status == '不可用'"
              :type="btn_type"
              icon="el-icon-s-custom"
              size="mini"
            >锁定</el-button>
            <el-button
              @click="update(scope.row)"
              v-if="scope.row.status == '可用'"
              :type="btn_type01"
              icon="el-icon-s-custom"
              size="mini"
            >可用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <!-- 分页 -->
    <div class="footer">
      <div class="el-input__inner el-input--mini footer_num">共{{this.total}}条</div>
      <el-pagination
        background
        layout="sizes,prev, pager, next"
        :page-sizes="[10, 20, 30]"
        :page-size="pagesize"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="current_change"
        :total="total"
      ></el-pagination>
    </div>
  </el-container>
</template>

<script>
import Title from "./../commonComponents/headerTitle";

export default {
  name: "InvUser",
  components: { Title },
  data() {
    return {
      // 导航
      navArr: ["会员管理", "投资用户管理"],
      // 数据
      input1: "",
      info: "",
      input2: "",
      input5: "",
      isNotChild: true,
      input_phone: "",
      currentPage: 1,
      pagesize: 10,
      total: 0,
      options: [
        {
          value: 1,
          label: "可用"
        },
        {
          value: 2,
          label: "不可用"
        }
      ],
      value: "",
      phone: "",

      tableData: [
        {
          value: "选项2",
          label: "正常",
          status: "可用"
        },
        {
          value: "2",
          label: "222",
          status: "不可用"
        },
        {
          value: "选项2",
          label: "正常",
          status: "不可用"
        },
        {
          value: "2",
          label: "222",
          status: "可用"
        }
      ],
      rows: {},
      // 状态框
      btn_type: "info",
      btn_type01: "primary",

      form: {},
      // 操作的数据
      newform: {},
      formLabelWidth: "120px",
      //   url
      url: "http://主机地址/member/investment/members" //======================================主机地址
    };
  },

  // 加载页面请求数据
  created() {
    this.Axios.get(this.url)
      .then(response => {
        console.log(response.data.data[0]);
        // 存起来
        this.tableData = response.data.data;
        this.total = this.tableData.length;

        // 判断状态
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    //   状态选择
    value_status() {
      this.Axios.get(`${this.url}/?type=${this.value}`).then(resp => {
        if (resp.status == 200) {
          this.tableData = resp.data.data;
          this.total = this.tableData.length;
        }
        // 存起来
      });
    },

    search() {
      this.Axios.get(`${this.url}/?phone=${this.phone}`).then(res => {
        if (res.status == 200) {
          this.tableData = res.data.data;
          this.total = this.tableData.length;
        }
        // 存起来
      });
    },
    getSearchList() {},

    //  状态按钮
    update(row) {
      var up_status = row.status;
      if (up_status == "可用") {
        //  请求
        this.Axios.delete(`http://主机地址/member/info/${row.id}`, {
          //==============================================================================主机地址
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          this.Axios.get(this.url)
            .then(response => {
              // 存起来
              this.tableData = response.data.data;
              this.total = this.tableData.length;

              // 判断状态
            })
            .catch(error => {
              console.log(error);
            });
          // 存起来
        });
      } else if (up_status == "不可用") {
        this.Axios.put(`http://主机地址/member/info/${row.id}`, {
          //=============================================================================================主机地址
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(() => {
          this.Axios.get(this.url)
            .then(response => {
              // 存起来
              this.tableData = response.data.data;
              this.total = this.tableData.length;

              // 判断状态
            })
            .catch(error => {
              console.log(error);
            });
        });
      }
    },

    // 分页
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 路由传值===>编辑页面
    dialogForm(row) {
      this.$router.push({
        name: "inv_update01",
        // params:
        params: row
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
.top {
  display: flex;
  justify-content: space-between;
  margin-left: -20px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.input-with-select > .el-input__inner {
  width: 160px;
}
.footer {
  display: flex;
  justify-content: space-between;
  margin: 30px 20px;
  .footer_num {
    width: 100px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    margin-left: 20px;
  }
}
</style>
