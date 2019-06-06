<template>
  <div id="tender-category-home">
    <h1 style="margin-bottom: 20px;">借款标类别</h1>

    <div class="add-btn" @click="handleAdd(1)">
      <MyButton btn-type="primary" btn-text="添加分类" icon-class=""></MyButton>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
      :header-cell-style="{color:'#333',backgroundColor:'#e9e9eb'}"
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
        prop="statusChinese"
        label="状态"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status==0" class="off">{{ scope.row.statusChinese }}</span>
          <span v-else class="on">{{ scope.row.statusChinese }}</span>
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

    <Pagination @handleSizeChange="handleSizeChange" :total="tableData.length"></Pagination>

    <!--模态框-->
    <div class="modal" v-show="isShowModal">
      <div class="modal-content">
        <div class="title">
          <span>{{whatModalTitle === 1?"添加分类":"修改分类"}}</span>
          <i class="el-icon-close" style="cursor: pointer;font-size: 30px;" @click="showModal"></i>
        </div>
        <div class="main">
          <el-form class="modalForm" :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
            <el-form-item label="分类名称：" required>
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="排序：">
              <el-input v-model="formLabelAlign.sortNum" style="width: 170px;"></el-input>
              <span>数值越大越靠前</span>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select :value="formLabelAlign.optionsValue" style="width: 170px;">
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
  import Pagination from './Pagination/Pagination';
  import MyButton from './Button/Button';
  // import {getCategoryList} from '../../api'

  export default {
    name: "TenderCategory",
    components:{
      Pagination,
      MyButton
    },
    created(){
      //禁用/启用
       this.Axios.get('http://19h4o94140.51mypc.cn/tendercategory').then(res => {
         console.log(res);
         this.tableData = res.data;
          this.tableData.forEach(item => {
            if(item.status == 0){
              item.statusChinese = "禁用";
            }else{
              item.statusChinese = "启用";
            }
          });
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
      handleSizeChange(){
        alert("aaa");
      },
      //编辑
      handleEdit(whatModalTitle,index, row){
        this.showModal(whatModalTitle);
        console.log(index,row);
      }
    },
    data() {
      return {
        formLabelAlign:{
          name:"",
          sortNum:"",
          optionsValue:0
        },
        labelPosition:"right",
        isShowModal:false,
        tableData: [],
        whatModalTitle : 0,
        options: [{
          value: 0,
          label: '禁用'
        }, {
          value: 1,
          label: '启用'
        }]
      }
    }
  }
</script>

<style scoped>

  #tender-category-home{
    position: relative;
    margin: 50px auto 0;
  }
  #tender-category-home >>> .pagination-dom{
    /*right: 0;
    bottom: -15%;*/
  }
  #tender-category-home .add-btn{
    float: left;
    margin-bottom: 30px;
  }
  #tender-category-home .add-btn >>> .el-button{
    height: 40px;
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
  .modal .modal-content .main .notes-wrap{
    display: flex;
    margin-top: 40px;
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

</style>
