<template>
  <div class="wrapper">

    <Title :navArr="navArr"/>

    <div class="wrapper-content">
      <div class="searchWrap">
        <div class="flex-item">
          <div class="searchDiff">
            <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
              <el-select v-model="searchSel" slot="prepend" placeholder="请选择" @change="searchSelectChange">
                <el-option
                  v-for="item in searchOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="executeSearch"></el-button>
            </el-input>
          </div>
        </div>
        <div class="flex-item">
          <el-button size="small">导出</el-button>
        </div>
      </div>
      <!--表格-->
      <el-table
        :data="tableData"
        stripe
        :header-cell-style="{color:'#333',backgroundColor:'#EBEEF5'}"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center">
        </el-table-column>
        <el-table-column
          prop="id"
          label="借款编号"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="borrowName"
          label="借款方"
          align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="借款人手机"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="iName"
          label="标名"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="balance"
          label="借款金额"
          align="center">
          <template slot-scope="scope">
            ￥{{scope.row.balance}}
          </template>
        </el-table-column>
        <!--<el-table-column
          prop="year_mon"
          label="年化利率">
        </el-table-column>-->
        <el-table-column
          prop="refundMethod"
          label="还款方式"
          align="center">
        </el-table-column>
        <el-table-column
          prop="deadline"
          label="期限"
          align="center">
          <template slot-scope="scope">
            {{scope.row.deadline + scope.row.deadlineTypeName}}
          </template>
        </el-table-column>
        <!--<el-table-column
          prop="uptime"
          label="上架时间"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.uptime | dateFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="开售时间"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.start_time | dateFormat}}</span>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="finishMoney"
          label="已投金额"
          align="center">
          <template slot-scope="scope">
            ￥{{scope.row.finishMoney?scope.row.finishMoney:0}}
          </template>
        </el-table-column>
        <!--<el-table-column
          prop="loan_day"
          label="投资进度">
        </el-table-column>-->
        <el-table-column
          prop="status"
          label="状态"
          align="center">
          进行中
        </el-table-column>
        <el-table-column
            label="操作"
            align="center"
        >
          <template slot-scope="scope">
            <!--<router-link :to="{name:'TenderingManageModify',params:{}}">
              <el-button type="primary" icon="el-icon-edit" size="mini">
                修改
              </el-button>
            </router-link>-->
            <el-button type="danger" icon="el-icon-download" size="mini" @click="handleCancel(scope.row.id)">下架</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <div class="pagination">
        <el-pagination
          background
          :page-sizes="paginations.page_sizes"
          :page-size="paginations.page_size"
          :layout="paginations.layout"
          :total="paginations.total"
          :current-page.sync="paginations.page_index"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>

      <div class="modal" v-show="isShowModal">
        <div class="modal-content">
          <div class="title">
            <span>下架确认</span>
            <i class="el-icon-close" style="cursor: pointer;font-size: 20px;" @click="showModal"></i>
          </div>
          <div class="main">
            <p><label>注意：</label><span style="color:#990000">标的下架后，投资款项全部返还至投资者账户中，只能获得返还的本金，无法获得利息</span></p>
            <div class="notes-wrap">
              <label><i style="color: red;margin-right: 2px;">*</i>备注：</label>
              <textarea name="notes" cols="65" rows="6" style="resize: none;" v-model="notesText"></textarea>
            </div>
          </div>
          <div class="btns">
            <el-button type="primary" @click="doDelete">确定</el-button>
            <el-button @click="showModal">取消</el-button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Title from "../../commonComponents/headerTitle";
  import baseUrl from "../../../api/baseUrl";

  export default {
    name: "TenderingManageHome",
    components: {
      Title
    },
    data() {
      return {
        id:"",
        navArr:['借贷管理','进行中标的管理'],
        isShowModal: false,
        searchText: "",
        notesText:"",
        tableData: [/*{
          id:1,
          phone:13323479765,
          year_mon:"2%",
          loan_method:"按月付息",
          money:1988,
          date: '2016-05-02',
          name: '标名',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          start_time:"2017-01-01T04:23:33.000Z",
          uptime: "2017-01-01T04:23:33.000Z",
          state: 5,
          loan_m_money: "200",
          loan_day: "5天",
          member:{
            username:"王小虎"
          }
        }*/],
        allTableData: [],
        input5: "",
        searchSel: 0,
        modeSel: "",
        searchOpt: [
          {value: 0, label: "全部"},
          {value: 1, label: "借款方"},
          {value: 2, label: "借款人手机"}
        ],
        paginations: {
          page_index: 1, // 当前位于哪页
          total: 0, // 总数
          page_size: 5, // 1页显示多少条
          page_sizes: [5, 10, 15, 20], //每页显示多少条
          layout: "total, sizes, prev, pager, next" // 翻页属性
        },
      };
    },
    created(){
      //sName &sPhone=17244562861
      // let params = `page=${this.paginations.page_index}&limit=${this.paginations.page_size}`;
      //获取信息列表
      /*this.Axios.get(baseUrl.BASE_URL+'/element/elements?page=1&limit=5').then(res => {
        console.log(res);
        this.tableData = res.data.data;
        // 总页数
        this.paginations.total = this.tableData.length;
      }).catch((err)=>{console.log(err)});*/


      this.Axios.get(baseUrl.BASE_URL+`/getTenderAll?page=${this.paginations.page_index}&limit=${this.paginations.page_size}&moduleTypeId=4`).then(res => {
        console.log(res);
        this.tableData = res.data.data;
        // 总页数
        this.paginations.total = res.data.total;
      }).catch((err)=>{console.log(err)});
    },
    methods: {
      //下架
      handleCancel(id) {
        this.showModal();
        this.id = id;
      },
      doDelete(){
        /*this.Axios.delete(baseUrl.BASE_URL+'/element/elements/'+this.id).then(res => {
          console.log(res);
        }).catch((err)=>{console.log(err)});*/

        this.Axios.post(baseUrl.BASE_URL+'/editTender',{id:this.id,status:10}).then(res => {
          this.$message({
            message: '下架成功，请前往“"所有借款标"进行查看',
            type: 'success'
          });
          this.showModal();

          this.Axios.get(baseUrl.BASE_URL+`/getTenderAll?page=${this.paginations.page_index}&limit=${this.paginations.page_size}&moduleTypeId=4`).then(res => {
            console.log(res);
            this.tableData = res.data.data;
            // 总页数
            this.paginations.total = res.data.total;
          }).catch((err)=>{console.log(err)});
        }).catch((err)=>{console.log(err)});
      },
      showModal() {
        this.notesText = "";
        this.isShowModal = !this.isShowModal;
      },
      executeSearch(){
        if(this.searchSel == 1 && this.searchText != ""){ //搜索借款方
          this.paginations.page_index = 1;
          this.Axios.get(baseUrl.BASE_URL+`/getTenderAll?page=${this.paginations.page_index}
          &limit=${this.paginations.page_size}&moduleTypeId=4&name=${this.searchText}&notes=${this.notesText}`).then(res => {
            this.tableData = res.data.data;
            // 总页数
            this.paginations.total = res.data.total;
          }).catch((err)=>{console.log(err)});
        }else if(this.searchSel == 2 && this.searchText != ""){ //搜索借款方手机
          this.paginations.page_index = 1;
          this.Axios.get(baseUrl.BASE_URL+`/getTenderAll?page=${this.paginations.page_index}
          &limit=${this.paginations.page_size}&moduleTypeId=4&phone=${this.searchText}&notes=${this.notesText}`).then(res => {
            this.tableData = res.data.data;
            // 总页数
            this.paginations.total = res.data.total;
          }).catch((err)=>{console.log(err)});
        }else{
          return this.$message('请选择搜索类型或输入搜索内容！');
        }
      },
      searchSelectChange(){
        if(this.searchSel == 0) {
          this.paginations.page_index = 1;
          this.Axios.get(baseUrl.BASE_URL+`/getTenderAll?page=${this.paginations.page_index}&limit=${this.paginations.page_size}&moduleTypeId=4`).then(res => {
            this.tableData = res.data.data;
            // 总页数
            this.paginations.total = res.data.total;
          }).catch((err)=>{console.log(err)});
        }
      },
      //选择框
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCurrentChange(page) {
        this.paginations.page_index = page;
        this.Axios.get(baseUrl.BASE_URL+`/getTenderAll?page=${this.paginations.page_index}&limit=${this.paginations.page_size}&moduleTypeId=4`).then(res => {
          this.tableData = res.data.data;
          // 总页数
          this.paginations.total = res.data.total;
        }).catch((err)=>{console.log(err)});
      },
      handleSizeChange(page_size) {
        // 切换size
        this.paginations.page_index = 1;
        this.paginations.page_size = page_size;
        this.Axios.get(baseUrl.BASE_URL+`/getTenderAll?page=${this.paginations.page_index}&limit=${this.paginations.page_size}&moduleTypeId=4`).then(res => {
          this.tableData = res.data.data;
          // 总页数
          this.paginations.total = res.data.total;
        }).catch((err)=>{console.log(err)});
      },
      setPaginations() {
        // 总页数
        this.paginations.total = this.tableData.length;
        /*this.paginations.page_index = 1;
        this.paginations.page_size = 5;
        // 设置默认分页数据
        this.tableData = this.allTableData.filter((item, index) => {
          return index < this.paginations.page_size;
        });*/
      },
    }
  };
