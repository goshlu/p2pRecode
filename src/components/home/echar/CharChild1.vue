<template>
        <div id="CharBox1"></div>
</template>

<script>

let getInMoney;
let getOutMoney;
let getDay;
const showChars = () => {
    // 基于准备好的dom，初始化echarts实例
    let myChart = Echarts.init(document.getElementById('CharBox1'));
    // 绘制图表
    myChart.setOption({
        // title : {
        //     text:"近七日出入帐统计"
        // },
        tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
        // toolbox: {
        //     feature: {
        //         dataView: {show: false, readOnly: false},
        //         magicType: {show: false, type: ['line', 'bar']},
        //         restore: {show: false},
        //         saveAsImage: {show: false}
        //     }
        // },
        
        grid: {
            left: '12%',
            right: '6%',
        },
        legend: {
            data:['出账','入账'],
            // bottom: 0
        },
        xAxis: [
            {
                // name:"单位:日",
                type: 'category',
                data: getDay,
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '单位:万元',
                min: 0,
                max: 50,
                interval: 10,
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name:'出账',
                type:'bar',
                data:getOutMoney,
            },
            {
                name:'入账',
                type:'bar',
                data:getInMoney
            }
        ]
    });
}




import Echarts from "echarts";
import { async } from 'q';

export default {
    name:"CharChild1",
    data(){
        return{
            // day:['24日','25日','26日','27日','28日','29日','30日'],
            // inMoney:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6],
            // outMoney:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6],
            datas:{}
        }
    },
    // methods:{
        
    // },
    mounted(){
        
    },
    
    created(){
        this.Axios.get("http://172.16.6.64:8080/outPut").then(
            res => {
                // console.log(res);
                this.datas = {
                    ...res.data
                };
                // console.log(this.datas);
                getInMoney=this.datas.s1;
                getOutMoney=this.datas.s2;
                getDay=this.day;
                showChars();
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