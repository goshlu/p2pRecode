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
          <el-table-column prop="id"  label="角色编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" label="角色名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="time" label="创建时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="状态" show-overflow-tooltip></el-table-column>
          <el-table-column prop="description" label="备注" show-overflow-tooltip></el-table-column>
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
        <el-pagination
          v-if="isShowPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="limitArr"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count">
        </el-pagination>
      </div>
    </div>
    <div class="AlertBoxBox"  v-if="isShowDetailAlertBox">
      <AlertBox @datailCancle="datailCancle" :detail="detailMe"/>
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
        detailMe:"",
        deleteId:[],
        search:"",
        isShowPage:false,
        selectValue:"",
        count:100,
        currentPage: 1,
        limitArr:[5, 10, 15, 20],
        limit:5,
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
          // {
          //   id: '99921',
          //   name: '审核专员',
          //   time: '审核',
          //   description: '审核模块',
          //   status:'审核相关',
              // children:[]
          // }
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
        this.detailMe=row;
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
        //选择每页条数
        // console.log(`每页 ${val} 条`);
        // let limit = this.limit;
        
        this.limit = val;
        this.Axios.get(`http://172.16.6.72:8080/role/info?page=1&limit=${val}`).then(
          res => {
            // console.log("每页条数"+res.data);
            let arr = [...res.data.data];
            this.tableData = arr.map(item => {
              return {
                id:item.id,
                name:item.name,
                time:item.time,
                status:item.status,
                description:item.description,
                children:item.autority,
              }
            });
          }).catch(
          error=>{
            // console.log(error);              
        })
        
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
        let limit = this.limit;
        //选择第几页
        this.Axios.get(`http://172.16.6.72:8080/role/info?page=${val}&limit=${limit}`).then(
          res => {
            // console.log("每页条数"+res.data);
            let arr = [...res.data.data];
            this.tableData = arr.map(item => {
              return {
                id:item.id,
                name:item.name,
                time:item.time,
                status:item.status,
                description:item.description,
                children:item.autority,
              }
            });
          }).catch(
          error=>{
            // console.log(error);              
        })
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
        let limit = this.limit;
        let search = this.search;
        this.Axios.get(`http://172.16.6.72:8080/role/info?name=${search}&page=1&limit=${limit}`).then(
            res => {
              // console.log(res.data);
              this.count = res.data.count;
              let arr = [...res.data.data];
              this.tableData = arr.map(item => {
                return {
                  id:item.id,
                  name:item.name,
                  time:item.time,
                  status:item.status,
                  description:item.description,
                  children:item.autority,
                }
              });
            }).catch(
            error=>{
              // console.log(error);              
        })
      }
    },
    created(){
      //获取数据，渲染
      let limit = this.limit;
      this.Axios.get(`http://172.16.6.72:8080/role/info?page=1&limit=${limit}`).then(
          res => {
            // console.log(res.data);
            this.count = res.data.count;
            this.isShowPage = true;
            let arr = [...res.data.data];
            this.tableData = arr.map(item => {
              return {
                id:item.id,
                name:item.name,
                time:item.time,
                status:item.status,
                description:item.description,
                children:item.autority,
              }
            });
          }).catch(
          error=>{
            // console.log(error);
            
      })
    },
  }
</script>

<style lang="stylus">
  .jueseSearch
    // width 145px !important
</style>

