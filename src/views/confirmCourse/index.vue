<template>
  <div class="confirm-course">
    <div class="member-info">
      <div class="member-info-image">
        <img src="./../../assets/images/mine-image.png" />
      </div>
      <div class="member-info-content">
        <div class="member-info-text">
          {{orderReservation.name}}
          <span class="c-tag c-tag-men" v-if="orderReservation.sex == '男'"></span>
          <span class="c-tag c-tag-women" v-else></span>
          <span class="c-tag-adult" v-if="orderReservation.isadult"></span>
          <span class="c-tag-kid" v-else></span>
        </div>
        <div class="member-info-phone">
          {{orderReservation.phone}}
        </div>
      </div>
    </div>
    <div class="course-info">
      <div class="course-info-title">
        私教课 | {{orderPresaleProducts && orderPresaleProducts[0].coursename}}
        <span class="order-tag order-tag-single" v-if="orderPresaleProducts[0].style == '单板'">单板</span>
        <span class="order-tag order-tag-double" v-else>双板</span>
      </div>
      <div class="course-info-content">
        <div class="info-item" v-for="(item, index) in orderPresaleProducts" :key="index">
          <div class="info-item-index">{{index+1 | formatIndex}}</div>
          <div class="info-item-value">
            <div class="date">{{item.starttime | formatYearMonthDayV}} {{item.starttime | formatHourMinutes}}-{{item.endtime |  formatHourMinutes}}</div>
            <div class="text">
              <span class="location"><i class="icon-location"></i>{{item.locationlist}}</span>
              <span class="name"><i class="icon-name"></i>{{item.instructorname}}</span>
            </div>
          </div>
          <div class="info-item-radio">
            <span class="c-select" :class="item.check ? 'c-select-true':'c-select-false'" @click="select($event,item, index)"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="btn" @click="checkCourse">
      确认到课
    </div>
  </div>
</template>

<script>
import Helper from '@/utils/helper'
import { MessageBox } from 'mint-ui'
export default {
  name: 'confirmCourse',
  data () {
    return {
      courseCode: '',
      orgId: '',
      presale: {},
      orderReservation: {},
      orderPresaleProducts: []
    }
  },
  computed: {
    selectPresale () {
      let arr = []
      this.orderPresaleProducts.forEach(item => {
        if (item.check) {
          arr.push(item)
        }
      })
      return arr
    }
  },
  filters: {
    formatYearMonthDayV (val) {
      return Helper.formatYearMonthDayV(val)
    },
    formatHourMinutes (val) {
      return Helper.formatHourMinutes(val)
    },
    formatIndex (val) {
      if (val < 10) {
        return '0' + val
      }
      return val
    }
  },
  methods: {
    select (e, item, index) {
      this.orderPresaleProducts[index].check = !item.check 
      this.orderPresaleProducts.splice()
      e.preventDefault()
    },
    getCode () {
      
    },
    getPresale () {
      let param = {
        courseCode: this.courseCode,
        orgId: this.orgId
      }
      this.$api.getPresale(param).then(res => {
        this.orderReservation = res.data.orderReservation || {}
        this.orderPresaleProducts = res.data.orderPresaleProducts || []
      })
    },
    // 核销课程
    checkCourse () {
      if (!this.selectPresale.length) {
        MessageBox.alert("请先选择课程")
        return
      }
      let coachInfo =  Helper.getStorage('coachInfo')
      let param = {
        courseCode: this.courseCode,
        orgId: this.orgId - 0,
        presaleId: this.selectPresale[0].presaleid,// 私教就一个课程
        coachId: this.selectPresale[0].instructorid,
        orderNo: this.orderPresaleProducts[0].orderno,
        style: this.orderPresaleProducts[0].style,
        locationList: this.orderPresaleProducts[0].locationlist
      }
      this.$api.checkCourse(param).then(res => {
        let data = res.data
        if (data.status) {
          MessageBox({
            title: '提示',
            message: '确认成功！',
            showCancelButton: false,
            // cancelButtonText: '取消',
            confirmButtonText: '确认',
            confirmButtonClass: 'ok-btn'
          }).then(action => {
            if (action === 'confirm') {
              this.$router.push({name: 'Index'})
            } else {
              return
            }
          })
        }else {
          MessageBox.alert(data.description)
        }
      })
    }
  },
  created () {
    let result = this.$route.params.resultStr
    let courseCode = Helper.getParamsFromUrl('courseCode', result)
    let orgId = Helper.getParamsFromUrl('orgId', result)
    this.courseCode = courseCode
    this.orgId = orgId
    this.getPresale()
  }
}
</script>

<style scoped lang="stylus">
.confirm-course
  .member-info
    width 345px
    height 120px
    margin 10px 15px 15px 10px
    background-color #fff
    box-shadow: 0 2px 10px 0 rgba(27,65,90,0.16);
    border-radius: 2px;
    padding 25px 0 0 28px
    display flex
    &-image
      height 60px
      width 60px
      margin-right 35px
      img
        width 100%
        height 100%
    &-content
      flex 1
      height 60px
      display flex
      flex-direction column
      justify-content space-around
      .member-info-text
        font-size: 16px;
        font-weight 600 
        color: #333333;
      .member-info-phone  
        color: #515151;
  .course-info
    width 345px
    margin 0 15px
    background #FFFFFF
    box-shadow 0 0.04rem 0.2rem 0 rgba(27,65,90,0.16)
    border-radius 0.04rem
    position relative
    overflow hidden
    &:before
      left -0.1rem
    &:after
      right -0.1rem
    &:before, &:after
      content: ''
      width 0.2rem
      height 0.2rem
      position absolute
      top 0.86rem
      background #EDF1F3
      box-shadow 0 0 0 rgba(27,65,90,0.16)
      border-radius 0.1rem
    .course-info-title
      height 0.96rem
      line-height 0.96rem
      padding-left 0.38rem
      font-size 0.32rem
      font-weight 600
      color: #4A4A4A;
      border-bottom 1px solid #e6e6e6
      border-top 0.04rem solid #26C7A0
      text-align center
    .course-info-content
      .info-item
        height 56px
        border-bottom 1px solid #e6e6e6
        padding 0 20px
        display flex
        justify-content space-between
        align-items center
        .info-item-index
          width 45px
          font-size: 40px;
          font-weight 600
          color: #26C7A0;
          letter-spacing: 0.89px;
          font-family: DINCondensed-Bold;
        .info-item-value
          margin-left 20px
          margin-right 30px
          flex 1
          .text
            display flex
            justify-content space-between
            .location,.name
              font-size: 12px;
              color: #9B9B9B;
            .icon-location
              background url('./../../assets/images/home-icon-add.png')
              background-size 100% 100%
              width 10px
              height 12px
              margin-right 6px
              vertical-align middle
              margin-top -2px
            .icon-name
              background url('./../../assets/images/home-icon-coach.png')
              background-size 100% 100%
              width 10px
              height 12px
              margin-right 6px
              vertical-align middle
              margin-top -2px
  .btn
    position fixed
    bottom 0
    background: #4F4A60;
    height 64px
    line-height 64px
    width 100%
    text-align center
    font-size: 18px;
    color: #FFFFFF;
    font-weight 600
</style>
