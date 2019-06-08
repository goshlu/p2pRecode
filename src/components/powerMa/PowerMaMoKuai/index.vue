<template>
  <div class="PowerMaBu">
    <div class="ContentBoxBox">
      <Title :navArr="navArr"/>
      <div class="seleAndBtn">
        <div class="selects">
          <div>
            <p class="nameSearch">模块搜索：</p>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input21"></el-input>
          </div>
        </div>
        <div class="btns">
          <el-button type="primary" plain>新增模块</el-button>
          <el-button type="danger" plain>批量删除</el-button>
        </div>
      </div>

      <div class="table">
        <el-table :stripe="true" :border="false" ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="numberId"  label="编号" width="180"></el-table-column>
          <el-table-column prop="name" label="模块名称" width="200"></el-table-column>
          <el-table-column prop="info" label="模块描述" width="260"></el-table-column>
          <el-table-column prop="juese" label="包含功能"></el-table-column>
          <el-table-column prop="do" label="操作" show-overflow-tooltip  width="260">
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
        navArr:['权限管理','模块管理'],
        input21:"",
        tableData3: [
          {
            numberId: '99921',
            name: '借贷管理',
            info:'借贷相关',
            juese:'查看、新增、编辑、审核、上架、下架'
          },{
            numberId: '99921',
            name: '还款管理',
            info:'还款相关',
            juese:'查看、新增、编辑、审核、上架、下架'
          },{
            numberId: '99921',
            name: '资金管理',
            info:'资金相关',
            juese:'查看、新增、编辑、审核、上架、下架'
          },{
            numberId: '99921',
            name: '会员管理',
            info:'会员相关',
            juese:'查看、新增、编辑、审核、上架、下架'
          },{
            numberId: '99921',
            name: '权限管理',
            info:'权限相关',
            juese:'查看、新增、编辑、审核、上架、下架'
          },{
            numberId: '99921',
            name: '系统配置',
            info:'配置相关',
            juese:'查看、新增、编辑、审核、上架、下架'
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
  .nameSearch
    width 110px !important 
</style>

