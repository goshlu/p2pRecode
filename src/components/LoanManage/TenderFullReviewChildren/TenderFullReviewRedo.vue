<template>
  <div id="reivew-redo">
    <h1>复审</h1>
    <!--<p>{{$route.params.row}}</p>-->
    <!--基本信息-->
    <div class="redo-item-wrap">
      <div class="title">
        <h4>基本信息<span class="collapse-wrap" @click="isShowBasic = !isShowBasic">收起<i :class="isShowBasic?'el-icon-arrow-down':'el-icon-arrow-up'"></i></span></h4>
      </div>
      <div class="detail-wrap" v-if="isShowBasic">
        <div class="detail-info">
          <el-form :label-position="labelPosition" label-width="130px">
            <el-form-item label="借款名称：">
              <span>上海xx公司借款</span>
            </el-form-item>
            <el-form-item label="借款方：">
              <span>上海x x x公司(13599090001)</span>
            </el-form-item>
            <el-form-item label="年利率：">
              <span>12%</span>
            </el-form-item>
            <el-form-item label="借款期限：">
              <span>30天</span>
            </el-form-item>
            <el-form-item label="还款方式：">
              <span>一次性还款</span>
            </el-form-item>
            <el-form-item label="利息管理费：">
              <span>0.2%</span>
            </el-form-item>
          </el-form>

          <el-form :label-position="labelPosition" label-width="130px">
            <el-form-item label="风险等级：">
              <span>较低风险</span>
            </el-form-item>
            <el-form-item label="借款总金额：">
              <span>10000元</span>
            </el-form-item>
            <el-form-item label="资金用途：">
              <span>供应链周转</span>
            </el-form-item>
            <el-form-item label="*起息方式：">
              <span>成立计息</span>
            </el-form-item>
            <el-form-item label="借款管理费：">
              <span>0.6%</span>
            </el-form-item>
            <el-form-item label="逾期罚息利率：">
              <span>0.06%</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <!--担保信息-->
    <div class="redo-item-wrap">
      <div class="title">
        <h4>担保信息<span class="collapse-wrap" @click="isShowAssure = !isShowAssure">收起<i :class="isShowAssure?'el-icon-arrow-down':'el-icon-arrow-up'"></i></span></h4>
      </div>
      <div class="detail-wrap" v-if="isShowAssure">
        <div class="detail-info">
          <el-form :label-position="labelPosition" label-width="130px">
            <el-form-item label="是否担保：">
              <span>是</span>
            </el-form-item>
            <el-form-item label="是否抵押：">
              <span>否</span>
            </el-form-item>
          </el-form>

          <el-form :label-position="labelPosition" label-width="130px">
            <el-form-item label="担保机构：">
              <span>上海泽润典当</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <!--借款资料-->
    <div class="redo-item-wrap">
      <div class="title">
        <h4>借款资料<span class="collapse-wrap" @click="isShowBorrow = !isShowBorrow">收起<i :class="isShowBorrow?'el-icon-arrow-down':'el-icon-arrow-up'"></i></span></h4>
      </div>
      <div class="detail-wrap" v-if="isShowBorrow">
        <div class="detail-info">
          <el-form :label-position="labelPosition" label-width="130px">
            <el-form-item label="借款资料：">
              <el-image
                style="width: 300px; height: 170px"
                src=""
              ></el-image>
              <el-image
                style="width: 300px; height: 170px"
                src=""
              ></el-image>
            </el-form-item>
          </el-form>

        </div>
      </div>
    </div>

    <!--标的信息-->
    <div class="redo-item-wrap">
      <div class="title">
        <h4>标的信息</h4>
      </div>
      <div class="detail-wrap">
        <div class="detail-info">
          <el-form :label-position="labelPosition" label-width="130px">
            <el-form-item label="项目名称：" required>
              <span>上海xx公司借款</span>
            </el-form-item>
            <el-form-item label="项目类型：" required>
              <span>上海x x x公司(13599090001)</span>
            </el-form-item>
            <el-form-item label="递增金额：" required>
              <span>12%</span>
            </el-form-item>
            <el-form-item label="上架渠道：" required>
              <span>30天</span>
            </el-form-item>
            <el-form-item label="新手专享：" required>
              <span>一次性还款</span>
            </el-form-item>
            <el-form-item label="上架时间：" required>
              <span>0.2%</span>
            </el-form-item>
          </el-form>

          <el-form :label-position="labelPosition" label-width="130px">
            <el-form-item label="标签：" required>
              <span>较低风险</span>
            </el-form-item>
            <el-form-item label="最低起投金额：" required>
              <span>10000元</span>
            </el-form-item>
            <el-form-item label="最大可投金额：" required>
              <span>供应链周转</span>
            </el-form-item>
            <el-form-item label="*设置精选：" required>
              <span>成立计息</span>
            </el-form-item>
            <el-form-item label="募集时间：" required>
              <span>0.6%</span>
            </el-form-item>
            <el-form-item label="开售时间：" required>
              <span>0.06%</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <!--审核-->
    <div class="redo-item-wrap exam-wrap">
      <div class="title">
        <h4>审核</h4>
      </div>
      <div class="detail-wrap">
        <div class="detail-info">
          <el-form :label-position="labelPosition" label-width="130px">
            <el-form-item label="是否通过：">
              <el-radio v-model="checkRadio" label="1">通过</el-radio>
              <el-radio v-model="checkRadio" label="2">不通过</el-radio>
            </el-form-item>
            <el-form-item label="备注：" required>
              <el-input
                type="textarea"
                :rows="3"
                resize="none"
                v-model="notesText"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <div class="btns-wrap">
      <div class="btns-content">
        <MyButton btn-type="primary" btn-text="提交" fun-name="open" @open="open"></MyButton>
        <MyButton btn-type="" btn-text="返回" fun-name="goBack" @goBack="goBack"></MyButton>
      </div>
    </div>
  </div>
