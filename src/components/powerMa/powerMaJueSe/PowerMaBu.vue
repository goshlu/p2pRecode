<template>
  <div class="PowerMaBu">
    <div class="ContentBoxBox">
      <Title :navArr="navArr"/>
      <div class="seleAndBtn">
        <div class="selects">
          <div>
            <p>职位筛选：</p>
            <el-dropdown>
              <el-button class="el-dropdown-link">
                全部职位<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>人 事 部</el-dropdown-item>
                <el-dropdown-item>市 场 部</el-dropdown-item>
                <el-dropdown-item>运 营 部</el-dropdown-item>
                <el-dropdown-item>研 发 部</el-dropdown-item>
                <el-dropdown-item>客 服 部</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
            
          <div>
            <p class="jueseSearch">角色搜索：</p>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input21"></el-input>
          </div>
        </div>
        <div class="btns">
          <el-button type="primary" plain>新增角色</el-button>
          <el-button type="danger" plain>批量删除</el-button>
        </div>
      </div>

      <div class="table">
        <el-table :stripe="true" :border="false" ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="numberId"  label="角色编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="title" label="角色名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bumen" label="所属职位" show-overflow-tooltip></el-table-column>
          <el-table-column prop="powerInfo" label="模块" show-overflow-tooltip></el-table-column>
          <el-table-column prop="do" label="操作" width="260">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pages">
        <!-- <el-pagination background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="sizes"
          :total="100">
        </el-pagination> -->
        <div class="totalNum">共120条</div>
        <!-- <el-pagination background layout="prev, pager, next" :total="50">
        </el-pagination> -->
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
  </div>
</template>

<script>
  import Title from './../../commonComponents/headerTitle';
  import AlertBox from './AlertBox.vue';
  export default {
    name:'PowerMaBu',
    components:{
      Title,
      AlertBox
    },
    data(){
      return{
        DetailAlertId:"",
        navArr:['权限管理','角色管理'],
        input21:"",
        tableData3: [
          {
            numberId: '99921',
            title: '审核专员',
            bumen: '审核',
            powerInfo: '审核模块'
          },{
            numberId: '99921',
            title: '审核专员',
            bumen: '审核',
            powerInfo: '审核模块'
          },{
            numberId: '99921',
            title: '审核专员',
            bumen: '审核',
            powerInfo: '审核模块'
          },{
            numberId: '99921',
            title: '审核专员',
            bumen: '审核',
            powerInfo: '审核模块'
          },{
            numberId: '99921',
            title: '审核专员',
            bumen: '审核',
            powerInfo: '审核模块'
          },{
            numberId: '99921',
            title: '审核专员',
            bumen: '审核',
            powerInfo: '审核模块'
          },
          ],
          multipleSelection: [],
          isShowDetailAlertBox:false,
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
        console.log(index, row);
        
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      datailCancle(type){
        this.isShowDetailAlertBox=type;
      }
    },
  }
</script>

<style lang="stylus">
  .jueseSearch
    width 110px !important
</style>

