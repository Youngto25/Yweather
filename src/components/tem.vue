<template>
  <div>
    <line-chart :weeks="hour" :temss="tems" :topPoint="max" :bottomPoint="min" id="tem" text="今日8时至次日5时温度变化"></line-chart>
  </div>
</template>
<script>
import chart from './lineChart'
import { nextTick } from 'q';
export default {
  data() {
    return {
      hour: [],
      max: '0',
      min: '0',
      tems: []
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
      this.tems = this.$eventBus.tems
      this.max = this.$eventBus.max + ''
      this.min = this.$eventBus.min + ''
      this.hour = this.$eventBus.hour
    },
  }
}
</script>
<style lang="scss" scoped>
</style>