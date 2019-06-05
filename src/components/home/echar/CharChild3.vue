<template>
        <div id="CharBox3"></div>
</template>

<script>

import Echarts from "echarts";

export default {
    name:"CharChild3",
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
        let myChart = Echarts.init(document.getElementById('CharBox3'));
        // 绘制图表
        myChart.setOption({
            // backgroundColor: '#fff',

            // title: {
            //     text: 'Customized Pie',
            //     left: 'center',
            //     top: 20,
            //     textStyle: {
            //         color: '#ccc'
            //     }
            // },

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series : [
                {
                    name:'访问来源',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:status.sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(0, 0, 0, 0.6)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(0, 0, 0, 0.6)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            // shadowBlur: 200,
                            // shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        });
    },
}
</script>

<style lang="">
</style>