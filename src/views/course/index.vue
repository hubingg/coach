<template>
  <div class="c-course">
   <mt-navbar v-model="selected">
      <mt-tab-item id="group">待开始</mt-tab-item>
      <mt-tab-item id="private">进行中</mt-tab-item>
      <mt-tab-item id="public">已结束</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="group">
        <course-item></course-item>
      </mt-tab-container-item>
      <mt-tab-container-item id="private">
        <course-item></course-item>
      </mt-tab-container-item>
      <mt-tab-container-item id="public">
        <course-item></course-item>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import CourseItem from './course-item.vue'
export default {
  name: 'Course',
  components: {
    CourseItem
  },
  data () {
    return {
      selected: 'group'
    }
  }
}
</script>

<style lang="stylus">
.c-course
  height 100%
  .mint-navbar
    height 0.8rem
    line-height 0.8rem
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
  .no-course
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
  .mint-tab-container
    height 100%
    .mint-tab-container-wrap
        height 100%
      .mint-tab-container-item
        height 100%
</style>
