<template>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
    },
    mounted(){
      if (process.BROWSER_BUILD) {
        let wx = require('weixin-js-sdk')
        let jsSHA = require('jssha')
        axios.get('https://emcs.quanyou.com.cn/spellapi/auth/getWxConfig')
          .then(function (data) {
            let appId = data.data.data.appId
            let timestamp = data.data.data.timestamp
            let nonceStr = data.data.data.noncestr
            let signature = data.data.data.signature
            let jsapi_ticket = data.data.data.jsapi_ticket
            let url = data.data.data.url

            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: `${appId}`, // 必填，公众号的唯一标识
              timestamp: `${timestamp}`, // 必填，生成签名的时间戳
              nonceStr: `${nonceStr}`, // 必填，生成签名的随机串
              signature: `${signature}`,// 必填，签名
              jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
            })

            wx.ready(function () {
              alert('xxxxxxxxxxxxxx')
              wx.onMenuShareAppMessage({
                title: 'xxxxxxx', // 分享标题
                desc: 'asdasdasda', // 分享描述
                link: 'https://emcs.quanyou.com.cn/spell/test/index5', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://bmcs.quanyou.com.cn/resources/images/linke-logo.png', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
// 用户确认分享后执行的回调函数
                  alert('成功！')
                },
                cancel: function () {
// 用户取消分享后执行的回调函数
                  alert('失败！')
                }
              });
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
