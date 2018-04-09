<template>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        test: {},
        storeId: '',
        url: '',
        activityId: ''
      }
    },
    async asyncData (contents){
      return {
        storeId: contents.query.storeId,
        activityId: contents.query.activityId,
        url: contents.query.url
      }
    },
    mounted () {
//      console.log(this.url, this.activityId, this.storeId)
      let self = this
      let storeId = this.storeId
      let sessionInfo = sessionStorage.getItem('local-session-info')
      let urls = this.url + '&activityId=' + this.activityId + '&storeId=' + this.storeId
//      console.log('我第一次查看ID:', urls)
      if (sessionInfo) {
          axios.post('./toAuth', JSON.parse(sessionInfo))
            .then(function (respons) {
                if (respons.data === 1) {
                  let appId = JSON.parse(sessionStorage.getItem('local-session-info')).appId
                  sessionStorage.setItem('myhref', (urls + '&appId=' + appId))
                  location.href = urls + '&appId=' + appId
                }
            })
        } else {
//        console.log('我是url:', urls)
        let herf = 'https://emcs.quanyou.com.cn/emallwap/buyer/toAuth/'+ storeId + '?_=' +(new Date()).getTime() + '&rdUrl=' + encodeURIComponent(urls)
        location.href = herf
//        console.log('我在看herf的值：', herf)
      }
    }
  }
</script>
<style></style>
