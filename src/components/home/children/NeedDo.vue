<template>
    <div class="NeedDo">
        <div>
            <span class="things"></span>
            <!-- <p>代办事项</p> -->
        </div>
        <ul>
            <li>
                <p>新标待审</p>
                <p>1</p>
            </li>
            <li>
                <p>新标待上架</p>
                <p>3</p>
            </li>
            <li>
                <p>满标复审</p>
                <p>9</p>
            </li>
            <li>
                <p>今日待还款</p>
                <p>1</p>
            </li>
            <li>
                <p>提现待审</p>
                <p>10</p>
            </li>
            <li>
                <p>提现待处理</p>
                <p>12</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"NeedDo",
    data(){
        return{

        }
    },
}
</script>

<style lang="">
    @import "./../../../assets/css/home/needDo.css";
</style>