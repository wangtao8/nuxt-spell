<template>
  <div class="loading-page" v-show="loading">
    <p ref="load" v-show="loadi">Loading...</p>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loading: true,
        loadi: false
      }
    },
    mounted () {
      let self = this
      let elLeft = (window.innerWidth - 300) / 2
      let elTop = (window.innerHeight - 300) / 2
      self.$refs.load.style.left = elLeft + 'px'
      self.$refs.load.style.top = elTop + 'px'
      self.loadi = true
    }
  }
</script>
<style>
  html,body{
    width: 100%;
    height: 100%;
  }
  #__nuxt, #__nuxt>div{
    height: 100%;
  }
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    font-size: 30px;
    font-family: sans-serif;
  }
  .loading-page>p{
    width: 300px;
    height: 300px;
    background-image: url("/images/timg.gif");
    background-repeat: round;
    text-align: center;
    padding-top: 260px;
    position: absolute;
  }
</style>
