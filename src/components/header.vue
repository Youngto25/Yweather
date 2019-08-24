<template>
    <footer>
      <section class="logo">
        <img src="../assets/logo.png" alt="logo">
      </section>
      <header>
        <section class="title">
          <span>{{ city }}</span>
          <span>{{ week }}</span>
          <span>{{ time }}</span>
        </section>
        <section class="search">
          <el-input placeholder="请输入地名" class="input-with-select" v-model="value">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </section>
        <section class="wendu">
          <span>{{ tem }}</span>
          <span>℃</span>
          <span>{{ wea }}</span>
        </section>
      </header>
    </footer>
</template>

<script>
import Vue from 'vue'
import { Button, Input } from 'element-ui'; 
import cityList from '../assets/city.json'
Vue.use(Button)
Vue.use(Input)
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
export default {
  name: "Header",
  components: {
   
  },
  props: {},
  data(){
    return {
      city: '',
      cityEn: '',
      tem: '',
      wea: '',
      day: '',
      week: '',
      time: '',
      value: '上海',
      wea_svg: 'yun',
      update_time: ''
    }
  },
  mounted() {
    setInterval(()=>{
      this.getTime()
    },1000)
    this.$eventBus.$on('render',()=>{
      this.render()
    })
  },
  methods: {
    render(){
      this.city = this.$eventBus.city
      this.cityEn = this.$eventBus.cityEn
      this.tem = this.$eventBus.tem
      this.wea = this.$eventBus.wea
      this.day = this.$eventBus.day
      this.week = this.$eventBus.week
    },
    open() {
      this.$notify({
        title: '提醒',
        message: '没有该地区天气情况',
        offset: 100
      })
    },
    getTime(){
      let time = new Date()
      let hour = time.getHours()
      let h = this.formatte(hour)
      let minute = time.getMinutes()
      let m = this.formatte(minute)
      let second = time.getSeconds()
      let s = this.formatte(second)
      this.time = `${h}:${m}:${s}`
    },
    search(){
      let isSearch = false
      for(let i=0; i<cityList.length; i++){
        if(cityList[i].cityZh === this.value){
          isSearch = true
          this.$eventBus.$emit('search',cityList[i].id)
        }
      }
      if(!isSearch){
        this.open()
      }
    },
    formatte(time){
      if((time+'').length === 1){
        time = '0' + time
        return time
      }
      return time
    }
  }
};
</script>
<style scoped lang="scss">
@mixin flex(
  $direction: row,
  $justify-content: flex-start,
  $align-items: flex-start,
  $flex-wrap: nowrap
) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify-content;
  align-items: $align-items;
  flex-wrap: $flex-wrap;
}
footer {
  background: rgb(96, 97, 187);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo{
    position: absolute;
    left: 0;
    top: 3;
    img{
      height: 45px;
    }
    
  }
  header {
    width: 70%;
    border-radius: 8px;
    color: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 12px;
    .title {
      font-size: 16px;
      width: 400px;
      display: flex;
      align-items: center;
      span {
        margin-right: 8px;
        &:first-child {
          font-size: 24px;
          margin-right: 16px;
        }
      }
    }
    .search{
      .input-with-select{
        width: 350px;
      }
    }
    .wendu {
      opacity: 0.9;
      width: 400px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      span {
        font-size: 16px;
        margin: 0 8px;
        &:first-child{
          font-size: 28px;
          margin-left: 0;
          margin-right: 0px;
        }

        &:last-child{
          margin-left: 8px;
          margin-right: 0;
        }
      }
    }
  }
}



</style>
