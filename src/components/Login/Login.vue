<template>
    <div class="Login">
        <div class="bgColor"></div>
        <LoginBox/>
    </div>
</template>

<script>
import LoginBox from './Children/LoginBox';
export default {
    name: 'Login',
    components:{
        LoginBox
    },

    data () {
        return {
            
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import './../../assets/css/login/Login.css';
</style>
