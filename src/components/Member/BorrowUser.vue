<template>
  <el-container>
    <h1>BorrowUser</h1>

    <el-header>
      <div class="nav">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          class="input-with-select"
          style="width:350px"
        >
          <el-select v-model="value1" slot="prepend" placeholder="请选择" style="width:120px">
            <el-option  
              v-for="item in options1"
              :key="item.value1"
              :label="item.label"
              :value="item.value1"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" class="but"></el-button>
        </el-input>

        <el-select  v-model="value2" filterable placeholder="导出" class="Export">
          <el-option
            v-for="item in options2"
            :key="item.value2"
            :label="item.label"
            :value="item.value2"
          ></el-option>
        </el-select>
        
      </div>
      
    </el-header>
    <el-main>
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="act_number" label="用户编号" width="140"></el-table-column>
        <el-table-column prop="per_name" label="姓名/公司名称" width="140"></el-table-column>
        <el-table-column prop="per_phone" label="手机/用户名" width="140"></el-table-column>
        <el-table-column prop="borrower_email" label="借款人邮箱" width="140"></el-table-column>
        <el-table-column prop="act_state" label="锁定状态" width="120"></el-table-column>
        <el-table-column prop="reg_time" label="注册时间" width="180"></el-table-column>
        <el-table-column prop="register" label="最近登录" width="180"></el-table-column>
        <el-table-column prop="user_source" label="用户来源" width="160"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope" styly="display:flex">
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="small"
              icon="el-icon-search"
            >
              <router-link to="/BorrowUserHome/BorrowUserChild">查看</router-link>
            </el-button>
            <el-button type="primary" size="small" @click="update(scope.row)" icon="el-icon-edit">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-footer style="margin:20px 0 10px">
      <el-row>
        <el-col style="float:right">
          <el-pagination
            background
            layout="total,prev, pager, next,sizes"
            :page-sizes="[5,10, 25, 50, 100]"
            :page-size="pagesize"
            :total="total"
            :current-page="currentPage"
            @size-change="handleSizeChange"
            @current-change="current_change"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "BorrowUser",
  components: {},
    data() {
    return {
      input: "",
      per_phone:"",
      per_name:"",
      total: 0, //默认数据总数
      pagesize: 5, //每页的数据条数
      currentPage: 1, //当前页
      options1: [
        {
          value1: "0",
          label: "搜索手机号"
        },
        {
          value1: "1",
          label: "搜索用户名"
        }
      ],
      options2: [
        {
          value2: "选项1",
          label: "导出"
        },
        {
          value2: "选项2",
          label: "全部导出"
        }
      ],
      
      value1: "",
      value2: "",
      value3: "",
      // input_phone: "17765929883",
      tableData: [{}]
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    update(row) {
      window.sessionStorage.setItem("rows", JSON.stringify(row));
      this.$router.push("/inv_pwd");
    },
    UserSearch(){
				this.inputdatacheck();
				this.axiosFun();
      },
  inputdatacheck(){
					if(this.value1==1){
						this.input_phone="";
						this.input_name=this.input_name;
					}else{
						this.input_name=""
						this.input_phone=this.input_phone;
					}
			},

  axiosFun(){
    this.Axios.get("",{
      params:{
        per_name:this.per_name,
        per_phone:this.per_name,
      }
    }).then(response => {
						this.tableData = response.data;
						this.total = this.tableData.length;
					})
					.catch(function(error) {
						console.log(error);
					});

  },
  searchFun() {
				this.total = this.tableData.length;
				this.axiosFun();
      },
  },


  // 设置监听，搜索
  // watch:{
  //   value1(){

  //   },
  //   value2(){

  //   },
  //   input_phone1(){
  //     this.Axios.get("http://rap2api.taobao.org/app/mock/177576/user",{
  //       params:{
  //         per_name:this.input_phone1
  //       }
  //     }).then(res=>{
  //          // 成功过后对表格内容进行重新赋值
  //          this.tableData = res.data;
  //          this.total = this.tableData.length;
  //     })
  //     .catch(error=>{
  //       console.log(error)
  //     })
  //   },
  //   input_phone2(){
  //     this.Axios.get("http://rap2api.taobao.org/app/mock/177576/user",{
  //       params:{
  //         per_phone:this.input_phone2
  //       }
  //     }).then(res => {
  //       // 成功过后对表格内容进行重新赋值
  //          this.tableData = res.data;
  //          this.total = this.tableData.length;
  //     })
  //     .catch(res => {
  //       console.log(error)
  //     })
  //   }
  // },

  created() {
    this.Axios.get("http://rap2api.taobao.org/app/mock/177576/user")
      .then(res => {
        // 成功过后对表格内容进行重新赋值
        this.tableData = res.data.datas.data;
        this.total = this.tableData.length;
        console.log(this.tableData);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>


<style scoped>
.nav{
  margin-top: 15px;
  width: 100%;
  overflow: hidden;

}
.Export{
  width: 150px;
  float: right;
}


</style>


