<template>
  <div id="air" style="width: 1000px; height: 400px;"></div>
</template>
<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      air: 0
    }
  },
  mounted() {
    this.$eventBus.$on('render',()=>{
      this.render()
    })
  },
  methods: {
    render() {
      this.air = this.$eventBus.air
      this.y()
    },
    y() {
      var myChart = echarts.init(document.getElementById("air"), "light");
      var option = {
        tooltip: {
          formatter: "{b} : {c}"
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "空气质量",
            type: "gauge",
            min:0,   
            max:360, 
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                color: [[0.2, "#228b22"], [0.8, "#48b"], [1, "#ff4500"]],
                width: 8
              }
            },
            axisTick: {
              splitNumber: 10,
              length: 12,
              lineStyle: {
                color: "auto"
              }
            },
            axisLabel: {
              textStyle: {
                color: "auto"
              }
            },
            splitLine: {
              show: true,
              length: 30,
              lineStyle: {
                color: "auto"
              }
            },
            pointer: {
              width: 5
            },
            title: {
              show: true,
              offsetCenter: [0, "-40%"],
              textStyle: {
                fontWeight: "bolder"
              }
            },
            detail: {
              formatter: "{value}",
              textStyle: {
                color: "auto",
                fontWeight: "bolder"
              }
            },
            data: [{ value: this.air, name: "空气质量" }]
          }
        ]
      };
      myChart.setOption(option, true);
    }
  }
}
</script>
<style lang="scss" scoped>

</style>