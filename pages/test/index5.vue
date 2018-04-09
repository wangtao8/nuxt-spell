<template>
  <ul>
    <!--<li v-for="(item, index) in titles" :key="index">-->
      <!--<div class="tops"></div>-->
      <!--<div>{{item.title}}</div>-->
    <!--</li>-->
  </ul>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        titles: {}
      }
    },
    mounted(){
      if (process.BROWSER_BUILD) {
        let wx = require('weixin-js-sdk')
        let jsSHA = require('jssha')
        let shaObj = new jsSHA("SHA-512", "TEXT")
        shaObj.update("This is a ")
        shaObj.update("test")
        let hash = shaObj.getHash("HEX")
        console.log(hash)
        axios.get('https://emcs.quanyou.com.cn/spellapi/auth/getWxConfig')
          .then(function (data) {
            let appId = data.data.data.appId
            let timestamp = data.data.data.timestamp
            let nonceStr = data.data.data.nonceStr
            let signature = data.data.data.signature
            let jsapi_ticket = data.data.data.jsapi_ticket
            let url = data.data.data.url
            console.log(signature)
            wx.config({
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: appId, // 必填，公众号的唯一标识
              timestamp: timestamp, // 必填，生成签名的时间戳
              nonceStr: nonceStr, // 必填，生成签名的随机串
              signature: signature,// 必填，签名
              jsApiList: ['onMenuShareTimeline'] // 必填，需要使用的JS接口列表
            })

            wx.ready(function () {
              wx.onMenuShareTimeline({
                title: '123123123', // 分享标题
                link: 'http://172.0.0.1:3222/spell/success', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://bmcs.quanyou.com.cn/resources/images/linke-logo.png', // 分享图标
                success () {
                  alert('分享朋友圈成功')
                  // 用户确认分享后执行的回调函数
                },
                cancel () {
                  // 用户取消分享后执行的回调函数
                }
              })
            })
        })
      }
    }
  }
</script>
<style>
  ul{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  li{
    list-style:none;
    width: 300px;
    background: red;
    margin-top: 10px;
  }
  div .tops{
    height: 200px;
    background: green;
  }
</style>
