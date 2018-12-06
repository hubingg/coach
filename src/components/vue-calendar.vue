<template>
  <div class="cal-wrapper">
    <!-- 显示月份 -->
    <!-- <div class="cal-header">
      <div class="title">{{showMonth}}</div>
    </div> -->
    <div class="cal-body">
      <!-- 显示星期 -->
      <div class="cal-weeks" v-if="showWeeks">
        <span class="item" v-for="(dayName, dayIndex) in dayNames" :key="dayIndex">
          {{dayName}}
        </span>
      </div>
      <!-- 显示天数 -->
      <div class="cal-dates">
        <div v-for="(weeks,index) in dayList" :key="index" class="dates-weeks">
          <div v-for="date in weeks" :key="date.date" >
            <!-- <div class="item" :class="[{'curmonth-item': date.privatePresaleDetailSchedule, 'buy-item': date.status > 0}]" v-if="!$scopedSlots.date">
              <p class="dates-num">
                {{date.dayType ? date.date : ''}}
              </p>
            </div> -->
            <slot name="date" v-bind="date">
            </slot>
            <!-- <i class="discount-item" v-if="date.status == 2"></i> -->
            <!-- <p class="dates-num" @click="handleChangeCurday(date)"> -->
              <!-- {{date.status ? date.date.split('/')[2] : ''}} -->
              <!-- <span v-if="date.status ? (today == date.date) : false"></span> -->
            <!-- </p> -->
            <!-- <p style="font-size: 8px">可定</p> -->
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
let dayNames = ['日', '一', '二', '三', '四', '五', '六']
let monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
export default {
  name: 'vueCalendar',
  props: {
    showWeeks: { // 是否展示星期
      type: Boolean,
      default: true
    },
    curDate: { // 传进来的日期，默认今日
      type: Date,
      default: function(){
        return new Date()
      }
    },
    calendarDays: { // 日期数据
      type: Array,
      default: function(){
        return []
      }
    }
  },
  watch: {
    curDate (date) {
      this.year = date.getFullYear()
      this.month = date.getMonth()
      this.curMonth = new Date().getMonth()
    }
  },
  computed: {
    days () {
      let arr = []
      console.log(this.calendarDays)
      this.calendarDays.forEach((item) => {
        arr.push(item.day-0)
      })
      console.log(arr)
      return arr
    },
    showMonth () {
      return monthNames[this.month]
    },
    today () {
      let dateObj = new Date()
      return `${dateObj.getFullYear()}/${dateObj.getMonth()+1}/${dateObj.getDate()}`
    },
    // 计算日历月份数据
    dayList () {
      let curDate = new Date().getDate()
      let firstDay = new Date(this.year, this.month, 1)
      let dayOfWeek = firstDay.getDay()
      let startDate = new Date(firstDay)
      startDate.setDate(firstDay.getDate() - dayOfWeek)
      let item, dayType, tempArr = [], tempItem
      for (let i = 0 ; i < 42 ; i++) {
        item = new Date(startDate);
        item.setDate(startDate.getDate() + i)
        if (this.month === item.getMonth()) {
          if (curDate > item.getDate()  && item.getMonth() === this.curMonth) {//当月今日及以后
          // if (curDate > item.getDate()) {//当月今日及以后
            dayType = 1
          } else { //当月今日以前
            dayType = 2
          }
        } else {//非本月
          dayType = 0
        }
        tempItem = {
          day: `${item.getFullYear()}-${item.getMonth()+1}-${item.getDate()}`,
          date: item.getDate(),
          dayType: dayType,
          customClass: []
        }
        tempArr.push(tempItem)
      }
      let arr = []
      tempArr.forEach((item, index) => {
        this.calendarDays.forEach((obj) => {
          if (item.day == obj.day) {
            item = Object.assign(item, obj)
          }
        })
        let arrIndex = Math.floor(index/7)
        if (index%7 === 0 ) {
          arr.push([])
        }
        arr[arrIndex].push(item)
      })
      return arr
    }
  },
  data () {
    return {
      dayNames: dayNames,
      year: '',
      month: '',
      curMonth: '',
      // calendarDayList: []//当前月份
    }
  },
  methods: {
    handleChangeCurday (data) {
      if (data.dayType) {
        this.$emit('change-date',data)
      }
    },
    // calendarDayList() {
    //   let arr = []
    //   this.dayList.forEach((item, index) => {
    //     this.calendarDays.forEach((obj) => {
    //       if (item.date == obj.date) {
    //         item = Object.assign(item, obj)
    //       }
    //     })
    //     let arrIndex = Math.floor(index/7)
    //     if (index%7 === 0 ) {
    //       arr.push([])
    //     }
    //     arr[arrIndex].push(item)
    //   })
    //   return arr
    // }
  },
  created() {
    let date = this.curDate
    this.year = date.getFullYear()
    this.month = date.getMonth()
    this.curMonth = new Date().getMonth()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.cal-wrapper
  width 100%
  .cal-header
    color #333333
    font-size 0.32rem
    padding-bottom 0.2rem
  .cal-body
    width 100%
    .cal-weeks
      height 34px
      width 100%
      padding 0 17px
      overflow hidden
      text-align center
      display flex
      justify-content space-between
      border-bottom: 1px solid #E6E6E6;
      margin-bottom 10px
      .item
        flex 1
        line-height 34px
        font-size: 14px;
        color: #515151;
    .cal-dates
      width 100%
      // overflow hidden
      text-align center
      .dates-weeks
        width 100%
        display flex
        justify-content space-between
        padding 0 17px
        padding-bottom 10px
        .item
          // flex 1
          border-radius 50%
          color #999999
          font-size 0.2rem
          position relative
          width 0.4rem
          height 0.4rem
          line-height 0.4rem
          margin-bottom 0.12rem
          &>p
            margin 0
            padding 0
            font-size 0.24rem
          .is-today
            content ''
            background-color #f29543
            border-radius 50%
            opacity 0.8
            width 0.24rem
            height 0.08rem
            position absolute
            left 50%
            top 50%
            z-index 2
            margin-left -0.12rem
            margin-top 0.16rem
        .curmonth-item
          border 1px solid #D5D5D5
          // padding-top 5px
        .buy-item
          color #26C7A0 !important
          border-color #26C7A0
        // .discount-item
        //   height 0.28rem
        //   width 0.28rem
        //   background url('./../assets/images/indent-discount-corner-mark.png')
        //   background-size 100% 100%
        //   position absolute
        //   top 0.02rem
        //   right -0.1rem
</style>
