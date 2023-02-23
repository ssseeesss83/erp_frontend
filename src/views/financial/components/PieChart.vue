<template>
  <div id="pieChart" :style="{ width: width, height: height }"></div>
</template>

<script>
const echarts = require("echarts/lib/echarts")
require("echarts/lib/component/title")
require("echarts/lib/component/tooltip")
require("echarts/lib/component/toolbox")
require("echarts/lib/component/legend")
require("echarts/lib/chart/pie")
export default {
  name: "PieChart",
  props:{
    chartData:{
      type:Array,
      require:true
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "500px"
    },
  },
  data(){
    return{
      testData:[
        {value: 100, name: 'xxxx'},
        {value: 200, name: 'yyyy'},
      ]
    }
  },
  mounted() {
    this.drawChart()
  },
  methods:{
    drawChart(){
      let dom = document.getElementById('pieChart')
      let myChart = echarts.init(dom)
      let option = {
        title: {
          text: '收入/支出',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '收入/支出',
            type: 'pie',
            radius: ['50%','70%'],
            data: this.chartData,

            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      option && myChart.setOption(option);

    },
  }
}
</script>

<style scoped>

</style>