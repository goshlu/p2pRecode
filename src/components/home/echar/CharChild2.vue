<template>
        <div id="CharBox2"></div>
</template>

<script>

import Echarts from "echarts";

export default {
    name:"CharChild2",
    data(){
        return{
            day:['24日','25日','26日','27日','28日','29日','30日'],
            touzi:[120, 132, 101, 13, 90, 20, 10],
            daikuan:[22, 12, 19, 24, 29, 33, 10],
            chongzi:[10, 22, 21, 14, 10, 33, 40],
            tixian:[20, 32, 31, 34, 90, 30, 30]
        }
    },
    mounted(){
        let getDay = this.day;
        let touzi = this.touzi;
        let daikuan = this.daikuan;
        let chongzi = this.chongzi;
        let tixian = this.tixian;
        // 基于准备好的dom，初始化echarts实例
        let myChart = Echarts.init(document.getElementById('CharBox2'));
        // 绘制图表
        myChart.setOption({
            // title: {
            //     text: '折线图堆叠'
            // },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['投资','贷款','充值','提现']
            },
            grid: {
                left: '5.5%',
                right: '6.5%',
                top: '20%',
                bottom: '20%',
                containLabel: true
            },
            // toolbox: {
            //     feature: {
            //         saveAsImage: {}
            //     }
            // },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: getDay
            },
            yAxis: {
                type: 'value',
                name: '单位:万元',
                min: 0,
                max: 250,
                interval: 50,
            },
            series: [
                {
                    name:'投资',
                    type:'line',
                    stack: '总量',
                    data:touzi
                },
                {
                    name:'贷款',
                    type:'line',
                    stack: '总量',
                    data:daikuan
                },
                {
                    name:'充值',
                    type:'line',
                    stack: '总量',
                    data:chongzi
                },
                {
                    name:'提现',
                    type:'line',
                    stack: '总量',
                    data:tixian
                }
            ]
        });
    },
}
</script>

<style lang="">
</style>