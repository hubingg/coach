<template>
  <div class="confirm-course">
    <div class="member-info">
      <div class="member-info-image">
        <img src="./../../assets/images/mine-image.png" />
      </div>
      <div class="member-info-content">
        <div class="member-info-text">
          张某某
          <span class="c-tag c-tag-men"></span>
          <span class="c-tag c-tag-women"></span>
          <span class="c-tag-kid"></span>
          <span class="c-tag-adult"></span>
        </div>
        <div class="member-info-phone">
          150 3456 7890
        </div>
      </div>
    </div>
    <div class="course-info">
      <div class="course-info-title">
        团课 | 入门 | 课程名称
        <span class="order-tag order-tag-single">单板</span>
      </div>
      <div class="course-info-content">
        <div class="info-item">
          <div class="info-item-index">05</div>
          <div class="info-item-value">
            <div class="date">2018年8月12日 13:00-15:00</div>
            <div class="text">
              <span class="location"><i class="icon-location"></i>崇礼区万龙</span>
              <span class="name"><i class="icon-name"></i>Andy  Lee</span>
            </div>
          </div>
          <div class="info-item-radio">
            <span class="c-select c-select-true"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="btn">
      确认到课
    </div>
  </div>
</template>

<script>
export default {
  name: 'confirmCourse',
  data () {
    return {
    }
  },
  methods: {
    getCode () {
      
    }
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
