<template>
    <div class="Home">
        <div class="homeSearch">
            <Search/>
        </div>
        <div class="homeNumberShow">
            <NumberShow title="注册用户(人)" :number="data.borrow" :newNumber="data.full_wait" iconName="people"/>
            <NumberShow title="投资总额(万元)" :number="data.member_money" :newNumber="data.money_wait" iconName="touziNumber"/>
            <NumberShow title="借款总额(万元)" :number="data.register" :newNumber="data.today" iconName="daikuanNumber"/>
            <NumberShow title="用户累计收益(万元)" :number="data.wait_do" :newNumber="data.invest" iconName="shouyi"/>
        </div>
        <div class="homeNeedDo">
            <NeedDo/>
        </div>
        <div class="charBox">
            <CharBox/>
        </div>
    </div>
</template>

<script>

import Search from "./children/Search";
import NumberShow from "./children/NumberShow";
import NeedDo from "./children/NeedDo";
import CharBox from './echar/CharBox';

export default {
    name: 'Home',
    components:{
        Search,
        NumberShow,
        NeedDo,
        CharBox,
    },

    data () {
        return {
            data:{

            }
        }
    },
    created(){
        this.Axios.get("http://172.16.6.64:8080/index").then(
            res => {
                // console.log(res);
                this.data = res.data
            }
        ).catch(
            error => {
                // console.log("222");
            }
        );
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @import "./../../assets/css/home/home.css";
</style>
