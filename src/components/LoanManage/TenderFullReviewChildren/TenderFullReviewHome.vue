<template>
  <div class="wrapper">
    <Title :navArr="navArr"/>

    <div class="wrapper-content">
      <div class="searchWrap">
        <div class="flex-item">
          <div class="searchDiff">
            <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
              <el-select
                v-model="searchSel"
                slot="prepend"
                placeholder="请选择"
                @change="searchSelectChange"
              >
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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="借款编号"></el-table-column>
        <el-table-column prop="borrowName" label="借款方" width="200"></el-table-column>
        <el-table-column prop="phone" label="借款人手机" width="130"></el-table-column>
        <el-table-column prop="iName" label="标名"></el-table-column>
        <el-table-column prop="balance" label="借款金额">
          <template slot-scope="scope">
            ￥{{scope.row.balance}}
          </template>
        </el-table-column>
        <el-table-column prop="yearRateName" label="年化利率"></el-table-column>
        <el-table-column prop="refundMethod" label="还款方式" width="100"></el-table-column>
        <el-table-column prop="deadline" label="期限">
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
        <el-table-column prop="balance" label="已投金额">
          <template slot-scope="scope">
            ￥{{scope.row.balance}}
          </template>
        </el-table-column>
        <el-table-column prop="riskName" label="风险等级"></el-table-column>
        <el-table-column prop="status" label="状态">满标待审</el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="{name:'TenderFullReviewRedo',params:{row:scope.row}}">
              <el-button type="primary" icon="el-icon-view" size="mini">复审</el-button>
            </router-link>
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

    </div>
  </div>
</template>

<script>
import Title from "../../commonComponents/headerTitle";
import baseUrl from "../../../api/baseUrl";

export default {
  name: "TenderingFullReviewHome",
  components: {
    Title,baseUrl
  },
  data() {
    return {
      navArr: ["借贷管理", "满标审核"],
      notesText: "",
      isShowModal: false,
      searchText: "",
      tableData: [],
      allTableData: [],
      input5: "",
      searchSel: 0,
      modeSel: "",
      searchOpt: [
        { value: 0, label: "全部" },
        { value: 1, label: "借款方" },
        { value: 2, label: "借款人手机" }
      ],
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next" // 翻页属性
      }
    };
  },
  created() {
    // this.tableDataOrigin = this.tableData;

    /*this.Axios.get("http://172.16.6.75:8080/element/fullElement?status=1")
      .then(res => {
        console.log(res);
        // this.allTableData = res.data;
        this.setPaginations();
      })
      .catch(err => {
        console.log(err);
      });*/

    this.Axios.get(baseUrl.BASE_URL+`/getTenderAll?page=${this.paginations.page_index}&limit=${this.paginations.page_size}&moduleTypeId=5`).then(res => {
      this.tableData = res.data.data;
      // 总页数
      this.paginations.total = res.data.total;
    }).catch((err)=>{console.log(err)});
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
    executeSearch(){
      if(this.searchSel == 1 && this.searchText != ""){ //搜索借款方
        this.paginations.page_index = 1;
        this.Axios.get(baseUrl.BASE_URL+`/getTenderAll?page=${this.paginations.page_index}
          &limit=${this.paginations.page_size}&moduleTypeId=5&name=${this.searchText}`).then(res => {
          this.tableData = res.data.data;
          // 总页数
          this.paginations.total = res.data.total;
        }).catch((err)=>{console.log(err)});
      }else if(this.searchSel == 2 && this.searchText != ""){ //搜索借款方手机
        this.paginations.page_index = 1;
        this.Axios.get(baseUrl.BASE_URL+`/getTenderAll?page=${this.paginations.page_index}
          &limit=${this.paginations.page_size}&moduleTypeId=5&phone=${this.searchText}`).then(res => {
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
        this.Axios.get(baseUrl.BASE_URL+`/getTenderAll?page=${this.paginations.page_index}&limit=${this.paginations.page_size}&moduleTypeId=5`).then(res => {
          this.tableData = res.data.data;
          // 总页数
          this.paginations.total = res.data.total;
        }).catch((err)=>{console.log(err)});
      }
    },
    //选择框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    handleCurrentChange(page) {
      this.paginations.page_index = page;
      this.Axios.get(baseUrl.BASE_URL+`/getTenderAll?page=${this.paginations.page_index}&limit=${this.paginations.page_size}&moduleTypeId=5`).then(res => {
        this.tableData = res.data.data;
        // 总页数
        this.paginations.total = res.data.total;
      }).catch((err)=>{console.log(err)});
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.Axios.get(baseUrl.BASE_URL+`/getTenderAll?page=${this.paginations.page_index}&limit=${this.paginations.page_size}&moduleTypeId=5`).then(res => {
        this.tableData = res.data.data;
        // 总页数
        this.paginations.total = res.data.total;
      }).catch((err)=>{console.log(err)});
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
    }
  }
};
</script>

<style scoped>
.wrapper .wrapper-content {
  padding: 20px;
}

.searchWrap {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.searchWrap .searchDiff {
  /*flex-basis: 40%;*/
  flex-grow: 0;
}
.searchWrap >>> .el-select .el-input {
  width: 130px;
}
.searchWrap >>> .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.flex-item {
  display: flex;
}
.flex-item .searchDiff {
  margin-right: 20px;
}

.wrapper .wrapper-content .modal {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(66, 66, 66, 0.5);
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

/*分页*/
.pagination {
  text-align: right;
  margin-top: 30px;
}
</style>
