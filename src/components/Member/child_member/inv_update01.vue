<template>
  <el-container>
    <el-header></el-header>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">基本信息</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">手机号码：</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input v-model="input1" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="0">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">用户类型</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-radio v-model="radio1" label="1">正常</el-radio>
          <el-radio v-model="radio1" label="2">锁定</el-radio>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">企业名称</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="grid-content bg-purple">
            <el-input v-model="input2" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">税务登记证号</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="grid-content bg-purple">
            <el-input v-model="input3" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">法人姓名</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="grid-content bg-purple">
            <el-input v-model="input4" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">邮箱</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="grid-content bg-purple">
            <el-input v-model="input5" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">操作</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">状态</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <el-radio v-model="radio" label="1">正常</el-radio>
          <el-radio v-model="radio" label="2">锁定</el-radio>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">备注</div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea"></el-input>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple-light">
          <el-button type="primary" @click="open2">保存修改</el-button>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <el-button>
            <router-link to="/BorrowUserHome" @click="Pathto">返回</router-link>
          </el-button>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "BorrowUserChild",
  components: {},
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      input7: "",
      radio: "",
      radio1: "",
      textarea: ""
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
    }
  }
};
</script>

<style scoped>
.el-col {
  font-size: 17px;
  line-height: 40px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
/* .bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
} */
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
/* .row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
} */
</style>


