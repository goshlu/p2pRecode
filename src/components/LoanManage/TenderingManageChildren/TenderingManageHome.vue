<template>
  <div class="wrapper">

    <Title :navArr="navArr"/>

    <div class="wrapper-content">
      <div class="title">
        <!--<h1 style="margin-bottom: 20px;">招标管理</h1>-->
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
          width="130">
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
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">
              <router-link :to="{name:'TenderingManageModify',params:{}}">修改</router-link>
            </el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleCancel">下架</el-button>
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
            <i class="el-icon-close" style="cursor: pointer;font-size: 30px;" @click="showModal"></i>
          </div>
          <div class="main">
            <p><label>注意：</label><span style="color:#990000">标的下架后，投资款项全部返还至投资者账户中，只能获得返还的本金，无法获得利息</span></p>
            <div class="notes-wrap">
              <label><i style="color: red;margin-right: 2px;">*</i>备注：</label>
              <textarea name="notes" cols="65" rows="6" style="resize: none;" v-model="notesText"></textarea>
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
  import Title from "../../commonComponents/headerTitle";

  export default {
    name: "TenderingManageHome",
    components: {
      Title
    },
    data() {
      return {
        navArr:['借贷管理','进行中标的管理'],
        isShowModal: false,
        notesText: "",
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
    methods: {
      //编辑
      handleCancel(row) {
        this.showModal();
        console.log(row);
      },
      showModal() {
        this.notesText = "";
        this.isShowModal = !this.isShowModal;
      },
      handleCurrentChange(page) {
        // 当前页
        let sortnum = this.paginations.page_size * (page - 1);
        let table = this.allTableData.filter((item, index) => {
          return index >= sortnum;
        });
        // 设置默认分页数据
        this.tableData = table.filter((item, index) => {
          return index < this.paginations.page_size;
        });
      },
      handleSizeChange(page_size) {
        // 切换size
        this.paginations.page_index = 1;
        this.paginations.page_size = page_size;
        this.tableData = this.allTableData.filter((item, index) => {
          return index < page_size;
        });
      },
      setPaginations() {
        // 总页数
        this.paginations.total = this.allTableData.length;
        this.paginations.page_index = 1;
        this.paginations.page_size = 5;
        // 设置默认分页数据
        this.tableData = this.allTableData.filter((item, index) => {
          return index < this.paginations.page_size;
        });
      },
    }
  };
</script>

<style scoped>
  .wrapper .wrapper-content{
    padding: 0 10px 10px 10px;
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

  .wrapper >>> .el-pagination {
    /*right: 0;
    bottom: -15%;*/
    bottom: -10px;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: rgba(242, 242, 242, 1);
    font-size: 20px;
    color: #555555;
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
</style>

