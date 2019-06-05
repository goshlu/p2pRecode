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
          <el-radio v-model="radio1" label="1">企业用户</el-radio>
          <el-radio v-model="radio1" label="2">个人用户</el-radio>
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
        <div class="grid-content bg-purple-dark">密码管理</div>
      </el-col>
    </el-row>
    
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">登录密码</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="grid-content bg-purple">
            <el-input placeholder="请输入密码" v-model="input6" show-password></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">确认登录密码</div>
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
      <el-col :span="2">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple-light"><el-button type="primary" @click="Add">确认新增</el-button></div>
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
    Add(){
      this.Axios.get("http://rap2api.taobao.org/app/mock/177576/user",{
        parmas:{
          input1:"",
          input2:"",
          input3:"",
          input4:"",
          input5:"",
          input6:"",
          input7:""
        }
      })
      .then(res => {
        console.log(this.parmas);
      })
      .catch(error => {
        console.log(error);
      });
  }
 },
  
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
        Add() {
            this.$confirm('是否确认增加?', '修改提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(
                () => {
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
            })
            .catch(
                () => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });          
                });
        },
        
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


   