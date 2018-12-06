<template>
  <div class="index-page">
    <div class="page-club-top">
      <div class="page-club-headpic">
        <!-- <img slot="icon" src="./../assets/images/pic-profile-photo.png"> -->
        <img :src="clubInfo.logo" />
      </div>
      <div class="page-club-name">
        {{clubInfo.name}}
      </div>
    </div>
    <div class="course-info">
      <div class="course-info-item">
        <span class="item-label">本月总课时</span></br>
        <span class="item-value">
          <span class="item-value-hours"></span>
          小时
        </span>
      </div>
      <span class="item-border"></span>
      <div class="course-info-item">
        <span class="item-label">私教课时</span>
        <span class="item-value">
          <span class="item-value-hours">{{instructorTimes.sumHours}}</span>
          小时
        </span>
      </div>
      <span class="item-border"></span>
      <div class="course-info-item">
        <span class="item-label">团课课时</span></br>
        <span class="item-value">
          <span class="item-value-hours"></span>
          小时
        </span>
      </div>
    </div>
    <div class="page-bottm">
      <div class="page-menu">
        <div class="page-menu-item"  @click="toCourse">
          <div class="menu-item-icon">
            <img src="./../assets/images/home-icon-course.png" alt="">
          </div>
          <span class="menu-item-value">课程</span>
        </div>
        <div class="page-menu-item" @click="toAchievement">
          <div class="menu-item-icon">
            <img src="./../assets/images/home-icon-performance.png" alt="">
          </div>
          <span class="menu-item-value">业绩</span>
        </div>
        <div class="page-menu-item" @click="toSchedule">
          <div class="menu-item-icon">
            <img src="./../assets/images/home-icon-schedule.png" alt="">
          </div>
          <span class="menu-item-value" >日程</span>
        </div>
      </div>
      <div class="page-code">
        <div class="page-scan" @click="toScanCode">
          扫一扫
        </div>
        <div class="page-mine" @click="toMine">
          <div class="page-mine-icon">
            <img src="./../assets/images/home-icon-main.png" alt="">
          </div>
          <span class="page-mine-value" >我的</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/utils/helper'
export default {
  name: 'Index',
  data () {
    return {
      instructorTimes: '',
      clubInfo: {},
      courseCode: ''
    }
  },
  methods: {
    getClub () {
      let param = {
        id: this.GLOBAL.orgid
      }
      this.$api.getClub(param).then(res => {
        this.clubInfo = res.data
        Helper.setStorage('clubInfo', JSON.stringify(this.clubInfo))
      })
    },
    getCoachHours () {
      let coachInfo =  Helper.getStorage('coachInfo') || {}
      console.log(coachInfo)
      if (!coachInfo.id) {
        this.$router.push({name: 'login'})
        return
      }
      let param = {
        instructorId: coachInfo.id,
        orgId: this.GLOBAL.orgid
      }
      this.$api.getCoachHours(param).then((res) => {
        let data = res.data
        this.instructorTimes = data.instructorTimes
        Helper.setStorage('userInfo', JSON.stringify(data))
      })
    },
    // 我得
    toMine () {
      this.$router.push({name: 'Mine'})
    },
    // 业绩
    toAchievement () {
      this.$router.push({name: 'Achievement'})
    },
    toCourse () {
      this.$router.push({name: 'Course'})
    },
    toConfirmCourse () {
      this.$router.push({name: 'ConfirmCourse'})
    },
    toSchedule () {
      this.$router.push({name: 'Schedule'})
    },
    // 扫一扫
    toScanCode () {
      // let result = 'http://mp-test.kukusport.com/reservation_check_in?&reservation.id=63&nonce=8LNTYSppIl1SCW5Ey4UjKn7nimIZU3AG&timstamp1543722865&sign=1467325EC2E032362593B97BE9ABDF16&courseCode=00000063&orgId=1'
      // this.$router.push({name: 'ConfirmCourse', params: {resultStr: result}})
      // return
      let param = {
        url: (window.location.href).split('#')[0]
      }
      this.$api.getWxConfig(param).then(res => {
        let data =res.data
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appid, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature,// 必填，签名
          jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
        })
        wx.error(function(res) {
          alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
        });
        wx.ready(() => {
          wx.scanQRCode({
            needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType : [ "qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success : res => {
              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              // window.location.href = result;//因为我这边是扫描后有个链接，然后跳转到该页面
              this.$router.push({name: 'ConfirmCourse', params: {resultStr: result}})
            },
            error : function(){
              console.log('123');
            }
          })
        })
      })
    }
  },
  created() {
    this.getCoachHours()
    this.getClub()
    console.log(1)
  }
}
</script>

<style lang="stylus">
.index-page
  height 100%
  display flex
  flex-direction column
  .page-club-top
    height 3rem
    background url(./../assets/images/mine-bg-banner.png) no-repeat
    background-size 100% 100%
    text-align center
    .page-club-headpic
      display inline-block
      margin-top 0.5rem
      width 1.2rem
      height 1.2rem
      &>img
        width 100%
        height 100%
    .page-club-name
      text-align center
      font-size 0.32rem
      color #fff
      &>span
        font-size 0.32rem
  .course-info
    height 80px
    background #fff
    display flex
    justify-content center
    align-items center
    margin-bottom 10px
    &-item
      flex 1
      text-align center
      .item-label
        font-size 12px
        color #4A4A4A
      .item-value
        font-size 16px
        color #4A4A4A
        .item-value-hours
          font-size 28px
          font-weight 600
          color #26C7A0
    .item-border
      background  #E1E1E1
      height 40px
      width 2px
      display inline-block
  .page-bottm
    flex 1
    background #fff
    padding 23px 0 16px 0
    display flex
    justify-content space-between
    flex-direction column
    .page-menu
      width 100%
      display flex
      .page-menu-item
        flex 1
        text-align center
        .menu-item-icon
          width 45px
          height 45px
          text-align center
          margin 0 auto 5px auto
          &>img
            width 100%
            height 100%
    .page-code
      display flex
      justify-content center
      align-items center
      position relative
      .page-scan
        font-size 16px
        color #FFFFFF
        height 140px
        line-height 140px
        text-align center
        width 140px
        background url('./../assets/images/home-RichScan-bg.png')
        background-size 100% 100%
      .page-mine
        position absolute
        right 52px
        bottom 45px
        .page-mine-icon
          width 22px
          height 22px
          &>img
            width 100%
            height 100%
        .page-mine-value
          font-size 12px
          color #4F4A60
</style>
