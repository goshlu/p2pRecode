<template>
    <div>

        <!-- 添加区域 -->
        <h1>密码管理</h1>
        <!-- 添加 -->
        <div class="pwd_top">
            <ul class="pwd_content">
                <li>
                    <span>密码管理</span> 
                    <el-input style="display:inline-block" placeholder="请设置6-16为数字和字母组合的密码" v-model="lg_pwd" show-password></el-input>
                </li>
                <li>
                    <span>确认登录密码 </span> 
                    <el-input style="display:inline-block" placeholder="请再次确定密码" v-model="lg_new_pwd" show-password ></el-input>
                </li>
                <li>
                    <span>交易密码  </span> 
                    <el-input placeholder="请设置6-16为数字和字母组合的密码" v-model="pay_pwd" show-password></el-input>
                </li>
                <li>
                    <span>确定交易密码  </span> 
                <el-input placeholder="请再次确定密码" v-model="pay_new_pwd" show-password></el-input>
                </li>
            </ul>
        </div>

        <!-- 按钮组 -->
        <el-button type="primary">确定新增</el-button>
        <el-button @click="Pathto($event)">取消</el-button>

    </div>
</template>


<script>
export default {
    data() {
        return {
            lg_pwd:'',
            lg_new_pwd:'',
            pay_pwd:'',
            pay_new_pwd:'',
            rowMass:{}
        }
    },
    methods:{
         Pathto(e){
            this.$router.push('/InvUser')  
            console.log(e) 
        }
    }
}
</script>



<style scoped>
    ul{
        list-style-type: none;
        padding: 0;
    }
    .pwd_content{
        display: grid;
        grid-template-columns: repeat(2,1fr);
    }
    .pwd_content li{
        margin: 10px 60px 30px 0;
    }
    .pwd_content li span{
        display: inline-block;
        margin-bottom:10px; 
        color: rgba(0, 0, 0, .6)
    }
</style>

