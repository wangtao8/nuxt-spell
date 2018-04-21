<template>
  <h1>123</h1>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        url: '',
      }
    },
    async asyncData (contents){
      return {
        url: contents.query.url
      }
    },
    mounted () {
//      alert('我进来了')
      let sessionInfo = sessionStorage.getItem('local-session-info')
      let urls = this.url
      let storeId = this.url.split('storeId=')[1].split('&')[0]

//      console.log('我第一次查看urls:', urls)

      if (!!sessionInfo) {
//        alert(1)
          axios.post('./toAuth', JSON.parse(sessionInfo))
            .then(function (respons) {
                if (respons.data === 1) {
                  let appId = JSON.parse(sessionStorage.getItem('local-session-info')).appId
                  let shopId = JSON.parse(sessionStorage.getItem('local-session-info')).shopId
                  let buyerId = JSON.parse(sessionStorage.getItem('local-session-info')).buyerId
                  localStorage.setItem('buyerId', buyerId)
                  sessionStorage.setItem('buyerId', buyerId)
                  if (urls.split('spell/')[1].split('?')[0] === 'boon') {
                    if (urls.indexOf(shopId) >= 0) {

                    } else {
                      urls = urls + '&shopId=' + shopId
                    }
                  }
                  if (urls.indexOf(appId) >= 0) {
                    location.href = urls
                  } else {
                    sessionStorage.setItem('myhref', (urls + '&appId=' + appId))
                    location.href = urls + '&appId=' + appId
                  }
                }
            })
        } else {
//        alert(2)
        let herf = 'https://emcs.quanyou.com.cn/emallwap/buyer/toAuth/'+ storeId + '?_=' +(new Date()).getTime() + '&rdUrl=' + encodeURIComponent(urls)
        location.href = herf
//        console.log('鉴权的地址：', herf)
      }
    }
  }
</script>
<style></style>
