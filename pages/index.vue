<template>
  <div id="box">
    <div id="baner">
      <div class="el_banner">
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
        <li :class="{active: active == index}" @click="check(index, item.id)" v-for='(item, index) in clas' :key="index">{{ item.categoryName }}</li>
      </ul>
    </div>
    <div class="main-body">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="autoFill">
        <div id="goods">
          <div v-for="(item, index) in goodss" class="el_goods" @click="goDetail">
            <div class="el_img">
              <img :src="item.pic" alt="">
            </div>
            <div class="el_bewrite">
              <ul>
                <li>{{ item.goodsName }}</li>
                <li>团长价:
                  <span>￥</span>
                  <span>{{ item.headPrice }}</span>
                </li>
                <li>
                  团员价：
                  <span>￥</span>
                  <span>{{ item.memberPrice }}</span>
                  <span>市场价:<span>￥{{ item.marketPrice}}</span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--<div slot="bottom" class="mint-loadmore-bottom">-->
          <!--<span v-show="bottomStatus === 'pull'">{{bottomPullText}}</span>-->
          <!--<span v-show="bottomStatus === 'drop'">{{bottomDropText}}</span>-->
          <!--<span v-show="bottomStatus === 'loading'">加载中...</span>-->
        <!--</div>-->
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
          {{ gethead.rule }}
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
    <Btn :show2="show2"></Btn>
    <Load v-show="isShow"></Load>
  </div>
</template>
<script>
  import Banner from '../components/banner'
  import Btn from '../components/button'
  import Load from '../components/load'
  import filter from '../assets/js/filter'
//  import request from '../static/api/request'
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
        msg: ''// 请求错误提示消息
      }
    },
    async asyncData () {
      // 获得头部
      let gethead = {
        activityId: '123',
        shopId: '234',
        storeId: '345'
      }
      // 获得标题
      let gettitle = {
        shopId: '123',
        storeId: '234'
      }
      // 获得商品
      let getclass = {
        activityId: '123',
        categoryId: '234',
        pageIndex: 1,
        pageSize: 4,
        shopId: '123',
        storeId: '234'
      }
      // 记得return 不然不会返回结果
      return axios.all([
        axios.post('http://172.30.3.40:9086/mockjsdata/5/spell/getSpellHomeInfo', gethead),
        axios.post('http://127.0.0.1:3222/api/gettitle', gettitle),
        axios.post('http://127.0.0.1:3222/api/getclass', getclass)
      ])
        .then(axios.spread(function (gethead, gettitle, getclass) {
          if (gethead.data.state) {
            if (gettitle.data.state) {
              if (getclass.data.state) {
                let names = []
                // 获得所有对象的名称
                for (let i = 0; i < gettitle.data.data.length; i++) {
                  names.push(gettitle.data.data[i].id)
                }
                return {
                  // 头部信息
                  gethead: gethead.data.data,
                  // 头部导航内容
                  clas: gettitle.data.data,
                  // 取索引为1的对象默认展示
                  goodss: getclass.data.data.content[0][names[0]],
                  // 分类数据记录一下
                  alldata: getclass.data.data.content[0]
                }
              } else {
                return {
                  msg: getclass.data.msg
                }
              }
            } else {
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
//      console.log('clas:', this.alldata)
    },
    head () {
      return {
        title: '拼团购'
      }
    },
    components: { Banner, Btn, Load },
    mounted () {
      let self = this
      let elWidth = 0
      let lis = self.$refs.mybox.children
      let win1lt = (window.innerWidth - 608) / 2
      let win1tp = (window.innerHeight - 828) / 2
      let win2tp = (window.innerHeight - 358) / 2
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

      // 如果有失败的返回结果
      if (self.msg) {
        self.show2 = false
        MessageBox.alert(self.msg, '')// 提示错误信息

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

      // 设置banner背景图片
      let backUrl = this.gethead.homeBannerUrl
      document.getElementsByClassName('el_banner')[0].style.backgroundImage = 'url(' + backUrl + ')'
      console.log(self.gethead.endTime)
      // 时间格式拼接
      let DATE = new Date()
      let year = DATE.getFullYear()
      let month = DATE.getMonth() + 1
      let day = DATE.getDate()
      let hour = DATE.getHours()
      let mint = DATE.getMinutes()
      let S = DATE.getSeconds()
      let currenttime = new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + mint + ':' + S)// 当前时间
      let endtime = new Date(self.gethead.endTime) // 请求来的结束时间
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
    },
    methods: {
      check: function (e, att) { // 顶部导航切换
        this.active = e
        // 动态的属性名不能用点的，要data[att]这样调用！！！！！！坑！ 因为所有数据都已经请求过来了，所以直接用，不用再发请求!!!
        this.goodss = this.alldata[att]
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
//        console.log('123:', e.target.innerText)
        if (e.target.innerText === '引导') {
          this.data1 = true
          this.data2 = true
        } else if (e.target.innerText === '参团') {
          location.href = '/participate'
        } else {
          location.href = '/myGroups'
        }
      },
      gotuan: function () { // 去开团按钮点击
        location.href = 'success'
      },
      cantuan: function () { // 参团按钮点击
        location.href = 'participate'
      },
      goDetail: function () { // 跳转到商品详情页
        location.href = 'groupDetails'
      },
      loadTop: function () { // 到顶部后的下拉刷新
        // 下拉刷新
        let self = this
        this.currentpageNum = 1
        this.allLoaded = false
        setTimeout(() => {
          let getclass = {
            activityId: '123',
            categoryId: '234',
            pageIndex: 1,
            pageSize: 4,
            shopId: '123',
            storeId: '234'
          }
          axios.post('/api/getclass', getclass)
            .then(function (response) {
              // 让当前被选中的导航 在下拉刷新后一样的呈现出当前导航对应的内容
              let stext = document.getElementsByClassName('active')[0].innerText
              let curtext = ''
              for (let i = 0; i < self.clas.length; i++) {
                if (self.clas[i].categoryName === stext) {
                  curtext = self.clas[i].id
                }
              }
              // 更新一下所有数据，因为这里刷新了一下，而前面的alldata是进来就请求的数据，需要更新
              self.alldata = response.data.data.content[0]
              self.goodss = response.data.data.content[0][curtext]
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
            activityId: '123',
            categoryId: '234',
            pageIndex: 1,
            pageSize: 4,
            shopId: '123',
            storeId: '234'
          }
          axios.post('/api/getclass', getclass)
            .then(function (response) {
              // 让当前被选中的导航 在下拉刷新后一样的呈现出当前导航对应的内容
              let stext = document.getElementsByClassName('active')[0].innerText
              let curtext = ''
              if (self.totalNum >= self.currentpageNum) {
                for (let i = 0; i < self.clas.length; i++) {
                  if (self.clas[i].categoryName === stext) {
                    curtext = self.clas[i].id
                  }
                }
                for (let j = 0; j < response.data.data.content[0][curtext].length; j++) {
                  // 将得到的数据循环后单个push到之前的数组中去
                  self.goodss.push(response.data.data.content[0][curtext][j])
                }
              } else {
                self.allLoaded = true
                MessageBox.alert('已经加载完全部内容', '')// 提示弹框
              }
              // 这一步很重要  不然无法实时切换loading状态 到 pull的状态
              self.$refs.loadmore.onBottomLoaded()
            })
            .catch(function (err) {
              console.log(err)
            })
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
