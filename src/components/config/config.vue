<template>
  <div>
    <div class="add">
      <el-button class="add_mess" @click="up_date(1)" type="primary">添加信息</el-button>
    </div>
    <div>
      <el-table :data="refund_type" style="width: 100%">
        <el-table-column prop="id" label="id" width="180"></el-table-column>
        <el-table-column prop="type" label="类型" width="180"></el-table-column>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="status" label="是否可用"></el-table-column>
        <!-- 操作 -->
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="up_date(2,scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="delet(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加 -->
    <div class="roter_view">
      <router-view></router-view>
    </div>

    <!-- 显示隐藏 -->

    <div v-show="isShow" class="view">
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
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--  -->
  </div>
</template>



<script>
export default {
  data() {
    return {
      // show
      isShow: false,
      whatOperate: -1,
      addList: [
        { label: "还款类型", value: 0 },
        { label: "借款类型", value: 1 },
        { label: "竞标状态", value: 2 },
        { label: "竞标类型", value: 3 }
      ],
      statusList: [{ label: "可用", value: 0 }, { label: "不可用", value: 1 }],

      form: {
        id: "",
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
      },

      //

      // 还款类型
      addMse: {
        id: "",
        name: "",
        description: ""
      },
      refund_type: [
        {
          id: 1,
          name: "100",
          type: "1",
          description: "aduyaldidkgjbhfslbjcsclsglccuilskcs;iukuil",
          status: "1"
        },
        {
          id: 2,
          name: "200",
          type: "2",
          description: "aduyaldidkgjbhfslbjcsclsglccuilskcs20000",
          status: "1"
        }
      ]
    };
  },

  //   shuju

  created() {
    this.Axios.get("http://172.16.6.64:8080/borrow/element/audit")
      .then(res => {
        console.log(res);
        this.refund_type = res.data.data;
        console.log(this.refund_type);
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    up_date(whatOperate, row) {
      this.isShow = true;
      this.whatOperate = whatOperate;
      this.form.id = row.id;

      if (whatOperate === 2) {
        // 更新
        this.form.addListValue = row.type;
        this.form.statusValue = Number(row.status);
        this.form.name = row.name;
        this.form.desc = row.description;
        //   需要传的值
        let up_message = {
          id: row.id,
          name: this.form.name,
          description: this.form.desc
        };
        console.log("edit");
      } else if (whatOperate === 1) {
        // add的值
        //添加
        console.log("add");
      }
    },

    // 删除
    delet(row) {
      this.newArr.id = row.id;
      this.newArr.name = this.form.name;
      this.newArr.description = this.form.desc;
      this.newArr.type = this.form.addListValue;
      this.newArr.status = this.form.statusValue;

      // 删除需要传值
      //   var dele_update = {
      //     id: this.newArr.id
      //   };
      console.log(this.newArr.id);
      // 差是否确定删除
      this.$confirm("你确定需要删除次条记录，这将永久删除？", "删除信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "保存",
        cancelButtonText: "保留"
      })
        .then(() => {
          this.$message({
            showClose: true,
            type: "success",
            message: "删除成功，不能再次恢复了哦"
          });
          // 确认后删除;
          this.Axios.delete(
            "http://172.16.6.64:8080/borrow/element/audit" + this.newArr.id
          )
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message: action === "cancel" ? "我舍不得删除" : "停留在当前页面"
          });
        });
    },

    // show——add
    onSubmit() {
      console.log(this.whatOperate);
      if (this.whatOperate === 1) {
        this.onAdd();
      } else if (this.whatOperate === 2) {
        this.onEdit();
      }
    },
    onAdd() {
      this.newArr.name = this.form.name;
      this.newArr.description = this.form.desc;
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
            this.Axios.post(
              "http://172.16.6.64:8080/borrow/element/audit",
              postList
            )
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
      } else {
        this.$message({
          showClose: true,
          message: "添加数据的 名称 不能为空",
          type: "error"
        });
      }
    },

    // 编辑
    onEdit() {
      this.newArr.id = this.form.id;
      this.newArr.name = this.form.name;
      this.newArr.description = this.form.desc;
      this.newArr.type = this.form.addListValue;
      this.newArr.status = this.form.statusValue;

      let put_mes = {
        id: this.newArr.id,
        name: this.newArr.name,
        description: this.newArr.description
      };

      //   编辑
      this.Axios.put("http://172.16.6.64:8080/borrow/element/audit", put_mes, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        console.log(res);
      });
    },

    // 关闭
    close() {
      this.isShow = false;
    }
  }
};
</script>




<style lang="less" scoped>
.add {
  display: flex;
  justify-content: flex-end;
  margin: 20px;
}
.refund_type {
  display: flex;

  .refund_mess {
    padding: 10px 20px;
    border: 1px black solid;
  }
  .operation {
    padding: 2px 4px;
    width: 50px;
    height: 20px;
    font-size: 12px;
  }
}
</style>


