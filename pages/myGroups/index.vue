<template>
  <div id="wrap">
    <groups :isA='isA' :isB='isB' />
    <section class="groups">
      <div class="everyGroups borderBox" v-for="(item,$index) in groupsData">
        <a class="borderBox" :class="{groupsCur: $index==indexGroup}"   @click="toggleTab(item.group, $index)" href="javascript:;">{{item.name}}</a>
      </div>
    </section>
    <div class="content">
      <mt-loadmore  :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">刷新</span>
          <span v-show="topStatus === 'loading'">加载中...</span>
        </div>
        <!--子组件，显示不同的 tab   is 特性动态绑定子组件    keep-alive 将切换出去的组件保留在内存中-->
        <!--拼团进行中-->
        <underWay :is="currentTab" :fightData='fightData' :hide='hide' :hideBtn='hideBtn' keep-alive></underWay>
        <!--拼团成功-->
        <!--<fightSuccess/>-->
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">释放后加载</span>
          <span v-show="bottomStatus === 'loading'">加载中...</span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
  import { Loadmore } from 'mint-ui';
  import groups from '../../components/myGroups/groups'
  import underWay from '../../components/myGroups/underWay'
  import fightSuccess from '../../components/myGroups/fightSuccess'
  import collageFailure from '../../components/myGroups/collageFailure'
  import collageFull from '../../components/myGroups/collageFull'
  import Wxt from '../../assets/js/WXUtil'
   import axios from 'axios'
  export default {
    name: 'box',
    components: {
      'groups': groups,
      'underWay': underWay,
      'fightSuccess': fightSuccess,
      'collageFailure': collageFailure,
      'collageFull': collageFull
    },
    data() {
      return {
        currentTab: 'underWay',
        isA: true,
        isB: false,
        hide:true,
        hideBtn:true,
        groupsData:[
          {"name":"拼团进行中","group":"underWay"},
          {"name":"拼团成功","group":"fightSuccess"},
          {"name":"拼团失败","group":"collageFailure"},
          {"name":"拼团完成","group":"collageFull"}],
        "indexGroup":"0",
        fightData:'',
        paging:{  //分页属性
          currentPage:"0",  //当前页
        },
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        topStatus:"",
        bottomStatus:''
      }
    },
    mounted () {
      //微信鉴权
      let storeId = 'bd9164c8-aa81-4303-9164-c8aa817303a7'
      let shopId = 'a7fce96a-0126-4b05-bce9-6a01268b0534'
      Wxt.verify(storeId, shopId)

    },
    async asyncData({ params }, callback) {
      axios.post('http://emcs.quanyou.com.cn/spellapi/getMyCreate',{"state":1,"shopId":"a7fce96a-0126-4b05-bce9-6a01268b0534","storeId":"070e6814-c1cc-4243-8e68-14c1cc624388","buyerId":"20180313001","pageIndex":"1","pageSize":"10"})
         .then((data) => {
            let  res=data.data;
            callback(null, { fightData:res.data })

         })
         .catch((e) => {
		      callback({ statusCode: 404, message: 'Post not found' })
		    })
    },
    methods: {
      toggleTab(tab, $index) {
        this.currentTab = tab; // tab 为当前触发标签页的组件名
        this.indexGroup = $index;
            if($index==0){
//拼团进行中
                    axios.post('../spell/myGroups',{"state":1,"shopId":"a7fce96a-0126-4b05-bce9-6a01268b0534","storeId":"070e6814-c1cc-4243-8e68-14c1cc624388","buyerId":"20180313001","pageIndex":"1","pageSize":"10"}).then(({ data }) => {
                           this.fightData=data.data
                           console.log("this.fightData::",this.fightData)
                     })
              }else if($index==1){
           //           	拼团成功
                      axios.post('../spell/myGroups',{"state":1,"shopId":"a7fce96a-0126-4b05-bce9-6a01268b0534","storeId":"070e6814-c1cc-4243-8e68-14c1cc624388","buyerId":"20180313001","pageIndex":"1","pageSize":"10"}).then(({ data }) => {
                            this.fightData=data.data
                      })
              }else if($index==2){
                //           	拼团失败
                       axios.post('../spell/myGroups',{"state":1,"shopId":"a7fce96a-0126-4b05-bce9-6a01268b0534","storeId":"070e6814-c1cc-4243-8e68-14c1cc624388","buyerId":"20180313001","pageIndex":"1","pageSize":"10"}).then(({ data }) => {
                           this.fightData=data.data
                       })
              }else {
                //           	拼团完成
                      axios.post('../spell/myGroups',{"state":1,"shopId":"a7fce96a-0126-4b05-bce9-6a01268b0534","storeId":"070e6814-c1cc-4243-8e68-14c1cc624388","buyerId":"20180313001","pageIndex":"1","pageSize":"10"}).then(({ data }) => {
                            this.fightData=data.data
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
      loadTop:function() { //组件提供的下拉触发方法
        //下拉加载
        this.loadPageList(0);
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      loadBottom:function() {
        // 上拉加载
        // 上拉触发的分页查询
        this.paging.currentPage=parseInt(this.paging.currentPage)+1;
        this.loadPageList(this.paging.currentPage);
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      loadPageList:function(currentPage){
        this.paging.currentPage=currentPage;
        api.get  ('/msg1.json',{"currentPage":this.paging.currentPage}).then(({ data }) => {
          if(this.paging.currentPage==0){
            this.fightData=data;
          }else{
            var data=data.date
            if(data.length<=0 || JSON.stringify(data[0])=='{}'){
              this.allLoaded = true; //数据已全部获取完毕
            }else{
              for(var value of data){
                this.fightData.date.push(value);
              }
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/base.css";
  @import "../../assets/css/myGroups.css";
</style>
