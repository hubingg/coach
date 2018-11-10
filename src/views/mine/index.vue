<template>
  <div class="mine">
    <div class="mine-top">
      <div class="mine-top-headpic">
        <img slot="icon" src="./../../assets/images/mine-image.png">
      </div>
      <div class="mine-top-name">
        雪乐山(北京)俱乐部
      </div>
    </div>
    <div class="ratio-info">
      <div class="ratio-info-item">
        <div class="item-label">好评度</div>
        <span class="item-value">
          <span class="item-value-hours">40</span>
          %
        </span>
      </div>
      <span class="item-border"></span>
      <div class="ratio-info-item">
        <div class="item-label">复购率</div>
        <span class="item-value">
          <span class="item-value-hours">40</span>
          %
        </span>
      </div>
    </div>
    <div class="mine-info">
      <div class="mine-info-title">
        <div class="title-name">
          <span class="c-icon c-icon-mine"></span>
          Andy Wang
        </div>
        <span style="color: #26C7A0;" @click="toEdit">[编辑]</span>
      </div>
      <div class="mine-info-content">
        私人教练需要拥有雄厚的体的知识运动生理及训练适能知识，要对不同类适能知识，要对不适能知识，要对不型的知识运动生理及训练动作…
      </div>
    </div>
    <div class="award-info">
      <div class="award-info-title">
        <div class="title-name">
          <span class="c-icon c-icon-award"></span>
          获奖信息
        </div>
      </div>
      <div class="award-info-content">
        <div class="award-item">
          <span class="award-item-date">2016</span>
          <span class="award-item-project">驭龙滑雪挑战赛</span>
          <span class="award-item-prize">冠军</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/utils/helper'
export default {
  name: 'Mine',
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
    toEdit () {
      this.$router.push({name: 'editMine'})
    }
  },
  created() {
  }
}
</script>

<style lang="stylus">
.mine
  .mine-top
    height 3rem
    background url(./../../assets/images/mine-bg-banner.png) no-repeat
    background-size 100% 100%
    text-align center
    .mine-top-headpic
      display inline-block
      margin-top 0.5rem
      width 1.2rem
      height 1.2rem
      &>img
        width 100%
        height 100%
    .mine-top-name
      text-align center
      font-size 0.32rem
      color #fff
      &>span
        font-size 0.32rem
  .ratio-info
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
  .mine-info
    background #fff
    padding 0 16px 13px 16px
    margin-bottom 1px
    .mine-info-title
      height 50px
      line-height 50px
      border-bottom 1px solid #E6E6E6
      display flex
      justify-content space-between
      align-items center
      .title-name
        line-height 50px
        font-size 16px
        color #515151
        font-weight 600
    .mine-info-content
      margin-top 13px
      line-height 24px
      color #4A4A4A
      overflow hidden
      text-overflow ellipsis
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 3
  .award-info
    background #fff
    padding 0 16px
    border-bottom 1px solid #E6E6E6
    .award-info-title
      height 50px
      line-height 50px
      border-bottom 1px solid #E6E6E6
      .title-name
        line-height 50px
        font-size 16px
        color #515151
        font-weight 600
    .award-info-content
      .award-item
        height 39px
        display flex
        justify-content space-between
        align-items center
        &>span
          font-size: 14px;
          color: #333333;
</style>
