<template>
  <div>
    <div style="height: 600px;overflow-y: scroll">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="autoFill">
        <div v-for="history in historylist" >
          <div class="history">{{history}}</div>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus === 'pull'">{{bottomPullText}}</span>
          <span v-show="bottomStatus === 'drop'">{{bottomDropText}}</span>
          <span v-show="bottomStatus === 'loading'">loading...</span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  import axios from 'axios'
  export default {
    data () {
      return {
        historylist: ['呵呵', '哈哈', '嘿嘿'], // 第一次请求的数据
        allLoaded: false, // true禁止下拉刷新
        autoFill: false, // 若为真，loadmore 会自动检测并撑满其容器
        currentpageNum: 1, // 当前页数
        limit: 3, // 每页条数
        totalNum: 10, // 总页数
        bottomStatus: '', // 当前状态
        bottomPullText: '上拉加载更多...',
        bottomDropText: '释放更新...'
      }
    },
    methods: {
      loadBottom () {
        this.currentpageNum++
        let self = this
        setTimeout(() => {
          axios.get('/api/getclass')
            .then(function (response) {
              if (self.totalNum > self.currentpageNum) {
                self.historylist.push(response.data.cf)
              } else {
                self.allLoaded = true
              }
              self.$refs.loadmore.onBottomLoaded()
              console.log('22222222222:', response.data.cf)
            })
            .catch(function (err) {
              console.log(err)
            })
        }, 500)
      },
      handleBottomChange (status) {
        this.bottomStatus = status// 实时更新状态
        console.log('2222222222222222222:', status)
      }
    },
    mounted () {
      MessageBox.alert('已经加载完全部内容', '')
    }
  }
</script>

<style>
  .mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
  }

  .mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }
  .history{
    font-size: 32px;
  }
  .mint-msgbox{
    background-color: #eadcd3;
    width: 50%;
    border-radius: 16px
  }
  .mint-msgbox-message {
    color: #0c0000;
  }
  .mint-msgbox-btn{
    background-color: rgba(0, 0, 0, 0);
  }
  .v-modal{
    background: #8d8d8d;
  }
  .mint-msgbox-content {
    border-bottom: 1px solid #ffffff;
    padding: 40px 20px;
  }
</style>
