<template>
    <div class="CharBox">
        <div>
            <div class="CharBox1">
                <CharChild1/>
                <p>近七日出入帐统计</p>
            </div>
            <div class="CharBox2">
                <CharChild2/>
                <p>近七日用户活动统计</p>
            </div>
        </div>
        <div>
            <div class="CharBox4">
                <CharChild4/>
                <p>已结束标统计</p>
            </div>
            <div class="CharBox3">
                <CharChild3/>
                <p>进行中标统计</p>
            </div>
        </div>
    </div> 
</template>

<script>

import Echarts from "echarts";
import CharChild1 from "./CharChild1";
import CharChild2 from './CharChild2';
import CharChild3 from './CharChild3';
import CharChild4 from './CharChild4'

export default {
    name:"CharBox",
    components:{
        CharChild1,
        CharChild2,
        CharChild3,
        CharChild4
    },
    data(){
        return{
        
        }
    },
    mounted(){
        
    },
}
</script>

<style lang="">
    @import "./../../../assets/css/home/charBox.css";
</style>