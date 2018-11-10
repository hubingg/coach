<template>
  <div class="index-page">
    <div class="page-club-top">
      <div class="page-club-headpic">
        <!-- <img slot="icon" src="./../assets/images/pic-profile-photo.png"> -->
      </div>
      <div class="page-club-name">
        雪乐山(北京)俱乐部
      </div>
    </div>
    <div class="course-info">
      <div class="course-info-item">
        <span class="item-label">本月总课时</span>
        <span class="item-value">
          <span class="item-value-hours">40</span>
          小时
        </span>
      </div>
      <span class="item-border"></span>
      <div class="course-info-item">
        <span class="item-label">私教课时</span>
      </div>
      <span class="item-border"></span>
      <div class="course-info-item">
        <span class="item-label">团课课时</span>
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
        <div class="page-scan" @click="toConfirmCourse">
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
    }
  },
  methods: {
    getUserInfo () {
      this.$api.getUserInfo().then((res) => {
        let data = res.data
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
    }
  },
  created() {
    
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
