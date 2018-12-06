<template>
  <div class="schedule-warp">
    <div class="schedule-warp-date">
      <div class="schedule-month">
        <div class="pre-month" @click="toPreMonth">
          <span class="icon-arrow-left"></span>
          上个月
        </div>
        <div class="cur-month" @click="selectMonth">
          <date-time type="month" v-model="yearMonth" slot="right"></date-time>
          <span class="icon-arrow-up"></span>
        </div>
        <div class="next-month" @click="toNextMonth">
          下个月
          <span class="icon-arrow-right"></span>
        </div>
      </div>
      <vue-calendar @change-date="changeDate" :calendar-days="curCalendarDays" :cur-date="defaultDate">
        <template slot-scope="scope" slot="date">
          <div class="date-day">
            {{scope.date}}
          </div>
        </template>
      </vue-calendar>
    </div>

    <div class="schedule-warp-content">
      <mt-navbar v-model="selected">
        <mt-tab-item id="course">课程</mt-tab-item>
        <mt-tab-item id="leave">请假</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="course">
          <!-- <div class="no-corse">暂无课程</div> -->
          <div class="course-item">
            <div class="course-item-content">
              <div class="title">团课 | 初级双板课程 [双板]</div>
              <div class="desc">
                <div>
                  <span></span>
                  <span class="time">上午(9:00-11:00)</span>
                </div>
                <span class="todetail">查看课程</span>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="leave">
          <div class="leave-content">
            <div class="leave-title">
              <span style="color: #4A4A4A;margin-right: 40px;">请假原因</span>
              <span class="c-select" :class="leaveReson == 'absence' ? 'c-select-true' : 'c-select-false'" @click="selectReason('absence')"></span>
              <span style="margin-right: 40px;">事假</span>
              <span class="c-select" :class="leaveReson == 'illness' ? 'c-select-true' : 'c-select-false'" @click="selectReason('illness')"></span>
              <span>病假</span>
            </div>
            <div class="leave-time">
              <div class="leave-time-title">
                <span class="time-day" @click="showDayTime">
                  全天
                  <i class="icon-arrow-bottom" v-if="!showtime"></i>
                  <i class="icon-arrow-top" v-else></i>
                </span>
                <span class="icon-btn">请假一天</span>
              </div>
              <div class="leave-time-content" v-if="showtime">
                <div class="time-item">
                  <span class='time'>下午13:00-18:00</span>
                  <span class="icon-btn">我要请假</span>
                </div>
              </div>
              
            </div>
            <div class="course-item">
              <div class="course-item-content">
                <div class="title">
                  <span>审批</span>
                  <span>昨天 14:24</span>
                </div>
                <div class="desc">
                  <div>
                    <span class="time">上午(9:00-11:00)课程无法转回，可安排其它课程</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
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
    DateTime,
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
      yearMonth: yearMonth,
      selected: 'leave',
      leaveReson: 'absence',
      showtime: false
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

    },
    selectReason (reason) {
      this.leaveReson = reason
    },
    showDayTime () {
      this.showtime = !this.showtime
    }
  },
  created() {
    
  }
}
</script>

<style lang="stylus">
.schedule-warp
  height 100%
  display flex
  flex-direction column
  &-date
    background-color #fff
    .schedule-month
      height 50px
      display flex
      justify-content space-between
      align-items center
      border 1px solid #E6E6E6
      .cur-month
        background #26C7A0
        border-radius 2px
        color #fff
        width 120px
        height 30px
        line-height 30px
        text-align center
        position relative
        .yd-datetime-input
          text-align left
          padding-left 20px
      .pre-month
        padding-left 15px
        font-size: 12px;
        color: #4A4A4A;
      .next-month
        padding-right 15px
        line-height 30px
        font-size: 12px;
        color: #4A4A4A;
  .icon-arrow-up
    position absolute
    right 20px
    top 12px
    display inline-block
    width 12px
    height 6px
  .icon-arrow-left,
  .icon-arrow-right
    width 10px
    height 7px
    vertical-align middle
    margin-top -3px
  .date-day
    height 40px
    width 40px
    padding-top 6px
    border: 1px solid #D5D5D5;
    border-radius 50%
    font-size: 12px;
    color: #999999;
  .schedule-warp-content
    margin-top 10px
    flex 1
    .mint-navbar
      line-height 0.8rem
      border: 1px solid #E1E1E1;
      .mint-tab-item
        padding 0
      .mint-tab-item-label
        color #515151
        font-size 0.28rem
        display inline-block
        padding-bottom 0.2rem
        margin-bottom 6px
      .is-selected
        border-bottom 0
        color #333
        font-weight 600
        .mint-tab-item-label
          border-bottom 0.04rem solid #26C7A0
    .mint-tab-container
      height 100%
      .mint-tab-container-wrap
        height 100%
        .mint-tab-container-item
          height 100%
          background-color #fff
          .no-corse
            font-size: 14px;
            color: #999999;
            text-align center
            padding-top 40px
          .course-item
            height 75px
            margin-left 25px
            border-left: 1px solid #E1E1E1;
            position relative
            padding-left 13px
            &::before
              content ''
              display inline-block
              background url('../../assets/images/schedule-icon-list.png')
              background-size 100%
              width 12px
              height 12px
              position absolute
              top 20px
              left -6px
            .course-item-content
              height 100%
              border-bottom: 1px solid #E1E1E1;
              padding 15px 15px 15px 0
              display flex
              flex-direction column
              justify-content space-between
              .title
                font-size: 12px;
                color: #999999;
              .desc
                margin-top 10px
                display flex
                justify-content space-between
                .time
                  font-size: 14px;
                  color: #515151;
                .todetail
                  font-size: 12px;
                  color: #FF894D;
          .leave-content
            .leave-title
              font-size: 14px;
              height 40px
              line-height 40px
              padding 0 16px
              border-bottom: 1px solid #E1E1E1;
              color: #4A4A4A;
              .c-select
                margin-right 10px
            .leave-time
              border-bottom: 1px solid #E1E1E1;
              .leave-time-title
                height 50px
                line-height 50px
                padding 0 16px
                display flex
                justify-content space-between
                align-items center
                .time-day
                  border: 1px solid #E6E6E6;
                  border-radius: 15px;
                  height 28px
                  line-height 28px
                  width 65px
                  text-align center
                  display flex
                  align-items center
                  justify-content center
                  .icon-arrow-bottom,
                  .icon-arrow-top
                    width 10px
                    height 7px
                    display inline-block
                    margin-left 5px
              .leave-time-content
                padding 0 16px
                .time-item
                  display flex
                  justify-content space-between
                  align-items center
                  margin-bottom 10px
                  .time
                    font-size: 14px;
                    color: #4A4A4A;
            .course-item
              .title
                display flex
                justify-content space-between
                &>span
                  font-size: 12px;
                  color: #9B9B9B;
              .desc
                overflow hidden



    .icon-btn
      font-size: 14px;
      color: #26C7A0;
      border: 1px solid #26C7A0;
      border-radius: 15px;
      padding 0 9px
      height 28px
      line-height 28px

</style>
