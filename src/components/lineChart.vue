<template>
  <div :id="id" style="width: 1000px; height: 400px;"></div>
</template>
<script>
import { nextTick } from 'q';
var echarts = require("echarts")
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    weeks:{
      type: Array,
      default: function () {
        return []
      }
    },
    temss: {
      type: Array,
      default: function () {
        return []
      }
    },
    id: {
      type: String,
      default: ''
    },
    topPoint: {
      type: String
    },
    bottomPoint: {
      type: String
    }
  },
  mounted(){
    this.$eventBus.$on('render',()=>{
      nextTick(()=>{
        this.x()
      })
    })
  },
  methods: {
    x(){
      var myChart = echarts.init(document.getElementById(this.id), "light");
      var option = {
        title: {
          text: this.text,
          subtext: "单位 ℃"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["温度"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.weeks
          }
        ],
        yAxis: [
          {
            type: "value",
            max: this.topPoint,
            min: this.bottomPoint
          }
        ],
        series: [
          {
            name: "最高气温",
            type: "line",
            smooth: 0.4,
            itemStyle : {  
              normal : {
                color: 'rgb(96, 97, 187)',  
                lineStyle:{  
                  color:'rgb(96, 97, 187)'  
                }  
              }  
            },
            data: this.temss,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  }
}
</script>
<style lang="scss" scoped>

</style>