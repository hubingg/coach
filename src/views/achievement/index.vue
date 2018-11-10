<template>
  <div class="achievement">
    <div class="date">
      <div class="start-date" @click="selectDate(0)">
        <span class="date-label">开始于</span>
        <span class="date-value">{{startDate | formatYearMonthDay}}</span>
      </div>
      <div class="ok-date">
        <img src="./../../assets/images/performance-icon-until.png">
      </div>
      <div class="end-date" @click="selectDate(1)">
        <span class="date-label">结束于</span>
        <span class="date-value">{{endDate | formatYearMonthDay}}</span>
      </div>
    </div>
    <div class="location item" @click="selectLocation">
      <span style="color:#999999;">请选择滑雪场</span>
    </div>
    <div class="total item">
      <span class="item-label">订单总额</span>
      <span class="item-value">
        <span style="color: #FF5362;">23456.34</span>元
      </span>
    </div>
    <div class="private item" @click.stop="showPrivate">
      <span class="item-label">
        私教课金额
        <i class="item-icon" :class="{'item-icon-top': privateVisible}"></i>
      </span>
      <span class="item-value">
        <span style="color: #26C7A0;">23456.34</span>元
      </span>
    </div>
    <div v-if="privateVisible">
      <div class="private-total">
        <div class="private-total-item">
          <div class="item-label">订单数</div>
          <div class="item-value">
            <span>98</span>笔
          </div>
        </div>
        <span class="item-border"></span>
        <div class="private-total-item">
          <div class="item-label">时数</div>
          <div class="item-value">
            <span>98</span>课时数
          </div>
        </div>
        <span class="item-border"></span>
        <div class="private-total-item">
          <div class="item-label">总金额</div>
          <div class="item-value">
            <span>98</span>元
          </div>
        </div>
      </div>
      <div class="course-item">
        <div class="course-item-label">
          私教 | Andy教练
          <span class="order-tag order-tag-single">单板</span>
        </div>
        <div class="course-item-value">
          <span class="time">8月20日-9月5日</span>
          <span>
            <span class="price">￥1608元</span>
            <i class="arrow-right"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="group item" @click.stop="showGroup">
      <span class="item-label">
        团队课金额
        <i class="item-icon" :class="{'item-icon-top': groupVisible}"></i>
      </span>
      <span class="item-value">
        <span style="color:  #26C7A0;">23456.34</span>元
      </span>
    </div>
    <mt-datetime-picker
      v-model="startDate"
      ref="startpicker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="startHandleConfirm">
    </mt-datetime-picker>
    <mt-datetime-picker
      v-model="endDate"
      ref="endpicker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="endHandleConfirm">
    </mt-datetime-picker>
    <mt-popup
    v-model="showProject"
    :closeOnClickModal="false"
    position="bottom">
      <div>
        <div class="popup-header">
          <span class="popup-title">请选择您的运动项目分类</span>
          <span class="popup-close" @click.stop="closePopup"></span>
        </div>
        <div class="popup-content">
          1111111111111
        </div>
        <div class="c-mt-btn">
          <mt-button type="default" @click.stop="saveProject" :disabled="styleDisabled">确认</mt-button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import Helper from '@/utils/helper'
// let date = Helper.formatYearMonthDay()
let date = new Date()
export default {
  name: 'Achievement',
  data () {
    return {
      startDate: date,
      endDate: date,
      dateType: '',
      privateVisible: false,
      groupVisible: false,
      showProject: false
    }
  },
  watch: {
    startDate (val) {
      console.log(val)
    }
  },
  filters: {
    formatYearMonthDay (val) {
      return Helper.formatYearMonthDay(val)
    }
  },
  methods: {
    selectDate (type) {
      this.type = type
      if (this.type == 0) {
        this.$refs.startpicker.open()
      } else {
        this.$refs.endpicker.open()
      }
    },
    startHandleConfirm (value) {
      this.startDate = value
    },
    endHandleConfirm (value) {
      this.endDate = value
    },
    showPrivate () {
      this.privateVisible = !this.privateVisible
    },
    showGroup () {
      this.groupVisible = !this.groupVisible
    },
    // 选择地点
    selectLocation () {
      this.showProject = true
    },
    closePopup () {
      this.showProject = false
    }
  },
  created() {

  }
}
</script>

<style lang="stylus">
.achievement
  .date
    background #fff
    height 68px
    padding 0 16px
    display flex
    justify-content space-between
    align-items center
    .ok-date
      &>img
        width 30px
        height 30px
    .start-date,.end-date
      display flex
      flex-direction column
      justify-content space-between
    .date-label
      font-size: 12px;
      color: #999999;
      margin-bottom 10px
    .date-value
      font-size: 14px;
      color: #333333;
  .item
    height 50px
    background #fff
    margin-top 1px
    padding 0 16px
    display flex
    justify-content space-between
    align-items center
    .item-label
      color: #515151;
      .item-icon
        width 11px
        height 6px
        background url('./../../assets/images/performance-icon-packup.png')
        background-size 100% 100%
        transform-origin 50% 30%
      .item-icon-top
        transform rotate(180deg)
    .item-value
      font-size: 16px;
      color: #4A4A4A;
      &>span
        font-size 28px
        font-weight 600
  .private
    margin-top 10px
  .group
    margin-top 10px
  .private-total
    background #fff
    height 80px
    display flex
    margin-top 1px
    &-item
      flex 1
      display flex
      flex-direction column
      justify-content space-around
      align-items center
      padding 19px 0 17px 0
      .item-label
        font-size 12px
        color #4A4A4A
      .item-value
        font-size 16px
        color #4A4A4A
        &>span
          font-size 24px
          font-weight 600
          color #4F4A60
    .item-border
      background  #E1E1E1
      height 40px
      width 1px
      margin-top 21px
  .course-item
    background #fff
    margin-top 1px
    height 70px
    padding 12px 16px 15px
    display flex
    flex-direction column
    justify-content space-between
    &-label
      color: #333333; 
      font-weight 600
    &-value
      display flex
      justify-content space-between
      align-items flex-end
      .time
        font-size: 12px;
        color: #515151;
      .price
        color: #FF894D;
        font-size 14px
        margin-right 10px
  .mint-popup
    width 100%
    .popup-header
      height 1.2rem
      line-height 1.2rem
      border-bottom 1px solid #EEEEEE
      display flex
      justify-content space-between
      align-items center
      padding 0 15px
      .popup-title
        font-size 0.36rem
      .popup-close
        background url('./../../assets/images/indent-add.png') no-repeat
        background-size 100% 100%
        height 0.4rem
        width 0.4rem
        transform rotate(-225deg)
    .popup-content
      height 1.2rem
      line-height 1.2rem
      padding-left 0.3rem
      padding-right 0.3rem
      font-size 0.32rem
      color #515151
      .c-icon
        margin-right 0.4rem
        vertical-align middle
        margin-top -0.04rem
      .popup-content-item
        font-size 0.32rem
    .c-mt-btn
      margin-bottom 0.2rem
</style>
