<template>
  <div class="PowerMaBu">
    <div class="ContentBoxBox">
      <Title :navArr="navArr"/>
      <div class="seleAndBtn">
        <div class="selects">
          <div>
            <p class="nameSearch">职位搜索：</p>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input21"></el-input>
            <el-button @click="searchMe" slot="append" icon="el-icon-search"></el-button>
          </div>
        </div>
        <div class="btns">
          <el-button type="primary" @click="addNew" plain>新增职位</el-button>
          <el-button type="danger" @click="deleteMuch" plain>批量删除</el-button>
        </div>
      </div>

      <div class="table">
        <el-table :stripe="true" :border="false" ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="numberId"  label="编号" width="180"></el-table-column>
          <el-table-column prop="name" label="职位名称" width="200"></el-table-column>
          <el-table-column prop="info" label="职位描述" width="260"></el-table-column>
          <el-table-column prop="juese" label="包含角色"></el-table-column>
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
        DetailAlertId:"",
        multipleSelection: [],      
        navArr:['权限管理','职位管理'],
        input21:"",
        tableData3: [
          {
            numberId: '99921',
            name: '借贷经理',
            info:'经理',
            juese:'审核专员、上架专员、下架专员、浏览用户'
          },
          ],
          isShowDetailAlertBox:false,
          isShowAddNew:false,
          isShowDelete:false,
      }
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
        this.Axios.get("http://172.16.6.72:8080/role/group?name=角色组1&page=1&limit=3").then(
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
      this.Axios.get("http://172.16.6.72:8080/role/group?page=1&limit=5").then(
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
  .nameSearch
    // width 110px !important 
</style>

