<template>
  <div class="c-course-items">
    <div class="c-course-item" v-for="(item, index) in orderItems" :key="index">
      <div class="c-course-item-title">
        <span class="order-type">私教 | {{item.orderPresaleProducts && item.orderPresaleProducts.instructorname}}</span>
        <span class="order-tag tag-style-single" v-show="item.orderPresaleProducts && item.orderPresaleProducts.style == '单板'">单板</span>
        <span class="order-tag tag-style-double" v-show="item.orderPresaleProducts && item.orderPresaleProducts.style == '双板'">双板</span>
        <span class="order-tag tag-status-pay" v-if="item.status=== 0">待付款</span>
        <span class="order-tag tag-status-pay" v-if="item.status=== 1 && item.orderStatus === 'WAITING'">待参加</span>
        <span class="order-tag tag-status-pay" v-if="item.status=== 1 && item.orderStatus === 'IN_PROGRESS'">进行中</span>
        <!-- <span class="order-tag tag-status-success" v-if="item.status=== 2 && item.orderStatus === 'IN_PROGRESS'">交易成功</span> -->
        <!-- <span class="order-tag tag-status-success" v-if="item.status=== 2 && item.orderStatus === 'IN_PROGRESS'">交易关闭</span> -->
        <span class="order-tag tag-status-refued" v-if="item.status=== 3 && item.refundFlag === 'REFUND_PROCESSING'">退款中</span>
        <span class="order-tag tag-status-refued" v-if="item.status=== 3 && item.refundFlag === 'SUCCESS'">已退款</span>
      </div>
      <div class="c-course-item-content" @click.stop="toDetail(item)">
        <div class="c-course-headpic">
          <img src="http://images.kukusport.com/testimages/perch-coach-90x120-living.png">
        </div>
        <div class="c-course-content">
          <span>时间：{{item.orderPresaleProducts && item.orderPresaleProducts.starttime | formatMonthDay}}-{{item.orderPresaleProducts && item.orderPresaleProducts.endtime | formatMonthDay}}</span>
          <span style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">地点：{{item.orderPresaleProducts && item.orderPresaleProducts.locationlist}}</span>
          <span>人数：{{item.amount}}人</span>
        </div>
        <div class="c-course-price">
          <span class="c-course-price-orign">￥{{item.totalprice}}元</span>
          <!-- <span class="c-course-price-discount">￥2000元</span> -->
        </div>
      </div>
    </div>
    <div class="no-course" v-if="!orderItems.length">
      <img src="../../assets/images/default-contacts.png"><br/>
      <span class="no-course-title">您当前没有课程</span>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import Helper from '@/utils/helper'
export default {
  name: 'Course',
  data () {
    return {
      orderItems: [1]
    }
  },
  props: {
    status: {
      default: '',
      type: String
    }
  },
  methods: {
    // 订单详情
    toDetail (item) {
      this.$router.push({name: 'PrivateCourse', query: {orderno: item.orderno}})
    },
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
    },
    init () {
      
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="stylus">
.c-course-items
  height 100%
  overflow auto
  .no-order
    height 100%
    background-color #fff
    padding-top 1rem
    text-align center
    // display flex
    // flex-direction column
    // justify-content space-between
    // align-items center
    &>img
      height 2.4rem
      width 2.4rem
    &-title
      font-size 0.28rem
      color #999999
      margin-top 0.4rem
  .c-course-btn-pay
    color #26C7A0
    border-color #26C7A0
  .c-course-item
    background-color #fff
    margin-top 0.2rem
    &-title
      height 40px
      line-height 40px
      padding-left 16px
      border-bottom 1px solid #E6E6E6
      display flex
      align-items center
      .order-type
        font-weight 600
    &-content
      height 80px
      padding 10px 16px 10px 16px
      border-bottom 1px solid #E6E6E6
      display flex
      .c-course-headpic
        height 60px
        width 60px
        margin-right 10px
        &>img
          width 100%
          height 100%
      .c-course-content
        color #515151
        flex 1
        display flex
        flex-direction column
        justify-content space-between
        overflow hidden
        &>span
          font-size 12px
      .c-course-price
        width 60px
        text-align right
        padding-top 5px
        display flex
        flex-direction column
        justify-content flex-start
        &-orign
          font-size: 14px;
          color: #FF5362;
        &-discount
          color #999
          text-decoration line-through
          font-size 12px
    &-btn
      height 47px
      line-height 47px
</style>
