<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <div class="title">
        <h1 style="margin-bottom: 20px;">招标管理</h1>
      </div>
      <div class="searchWrap">
        <div>
          <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
            <el-select v-model="searchSel" slot="prepend" placeholder="请选择">
              <el-option
                v-for="item in searchOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
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
          fixed
          prop="date"
          label="借款编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="借款方"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="借款人手机"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="标名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="借款金额"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="年化利率"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="还款方式"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="期限"
          width="90">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="上架时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="开售时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="已投金额"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="投资进度"
          width="80">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="状态"
          width="80">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"><router-link to="TenderingManageModify">修改</router-link></el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" size="small" @click="showModal">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <Pagination></Pagination>

      <div class="modal" v-show="isShowModal" @click="showModal">
        <div class="modal-content" @click.stop>
          <div class="title">
            <span>下架确认</span>
            <i class="el-icon-close" style="cursor: pointer;font-size: 30px;" @click.stop="showModal"></i>
          </div>
          <div class="main">
            <p><label>注意：</label><span style="color:#990000">标的下架后，投资款项全部返还至投资者账户中，只能获得返还的本金，无法获得利息</span></p>
            <div class="notes-wrap">
              <label><i style="color: red;margin-right: 2px;">*</i>备注：</label>
              <textarea name="notes" cols="65" rows="6" v-model="notesText"></textarea>
            </div>
          </div>
          <div class="btns">
            <el-button type="primary">确定</el-button>
            <el-button @click="showModal">取消</el-button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Pagination from "../Pagination/Pagination";

  export default {
    name: "TenderingManageHome",
    data() {
      return {
        isShowModal:false,
        notesText:"",
        tableData: [
          {
            date: "2016-05-02",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1517 弄",
            zip: 200333
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1519 弄",
            zip: 200333
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1516 弄",
            zip: 200333
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1516 弄",
            zip: 200333
          }
        ],
        input5: "",
        searchSel: 0,
        modeSel: "",
        searchOpt: [
          { value: 0, label: "全部" },
          { value: 1, label: "借款方" },
          { value: 2, label: "借款人手机" }
        ]
      };
    },
    components: {
      Pagination
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      showModal(){
        this.notesText = "";
        this.isShowModal = !this.isShowModal;
      }
    }
  };
</script>

<style scoped>
  .wrapper {
    width: 100%;
    margin-top: 50px;
  }
  .searchWrap {
    display: flex;
    margin-bottom: 30px;
  }
  .searchWrap >>> .el-select .el-input {
    width: 120px;
  }
  .searchWrap >>> .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .wrapper >>> .el-pagination{
    /*right: 0;
    bottom: -15%;*/
    bottom: -10px;
  }

  .wrapper .wrapper-content .modal{
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(66,66,66,.5);
    width: 100%;
    height: 100%;
    z-index: 99;
  }
  .wrapper .wrapper-content .modal .modal-content{
    width: 700px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff;
  }
  .wrapper .wrapper-content .modal .modal-content .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: rgba(242, 242, 242, 1);
    font-size: 20px;
    color: #555555;
    border-bottom: 1px solid #d5d5d5;
  }
  .wrapper .wrapper-content .modal .modal-content .main{
    width: 555px;
    margin: 30px auto 60px;
    font-size: 13px;
    color: #555555;
  }
  .wrapper .wrapper-content .modal .modal-content .main .notes-wrap{
    display: flex;
    margin-top: 40px;
  }
  .wrapper .wrapper-content .modal .modal-content .main .notes-wrap label{
    margin-left: -9px;
  }
  .modal .modal-content .main label{
    margin-right: 5px;
  }
  .modal .modal-content .btns{
    display: flex;
    justify-content: center;
    padding: 20px 0;
    border-top: 1px solid #d5d5d5;
  }
  .modal .modal-content .btns .el-button{
    width: 120px;
    height: 45px;
  }
  .modal .modal-content .btns .el-button:first-child{
    margin-right: 40px;
  }
  .modal .modal-content .btns .el-button:hover{
    box-shadow: 2px 2px 5px #adadad;
  }
</style>

