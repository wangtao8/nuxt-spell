<template>
  <div id="box">
    <div id="baner">
      <div class="el_banner">
        <img class="el_banner" :src="gethead.homeBannerUrl">
        <div class="el_inform" @click="seeinform">活动详情>></div>
      </div>
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
    <div class="el_navs" id="navs">
      <ul class="clear" ref="mybox">
        <li :class="{active: active == index}" @click="check(index, item.id)" :data="item.id" v-for='(item, index) in clas' :key="index">{{ item.categoryName }}</li>
      </ul>
    </div>
    <div class="main-body">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="autoFill">
        <div id="goods">
          <div v-for="(item, index) in goodss" class="el_goods" @click="goDetail(item.goodsId)">
            <div class="el_img">
              <img :src="item.pic" alt="">
            </div>
            <div class="el_bewrite">
              <ul>
                <li>{{ item.goodsName }}</li>
                <li>团长价:
                  <span>￥</span>
                  <span>{{ item.headPrice / 100 }}</span>
                </li>
                <li>
                  团员价：
                  <span>￥</span>
                  <span>{{ item.memberPrice / 100 }}</span>
                  <span>市场价:<span>￥{{ item.marketPrice / 100}}</span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus === 'pull'">上拉加载更多</span>
          <span v-show="bottomStatus === 'drop'">加载完成</span>
          <span v-show="bottomStatus === 'loading'">加载中...</span>
        </div>
      </mt-loadmore>
    </div>
    <div class="el_dailog" v-show="data1" ref="dailog">
      <div class="el_window1" v-show="data2">
        <div class="el_cloose" @click="cloose">x</div>
        <div class="el_explain">
          <p>我想做团长点击“去开团”拼团获取团长专属福利</p>
          <p>我想参团点击“参团”享受拼团优惠</p>
        </div>
        <div class="el_definite">
          <div @click="gotuan">去开团</div>
          <div @click="cantuan">参团</div>
        </div>
      </div>
      <div class="el_window2" v-show="data3">
        <div class="el_cloose" @click="cloose">x</div>
        <p class="el_top_font">活动规则</p>
        <p>
          {{ gethead.ruleInfo }}
        </p>
      </div>
    </div>
    <div id="lead" v-show="show2">
      <ul class="el_choose">
        <li>
          <div @click="openwin1">引导</div>
        </li>
        <li>
          <div @click="openwin1">参团</div>
        </li>
        <li>
          <div @click="openwin1">我的团</div>
        </li>
      </ul>
      <nuxt/>
    </div>
    <!--<Btn :show2="show2"></Btn>-->
    <div id="btn">
      <div class="el_btn" @click="gotuan" v-show="show2">去开团</div>
    </div>
    <Load v-show="isShow"></Load>
  </div>
