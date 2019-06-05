<template>
        <div id="CharBox4"></div>
</template>

<script>

import Echarts from "echarts";

export default {
    name:"CharChild4",
    data(){
        return{
            status:[
                {value:335, name:'已完成'},
                {value:310, name:'还款中'},
                {value:274, name:'审核不通过'},
                {value:235, name:'流标'},
                {value:300, name:'撤标'}
            ]
        }
    },
    mounted(){
        let status = this.status;
        // 基于准备好的dom，初始化echarts实例
        let myChart = Echarts.init(document.getElementById('CharBox4'));
        // 绘制图表
        myChart.setOption({
            // title : {
            //     text: '某站点用户访问来源',
            //     subtext: '纯属虚构',
            //     x:'center'
            // },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            
            grid: {
                left: '5.5%',
                right: '6.5%',
                top: '0%',
                bottom: '40%',
                containLabel: true
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left',
            //     data: ['标申请','待上架','待审核','还款中']
            // },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:this.status,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
    },
    created(){
        this.Axios.get("http://172.16.6.64:8080/seven").then(
            res => {
                console.log(res);
                this.status = res.data;
            }
        ).catch(
            error => {
                // console.log("222");
            }
        );
    }
}
</script>

<style lang="">
</style>