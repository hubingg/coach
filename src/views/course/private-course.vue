<template>
  <div class="private-course">
    <div class="course-info">
      <div class="course-info-box">
        <div class="course-info-date">3018年11月4</div>
        <div class="course-info-time">15:00-19:00</div>
        <div class="course-info-location">15:00-19:00</div>
        <div class="course-info-name">15:00-19:00</div>
      </div>
    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="group">未签到</mt-tab-item>
      <mt-tab-item id="private">已签到</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="group">
        <div class="course-item">
          <div class="course-item-content">
            <span class="item-index">01</span>
            <span class="item-value">
              <span class="name">张某某</span>
              <span class="c-tag-adult"></span></br>
              <span class="phone">11111111111</span>
            </span>
          </div>
          <div class="course-item-btn">
            <span class="to-phone">拨打电话</span>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="private">

      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import Helper from '@/utils/helper'
export default {
  name: 'Course',
  data () {
    return {
      orderItems: [1],
      selected: 'group'
    }
  },
  props: {
    status: {
      default: '',
      type: String
    }
  },
  methods: {
    getOrderList () {
      let uesrid =  Helper.getStorage('userInfo').userid
      let param = {
        userId: uesrid,
        // orgId: this.GLOBAL.orgid,
        status: this.status,
      }
      this.$api.getOrderList(param).then((res) => {
        this.orderItems = res.data
      })
    }
  },
  created () {

  }
}
</script>

<style lang="stylus">
.private-course
  .course-info
    height 190px
    background #4F4A60
    padding 19px 7px 11px
    &-box
      height 100%
      background url('../../assets/images/course-bg.png')
      background-size 100% 100%
      padding 20px
      display flex
      flex-direction column
      align-items center
      .course-info-time
        color #333
        font-size 25px
        margin-bottom 20px
      .course-info-location
        color #333
      .course-info-name
        color #999
        margin-top 10px
  .mint-tab-container
    border 1px solid #E1E1E1
  .course-item
    padding 0 16px
    height 56px
    background #ffffff
    display flex
    justify-content space-between
    align-items center
    &-content
      .item-index
        font-size 40px
        font-weight 600
        color #E6E6E6
        margin-right 10px
      .name
        color #333333
        font-weight 600
      .phone
        color #999999
    &-btn
      .to-phone
        width 75px
        height 30px
        line-height 30px
        box-sizing border-box
        border 1px solid #26C7A0
        border-radius 15px
        text-align center
        font-size 14px
        color #26C7A0
  .mint-navbar
    height 50px
    line-height 50px
    .mint-tab-item
      padding 0
    .mint-tab-item-label
      color #515151
      font-size 0.28rem
      display inline-block
      padding-bottom 0.2rem
    .is-selected
      border-bottom 0
      color #333
      font-weight 600
      .mint-tab-item-label
        border-bottom 0.04rem solid #26C7A0
</style>
