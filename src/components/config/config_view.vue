<template>
  <div class="view">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="类型">
        <el-select v-model="form.addListValue" placeholder="请选择添加类型">
          <el-option
            v-for="(item,index) in addList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>

      <el-form-item label="是否可用">
        <el-radio-group v-model="form.statusValue">
          <el-radio v-for="(item,i) in statusList" :key="i" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      addList: [
        { label: "还款类型", value: 0 },
        { label: "借款类型", value: 1 },
        { label: "竞标状态", value: 2 },
        { label: "竞标类型", value: 3 }
      ],
      statusList: [{ label: "可用", value: 0 }, { label: "不可用", value: 1 }],

      form: {
        addListValue: "",
        statusValue: "",
        name: "",
        desc: ""
      },

      newArr: {
        id: "",
        type: "",
        name: "",
        description: "",
        status: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.newArr.name = this.form.name;
      this.newArr.description = this.form.desc;
      this.newArr.type = this.form.addListValue;
      this.newArr.status = this.form.statusValue;

      if (this.newArr.name != "" || undefined || null) {
        //   存储需要提交的值
        let postList = {
          name: this.newArr.name,
          description: this.newArr.description
        };
        let MAN =
          "您正在添加一条数据，提交信息为 名称：" +
          postList.name +
          "的数据, 是否继续?";
        // 确人是否提交
        this.$confirm(MAN, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "提交成功!"
            });

            // 确定后使用axios post提交到服务端
            this.Axios.post("", postList, {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
              .then(function(res) {
                console.log(res);
              })
              // 提交错误
              .catch(function(err) {
                console.log(err);
              });
          })
          // 取消提交
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });

        // 提交清空表单内容，差一个判断
        this.form.name = "";
        this.form.desc = "";
        this.form.addListValue = "";
        this.form.statusValue = "";
      } else {
        this.$message({
          showClose: true,
          message: "添加数据的 名称 不能为空",
          type: "error"
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.view {
  width: 30vw;
}
</style>
