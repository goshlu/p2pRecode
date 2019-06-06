<template>
  <div class="PowerMaBu">
    <Title nav="权限管理" navItem="角色管理"/>
    <div class="seleAndBtn">
      <div class="selects">
        <div>
          <p>部门筛选：</p>
          <el-dropdown>
            <el-button class="el-dropdown-link">
              全部部门<i class="el-icon-arrow-down el-icon--right"></i>
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
          <p>角色筛选：</p>
          <el-dropdown>
            <el-button class="el-dropdown-link">
              全部角色<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>总经理</el-dropdown-item>
              <el-dropdown-item>秘书</el-dropdown-item>
              <el-dropdown-item>运营专员</el-dropdown-item>
              <el-dropdown-item>人事专员</el-dropdown-item>
              <el-dropdown-item>客户专员</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>      
        </div>

        <div>
          <p>搜索：</p>
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input21"></el-input>
        </div>
      </div>
      <div class="btns">
        <el-button type="primary">新增角色</el-button>
        <el-button type="danger">删除角色</el-button>
      </div>
    </div>

    <div class="table">
      <el-table :stripe="true" :border="false" ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="numberId"  label="角色编号" width="120"></el-table-column>
        <el-table-column prop="title" label="角色名称" width="120"></el-table-column>
        <el-table-column prop="bumen" label="所属部门" show-overflow-tooltip></el-table-column>
        <el-table-column prop="powerInfo" label="权限描述" show-overflow-tooltip></el-table-column>
        <el-table-column prop="do" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
</template>

<script>
  import Title from './../../commonComponents/headerTitle';
  export default {
    name:'PowerMaBu',
    components:{
      Title,
    },
    data(){
      return{
        input21:"",
        tableData3: [{
            numberId: '99921',
            title: '审核专员',
            bumen: '运营部',
            powerInfo: '主要负责新标审核'
          },{
            numberId: '99921',
            title: '审核专员',
            bumen: '运营部',
            powerInfo: '主要负责新标审核'
          },{
            numberId: '99921',
            title: '审核专员',
            bumen: '运营部',
            powerInfo: '主要负责新标审核'
          },{
            numberId: '99921',
            title: '审核专员',
            bumen: '运营部',
            powerInfo: '主要负责新标审核'
          },{
            numberId: '99921',
            title: '审核专员',
            bumen: '运营部',
            powerInfo: '主要负责新标审核'
          },{
            numberId: '99921',
            title: '审核专员',
            bumen: '运营部',
            powerInfo: '主要负责新标审核'
          },],
          multipleSelection: []
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
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
  }
</script>

<style lang="stylus">
  
</style>