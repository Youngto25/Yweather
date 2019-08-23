<template>
  <div>
    <line-chart :weeks="weeks" :temss="temss" :topPoint="max" :bottomPoint="min" id="next" text="未来一周最高温度"></line-chart>
  </div>
</template>
<script>
import chart from './lineChart.vue'
import { nextTick } from 'q';
export default {
  data() {
    return {
      weeks: [],
      temss: [],
      max: '0',
      min: '0'
    };
  },
  components: {
    'line-chart': chart
  },
  mounted(){
    this.$eventBus.$on('render',()=>{
      this.render()
    })
  },
  methods: {
    render() {
      this.weeks = this.$eventBus.weeks
      this.temss = this.$eventBus.temss
      this.getMin(this.temss)
      this.getMax(this.temss)
    },
    getMin(y) {
      let x = y
      let arr = JSON.parse(JSON.stringify(x));
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
      }
      this.min = arr[arr.length - 1] - 1 + ''
    },
    getMax(y) {
      let x = y
      let arr = JSON.parse(JSON.stringify(x));
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
      }
      this.max = arr[arr.length - 1] + 1 + ''
    }
  }
}
</script>
<style lang="scss" scoped>

</style>