<template>
  <div id="wrap">
    <header class="headerFix">
      <groups :isA='isA' :isB='isB' />
      <section class="groups">
        <div class="everyGroups borderBox" v-for="(item,$index) in groupsData">
          <a class="borderBox" :class="{groupsCur: $index==indexGroup}"   @click="toggleTab(item.group, $index)" href="javascript:;">{{item.name}}</a>
        </div>
      </section>
    </header>
    <div class="content" v-if="noData">
      <mt-loadmore  :top-method="loadTop"  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">刷新</span>
          <span v-show="topStatus === 'loading'">加载中...</span>
        </div>

        <underWay :is="currentTab"  :fightData='fightData' :hideBtn='hideBtn' keep-alive></underWay>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus === 'loading'">加载中...</span>
          <span class="mint-loadmore-text">{{ bottomText }}</span>
        </div>
      </mt-loadmore>

    </div>
    <div class="content" v-else>
      <div class="noTxt">

        <p v-if='msgState'>您好，您目前没有{{msg}}活动
          <span class="button" @click="botton">去开团</span>

        </p>


        <p v-else>

        </p>

      </div>
    </div>
  </div>
</template>

<script>
  import Wxt from '../../assets/js/WXUtil'
  import { MessageBox } from 'mint-ui'
  import groups from '../../components/myGroups/groups'
  import underWay from '../../components/myGroups/underWay'
  import offeredSuccess from '../../components/myGroups/offeredSuccess'
  import collageFailure from '../../components/myGroups/collageFailure'
  import axios from 'axios'
  export default {
    name: 'fightGroups',
    components: {
      'groups': groups,
      'underWay': underWay,
      'offeredSuccess': offeredSuccess,
      'collageFailure': collageFailure,

    },
    data() {
      return {
        isA: false,
        isB: true,
        currentTab: 'underWay',
        hide:true,
        hideBtn:true,
        noData:false,//没有数据为false
        msgState:false,
        groupsData:[
          {"name":"参团进行中","group":"underWay"},
          {"name":"参团成功","group":"offeredSuccess"},
          {"name":"参团失败","group":"collageFailure"}
        ],
        "indexGroup":"0",
        fightData:'',
        paging:{  //分页属性
          pageIndex:1,  //当前页
          pageSize:10
        },
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        topStatus:"",
        bottomStatus:'',
        bottomText:'加载更多',
        state:'',
        shopId:'',
        storeId:'',
        buyerId:'',
        activityId:'',
        msg:'参团进行中'
      }
    },
    mounted () {

      //微信鉴权
      let storeId = 'bd9164c8-aa81-4303-9164-c8aa817303a7'
      let shopId = 'a7fce96a-0126-4b05-bce9-6a01268b0534'
      Wxt.verify(storeId, shopId)
      this.shopId = sessionStorage.getItem('shopId')
      this.storeId = sessionStorage.getItem('storeId')
      this.buyerId= sessionStorage.getItem('buyerId')
      this.activityId=sessionStorage.getItem('activityId')
    },
    async asyncData(params) {
      let shopId = params.query.shopId
      let storeId = params.query.storeId
      let buyerId= params.query.buyerId
      let res = await axios.post('http://emcs.quanyou.com.cn/spellapi/spell/getMyJoin',{"state":1,"shopId":shopId,"storeId":storeId,"buyerId":buyerId,"pageIndex":"1","pageSize":"10"})
      // console.log('res:',res.data.data.content);
      if(res.data.state==1){
        if(res.data.data.content.length<=0){
          return{
            noData:false,
            msgState:true
          }
        }else{
          return { fightData:res.data.data,
            state:1,
            noData:true
          }
        }
      }else{

        return{
          noData:false,
          msgState:false
        }

      }
    },
    methods: {
      errorFrame(data){
        MessageBox.alert(data, '错误提示');

      },
      toggleTab(tab, $index) {
        this.currentTab = tab;
        this.indexGroup = $index;
        if($index==0){
          this.state=1;
          this.paging.pageIndex=1;//初始化页数
          axios.post('../spell/myOffered',{"state":1,"shopId":this.shopId,"storeId":this.storeId,"buyerId":this.buyerId,"pageIndex":this.paging.pageIndex,"pageSize":this.paging.pageSize}).then(({ data }) => {
            if( data.state==1){
              if(data.data.content.length<=0){

                this.msg='参团进行中'
                this.noData=false
                this.msgState=true
              }else{
                this.fightData=data.data
                this.noData=true
                this.msgState=false
              }
            }else{
              this.noData=false
              this.msgState=false
              this.$options.methods.errorFrame(data.msg)
            }
          })
        }else if($index==1){
          this.state=2;
          this.paging.pageIndex=1;//初始化页数
          axios.post('../spell/myOffered',{"state":2,"shopId":this.shopId,"storeId":this.storeId,"buyerId":this.buyerId,"pageIndex":this.paging.pageIndex,"pageSize":this.paging.pageSize}).then(({ data }) => {
            if( data.state==1){
              if(data.data.content.length<=0){

                this.msg='参团成功'
                this.noData=false
                this.msgState=true
              }else{
                this.fightData=data.data
                this.noData=true
                this.msgState=false
              }
            }else{
              this.noData=false
              this.msgState=false
              this.$options.methods.errorFrame(data.msg)
            }
          })
        }else {
          this.state=3;
          this.paging.pageIndex=1;//初始化页数
          axios.post('../spell/myOffered',{"state":3,"shopId":this.shopId,"storeId":this.storeId,"buyerId":this.buyerId,"pageIndex":this.paging.pageIndex,"pageSize":this.paging.pageSize}).then(({ data }) => {
            if( data.state==1){
              if(data.data.content.length<=0){

                this.msg='参团失败'
                this.noData=false
                this.msgState=true
              }else{
                this.fightData=data.data
                this.noData=true
                this.msgState=false
              }
            }else{
              this.noData=false
              this.msgState=false
              this.$options.methods.errorFrame(data.msg)
            }
          })
        }
      },

      //			分页查询(加载更多)
      handleTopChange(status) {
        this.topStatus = status;

      },
      handleBottomChange(status){
        this.bottomStatus=status

      },
      // loadTop:function() { //组件提供的下拉触发方法
      //   //下拉加载:返回到首页.刷新的意思
      //   this.loadPageList(1);
      //   this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
      // },
      // loadBottom:function() {
      //   // 上拉加载
      //   // 上拉触发的分页查询
      //   this.paging.pageIndex=parseInt(this.paging.pageIndex)+1;
      //   this.loadPageList(this.paging.pageIndex);
      //   this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      // },
      loadTop:function() { //组件提供的下拉触发方法
        let self=this;

        //下拉加载:返回到首页.刷新的意思
        self.loadPageList(1);
        setTimeout(() => {
          self.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
        }, 500);
      },
      loadBottom:function() {
        let self=this;

        // 上拉加载
        // 上拉触发的分页查询
        self.paging.pageIndex=parseInt(self.paging.pageIndex)+1;
        self.loadPageList(self.paging.pageIndex);
        setTimeout(() => {
          self.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
        }, 500);
      },
      loadPageList:function(pageIndex){
        this.paging.pageIndex=pageIndex;
        axios.post('../spell/myOffered',{"state":this.state,"shopId":this.shopId,"storeId":this.storeId,"buyerId":this.buyerId,"pageIndex":this.paging.pageIndex,"pageSize":this.paging.pageSize}).then(({ data }) => {
          if(this.paging.pageIndex==1){
            this.fightData=data.data;
          }else{

            var data=data.data.content
            console.log('data.length:',data.length)
            if(data.length<=0 || JSON.stringify(data[0])=='{}'){
              this.allLoaded = true; //数据已全部获取完毕
            }else{
              for(var value of data){
                this.fightData.content.push(value);
              }
            }
          }
        })
      },
      botton:function () {
        location.href="https://emcs.quanyou.com.cn/spell/?shopId="+this.shopId+"&activityId="+this.activityId+"&storeId="+this.storeId;
      }
    }

  }
</script>

<style>
  #__nuxt,.bigBox, #wrap{
    width: 100%;
    height: 100%;
    margin-bottom:0;
    overflow: hidden;
    z-index: 1;
  }
  .headerFix{
    height: 180px;
    position: fixed;
    top: 0;
    background: #fff;
    width: 100%;
    z-index: 100;
  }
  .content{
    height: calc(100% - 180px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    width: 100%;
    top: 180px;
  }
  .noTxt{
    height: 200px;
    width: 80%;
    background-color: #F0F0F0;
    margin: 0 auto;
    margin-top: 40%;
  }
  .noTxt:first-child{
    color:gray;
    padding: 3% 12%;
  }
  .button{
    display: block;
    height: 60px;
    width: 140px;
    background-color: brown;
    color: ghostwhite;
    padding: 8px 26px;
    margin:  10% 30%;
  }
</style>
