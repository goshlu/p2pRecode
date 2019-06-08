<template>
  <el-container>
    <el-header></el-header>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">*用户类型</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-radio-group v-model="radio" @change="radioFun">
            <el-radio :label="3">企业用户</el-radio>
            <el-radio :label="6">个人用户</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" :offset="2">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">*手机号码：</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input v-model="input1" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">{{nameType}}</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="grid-content bg-purple">
            <el-input v-model="input2" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">{{nameType2}}</div>
      </el-col>
      <el-col :span="6" v-if="show">
        <div class="grid-content bg-purple">
          <div class="grid-content bg-purple">
            <el-input v-model="input4" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">*邮箱</div>
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
      <el-col :span="8">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">{{nameType3}}</div>
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
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">*登录密码</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="grid-content bg-purple">
            <el-input placeholder="请输入密码" v-model="input6" show-password></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">*确认登录密码</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="grid-content bg-purple">
            <el-input placeholder="请输入密码" v-model="input7" show-password></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="14">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple-light">
          <el-button type="primary" @click="Add">确认新增</el-button>
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
  name: "BorrowInfor",
  components: {},
  methods: {
    radioFun(msg) {
      if (msg == 3) {
        this.nameType = "*企业名称:";
        // console.log(this.per_type);
        this.nameType2 = "*法人姓名:";
        this.show = true;

        // console.log(msg);
      } else {
        this.nameType = "*个人姓名:";
        this.nameType2 = "";
<<<<<<< HEAD
        this.nameType3 = "*税务登记证号"
=======
>>>>>>> 93ef49ee179fec6588144aec121de081010e08d4
        this.show = false;
      }
    },

    Add() {
      this.$confirm("是否确认增加?", "修改提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });

          this.Axios({
            methods: "post",
            url: "http://172.16.6.60:8080/member/info",
            data: {
              phone: this.input1,
              type: this.input2,
              enterprise: this.input3,
              number: this.input4,
              name: this.input5,
              email: this.input6,
              password: this.input7
            }
            // headers: {
            //   "Content-Type": "application/json"
            // }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    }
  },

  data() {
    return {
      nameType: "*企业名称:",
      nameType2: "*法人姓名:",
<<<<<<< HEAD
      nameType3:"*税务登记证号",
=======
>>>>>>> 93ef49ee179fec6588144aec121de081010e08d4
      per_type: true,
      show: "true",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      input7: "",
      radio: 3,
      radio1: "",
      textarea: ""
    };
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
  font-size: 14px;
  color: #606266;
}
/* .row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
} */
</style>


   