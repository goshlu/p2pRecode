<template>
    <div class="LoginBox" @mouseleave="getUp" @mouseup="getUp" @mousemove="getMove">
        <div class="log">
            <span class="logIcon"></span>
            <h1>神州数码互联网金融管理平台</h1>
        </div>
        <div class="input">
            <p>登录/Login</p>
            <input type="text" v-model="userName">
            <input type="password" v-model="userPassword">
            <div class="seed">
                <span :style="'color:'+color"  class="textBox">{{text}}</span>
                <span :style="'backgroundColor:'+color" class="Loginline"></span>
                <span @mousedown="getDown" id="seedBox" :style="'right:'+this.seedRight+';backgroundColor:'+color" class="box"></span>
            </div>
            <button @click="loginDo" class="loginBtn" :style="'cursor:'+corsur">登录</button>
        </div>
    </div>
</template>

<script>
import { mapState,mapGetters,mapMutations,mapActions } from "vuex";
export default {
    name: 'LoginBox',

    components:{
    },

    data () {
        return {
            seedRight:"265px",
            flag : false,
            loginDone:false,
            corsur:'no-drop',
            text:"拖动滑块完成验证!",
            color:"black",
            userName:'',
            userPassword:'',
        }
    },
    computed:{
        ...mapGetters(['getNavData']),
    },
    methods:{
        ...mapActions(['doUpdateNavData','doUpdateNavIsopenTrue']),
        loginDo(){
            if(this.loginDone){
                // console.log(this.userName);
                // console.log(this.userPassword);
                if(true){
                    // this.$router.push('/Home');
                    this.Axios.get(`http://172.16.6.72:8080/admin/login?username=${this.userName}&password=${this.userPassword}`).then(
                        res => {
                            console.log(res.data);
                            sessionStorage.setItem('token',res.data.token);
                            sessionStorage.setItem('userId',res.data.admin.idCard);
                            sessionStorage.setItem('menu',res.data.menu);
                            this.doUpdateNavData(res.data.menu);
                            this.$router.push('/Home');
                        }
                    ).catch()
                    // this.AXIOS(`admin/login?username=${this.userName}&password=${this.userPassword}`).then(
                    //     res => {
                    //         console.log(res.data);
                    //         sessionStorage.setItem('token',res.data.token);
                    //         sessionStorage.setItem('userId',res.data.admin.idCard);
                    //         this.doUpdateNavData(res.data.menu);
                    //         this.$router.push('/Home');
                    //     }
                    // ).catch(
                    //     error=>{
                    //         alert('用户名或者密码错误！');
                    //         this.userName="";
                    //         this.userPassword="";
                    //         this.seedRight = "265px";
                    //     }
                    // )
                }else{
                    alert('用户名或者密码错误！');
                    this.userName="";
                    this.userPassword="";
                    this.seedRight = "265px";
                }
                
            }else{
                alert('请拖动滑块完成验证！');
            }
        },
        getMove(e){
            // console.log(e);
            if(this.flag){
                // console.log(e.movementX);
                // this.seedRight
                // console.log((853-e.clientX*1)/2.85);
                if(953-e.clientX*1<10){
                    this.seedRight = `10px`;
                }else if(953-e.clientX*1>265){
                    this.seedRight = `265px`;
                }else{
                    this.seedRight = `${953-e.clientX*1}px`;
                }
                // console.log(this.seedRight);
                // document.getElementById('seedBox').style.right=this.seedRight;
            }
        },
        getDown(){
            this.flag = true;
            // console.log(e.clientX);
            // this.clientXD = e.clientX;
        },
        getUp(){
            this.flag = false;
            if(this.seedRight !== '10px'){
                this.seedRight='265px';
                this.loginDone = false;
                this.corsur='no-drop';
                this.text = "拖动滑块完成验证!";
                this.color = "black";
            }else{
                this.loginDone = true;
                this.corsur = 'pointer';
                this.text = "验证成功！";
                this.color = "#873800";
            }
            // console.log(e.clientX);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import './../../../assets/css/login/LoginBox.css';
</style>
