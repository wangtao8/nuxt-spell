<template>
  <div class="el_box">
    <div class="el_banner">
    </div>
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
    <div class="el_content">
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
  </div>
</template>
<script>
  import axios from 'axios'
  import Wxt from '../../assets/js/WXUtil'
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
        msg: ''// 请求错误提示消息
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
        location.href = 'https://emcs.quanyou.com.cn/emallwap/goodsdetail/info/' + this.storeId + '/' +obj
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
              console.log('222222:', getclass)
              // 更新一下所有数据，因为这里刷新了一下，而前面的alldata是进来就请求的数据，需要更新
              self.goodss = response.data.data.content
              // 实时更新是否最后一页有信息
              self.last = response.data.data.last
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
                //需要每次都重新更新last的状态
                self.last = response.data.data.last
                // 让当前被选中的导航 在下拉刷新后一样的呈现出当前导航对应的内容
                for (let j = 0; j < response.data.data.content.length; j++) {
                  // 将得到的数据循环后单个push到之前的数组中去
                  self.goodss.push(response.data.data.content[j])
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
      let lis = self.$refs.mybox.children

      //微信鉴权
      let storeId = 'bd9164c8-aa81-4303-9164-c8aa817303a7'
      let shopId = 'a7fce96a-0126-4b05-bce9-6a01268b0534'
      Wxt.verify(storeId, shopId)

//      let urls = window.location.href
//      let name = urls.split('?')[1].split('&')[0].split('=')[1]
//      let age = urls.split('?')[1].split('&')[1].split('=')[1]
//      console.log('name:', name, 'age:', age)

      for (var i = 0; i < lis.length; i++) {
        elWidth += lis[i].clientWidth
      }
      // 得到活动id 用来查询活动详情
      self.$refs.mybox.style.width = elWidth + 30 + 'px'
      let photo = sessionStorage.getItem('photo')

      // 设置团长头像
      self.nickName = sessionStorage.getItem('nickName')
      document.getElementsByClassName('el_avatar')[0].style.backgroundImage = 'url(' + photo + ')'

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
    async asyncData (context) {
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
        axios.post('http://172.30.3.40:3222/spell/gethead', gethead),
        axios.post('http://172.30.3.40:3222/spell/gettitle', gettitle),
        axios.post('http://172.30.3.40:3222/spell/getclass', getclass)
      ])
        .then(axios.spread(function (gethead, gettitle, getclass) {
          if (gethead.data.state) {
            if (gettitle.data.state) {
              if (getclass.data.state) {
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
                  storeId: context.query.storeId
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
  }
</script>
<style>
    @import "~assets/css/boon.css"
</style>
