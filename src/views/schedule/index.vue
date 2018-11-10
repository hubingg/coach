<template>
  <div class="schedule-warp">
    <div class="schedule-warp-date">
      <div class="schedule-month">
        <div class="pre-month" @click="toPreMonth">上个月</div>
        <div class="cur-month" @click="selectMonth">
          <date-time type="month" v-model="yearMonth" slot="right"></date-time>
        </div>
        <div class="next-month" @click="toNextMonth">下个月</div>
      </div>
      <vue-calendar @change-date="changeDate" :calendar-days="curCalendarDays" :cur-date="defaultDate">
        <template slot-scope="scope" slot="date">
          {{scope.date}}
        </template>
      </vue-calendar>
    </div>

    <!-- <mt-datetime-picker
      v-model="yearMonth"
      ref="datepicker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format=""
      @confirm="handleConfirm">
    </mt-datetime-picker> -->
  </div>
</template>

<script>
import Helper from '@/utils/helper'
import vueCalendar from '@/components/vue-calendar'
import {DateTime} from 'vue-ydui/dist/lib.rem/datetime'

let date = new Date()
let defaultDate = new Date(date.getFullYear(), date.getMonth(), 1)
let yearMonth =  Helper.formatYearMonth(date)

export default {
  name: 'Index',
  components: {
    vueCalendar,
    DateTime
  },
  filters: {
    formatYearMonthDay (val) {
      return Helper.formatYearMonthDay(val)
    }
  },
  data () {
    return {
      showDatePicker: false,
      curCalendarDays: [],
      defaultDate: defaultDate, // 取当月一号为默认日期
      curMonth: new Date().getMonth(),
      curYear: new Date().getFullYear(),
      yearMonth: yearMonth
    }
  },
  watch: {
    yearMonth (val) {
      this.defaultDate = new Date(`${val}-1`)
    }
  },
  methods: {
    handleConfirm (value) {
      this.yearMonth = value
    },
    // 选择月份
    selectMonth () {
      this.$refs.datepicker.open()
    },
    // 上个月
    toPreMonth () {
      this.curMonth--
      let date  = new Date(this.curYear, this.curMonth, 1)
      this.yearMonth = Helper.formatYearMonth(date)
    },
    // 下个月
    toNextMonth () {
      this.curMonth++
      let date = new Date(this.curYear, this.curMonth, 1)
      this.yearMonth = Helper.formatYearMonth(date)
    },
    changeDate () {

    }
  },
  created() {
    
  }
}
</script>

<style lang="stylus">
.schedule-warp
  &-date
    background-color #fff
    .schedule-month
      height 40px
      display flex
      justify-content space-between
      align-items center
</style>
