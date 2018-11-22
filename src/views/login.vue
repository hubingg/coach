<template>
  <div class="c-login">
    <div class="c-login-header">
      <span class="c-logo">
        <!-- <img src="./../assets/images/perch-60x60-living example.png" /> -->
      </span>
      <span class="c-login-clubname">雪乐山(北京)俱乐部</span>
    </div>
    <div class="c-login-form">
      <mt-field placeholder="请输入手机号码" type="tel" v-model="phone" :attr="{ maxlength: 11 }" @input="handleChange"></mt-field>
      <div class="c-login-number">
        <mt-field placeholder="请输入验证码" type="number" v-model="code" :attr="{ maxlength: 6 }"></mt-field>
        <span class="c-login-getcode" @click="getCode" :class="{'can-get': getDisabled}">{{codeText}}</span>
      </div>
    </div>
    <div class="c-mt-btn">
      <mt-button type="default" @click="login">登录</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      phone: '',
      code: '',
      codeText: '获取验证码',
      getDisabled: false
    }
  },
  methods: {
    getCode () {
      if (!this.getDisabled) return
      let num = 60
      let timer
      timer = setInterval(() => {
        num--
        this.codeText = num + 's后重发'
        this.getDisabled = false
        if (num == 0) {
          clearInterval(timer)
          this.codeText = '获取验证码'
          this.getDisabled = true
        } 
      }, 1000)
      this.$api.getCode(this.phone).then((res) => {
        console.log(res)
      })
    },
    handleChange (val) {
      if ((/^1[0-9]\d{9}$/).test(val) && val.length == 11) {
        this.getDisabled = true
      } else {
        this.getDisabled = false
      }
    },
    login () {
      let param = {
        phone: this.phone,
        code: this.code
      }
      this.$api.login(param).then((res) => {
        console.log(res)
        this.$router.push({name: 'mineInfo', params: {phone: this.phone}})
        // if (res.code == 0) {
        //   if (res.data.phone) {
        //     this.$router.push({name: 'confirmInfo'})
        //   } else {
        //     this.$router.push({name: 'mineInfo'})
        //   }
        // }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
@import "./../assets/stylus/variables"
.c-login
  height 100%
  width 100%
  background-color #fff
  .c-login-header
    display flex
    flex-direction column
    justify-content space-between
    align-items center
    padding 0.4rem
    padding-bottom 1rem
    .c-login-clubname
      margin-top 0.4rem
      font-size 0.32rem
      font-weight 600
  .c-login-form
    padding 0 0.28rem
    margin-bottom 0.6rem
  &-number
    position relative
    .c-login-getcode
      // width 2rem
      height 0.6rem
      font-size 0.28rem
      line-height 0.6rem
      border 1px solid #EBEBEB
      color #EBEBEB
      border-radius 0.3rem
      padding 0 0.28rem
      position absolute
      top 0.2rem
      right 0.2rem
      box-sizing border-box
    .can-get
      border-color $secondColor
      color $secondColor
  .mint-cell
    border-bottom 1px solid #EBEBEB
</style>
