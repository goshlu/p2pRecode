<template>
  <div class="content_update">
    <!-- 基本信息 -->
    <div>
      <div class="up">
        <p>基本信息</p>
        <div class="update">修改</div>
      </div>

      <ul>
        <li>
          手机号:
          <input type="text" v-model="phone" :disabled="isDisabled">
        </li>
        <li>
          真实姓名:
          <input type="text" v-model="pre_name" :disabled="isDisabled">
        </li>
        <li>
          身份证号:
          <input type="text" v-model="entitle" :disabled="isDisabled">
        </li>
      </ul>
    </div>

    <!-- 银行卡信息 -->
    <div>
      <div class="up">
        <p>银行卡信息</p>
        <div class="update">修改</div>
      </div>
      <ul>
        <li>
          银行名称：
          <input type="text" v-model="blink" :disabled="isDisabled">
        </li>
        <li>
          支行名称：
          <input type="text" v-model="pre_name" :disabled="isDisabled">
        </li>
        <li>
          银行卡号：
          <input type="text" v-model="pre_name" :disabled="isDisabled">
        </li>
      </ul>
    </div>

    <!-- 操作 -->
    <div>
      <div class="up">
        <p>操作</p>
        <div class="update">修改</div>
      </div>

      <div>
        <span>状态</span>
        <input type="radio" name="applicationSystem" value="1" checked>正常
        <input type="radio" name="applicationSystem" value="2">锁定
      </div>
      <div class="textarea">
        <textarea name id cols="90" rows="6"></textarea>
      </div>
    </div>

    <!-- 按钮组 -->
    <div>
      <el-button type="primary" @click="open2">确定保存</el-button>
      <el-button @click="Pathto">取消修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "inv_update",
  components: {},

  created() {
    // 取invUserChild1里传过来的sessionStororage
    var json = JSON.parse(window.sessionStorage.getItem("rows"));
    // 需要的数据存放在data
    this.phone = json.per_phone;
    this.pre_name = json.per_name;
    this.entitle = json.int_entitle;
    this.blink = json.act_message;
    console.log(json);
  },

  data() {
    return {
      // session闯过来需要的数据字段
      phone: "",
      pre_name: "",
      entitle: "",
      blink: "",

      isDisabled: true
    };
  },
  methods: {
    open2() {
      this.$confirm("您将修改此内容，确定将会永久更改?", "修改提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    Pathto() {
      this.$router.push("/InvUser");
    },
    update() {
      this.isDisabled = false;
    }
  }
};
</script>


// 样式
<style scoped>
@import url("./../less/inv_update.less");
</style>