</template>

<script>
  import MyButton from '../Button/Button';

  export default {
    name: "TenderFullReviewRedo",
    components:{
      MyButton
    },
    methods:{
      goBack(){
        this.$router.back();
      },
      open() {
        this.$confirm('是否提交审核信息？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.$message({
              type: 'info',
              message: '提交成功'
            });
            setTimeout(()=>{
              this.$router.back();
            },500)
          })
          .catch(action => {
            /*this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '放弃保存并离开页面'
                : '停留在当前页面'
            })*/
          });
      }
    },
    data(){
      return {
        isShowBasic:true,
        isShowAssure:true,
        isShowBorrow:true,
        labelPosition:"right",
        checkRadio:"1",
        notesText:""
      }
    }
  }
</script>

<style scoped>
  #reivew-redo{
    background-color: #ffffff;
  }
  #reivew-redo .redo-item-wrap{
    margin: 30px 0;
    background-color: #ffffff;
    padding: 20px;
  }
  #reivew-redo .redo-item-wrap .title{
    margin-bottom: 20px;
  }
  #reivew-redo .redo-item-wrap .collapse-wrap{
    color: #3366CC;
    font-size: 13px;
    margin-left: 20px;
  }
  #reivew-redo .redo-item-wrap .collapse-wrap:hover{
    cursor: pointer;
    text-decoration: underline;
  }
  #reivew-redo .redo-item-wrap .detail-wrap .detail-info{
    margin: 0 auto;
    width: 80%;
    display: flex;
    justify-content: space-between;
  }
  #reivew-redo .exam-wrap .detail-wrap .detail-info{
    display: block;
  }
  .btns-wrap{
    width: 90%;
    margin: 0 auto;
    padding: 40px 0;
    border-top: 1px solid #d5d5d5;
  }
  .btns-wrap .btns-content{
    width: 30%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
</style>
