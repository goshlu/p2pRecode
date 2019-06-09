<template>
  <div class="PowerMaBu">
    <div class="ContentBoxBox">
      <Title :navArr="navArr"/>
      <div class="seleAndBtn">
        <div class="selects">
          <div>
            <p>职位筛选：</p>
            <el-select v-model="selectValue" placeholder="全部职位">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
            
          <div>
            <p class="jueseSearch">角色搜索：</p>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search"></el-input>
            <el-button @click="searchMe" slot="append" icon="el-icon-search"></el-button>
          </div>
        </div>
        <div class="btns">
          <el-button type="primary" @click="addNew" plain>新增角色</el-button>
          <el-button type="danger" @click="deleteMuch" plain>批量删除</el-button>
        </div>
      </div>

      <div class="table">
        <el-table :stripe="true" :border="false" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="numberId"  label="角色编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="title" label="角色名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="ziwei" label="所属职位" show-overflow-tooltip></el-table-column>
          <el-table-column prop="mokuai" label="模块" show-overflow-tooltip></el-table-column>
          <el-table-column prop="info" label="备注" show-overflow-tooltip></el-table-column>
          <el-table-column prop="do" label="操作" width="260">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pages">
        <span></span>
        <el-pagination background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="sizes,prev, pager, next"
          :total="100">
        </el-pagination>
      </div>
    </div>
    <div class="AlertBoxBox"  v-if="isShowDetailAlertBox">
      <AlertBox @datailCancle="datailCancle" :id="DetailAlertId"/>
    </div>
    <div class="AlertBoxBox"  v-if="isShowAddNew">
      <AddNew  @datailCancle="datailCancle"/>
    </div>
    <div class="AlertBoxBox"  v-if="isShowDelete">
      <Delete  @datailCancle="datailCancle" :id="deleteId"/>
    </div>
  </div>
</template>

<script>
  import Title from './../../commonComponents/headerTitle';
  import AlertBox from './AlertBox';
  import AddNew from './addNew';
  import Delete from './Delete';
  export default {
    name:'PowerMaBu',
    components:{
      Title,
      AlertBox,
      AddNew,
      Delete
    },
    data(){
      return{
        navArr:['权限管理','角色管理'],
        multipleSelection: [],
        DetailAlertId:"",
        deleteId:[],
        search:"",
        selectValue:"",
        options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
        tableData: [
          {
            numberId: '99921',
            title: '审核专员',
            ziwei: '审核',
            mokuai: '审核模块',
            info:'审核相关'
          },{
            numberId: '99921',
            title: '审核专员',
            ziwei: '审核',
            mokuai: '审核模块',
            info:'审核相关'
          },{
            numberId: '99921',
            title: '审核专员',
            ziwei: '审核',
            mokuai: '审核模块',
            info:'审核相关'
          },{
            numberId: '99921',
            title: '审核专员',
            ziwei: '审核',
            mokuai: '审核模块',
            info:'审核相关'
          },
          ],
          isShowDetailAlertBox:false,
          isShowAddNew:false,
          isShowDelete:false,
      }
    },
    computed:{

    },
    methods:{
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        
      },
      handleEdit(index, row) {
        // console.log(index, row);
        this.DetailAlertId=row.numberId;
        this.isShowDetailAlertBox=true;
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.isShowDelete = true;
        this.deleteId = [row.numberId]
      },
      deleteMuch(){
        this.isShowDelete = true;
        this.deleteId = this.multipleSelection.map((item)=>{
          return item.numberId
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      datailCancle(type){
        this.isShowDetailAlertBox=type;
        this.isShowAddNew=type;
        this.isShowDelete=type;
      },
      addNew(){
        this.isShowAddNew=true;
      },
      searchMe(){
        //搜索
        this.Axios.get("http://172.16.6.72:8080/role/info?name=权限管理员&page=1&limit=5").then(
            res => {
              console.log(res.data);
              
            }).catch(
            error=>{
              console.log(error);
              
        })
      }
    },
    beforeCreate(){
      //获取数据，渲染
      this.Axios.get("http://172.16.6.72:8080/role/info?page=2&limit=1").then(
          res => {
            console.log(res.data);
            
          }).catch(
          error=>{
            console.log(error);
            
      })
    },
  }
</script>

<style lang="stylus">
  .jueseSearch
    // width 145px !important
</style>

