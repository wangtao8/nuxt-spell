<template>
<div id="participate">
  <div class="el_choose">选择团长，参团吧</div>
  <div class="main-body">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="autoFill">
      <div class="el_content">
        <div class="el_goods" v-for="(item, index) in goodss" :key="index">
          <div class="el_img">
            <img :src="item.photo" alt="">
          </div>
          <div class="el_bewrite">
            <ul>
              <li>{{ item.title }}</li>
              <li>
                团长:
                <span>{{ item.nickName }}</span>
              </li>
              <li>
                <span>{{ item.joinNum }}人参团</span>
                <span class="el_btn" @click="goct">去参团</span>
                <input type="hidden" :value="item.activityId">
              </li>
            </ul>
          </div>
        </div>
      </div>
    </mt-loadmore>
    </div>
  <div class="el_dailog" v-show="data1">
    <div class="el_window" ref="dailog">
      <div class="el_cloose" @click="cloose">x</div>
      <div class="el_explain">
        <p>恭喜您！参团成功！</p>
        <p>快“去看看”，拼团抢福利吧！</p>
      </div>
      <div class="el_definite">
        <div @click="gosee">去看看</div>
      </div>
    </div>
  </div>
  <Load v-show="isShow"></Load>
</div>
</template>
<script>
  import axios from 'axios'
  import Load from '../../components/load'
  import filter from '../../assets/js/filter'
  export default {
    data () {
      return {
        goodss: {},
        data1: false,
        isShow: true,
        allLoaded: false, // true禁止下拉刷新
        autoFill: false, // 若为真，loadmore 会自动检测并撑满其容器
        currentpageNum: 1, // 当前页数
        totalNum: 3, // 总页数
        photo: '',
        nickName: ''
      }
    },
    async asyncData () {
      // 定义查询参数
      let params = {
        activityId: 'SYM',
        buyerId: '123',
        pageIndex: 1,
        pageSize: 2
      }

      return axios({
        method: 'POST',
        url: 'http://172.30.3.40:9086/mockjsdata/5/spell/getTeamList',
        data: params
      })
        .then(function (response) {
          return {
            goodss: response.data.data.content
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    methods: {
      goct: function (e) {
        // 获取活动id 储存用于查询活动详情
        let activityId = e.target.parentNode.childNodes[2].value
        sessionStorage.setItem('activityId', activityId)
        if (!this.data1) {
          this.data1 = true
        }
      },
      cloose: function () {
        this.data1 = false
      },
      gosee: function () {
        location.href = 'boon'
      },
      loadTop: function () { // 到顶部后的下拉刷新
        // 下拉刷新
        let self = this
        this.currentpageNum = 1
        this.allLoaded = false
        setTimeout(() => {
          // 定义查询参数
          let params = {
            activityId: 'SYM',
            buyerId: '123',
            pageIndex: 1,
            pageSize: 2,
            shopId: 'wqeq',
            storeId: 'qwe'
          }
          axios({
            method: 'POST',
            url: 'http://172.30.3.40:9086/mockjsdata/5/spell/getTeamList',
            data: params
          })
            .then(function (response) {
              self.goodss = response.data.data.content
            })
            .catch(function (error) {
              console(error)
            })
          self.$refs.loadmore.onTopLoaded()
        }, 500)
      },
      loadBottom: function () { // 到底部后的上拉加载分页
        // 加载更多数据 加载完成时的事件
        this.currentpageNum++
//        console.log('this.current1:', this.currentpageNum)
        let self = this
        setTimeout(() => {
          self.$refs.loadmore.onBottomLoaded()
        }, 500)
      },
      handleBottomChange: function (status) { // 实时更新拖动状态
        this.bottomStatus = status
      }
    },
    mounted () {
      let elWidth = (window.innerWidth - 605) / 2
      let elHeight = (window.innerHeight - 358) / 2
      let self = this
      this.$refs.dailog.style.left = elWidth + 'px'
      this.$refs.dailog.style.top = elHeight + 'px'
      // 加载动画
      setTimeout(function () {
        self.isShow = false
        filter.flter('participate')
      }, Math.random() * 50)
      sessionStorage.setItem('photo', self.goodss[0].photo)
      sessionStorage.setItem('nickName', self.goodss[0].nickName)
      console.log('33333:', self.goodss[0].photo, self.goodss[0].nickName)// 还没完成
    },
    head () {
      return {
        title: '拼团抢福利'
      }
    },
    components: { Load }
}
</script>
<style>
    @import '~assets/css/participate.css'
</style>
