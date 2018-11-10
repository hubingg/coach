<template>
  <div class="edit-mine">
    <div class="edit-mine-item" style="color: #999;">
      <span class="c-icon c-icon-mine"></span>
      昵称
    </div>
    <mt-field placeholder="个人简介，多行输入…" type="textarea" rows="6" v-modal="introduction"></mt-field>
    <div class="edit-mine-item" style="margin-top: 10px;">
      <span class="c-icon c-icon-award"></span>
      获奖信息
    </div>
    <div class="edit-award">
      <div class="add-btn">
        <span class="c-icon c-icon-add"></span>
        继续添加
      </div>
    </div>
    <div class="bottom-btn">
      <span class="btn-cancel" @click="cancel">取消</span>
      <span class="btn-ok">确认</span>
    </div>
  </div>
</template>

<script>
import Helper from '@/utils/helper'
export default {
  name: 'editMine',
  data () {
    return {
      introduction: ''
    }
  },
  methods: {
    cancel () {
      this.$router.go(-1)
    }
  },
  created() {
  }
}
</script>

<style lang="stylus">
.edit-mine
  height 100%
  .edit-mine-item
    height 50px
    line-height 50px
    box-sizing border-box
    background #ffffff
    border-bottom 1px solid #E6E6E6
    padding-left 16px
    font-size 16px
    font-weight 600
    color #333333
  .mint-cell
    height 150px
    .mint-cell-wrapper
      padding 0 16px !important
      .mint-cell-value
        padding 13px 0
        font-size 14px
        color #999999
  .edit-award
    padding 20px 16px
    background #fff
    .add-btn
      width 160px
      height 30px
      line-height 30px
      text-align center
      border 1px solid #D5D5D5
      border-radius 16px
      .c-icon
        width 13px
        height 13px
  .bottom-btn
    height 64px
    width 100%
    display flex
    position fixed
    bottom 0
    &>span
      display inline-block
      flex 1
      font-size 18px
      text-align center
      line-height 64px
    .btn-cancel
      background #FFFFFF
      color #999
    .btn-ok
      background #4F4A60
      color #fff
</style>
