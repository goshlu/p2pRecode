<template>
  <div id="tender-category-home">
    <Title :navArr="navArr"/>

    <div class="content-wrap">
      <div class="add-btn">
        <el-button type="primary"  @click="handleAdd(1)">添加分类</el-button>
      </div>

      <el-table
        :data="tableData"
        style="width: 100%"
        stripe
        :cell-style="{border:'none',fontSize:'14px'}"
        :header-cell-style="{color:'#333',backgroundColor:'#EBEEF5',fontSize:'14px'}"
      >
        <el-table-column
          prop="cateName"
          label="分类名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="sortNum"
          label="排序"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status==0" class="off">禁用</span>
            <span v-else class="on">启用</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
                       @click="handleEdit(2, scope.$index, scope.row)">修改</el-button>
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


    <!--模态框-->
    <div class="modal" v-show="isShowModal">
      <div class="modal-content">
        <div class="title">
          <span>{{whatModalTitle === 1?"添加分类":"修改分类"}}</span>
          <i class="el-icon-close" style="cursor: pointer;font-size: 30px;" @click="showModal"></i>
        </div>
        <div class="main">
          <el-form class="modalForm" :label-position="labelPosition"
                   label-width="100px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign"
          >
            <el-form-item label="分类名称：" required>
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="排序：" prop="sortNum">
              <el-input v-model.number="formLabelAlign.sortNum" style="width: 170px;"></el-input>
              <span>数值越大越靠前</span>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select v-model="formLabelAlign.optionsValue" style="width: 170px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>禁用则前台不展示</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="btns">
          <el-button type="primary">确定</el-button>
          <el-button @click="showModal">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Title from "./../commonComponents/headerTitle";
  // import {getCategoryList} from '../../api'
  import baseUrl from "../../api/baseUrl";

  export default {
    name: "TenderCategory",
    components:{
      Title
    },
    created(){
      //禁用/启用

      // 获取列表 status=1&page=1&limit=5 sName sPhone
      this.Axios.get(baseUrl.BASE_URL+'/investment/type?page=1&limit=5').then(res => {
        console.log(res);
        this.tableData = res.data;

      }).catch((err)=>{console.log(err)});
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      showModal(addOrModify){
        this.whatModalTitle = addOrModify;
        this.isShowModal = !this.isShowModal;
      },
      //编辑
      handleEdit(whatModalTitle,index, row){
        this.showModal(whatModalTitle);
        console.log(index,row);
      },
      //添加
      handleAdd(whatModalTitle){
        this.showModal(whatModalTitle);
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


    },
    data() {
      //添加 排序数值校验
      /*let checkSortNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('排序不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 0) {
              callback(new Error('不能小于0'));
            } else {
              callback();
            }
          }
        }, 1000);
      };*/
      let checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('分类名称不能为空'));
        }
      };
      return {
        navArr:['借贷管理','借款标类别'],
        formLabelAlign:{
          name:"",
          sortNum:"",
          optionsValue:0
        },
        paginations: {
          page_index: 1, // 当前位于哪页
          total: 0, // 总数
          page_size: 5, // 1页显示多少条
          page_sizes: [5, 10, 15, 20], //每页显示多少条
          layout: "total, sizes, prev, pager, next" // 翻页属性
        },
        labelPosition:"right",
        isShowModal:false,
        tableData: [],
        allTableData: [],
        whatModalTitle : 0,
        options: [{
          value: 0,
          label: '禁用'
        }, {
          value: 1,
          label: '启用'
        }],
        rules: {
          sortNum: [
            // { validator: checkSortNum, trigger: 'blur' }
            {required:true,message:"不能为空",trigger:'blur'}
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      }
    }
  }
</script>

<style scoped>

  #tender-category-home{
    position: relative;
  }
  #tender-category-home .content-wrap{
    padding: 20px;
  }
  #tender-category-home .content-wrap .add-btn{
    margin-bottom: 30px;
  }

  .modal{
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(66,66,66,.5);
    width: 100%;
    height: 100%;
    z-index: 99;
  }
  .modal .modal-content{
    width: 700px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff;
  }
  .modal-content .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: rgba(242, 242, 242, 1);
    font-size: 20px;
    color: #555555;
    /*border-bottom: 1px solid #d5d5d5;*/
    margin-bottom: 30px;
    height: 40px;
  }
  .modal-content .main{
    width: 400px;
    margin: 30px auto 60px;
    font-size: 13px;
    color: #555555;
  }
  .modal-content .main span{
    color: #b2b2b2;
    margin-left: 10px;
  }
  .modal .modal-content .main .notes-wrap label{
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

  .on{
    /*border-radius:4px;
    border: 1px solid #37B328;*/
    color: #37B328;
  }
  .off{
    /*border-radius:4px;
    border: 1px solid red;*/
    color: red;
  }

  /*分页*/
  .pagination{
    text-align: right;
    margin-top:30px;
  }
</style>
