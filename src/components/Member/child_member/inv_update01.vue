 <!-- 
 author：李 
 time：2019年06月08日 0：37 
 -->
  <template>
  <el-container>
    <el-header></el-header>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">用户编号：</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入内容" disabled v-model="params_data.id"></el-input>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">姓名</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="grid-content bg-purple">
            <el-input placeholder="请输入内容" v-model="params_data.username"></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">手机：</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入内容" v-model="params_data.phone"></el-input>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">身份证号</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="grid-content bg-purple">
            <el-input placeholder="请输入内容"></el-input>
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
            <el-input placeholder="请输入内容" autosize type="text" v-model="params_data.register_time"></el-input>
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
            <el-input placeholder="请输入内容"></el-input>
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
            <el-input placeholder="请输入内容"></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <!-- <div class="grid-content bg-purple-dark">操作</div> -->
      </el-col>
    </el-row>

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
            <router-link to="/InvUserChildren1">返回</router-link>
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
  name: "inv_update",
  components: {},

  //   data
  data() {
    return {
      // 页面数据
      information: [],
      // 存储路由传过来的数值，需要和修改的输入框绑定
      params_data: "",
      // 请求url
      url: "http://172.16.6.60:8080/member/investment/members"
    };
  },

  created() {
    //创建后将传过来的数据存到data的parms_data中
    let obj = {};
    for (let key in this.$route.params) {
      obj[key] = this.$route.params[key];
    }
    this.params_data = obj;
  },

  /*
  ======================
  methods
*/
  methods: {
    //  保存修改弹出确定模态框
    open2() {
      this.$confirm("您将修改此内容，确定将会永久更改?", "修改提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(this.params_data.id, this.$route.params.id);

          /*   
          ==========================================================
          提交修改
          */
          //  判断修改的值和原来的值是否相等
          let isQual = false;
          for (let index in this.params_data) {
            if (this.params_data[index] !== this.$route.params[index]) {
              isQual = true;
              //   console.log(this.params_data[index] == this.$route.params[index]);
            }
          }

          // 不相等时提交修改信息到服务器
          if (isQual == true) {
            this.$message({
              type: "success",
              message: "提交修改!，正在处理中..."
            });

            /*
            =======================================
            存一下需要传的参数
            需要修改
            =======================================
             */

            let sub_data = {
              id: this.params_data.id
              // 其他需要传的值
            };

            // 发起axios请求，更改数据
            this.Axios({
              methods: "post",
              url: this.url,
              data: sub_data,
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
              //请求成功
              .then(res => {
                console.log(`请求成功：${res.status}`);
                //   判断状态码是否为 200，是提示修改成功
                if ((res, status == 200)) {
                  this.$message({
                    message: "恭喜您，数据修改成功",
                    type: success
                  });
                } else {
                  this.$message({
                    message: `错误状态码为：${res.status}，请修改`,
                    type: error
                  });
                  console.log(`错误状态码为：${res.status}`);
                }
              })
              //请求失败
              .catch(err => {
                console.log(`请求修改请求失败：${err}`);
              });
          } else {
            //   提示一下进度，提交修改
            this.$message({
              type: "error",
              message: "您没有修改任何信息，将不会提交到服务器..."
            });
            return;
          }
        })
        // 取消修改
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
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


