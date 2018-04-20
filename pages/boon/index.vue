<template>
  <div class="el_box">
    <img class="el_banner" :src="gethead.homeBannerUrl">
    <div class="el_personnel">
      <span class="el_avatar"></span>
      <span class="el_jion">{{ nickName }}正在组团抢优惠，快来加入吧！</span>
    </div>
    <div class="el_right">
      <div class="el_timeTxt">距结束</div>
      <ul class="el_btg_time">
        <li class="el_timeDay">{{ $store.state.day }}天</li>
        <li class="el_timeH">{{ $store.state.hour }}</li>
        <li class="el_timeM">{{ $store.state.minute }}</li>
        <li class="el_timeS">{{ $store.state.second }}</li>
      </ul>
    </div>
    <div class="el_nav">
      <div class="el_navs">
        <ul class="clear" ref="mybox">
          <li :class="{active: active == index}" @click="check(index, item.id)" :data="item.id" v-for="(item, index) in clas" :key="index">{{ item.categoryName }}</li>
        </ul>
      </div>
    </div>
    <div :class="content">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="autoFill">
        <div class="el_goods" v-for="(item, index) in goodss" :key="index" @click="goDetail(item.goodsId)">
          <div class="el_img">
            <img :src="item.pic" alt=""/>
          </div>
          <div class="el_bewrite">
            <ul>
              <li>{{ item.goodsName }}</li>
              <li>团长价:
                <span>￥</span>
                <span>{{ item.headPrice / 100}}</span>
              </li>
              <li>
                团员价：
                <span>￥</span>
                <span>{{ item.memberPrice / 100}}</span>
                <span>
                  市场价:
                  <span>￥{{ item.marketPrice / 100}}</span>
              </span>
              </li>
            </ul>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <div class="el_dailog" v-show="daiLog">
      <div class="el_window" ref="dailog">
        <div class="el_cloose" @click="cloose">x</div>
        <div class="el_explain">
          <p>恭喜您！参团成功！</p>
        </div>
        <div class="el_definite">
          <div @click="cloose">知道了</div>
        </div>
      </div>
    </div>
    <div id="lead">
      <ul class="el_choose">
        <li>
          <div @click="openwin1">拼团购</div>
        </li>
        <li>
          <div @click="openwin1">我的团</div>
        </li>
      </ul>
      <nuxt/>
    </div>
    <div id="btn" v-if="isJoin === 0">
      <div class="el_btn" @click="goct">去参团</div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import { MessageBox } from 'mint-ui'
  export default {
    data () {
      return {
        active: 0,
        clas: [],
        goodss: [],
        alldata: [],
        allLoaded: false, // true禁止下拉刷新
        autoFill: false, // 若为真，loadmore 会自动检测并撑满其容器
        currentpageNum: 1, // 当前页数
        totalNum: 5, // 总页数,
        nickName: '',
        gethead: [], // 头部图片链接
        msg: '', // 请求错误提示消息
        teamId: '',
        activityId: '',
        shopId: '',
        storeId: '',
        isJoin: '',
        daiLog: false,
        content: 'el_content',
        endTime: '',
        dataEx: ''
      }
    },
    head () {
      return {
        title: '拼团抢福利'
      }
    },
    validate({ params, query }) {
      return true // 如果参数有效
      //return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
    },
    methods: {
      check: function (e, att) { // 顶部导航切换
        let self = this
        this.active = e
        // 动态的属性名不能用点的，要data[att]这样调用！！！！！！坑！ 因为所有数据都已经请求过来了，所以直接用，不用再发请求!!!
//        this.goodss = this.alldata[att]
        let getclass = {
          activityId: self.activityId,
          categoryId: att,
          pageIndex: 1,
          pageSize: 3,
          shopId: self.shopId,
          storeId: self.storeId
        }
        axios.post('./getclass', getclass)
          .then(function (response) {
            self.goodss = response.data.data.content
            self.last = response.data.data.last
          })
        this.allLoaded = false
        this.currentpageNum = 1
      },
      goDetail: function (obj) {
        location.href = 'https://emcs.quanyou.com.cn/emallwap/spellGoodsdetail/' + this.storeId + '/' +obj
      },
      goct: function () { // 去参团
        // 获取活动id 储存用于查询活动详情
        let _this = this
        let goGroup = {
          teamId: _this.teamId,
          buyerId: sessionStorage.getItem('buyerId'),
          storeId: sessionStorage.getItem('storeId'),
          shopId: sessionStorage.getItem('shopId'),
          nickName: JSON.parse(sessionStorage.getItem('local-session-info')).nick,
          photo: JSON.parse(sessionStorage.getItem('local-session-info')).photo
        }
        // 发送参团请求
        axios.post('./goGroup', goGroup)
          .then(function (response) {
//            console.log('eeeeeeee:', response.data)
            if (response.data.state === 1) {
              _this.content = "el_content2"
              _this.isJoin = 1
            } else {
              MessageBox.alert(response.data.msg, '')
            }
          })
        if (!this.data1) {
          this.daiLog = true
        }
      },
      cloose: function () {
        this.daiLog = false
      },
      openwin1: function (e) { // 引导  参团 我的团 按钮点击事件
        if (e.target.innerText === '拼团购') {
//          location.href = 'participate?buyerId=' + sessionStorage.getItem('buyerId') + '&activityId=' + sessionStorage.getItem('activityId') + '&storeId=' + sessionStorage.getItem('storeId') +'&shopId=' + sessionStorage.getItem('shopId')
          location.href = 'https://emcs.quanyou.com.cn/spell/?shopId='+ sessionStorage.getItem('shopId') +'&activityId='+ this.activityId +'&storeId='+ sessionStorage.getItem('storeId') +'&appId=' + sessionStorage.getItem('appId')
        } else {
          location.href = 'myGroups?buyerId=' + sessionStorage.getItem('buyerId')+ '&storeId=' + sessionStorage.getItem('storeId') +'&shopId=' + sessionStorage.getItem('shopId')
        }
      },
      loadTop: function () { // 到顶部后的下拉刷新
        // 下拉刷新
        let self = this
        this.currentpageNum = 1
        this.allLoaded = false
        setTimeout(() => {
          let getclass = {
            categoryId: document.getElementsByClassName('active')[0].getAttribute('data'),
            pageIndex: 1,
            pageSize: 3,
            activityId: self.activityId,
            shopId: self.shopId,
            storeId: self.storeId
          }
          axios.post('./getclass', getclass)
            .then(function (response) {
              if (response.data.state) {
                // 更新一下所有数据，因为这里刷新了一下，而前面的alldata是进来就请求的数据，需要更新
                self.goodss = response.data.data.content
                // 实时更新是否最后一页有信息
                self.last = response.data.data.last
              } else {
                alert(response.data.msg)
              }
              // 这一步很重要  不然无法实时切换loading状态 到 pull的状态
              self.$refs.loadmore.onTopLoaded()
            })
            .catch(function (err) {
              console.log(err)
            })
        }, 500)
      },
      loadBottom: function () { // 到底部后的上拉加载分页
        // 加载更多数据 加载完成时的事件
        this.currentpageNum++
//        console.log('this.current1:', this.currentpageNum)
        let self = this
        setTimeout(() => {
          let getclass = {
            categoryId: document.getElementsByClassName('active')[0].getAttribute('data'),
            pageIndex: this.currentpageNum,
            pageSize: 3,
            activityId: self.activityId,
            shopId: self.shopId,
            storeId: self.storeId
          }
          if (!self.last) {
            axios.post('./getclass', getclass)
              .then(function (response) {
                if (response.data.state) {
                  //需要每次都重新更新last的状态
                  self.last = response.data.data.last
                  // 让当前被选中的导航 在下拉刷新后一样的呈现出当前导航对应的内容
                  for (let j = 0; j < response.data.data.content.length; j++) {
                    // 将得到的数据循环后单个push到之前的数组中去
                    self.goodss.push(response.data.data.content[j])
                  }
                } else {
                  alert(response.data.msg)
                }
                // 这一步很重要  不然无法实时切换loading状态 到 pull的状态
                self.$refs.loadmore.onBottomLoaded()
              })
          } else {
            // 这一步很重要  不然无法实时切换loading状态 到 pull的状态
            self.$refs.loadmore.onBottomLoaded()
            MessageBox.alert('已经加载完全部内容', '')
          }
        }, 500)
      },
      handleBottomChange: function (status) {
        this.bottomStatus = status// 实时更新上拉状态
      },
      start: function () {
        this.$store.commit('increment') // 提交
      }
    },
    mounted () {
      let self = this
      let elWidth = 0
      // 如果有失败的返回结果
      if (self.msg === 'empty_activity') {
        location.href = '/spell/noActive?storeId=' + self.storeId
      } else {
        setTimeout(function () {
          self.isShow = false
          filter.flter('box', false)
        }, Math.random() * 500)
      }

      console.log('dataEx:', self.dataEx)
      // 分享
      if (process.BROWSER_BUILD) {
        let wx = require('weixin-js-sdk')
        let appId = self.dataEx.appId
        let timestamp = self.dataEx.timestamp
        let nonceStr = self.dataEx.noncestr
        let signature = self.dataEx.signature
        // 时间格式拼接
        let DATE = new Date()
        let year = DATE.getFullYear()
        let month = DATE.getMonth() + 1
        let day = DATE.getDate()
        let hour = DATE.getHours()
        let mint = DATE.getMinutes()
        let S = DATE.getSeconds()
        let currenttime = new Date(year + '/' + month + '/' + day + ' ' + hour + ':' + mint + ':' + S)// 当前时间
        let endtime = new Date(self.gethead.endTime.replace(/-/g, '/')) // 请求来的结束时间
        let curDay = Math.floor((endtime - currenttime) / 1000 / 60 / 60 / 24)
        let curHour = Math.floor((endtime - currenttime) / 1000 / 60 / 60) % 24
        let curMint = Math.floor((endtime - currenttime) / 1000 / 60 % 60)
        let curS = (endtime - currenttime) / 1000 % 60

        if (sessionStorage.getItem('buyerId') === 'null' || sessionStorage.getItem('buyerId') === null) {
          let baseUrl = 'https://emcs.quanyou.com.cn'
          let url = location.href
          location.href = baseUrl +'/spell/test/toAuth?url=' + encodeURIComponent(url)
        }

        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: `${appId}`, // 必填，公众号的唯一标识
          timestamp: `${timestamp}`, // 必填，生成签名的时间戳
          nonceStr: `${nonceStr}`, // 必填，生成签名的随机串
          signature: `${signature}`,// 必填，签名
          jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
        })

        if (endtime - currenttime > 0) {
          // 改变store里面的时分秒数据
          this.$store.state.day = curDay
          this.$store.state.hour = curHour
          this.$store.state.minute = curMint
          this.$store.state.second = curS

          setTimeout(function () {
            if (sessionStorage.getItem('headBuyerId') === sessionStorage.getItem('buyerId')){
              let ShareTitle=self.gethead.headShareTitle
              let ShareDescribe=self.gethead.headShareDescribe
              let SharePicUrl=self.gethead.headSharePicUrl
              wx.ready(function () {
                wx.onMenuShareAppMessage({
                  title: ShareTitle, // 分享标题
                  desc: ShareDescribe, // 分享描述
                  link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: SharePicUrl, // 分享图标
                  type: '', // 分享类型,music、video或link，不填默认为link
                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                  success: function () {
// 用户确认分享后执行的回调函数
                    alert('分享成功！')
                  },
                  cancel: function () {
// 用户取消分享后执行的回调函数
                    alert('分享失败！')
                  }
                });
              })
            } else {
              let ShareTitle=self.gethead.memberShareTitle
              let ShareDescribe=self.gethead.memberShareDescribe
              let SharePicUrl=self.gethead.memberSharePicUrl
              wx.ready(function () {
                wx.onMenuShareAppMessage({
                  title: ShareTitle, // 分享标题
                  desc: ShareDescribe, // 分享描述
                  link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: SharePicUrl, // 分享图标
                  type: '', // 分享类型,music、video或link，不填默认为link
                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                  success: function () {
// 用户确认分享后执行的回调函数
                    alert('分享成功！')
                  },
                  cancel: function () {
// 用户取消分享后执行的回调函数
                    alert('分享失败！')
                  }
                });
              })
            }
          },400)
        }
        // 开始倒计时
        this.start()
      }

      let elWinWidth = (window.innerWidth - 605) / 2
      let elWinHeight = (window.innerHeight - 358) / 2

      this.$refs.dailog.style.left = elWinWidth + 'px'
      this.$refs.dailog.style.top = elWinHeight + 'px'

      self.buyerId = sessionStorage.getItem('buyerId')

      let lis = self.$refs.mybox.children
      for (var i = 0; i < lis.length; i++) {
        elWidth += lis[i].clientWidth
      }
      // 得到活动id 用来查询活动详情
      self.$refs.mybox.style.width = elWidth + 30 + 'px'

      // 设置团长头像及显示团长昵称
      let getGroupInfo = {
         shopId : self.shopId,
         storeId : self.storeId,
         activityId : self.activityId,
         buyerId : localStorage.getItem('buyerId'),
         teamId : self.teamId
      }
      console.log('前台获取团长信息的参数:', getGroupInfo)
      axios.post('./getGroupInfo', getGroupInfo)
        .then(function (response) {
          console.log('前台接收到的数据：', response.data.data)
          sessionStorage.setItem('headNickName', response.data.data.nickName)
          sessionStorage.setItem('headPhoto', response.data.data.photo)
          sessionStorage.setItem('headBuyerId', response.data.data.buyerId)
          let photo = response.data.data.photo
          self.nickName = response.data.data.nickName
          self.isJoin = response.data.data.isJoin
          // 如果isJoin等于1，那么商品显示框class变为 el_content2的样式  否则为el_content的样式
          if (response.data.data.isJoin === 1){
            self.content = "el_content2"
          } else {
            self.content = "el_content"
          }
          document.getElementsByClassName('el_avatar')[0].style.backgroundImage = 'url(' + photo + ')'
        })
    },
    async asyncData (context) {
      let baseUrl = 'https://emcs.quanyou.com.cn/spell'
      let url = baseUrl + context.req.url
//      console.log('打印页面接到的信息:', context.query)
      // 获得头部
      let gethead = {
        activityId: context.query.activityId,
        shopId: context.query.shopId,
        storeId: context.query.storeId
      }
      // 获得标题
      let gettitle = {
        shopId: context.query.shopId,
        storeId: context.query.storeId
      }
      // 获得商品
      let getclass = {
        activityId: context.query.activityId,
        categoryId: '',
        pageIndex: 1,
        pageSize: 3,
        shopId: context.query.shopId,
        storeId: context.query.storeId
      }
      // 记得return 不然不会返回结果
      return axios.all([
        axios.post('http://172.30.3.40:3222/spell/gethead?appId='+context.query.appId+'&url='+ encodeURIComponent(url), gethead),
        axios.post('http://172.30.3.40:3222/spell/gettitle', gettitle),
        axios.post('http://172.30.3.40:3222/spell/getclass', getclass)
      ])
        .then(axios.spread(function (gethead, gettitle, getclass) {
          if (gethead.data.state) {
            console.log('1')
            if (gettitle.data.state) {
              console.log('2')
              if (getclass.data.state) {
                console.log('3')
                gettitle.data.data.unshift({categoryName:"全部",id:"",isHaveGoods:0})
                return {
                  // 头部信息
                  gethead: gethead.data.data,
                  // 头部导航内容
                  clas: gettitle.data.data,
                  // 取索引为1的对象默认展示
                  goodss: getclass.data.data.content,
                  // 分类数据记录一下
                  alldata: getclass.data.data.content,
                  last: getclass.data.data.last,
                  activityId: context.query.activityId,
                  shopId: context.query.shopId,
                  storeId: context.query.storeId,
                  teamId: context.query.teamId,
                  headShareTitle:gethead.data.data.headShareTitle,
                  memberShareTitle:gethead.data.data.memberShareTitle,
                  memberShareDescribe:gethead.data.data.memberShareDescribe,
                  memberSharePicUrl:gethead.data.data.headSharePicUrl,
                  endTime:gethead.data.data.endTime,
                  dataEx: gethead.data.dataEx
                }
              } else {
                return {
                  msg: getclass.data.msg,
                  storeId: context.query.storeId
                }
              }
            } else {
              return {
                msg: gettitle.data.msg,
                storeId: context.query.storeId
              }
            }
          } else {
            return {
              msg: gethead.data.msg,
              storeId: context.query.storeId
            }
          }
        }))
    },
  }
</script>
<style>
    @import "~assets/css/boon.css?v=1"
</style>
