<template>
  <el-container>
    <Title :navArr="navArr"/>
    <!-- <h1>InvUser</h1> -->
    <el-header>
      <el-row :gutter="15">
        <!-- 状态 -->
        <el-col :span="3">
          <el-select size="mini" v-model="value" filterable placeholder="全部状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <!-- 搜索框 -->
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-input
              size="mini"
              v-model="input_phone"
              suffix-icon="el-icon-search"
              placeholder="搜索手机/用户名"
            ></el-input>
          </div>
        </el-col>

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
      >
        <el-table-column type="selection" width="55" select-all="selection"></el-table-column>
<!--        <el-table-column prop="id" label="用户编号" width="120"></el-table-column>-->
        <el-table-column prop="per_name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="per_phone" label="手机" width="130"></el-table-column>
        <el-table-column prop="real_name.real" label="实名状态" width="120"></el-table-column>
        <el-table-column prop="int_entitle" label="身份证号码" width="225"></el-table-column>
        <el-table-column prop="per_sex" label="性别" width="100"></el-table-column>
        <el-table-column prop="per_bCard" label="银行卡" width="205"></el-table-column>
<!--        <el-table-column prop="sharer" label="推荐人" width="100"></el-table-column>-->
        <el-table-column prop="per_source" label="锁定状态" width="100"></el-table-column>
<!--        <el-table-column prop="reg_time" label="注册时间" width="220"></el-table-column>-->
        <el-table-column prop="register" label="最近登录" width="240"></el-table-column>
<!--        <el-table-column prop="sharer" label="用户来源" width="100"></el-table-column>-->
        <el-table-column label="操作" width="200">
          <template slot-scope="scope" style="display:flex">
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
            >编辑</el-button>
            <el-button
              @click="update(scope.row)"
              type="primary"
              icon="el-icon-s-custom"
              size="mini"
            >密码</el-button>
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
        :page-sizes="[5, 8, 10, 20, 50]"
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
    components: {Title,},

    data() {
      return {
        navArr:['会员管理','投资用户管理'],
        input1: "",
        info: "",
        input2: "",
        isNotChild: true,
        input_phone: "",
        currentPage: 1,
        pagesize: 5,
        total: 0,
        options: [
          {
            value: "选项1",
            label: "锁定"
          },
          {
            value: "选项2",
            label: "正常"
          }
        ],
        value: "",

        tableData: [],
        rows: {}
      };
    },

    // axios
    created() {
      this.Axios.get("http://rap2api.taobao.org/app/mock/177576/user")
        .then(response => {
          let arrList = response.data.datas.data;
          this.tableData = arrList;
          this.total = this.tableData.length;
          console.log(this.tableData);
        })
        .catch(error => {
          console.log(error);
        });
    },

    methods: {
      handleClick: function(row) {
        window.sessionStorage.setItem("rows", JSON.stringify(row));
        this.$router.push("/inv_update");
      },
      update(row) {
        window.sessionStorage.setItem("rows", JSON.stringify(row));
        this.$router.push("/inv_pwd");
      },
      current_change: function(currentPage) {
        this.currentPage = currentPage;
      },
      handleSizeChange(pagesize) {
        this.pagesize = pagesize;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  };
</script>

<style lang="less" scoped>
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
