<template>
  <el-container>
    <Title :navArr="navArr"/>

    <el-header>
      <div class="nav">
        <el-input
          placeholder="请输入内容"
          v-model="pudata"
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
          <el-button slot="append"  @click="searchFun" icon="el-icon-search" class="but"></el-button>
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
        :header-cell-style="{color:'#333',backgroundColor:'#EBEEF5'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="用户编号" width="140"></el-table-column>
        <el-table-column prop="name" label="姓名/公司名称" width="140"></el-table-column>
        <el-table-column prop="phone" label="手机" width="140"></el-table-column>
        <el-table-column prop="borrower_email" label="借款人邮箱" width="140"></el-table-column>
        <el-table-column prop="status" label="锁定状态" width="120"></el-table-column>
        <el-table-column prop="register_time" label="注册时间" width="180"></el-table-column>
        <el-table-column prop="description" label="用户来源" width="160"></el-table-column>
        <el-table-column prop="cad" label="身份证/税务登记证号" width="180"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <!-- <template slot-scope="scope" styly="display:flex">
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="small"
              icon="el-icon-edit" 
            >
            编辑
            </el-button>
          </template> -->
          <template slot-scope="scope" style="display:flex">
            <el-button
              @click="handleClick(scope.row)"
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

    <el-footer style="margin:20px 0 10px">
      <el-row>
        <div class="footer_num">共{{this.total}}条</div>
        <el-col style="float:right">
          <el-pagination class="feny"
            background
            layout="prev, pager, next,sizes"
            :page-sizes="[5,10, 25, 50, 100]"
            :page-size="pagesize"
            
            :current-page="currentPage"
            @size-change="handleSizeChange"
            @current-change="current_change"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
import Title from "./../commonComponents/headerTitle";
export default {
  name: "BorrowUser",
  components: { Title },
    data() {
    return {
      input: "",
      pudata:"",
      phone:"",
      name:"",
      total: 0, //默认数据总数
      pagesize: 5, //每页的数据条数
      currentPage: 1, //当前页    
      // 导航
      host_url: "http://${host_url}/member/investment/members", //============================================== 更改 主机地址
      navArr: ["会员管理", " 借款用户管理"],
      url: "http://${host_url}/member/investment/members" ,//======================================主机地址

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

      
      value1: "",
      value2: "",
      value3: "",
      // input_phone: "17765929883",
      // tableData: [{}]
    };
  },
  methods: {
    handleClick(row) {
      this.$router.push({name:'BorrowUserChild',params:row})
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
    // update(row) {
    //   window.sessionStorage.setItem("rows", JSON.stringify(row));
    //   this.$router.push("/inv_pwd");
    // },
    // UserSearch(){
		// 		this.inputdatacheck();
		// 		this.axiosFun();
    //   },
    inputdatacheck(){
					if(this.value1==1){
						this.phone="";
						this.name=this.pudata;
					}else{
						this.name=""
						this.phone=this.pudata;
					}
			},

  axiosFun(){
    this.Axios.get("url",{
      params:{
        name:this.name,
        phone:this.phone,
      }
    }).then(response => {
						this.tableData = response.data;
            this.total = this.tableData.length;
            console.log(this.pudata)
					})
					.catch(function(error) {
						console.log(error);
					});

  },
  searchFun() {
        this.inputdatacheck();
				this.axiosFun();
      },
  },
   //  状态按钮
    update(row) {
      var up_status = row.status;
      if (up_status == "可用") {
        //  请求
        this.Axios.delete(`http://${host_url}/member/info/${row.id}`, {
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
        this.Axios.put(`http://${host_url}/member/info/${row.id}`, {
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

watch: {
      value1(){
       this.inputdatacheck();
      }
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
    this.Axios.get("url")
      .then(res => {
         console.log(res);
        // 成功过后对表格内容进行重新赋值
        this.tableData = res.data;
        this.total = this.tableData.length;
        // console.log(this.tableData);
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
.feny{
  float:right;
}
.footer_num {
    width: 100px;
    height: 28px;
    margin-top: 5px;
    text-align: center;
    line-height: 28px;
    margin-left: 20px;
    font-size: 16px;
    color: #888;
    width: 140px;
    border: 1px solid #dcdfe6;
  }

</style>


