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
          <li :class="{active: active == index}" @click="check(index, item.id)" v-for="(item, index) in clas" :key="index">{{ item.categoryName }}</li>
        </ul>
      </div>
    </div>
    <div class="el_content">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="autoFill">
        <div class="el_goods" v-for="(item, index) in goodss" :key="index" @click="goDetail">
          <div class="el_img">
            <img :src="item.pic" alt=""/>
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
                <span>
                  市场价:
                  <span>￥{{ item.marketPrice }}</span>
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
    methods: {
      check: function (e, attr) {
        this.active = e
        this.goodss = this.alldata[attr]
        this.allLoaded = false
        this.currentpageNum = 1
      },
      goDetail: function () {
        location.href = '/groupDetails'
      },
      loadTop: function () {
        // 下拉刷新
        let self = this
        this.currentpageNum = 1
        this.allLoaded = false
        setTimeout(() => {
          axios.post('/api/getclass')
            .then(function (response) {
              // 让当前被选中的导航 在下拉刷新后一样的呈现出当前导航对应的内容
              let stext = document.getElementsByClassName('active')[0].innerText
              let curtext = ''
              for (let i = 0; i < self.clas.length; i++) {
                if (self.clas[i].categoryName === stext) {
                  curtext = self.clas[i].id
                }
              }
              self.alldata = response.data.data.content[0]
              self.goodss = response.data.data.content[0][curtext]
              self.$refs.loadmore.onTopLoaded()
            })
            .catch(function (err) {
              console.log(err)
            })
        }, 500)
      },
      loadBottom: function () {
        // 加载更多数据 加载完成时的事件
        this.currentpageNum++
//        console.log('this.current1:', this.currentpageNum)
        let self = this
        setTimeout(() => {
          axios.post('/api/getclass')
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
//                  console.log(self.goodss)
                }
              } else {
                self.allLoaded = true
                MessageBox.alert('已经加载完全部内容', '')
              }
              // 这一步很重要  不然无法实时切换loading状态 到 pull的状态
              self.$refs.loadmore.onBottomLoaded()
            })
            .catch(function (err) {
              console.log(err)
            })
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
    }
  }
</script>
<style>
    @import "~assets/css/boon.css"
</style>
