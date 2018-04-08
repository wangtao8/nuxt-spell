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
                <span class="el_btn" @click="goct(item.activityId, item.photo, item.nickName, item.id)">去参团</span>
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
        goodss: [],
        data1: false,
        isShow: true,
        allLoaded: false, // true禁止下拉刷新
        autoFill: false, // 若为真，loadmore 会自动检测并撑满其容器
        currentpageNum: 1, // 当前页数
        totalNum: 3, // 总页数
        activityId: '',
        buyerId: '',
        storeId: '',
        shopId: '',
        last: '',
        teamId: ''
      }
    },
    async asyncData (content) {
      // 定义查询参数
      let params = {
        activityId: content.query.activityId,
        buyerId: content.query.buyerId,
        storeId: content.query.storeId,
        shopId: content.query.shopId,
        pageIndex: 1,
        pageSize: 3
      }
      return axios({
        method: 'POST',
        url: 'http://172.30.3.40:3222/spell/getHasBeenGroup',
        data: params
      })
        .then(function (response) {
          return {
            goodss: response.data.data.content,
            activityId: content.query.activityId,
            buyerId: content.query.buyerId,
            storeId: content.query.storeId,
            shopId: content.query.shopId,
            last: response.data.data.last
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    methods: {
      goct: function (activityId, photo, nickName, ids) {
        // 获取活动id 储存用于查询活动详情
        sessionStorage.setItem('activityId', activityId)
        sessionStorage.setItem('headPhoto', photo)
        sessionStorage.setItem('headNickName', nickName)
        sessionStorage.setItem('teamId', ids)
        this.teamId = ids
        let goGroup = {
          teamId: ids,
          buyerId: sessionStorage.getItem('buyerId'),
          storeId: sessionStorage.getItem('storeId'),
          shopId: sessionStorage.getItem('shopId'),
          nickName: sessionStorage.getItem('nickName'),
          photo: sessionStorage.getItem('photo')
        }
        // 发送参团请求
        axios.post('./goGroup', goGroup)
          .then(function (response) {
//            console.log('eeeeeeee:', response.data)
          })
        if (!this.data1) {
          this.data1 = true
        }
      },
      cloose: function () {
        this.data1 = false
      },
      gosee: function () {
        location.href = 'boon?activityId=' + this.activityId + '&storeId=' + this.storeId + '&shopId=' + this.shopId + '&teamId=' + this.teamId
      },
      loadTop: function () { // 到顶部后的下拉刷新
        // 下拉刷新
        let self = this
        this.currentpageNum = 1
        this.allLoaded = false
        setTimeout(() => {
          // 定义查询参数
          let params = {
            activityId: self.activityId,
            buyerId: self.buyerId,
            pageIndex: 1,
            pageSize: 3,
            shopId: self.shopId,
            storeId: self.storeId
          }
          axios({
            method: 'POST',
            url: './getHasBeenGroup',
            data: params
          })
            .then(function (response) {
              if (response.data.state) {
                self.goodss = response.data.data.content
              } else {
                alert(response.data.msg)
              }
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
          // 定义查询参数
          let params = {
            activityId: self.activityId,
            buyerId: self.buyerId,
            pageIndex: self.currentpageNum,
            pageSize: 3,
            shopId: self.shopId,
            storeId: self.storeId
          }
          axios({
            method: 'POST',
            url: './getHasBeenGroup',
            data: params
          })
            .then(function (response) {
              if (response.data.state) {
                for (let i = 0; i < response.data.data.content.length; i++) {
                  self.goodss.push(response.data.data.content[i])
                }
              } else {
                alert(response.data.msg)
              }
            })
            .catch(function (error) {
              console(error)
            })
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
