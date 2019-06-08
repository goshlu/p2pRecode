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
        <el-table-column prop="id" label="用户编号" width="120"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="phone" label="手机" width="130"></el-table-column>
        <!-- <el-table-column prop="status" label="实名状态" width="120"></el-table-column> -->
        <el-table-column prop="eptMoney" label="身份证号码" width="225"></el-table-column>
        <el-table-column prop="eaName" label="性别" width="100"></el-table-column>
        <el-table-column prop="rptMoney" label="银行卡" width="205"></el-table-column>
        <!--        <el-table-column prop="sharer" label="推荐人" width="100"></el-table-column>-->
        <el-table-column prop="status" label="锁定状态" width="100"></el-table-column>
        <!--        <el-table-column prop="reg_time" label="注册时间" width="220"></el-table-column>-->
        <el-table-column prop="time" label="最近登录" width="240"></el-table-column>
        <!--        <el-table-column prop="sharer" label="用户来源" width="100"></el-table-column>-->
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
              v-if="scope.row.status == 0"
              :type="btn_type"
              icon="el-icon-s-custom"
              size="mini"
            >锁定</el-button>
            <el-button
              @click="update(scope.row)"
              v-if="scope.row.status == 1"
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
        :page-sizes="[5, 8, 10, 20, 50]"
        :page-size="pagesize"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="current_change"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 
    =============================
    弹出模态框，
    ============================
    -->

    <!-- <el-dialog title="编辑信息" :visible.sync="dialogFormVisible"> -->
    <!-- 
        ROW的信息存在From上，form绑定在编辑模态框
    -->
    <!-- <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth">
          <el-input v-model="form.eptMoney" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="close(form)">取 消</el-button>
        <el-button type="primary" @click="submit_msg">确 定</el-button>
    </div>-->
    <!-- </el-dialog> -->
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

      tableData: [
        {
          value: "选项2",
          label: "正常",
          status: 1
        },
        {
          value: "2",
          label: "222",
          status: 0
        },
        {
          value: "选项2",
          label: "正常",
          status: 1
        },
        {
          value: "2",
          label: "222",
          status: 0
        }
      ],
      rows: {},
      // 状态框
      btn_type: "info",
      btn_type01: "warning",

      /*===============
      数据*/
      //   dialogFormVisible: false,
      form: {},
      // 操作的数据
      newform: {},
      formLabelWidth: "120px",
      //   url
      url: "http://172.16.6.62:8080/investment/investments"
    };
  },

  // 加载页面请求数据
  created() {
    this.Axios.get(this.url)
      .then(response => {
        // console.log(response);
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
    //  状态按钮
    update(row) {
      var up_status = row.status;
      if (up_status == 0) {
        row.status = 1;
      } else {
        row.status = 0;
      }

      /*  
      传数据更改; 
      */

      let sub_updata = {
        id: row.id,
        status: up_status
      };
      //  请求
      this.Axios({
        methods: "post",
        url: this.url,
        data: sub_updata,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
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
        params: {
          id: "id",
          name: "name"
        }
      });
    }
    /*
    ==========================================
    编辑数据操作
    */

    //  显示模态框，编辑

    //   // 显示模态框
    // //   this.dialogFormVisible = true;

    //   // 使用for in 深拷贝，解除双向
    //   let obj = {};
    //   for (let key in row) {
    //     obj[key] = row[key];
    //   }

    //   // row存到from中
    //   this.form = obj;
    // },

    // // 取消关闭模态框
    // close(f_row) {
    //   this.dialogFormVisible = false;
    //   this.$message("取消编辑");
    // },

    // // 提交编辑
    // submit_msg() {
    //   // 取到from数据
    //   let submit_All = this.form;

    //   /*
    //   ==========================================================
    //   需要传的数据
    //   */

    //   let sub_data = {
    //     id: submit_All.id,
    //     eptMoney: 1555555555555
    //   };

    //   // 发起axios请求，更改数据
    //   this.Axios({
    //     methods: "post",
    //     url: this.url,
    //     data: sub_data,
    //     header: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     }
    //   })
    //     .then(res => {
    //       //发送编辑成功，前台重新渲染数据
    //       if (res.status == 200) {
    //         // 提示给用户
    //         this.$message("编辑成功，后台处理中");
    //         //重新加载数据
    //         this.Axios.get(this.url)
    //           .then(res_success => {
    //             // 成功重新渲染
    //             this.tableData = res_success.data.data;
    //             this.total = this.tableData.length;
    //             console.log(`请求成功，已经重新渲染数据为：${this.tableData}`);
    //             // 提示用户
    //             this.$message("数据重新渲染成功");
    //           })
    //           .catch(err_fasle => {
    //             console.log(`编辑成功，但是重新渲染时，出现${err_fasle}错误`);
    //             // 提示用户
    //             this.$message("数据请求成功，但是重新渲染数据时出现问题~~");
    //           });
    //       } else {
    //         console.log(`提交修改出现${res.status}错误`);
    //       }
    //     })
    //     .catch(err => {
    //       // 提示给用户
    //       this.$message("编辑请求出现问题，请检查");
    //       console.log(`请求出现错误${err}`);
    //     });
    //   // 关闭模态框
    //   this.dialogFormVisible = false;
    // }
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