</template>
<script>
  //  import ht from '../plugins/axios'
  import Banner from '../components/banner'
  import Btn from '../components/button'
  import Load from '../components/load'
  import filter from '../assets/js/filter'
  //  import request from '../static/spell/request'
  import axios from 'axios'
  import { MessageBox } from 'mint-ui'
  export default {
    name: 'box',
    data () {
      return {
        active: 0, // 页签切换索引
        clas: [], // 分类页签
        data1: false, // 背景模态层
        data2: false, // 引导按钮弹出框
        data3: false, // 活动规则弹出框
        isShow: true, // 加载动画
        show2: false, // 底部去开团按钮
        goodss: [], // 活动商品参数
        alldata: [], // 活动规则
        allLoaded: false, // true禁止下拉刷新
        autoFill: false, // 若为真，loadmore 会自动检测并撑满其容器
        currentpageNum: 1, // 当前页数
        totalNum: 3, // 总页数
        gethead: [], // 头部图片链接
        msg: '',// 请求错误提示消息
        bottomStatus: '',
        last: '',
        activityId: '',
        shopId: '',
        storeId: '',
        appId: '',
        dataEx: {},
        headShareTitle: '',
//        headShareDescribe: '',
//        headSharePicUrl: '',
        memberShareTitle: '',
        memberShareDescribe: '',
        memberSharePicUrl: '',

      }
    },
    async asyncData (context) {
      // 获得头部
      console.log('打印的东西xxxxxxxxxxxxxx:', context.req.url)
      let baseUrl = 'https://emcs.quanyou.com.cn/spell'
      let url = baseUrl + context.req.url
//      console.log('url:', encodeURIComponent(url))
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
        axios.post(baseUrl+'/gethead?appId='+context.query.appId+'&url='+ encodeURIComponent(url), gethead),
        axios.post(baseUrl+'/gettitle', gettitle),
        axios.post(baseUrl+'/getclass', getclass)
      ])
        .then(axios.spread(function (gethead, gettitle, getclass) {
          console.log('gethead:', gethead.data.dataEx)
          if(gethead.data.state === 1) {
            if (gettitle.data.state) {
              if (getclass.data.state) {
                gettitle.data.data.unshift({categoryName:"全部",id:"",isHaveGoods:0})
                console.log("获取数据：",gethead.data.data.headShareTitle)
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
                  appId: context.query.appId,
                  dataEx: gethead.data.dataEx,
                  headShareTitle:gethead.data.data.headShareTitle,
                  memberShareTitle:gethead.data.data.memberShareTitle,
                  memberShareDescribe:gethead.data.data.memberShareDescribe,
                  memberSharePicUrl:gethead.data.data.headSharePicUrl
                }
              }else {
                return {
                  msg: getclass.data.msg
                }
              }
            }else {
              return {
                msg: gettitle.data.msg
              }
            }
          } else {
            return {
              msg: gethead.data.msg
            }
          }
      }))
    },
    created () {
//      console.log('clas:', this.goodss)
    },
    head () {
      return {
        title: '拼团购'
      }
    },
    components: { Banner, Btn, Load },
    mounted () {
      let _this = this
      if (sessionStorage.getItem('buyerId') === 'null' || sessionStorage.getItem('buyerId') === null) {
//        location.href = location.href + '?url=https://emcs.quanyou.com.cn/spell/test/toAuth&storeId=' + _this.storeId
        let baseUrl = 'https://emcs.quanyou.com.cn'
        let url = location.href
        console.log( baseUrl +'/spell/test/toAuth?url=' + encodeURIComponent(url))
        location.href = baseUrl +'/spell/test/toAuth?url=' + encodeURIComponent(url)
      }
      console.log('dataEx:', _this.dataEx)
      if (process.BROWSER_BUILD) {
        let wx = require('weixin-js-sdk')
        let appId = _this.dataEx.appId
        let timestamp = _this.dataEx.timestamp
        let nonceStr = _this.dataEx.noncestr
        let signature = _this.dataEx.signature
        let headShareTitle=_this.headShareTitle
        let memberShareTitle=_this.memberShareTitle
        let memberShareDescribe=_this.memberShareDescribe
        let memberSharePicUrl=_this.memberSharePicUrl
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: `${appId}`, // 必填，公众号的唯一标识
          timestamp: `${timestamp}`, // 必填，生成签名的时间戳
          nonceStr: `${nonceStr}`, // 必填，生成签名的随机串
          signature: `${signature}`,// 必填，签名
          jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
        })

        wx.ready(function () {
         console.log("团员标题：",memberShareTitle)
          console.log("团长标题：",headShareTitle)
          wx.onMenuShareAppMessage({
            title: memberShareTitle, // 分享标题
            desc: memberShareDescribe, // 分享描述
            link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: memberSharePicUrl, // 分享图标
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
      }

      if (location.href.length < 100) {
        location.href = sessionStorage.getItem('myhref')
      } else {
        sessionStorage.setItem('myhref', location.href)
      }

      let self = this
      let elWidth = 0
      let lis = self.$refs.mybox.children
      let win1lt = (window.innerWidth - 608) / 2
      let win1tp = (window.innerHeight - 828) / 2
      let win2tp = (window.innerHeight - 358) / 2

      if (document.getElementsByClassName('main-body').length){
//        alert(1)
      } else {
        console.log(self.storeId, self.activityId, self.shopId)
//        location.href = 'https://emcs.quanyou.com.cn/spell/test/toAuth?storeId=' + self.storeId + '&activityId=' + self.activityId + '&shopId='+ self.shopId
      }

      // 存储各种有用信息
      sessionStorage.setItem('shopId', self.shopId)
      sessionStorage.setItem('storeId', self.storeId)
      sessionStorage.setItem('activityId', self.activityId)
      for (var i = 0; i < lis.length; i++) {
        elWidth += lis[i].clientWidth
      }
      self.$refs.mybox.style.width = elWidth + 30 + 'px'

      // 设置窗口2为居中
      self.$refs.dailog.children[0].style.left = win1lt + 'px'
      self.$refs.dailog.children[0].style.top = win2tp + 'px'

      // 设置窗口1为居中
      self.$refs.dailog.children[1].style.left = win1lt + 'px'
      self.$refs.dailog.children[1].style.top = win1tp + 'px'

      // 加载动画
      filter.flter('box', true)
      self.isShow = true

      sessionStorage.setItem('myhref', location.href)
      // 如果有失败的返回结果
      if (self.msg) {
//        self.show2 = false
//        MessageBox.alert(self.msg, '')// 提示错误信息

        setTimeout(function () {
          self.isShow = false
          filter.flter('box', false)
        }, Math.random() * 500)
      } else {
        self.show2 = true
        setTimeout(function () {
          self.isShow = false
          filter.flter('box', false)
        }, Math.random() * 500)
      }

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
      if (endtime - currenttime > 0) {
        // 改变store里面的时分秒数据
        this.$store.state.day = curDay
        this.$store.state.hour = curHour
        this.$store.state.minute = curMint
        this.$store.state.second = curS
        console.log(curDay + '天' + curHour + '时' + curMint + '分' + curS + '秒')
      }
      // 开始倒计时
      this.start()

      // 得到用户信息
      if (sessionStorage.getItem('nickName') !== 'undefined' && sessionStorage.getItem('nickName') !== '' && sessionStorage.getItem('nickName') !== null && sessionStorage.getItem('nickName') !== "null") {
        console.log('我有值，不请求')
      } else {
        let getUserInfo = {
          storeId : sessionStorage.getItem('storeId'),
          shopId : sessionStorage.getItem('shopId'),
          openId : sessionStorage.getItem('openId')
        }
        axios.post('./getUserInfo', getUserInfo)
          .then(function (response) {
            sessionStorage.setItem('nickName', response.data.nick)
            sessionStorage.setItem('photo', response.data.photo )
            sessionStorage.setItem('attention', response.data.attention)
            sessionStorage.setItem('hyId', response.data.hyId)
            sessionStorage.setItem('buyerId', response.data.buyerId)
          })
      }
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
      seeinform: function () { // 活动规则与模态框显示
        this.data1 = true
        this.data3 = true
      },
      cloose: function () { // 关闭所有弹出框
        this.data1 = false
        this.data2 = false
        this.data3 = false
      },
      openwin1: function (e) { // 引导  参团 我的团 按钮点击事件
        if (e.target.innerText === '引导') {
          this.data1 = true
          this.data2 = true
        } else if (e.target.innerText === '参团') {
          location.href = 'participate?buyerId=' + sessionStorage.getItem('buyerId') + '&activityId=' + sessionStorage.getItem('activityId') + '&storeId=' + sessionStorage.getItem('storeId') +'&shopId=' + sessionStorage.getItem('shopId')
        } else {
          location.href = 'myGroups?buyerId=' + sessionStorage.getItem('buyerId')+ '&storeId=' + sessionStorage.getItem('storeId') +'&shopId=' + sessionStorage.getItem('shopId')
        }
      },
      gotuan: function () { // 去开团按钮点击
        let openGroup = {
          nickName : sessionStorage.getItem('nickName'),
          photo : sessionStorage.getItem('photo'),
          shopId: sessionStorage.getItem('shopId'),
          storeId: sessionStorage.getItem('storeId'),
          activityId: sessionStorage.getItem('activityId'),
          buyerId: sessionStorage.getItem('buyerId')
        }
        axios.post('./openGroup', openGroup)
          .then(function (response) {
            if (response.data.state) {
              console.log('msg:', response.data)
              location.href = 'success'
            } else {
              MessageBox.alert(response.data.msg, '')
            }
          }).catch((error) => {
            console.log(error)
          })
      },
      cantuan: function () { // 参团按钮点击
        location.href = 'participate?buyerId=' + sessionStorage.getItem('buyerId') + '&activityId=' + sessionStorage.getItem('activityId') + '&storeId=' + sessionStorage.getItem('storeId') +'&shopId=' + sessionStorage.getItem('shopId')
      },
      goDetail: function (obj) { // 跳转到商品详情页
        location.href = 'https://emcs.quanyou.com.cn/emallwap/spellGoodsdetail/' + this.storeId + '/' +obj
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
                // 这一步很重要  不然无法实时切换loading状态 到 pull的状态
                self.$refs.loadmore.onTopLoaded()
              } else {
                MessageBox.alert(response.data.msg, '')
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        }, 500)
      },
      loadBottom: function () { // 到底部后的上拉加载分页
        // 加载更多数据 加载完成时的事件
        this.currentpageNum++
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
                  MessageBox.alert(response.data.msg, '')
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
      handleBottomChange: function (status) { // 实时更新拖动状态
        this.bottomStatus = status
      },
      start: function () { // 倒计时
        this.$store.commit('increment') // 提交
      }
    }
  }
</script>

<style>
  @import "~assets/css/index.css"
</style>
