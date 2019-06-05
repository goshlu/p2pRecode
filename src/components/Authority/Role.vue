<template>
  <el-container>
    <el-header class="container">toubu</el-header>
    <el-main class="container">
      <div class="content">
        <!-- 左边栏目 -->
        <div>
          <ul v-for="(lis,i) in RarrList" :key="i">
            <li>{{lis.Rname}}</li>
          </ul>

          <input type="text" v-show="isShow" v-model="addNum.Rname">
          {{addNum.Rname}}
          <div class="add" @click="add">增加角色</div>
        </div>

        <!-- 右边栏目 -->

        <div>
          <div class="content_check" v-for="(item,i) in LarrList" :key="i">
            <div class="title">
              <ul>
                <li>{{item.gtitle}}</li>
                <li>
                  <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </li>
              </ul>
            </div>

            <div class="checkbox">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  name: "Role",
  components: {},
  data() {
    return {
      value: true,
      checkAll: false,
      checkedCities: ["上海", "北京"],
      cities: cityOptions,
      isIndeterminate: true,

      //   add
      isShow: false,
      addNum: {
        Rname: ""
      },

      //   选择

      RarrList: [
        { Rname: "超级管理员" },
        { Rname: "标管理员" },
        { Rname: "客户经理" },
        { Rname: "审核专员" },
        { Rname: "财务人员" },
        { Rname: "客服服务" }
      ],

      LarrList: [
        { gtitle: "借贷管理" },
        { gtitle: "还款管理" },
        { gtitle: "资金管理" },
        { gtitle: "会员管理" },
        { gtitle: "权限管理" }
      ]
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    add() {
      this.isShow = true;
      this.RarrList.push(this.addNum);
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./less/Role.less");
</style>