</script>

<style scoped>
  .wrapper .wrapper-content{
    padding: 20px;
  }

  .searchWrap{
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .searchWrap .searchDiff{
    /*flex-basis: 40%;*/
    flex-grow: 0;
  }
  .searchWrap >>> .el-select .el-input {
    width: 130px;
  }
  .searchWrap >>> .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .flex-item{
    display: flex;
  }
  .flex-item .searchDiff{
    margin-right: 20px;
  }

  .wrapper .wrapper-content .modal {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(66, 66, 66, .5);
    width: 100%;
    height: 100%;
    z-index: 99;
  }

  .wrapper .wrapper-content .modal .modal-content {
    width: 700px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
  }

  .wrapper .wrapper-content .modal .modal-content .title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 15px;
    background-color: #646973;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #d5d5d5;
  }

  .wrapper .wrapper-content .modal .modal-content .main {
    width: 555px;
    margin: 30px auto 60px;
    font-size: 13px;
    color: #555555;
  }

  .wrapper .wrapper-content .modal .modal-content .main .notes-wrap {
    display: flex;
    margin-top: 40px;
  }

  .wrapper .wrapper-content .modal .modal-content .main .notes-wrap label {
    margin-left: -9px;
  }

  .modal .modal-content .main label {
    margin-right: 5px;
  }

  .modal .modal-content .btns {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    border-top: 1px solid #d5d5d5;
  }

  .modal .modal-content .btns .el-button {
    width: 120px;
    height: 45px;
  }

  .modal .modal-content .btns .el-button:first-child {
    margin-right: 40px;
  }

  .modal .modal-content .btns .el-button:hover {
    box-shadow: 2px 2px 5px #adadad;
  }

  /*分页*/
  .pagination{
    text-align: right;
    margin-top:30px;
  }
</style>

