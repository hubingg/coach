<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
import Helper from '@/utils/helper'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {

  },
  created() {
    let orgid = Helper.getUrlParam('orgid')
    this.GLOBAL.orgid = orgid
    console.log(orgid)
    window.localStorage.setItem('orgid', orgid)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #4A4A4A;;
  height: 100%;
}
</style>
