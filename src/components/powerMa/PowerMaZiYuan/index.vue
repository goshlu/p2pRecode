<template>
  <div class="PowerMaBu">
    <div class="ContentBoxBox">
      <Title :navArr="navArr"/>
      <div class="seleAndBtn">
        <div class="selects">
          <div>
            <p>功能筛选：</p>
            <el-select v-model="selectValue" placeholder="全部模块">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <p class="nameSearch">资源搜索：</p>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input21"></el-input>
            <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
          </div>
        </div>
        <div class="btns">
          <el-button type="primary" @click="addNew" plain>新增资源</el-button>
          <el-button type="danger" @click="deleteMuch" plain>批量删除</el-button>
        </div>
      </div>

      <div class="table">
        <el-table :stripe="true" :border="false" ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id"  label="编号" width="180"></el-table-column>
          <el-table-column prop="name" label="资源名称" width="180"></el-table-column>
          <el-table-column prop="uri" label="资源路径" width="200"></el-table-column>
          <el-table-column prop="description" label="对应功能" show-overflow-tooltip></el-table-column>
          <el-table-column prop="time" label="对应功能" show-overflow-tooltip></el-table-column>
          <el-table-column prop="do" label="操作" width="260">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pages">
        <div class="totalNum">共120条</div>
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
  import {powerMaZiYuan} from './../../../api/index';
  import {POWER_MA} from './../../../api/baseUrl';
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
        selectValue:'',
        DetailAlertId:"",
        navArr:['权限管理','资源管理'],
        input21:"",
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
        tableData3: [
          {
            id: '99921',
            name: '查看',
            uri:'借贷管理',
            time:'浏览表格信息',
            description:""
          },
          ],
          multipleSelection: [],
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


        this.Axios.put("http://172.16.6.72:8080/resource/info",{
          id:55,
          name:"changeTest",
          uri:"changeTest/changeTest"
        }).then(
          res => {
            console.log(res.data);
          }
        ).catch(
          error=>{
            console.log(error);
          }
        )


      },
      handleDelete(index, row) {
        // console.log(index, row);
        this.isShowDelete = true;
        this.deleteId = [row.numberId],

        this.Axios.delete("http://172.16.6.72:8080/resource/info/55").then(
          res => {
            console.log(res.data);
            
          }
        ).catch(
          error=>{
            console.log(error);
            
          }
        )

      },
      deleteMuch(){
        this.isShowDelete = true;
        this.deleteId = this.multipleSelection.map((item)=>{
          return item.numberId
        });
      },
      datailCancle(type){
        this.isShowDetailAlertBox=type;
        this.isShowAddNew=type;
        this.isShowDelete=type;
      },
      addNew(){
        this.isShowAddNew=true;
      },
      search(){
        this.Axios.get(`http://172.16.6.72:8080/resource/info?name=菜单信息`).then(

          res => {
            console.log(res.data);
            
          }
        ).catch(
          error=>{
            console.log(error);
            
          }
        )
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    },

    beforeCreate(){
      this.Axios.get('http://172.16.6.72:8080'+powerMaZiYuan+'?page=1&limit=6').then(
        res=>{
          console.log(res.data.count);
          this.tableData3 = res.data.data
        }
      ).catch(
        error=>{
          console.log(error);
        }
      )
    }
  }
</script>

<style lang="stylus">
  .nameSearch
    // width 110px !important 
</style>

