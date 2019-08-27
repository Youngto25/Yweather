<template>
  <div id="app">
    <Header/>
    <main>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="生活建议" name="first" class="test first">
          <el-button type="primary" class="see-air" @click="show = !show">查看空气情况</el-button>
          <div class="message">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="wea_svg"></use>
            </svg>
            <span>数据更新时间：{{ update_time }}</span>
          </div>
          <div class="index-table">
            <el-table
              :data="index"
              border
              style="width: 80%;">
              <el-table-column
                prop="title"
                label="主题">
              </el-table-column>
              <el-table-column
                prop="level"
                label="等级">
              </el-table-column>
              <el-table-column
                prop="desc"
                label="建议">
              </el-table-column>
            </el-table>
          </div>
          <transition name="el-zoom-in-center">
            <air class="air-wrapper" v-show="show"/>
          </transition>
        </el-tab-pane>
        <el-tab-pane label="各时段情况" name="second" class="test second">
          <el-button type="primary" class="see-air" @click="change2">今日各时段情况</el-button>
          <div class="index-table">
            <el-table
              :data="hours"
              border
              style="width: 50%">
              <el-table-column
                prop="day"
                label="时间">
              </el-table-column>
              <el-table-column
                prop="wea"
                label="天气">
              </el-table-column>
              <el-table-column
                prop="tem"
                label="温度">
              </el-table-column>
              <el-table-column
                prop="win"
                label="风向">
              </el-table-column>
              <el-table-column
                prop="win_speed"
                label="风速">
              </el-table-column>
            </el-table>
        </div>
          <tem class="tem-wrapper" :class="[show2?'active':'']"/>
        </el-tab-pane>
        <el-tab-pane label="未来一周情况" name="third" class="test third">
          <el-button type="primary" class="see-air" @click="show3 = !show3">观看一周详情</el-button>
          <div class="index-table">
            <el-table
              :data="all"
              border
              style="width: 80%">
              <el-table-column
                prop="date"
                label="时间">
              </el-table-column>
              <el-table-column
                prop="week"
                label="">
              </el-table-column>
              <el-table-column
                prop="wea"
                label="天气">
              </el-table-column>
              <el-table-column
                prop="tem1"
                label="温度">
              </el-table-column>
              <el-table-column
                prop="win[0]"
                label="风向">
              </el-table-column>
              <el-table-column
                prop="win_speed"
                label="风速">
              </el-table-column>
            </el-table>
        </div>
        <transition name="el-fade-in">
          <next class="next-wrapper" v-show="show3"/>
        </transition>
        </el-tab-pane>
        <!-- <el-tab-pane label="留言" name="fourth" class="test fourth">
          <message></message>
        </el-tab-pane> -->
      </el-tabs>   
    </main>
    <section class="footer">
      <span>Designed 2019 @ </span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-github"></use>
      </svg>
      <a href="https://github.com/Youngto25" target="_blank">Youngto25</a>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import './svg/weather'
import '../theme/tabs.css'
import { Tabs,TabPane,Table,TableColumn,Transfer } from 'element-ui'; 
import Header from "./components/header.vue";
import air from './components/air.vue'
import tem from './components/tem.vue'
import next from './components/nextDay.vue'
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Transfer)
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.prototype.$eventBus = new Vue()
export default {
  name: "app",
  components: {
    Header,
    air,
    tem,
    next
  },
  data() {
    return {
      hour: [],
      tems: [],
      weeks: [],
      temss: [],
      index: [],
      activeName: 'first',
      show: false,
      show2: false,
      show3: false,
      hours: [],
      all: [],
      wea_svg: '',
      update_time: ''
    }
  },
  mounted() {
    this.getData()
    this.$eventBus.$on('search',(e)=>{
      this.getData(e)
    })

  },
  methods: {
    getData(e){
      let data = e || '上海'
      this.$axios.get(`https://www.tianqiapi.com/api/?version=v1&appid=25392546&appsecret=MjE7qJTU&cityid=${data}`)
        .then(res=>{return res.data})
        .then(data=>this.render(data))
        .then(()=>{
          this.$eventBus.$emit('render')
        })
    },
    render(shanghai) {
      this.hour = []
      this.tems = []
      this.temss = []
      this.weeks = []
      this.$eventBus.day = shanghai.data[0].day
      this.$eventBus.week = shanghai.data[0].week
      let z = shanghai.data[0].hours
      for(let i=0;i<z.length;i++){
        this.hour.push(z[i].day)
      }
      this.$eventBus.hour = this.hour
      this.update_time = shanghai.update_time
      this.$eventBus.city = shanghai.city
      this.$eventBus.wea = shanghai.data[0].wea
      this.$eventBus.tem = parseInt(shanghai.data[0].tem)
      this.$eventBus.cityEn = shanghai.cityEn;
      this.$eventBus.air_tips = shanghai.data[0].air_tips
      this.wea_svg = '#icon-' + shanghai.data[0].wea_img
      let x = shanghai.data[0].hours
      for (let i = 0; i < x.length; i++) {
        let y = parseInt(x[i].tem);
        this.tems.push(y);
      }
      this.getMin(this.tems);
      this.getMax(this.tems);
      this.$eventBus.air = shanghai.data[0].air
      this.$eventBus.tems = this.tems
      let data = shanghai.data
      for(let i=0;i<data.length;i++){
        this.weeks.push(data[i].day)
        this.temss.push(parseInt(data[i].tem1))
      }
      this.$eventBus.weeks = this.weeks
      this.$eventBus.temss = this.temss
      this.hours = shanghai.data[0].hours
      this.all = shanghai.data
      let yang = shanghai.data[0].index
      yang[1].title = ''
      this.index = yang
    },
    handleClick(){},
    change2(){
      this.show2 = !this.show2
    },
    getMin(x) {
      let arr = JSON.parse(JSON.stringify(x));
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
      }
      this.$eventBus.min = arr[arr.length - 1] - 1;
    },
    getMax(x) {
      let arr = JSON.parse(JSON.stringify(x));
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
      }
      this.$eventBus.max = arr[arr.length - 1] + 1;
    }
  }
}
</script>
<style lang="scss" scoped>
main{
  width: 98%;
  margin: 0 auto;
  color: rgb(96, 97, 187);
  .test{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .first{
    .index-table{
      height: 50vh;
    }
    .message{
      margin-top: 10px;
      display: flex;
      align-items: center;
      .icon {
        height: 35px;
        width: 35px;
        fill: rgb(96, 97, 187);
      }
      span{
        margin-left: 16px;
      }
    }
    .air-wrapper{
      position: absolute;
      background: #ffffff;
      transform: translateY(10%);
      border: 1px solid #cccccc;
      box-shadow: 3px 3px 8px #888888;
    }
  }
  .second{
    .tem-wrapper{
      position: absolute;
      background: #ffffff;
      transform: translateY(-500%);
      border: 1px solid #cccccc;
      box-shadow: 3px 3px 8px #888888;
      &.active{
        transition: all 0.5s;
        transform: translateY(8%);
      }
    }
  }
  .third{
    .next-wrapper{
      position: absolute;
      background: #ffffff;
      transform: translateY(8%);
      border: 1px solid #cccccc;
      box-shadow: 3px 3px 8px #888888;
    }
  }
}
.see-air{
  background: rgb(96, 97, 187);
}
.index-table{
  width: 50%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer{
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #cccccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: rgb(96, 97, 187);
  .icon{
    width: 25px;
    height: 25px;
    fill: rgb(96, 97, 187);
    margin: 0 4px;
  }
  a{
    color: rgb(96, 97, 187);
  }
}

</style>
