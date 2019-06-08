  <template>
  <el-container>
    <el-header></el-header>
    <!-- <el-row>
<el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">用户类型</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple" @change="radioFun2">
          <el-radio v-model="radio1" label="1">个人用户</el-radio>
          <el-radio v-model="radio1" label="2">企业用户</el-radio>
        </div>
      </el-col>
      
      <el-col :span="2">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>-->
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">状态</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple" @change="radioFun1">
          <el-radio v-model="radio" label="1">锁定</el-radio>
          <el-radio v-model="radio" label="2">正常</el-radio>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <!-- <div class="grid-content bg-purple-dark">基本信息</div> -->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">用户编号：</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input v-model="input1" label v-if="disabled" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">手机号码：</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input v-model="input1" label v-if="disabled" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">姓名/企业名称</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="grid-content bg-purple">
            <el-input v-model="input2" v-if="disabled" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">注册时间</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="grid-content bg-purple">
            <el-input v-model="input3" v-if="disabled" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">最近</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="grid-content bg-purple">
            <el-input v-model="input4" v-if="disabled" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">用户来源</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="grid-content bg-purple">
            <el-input v-model="input5" v-if="disabled" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <!-- <div class="grid-content bg-purple-dark">操作</div> -->
      </el-col>
    </el-row>

    <!-- <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">备注</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input type="textarea" :rows="3" v-if="disabled" placeholder="请输入内容" v-model="textarea"></el-input>
        </div>
      </el-col>
    </el-row>-->
    <el-row></el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
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

  created() {
    this.datasthis.$route.params;
  },
  data() {
    return {
      datas: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      input7: "",
      radio: "2",
      radio1: "2",
      textarea: "",
      disabled: "false"
    };
  },
  methods: {
    radioFun1(msg) {
      if (msg == 2) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    radioFun2(msg) {
      if (msg == 2) {
      }
    },
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


