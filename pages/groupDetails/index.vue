<template>
  <div id="wrap">
    <div>
      <div class="cus-name">
        <a class="link_name l" src="#">四川办事处</a>
        <a class="link_btn r" src="#">进入商城</a>
      </div>
      <!--mint ui 组件-->
      <mt-swipe :auto="3000" :prevent="true" v-show="isShow2">
        <mt-swipe-item v-for="(item, index) in imgurl" :key="index" :class="active">
          <img :src=" item ">
        </mt-swipe-item>
      </mt-swipe>

      <!--商品的名字 价格 prize-->
      <div class="goodInfo">
        <div class="goodInfoName borderBox">
          {{ goodss.goodsName }}
        </div>
        <div class="infoPrize">
          <span class="">团长价:￥<i class="size44">{{ goodss.headPrice}}</i></span>
          <span class="retailPrice">拼团价：<i>￥{{ goodss.spellPrice }}</i></span>
        </div>
        <div class="infoRemove">
          <span class="retailPrice remove">市场价：<i>￥{{ goodss.marketPrice }}</i></span>
        </div>
      </div>
      <!--属性-->
      <div class="spxq_property" @click="showdial" v-if="Attrname">
        <div id="table_a" v-show="table_a">
          <p v-for="(item, index) in Attrdata" :key="index">
            <span>{{ item.attributeName }}</span>
            <b v-for="(item2, index2) in item.attributeOptionList" :key="index2">{{ item2 }}</b>
          </p>
        </div>
        <div id="table_b" v-show="!table_a">
          <p>
            <span>已选：{{ Isselect }}</span>
            <b></b>
          </p>
          <p>
            <span>数量：{{ Isselectlth }}</span>
            <b></b>
          </p>
        </div>
      </div>
      <!--物流模板-->
      <div id="delivery" @click="Torule">
        <p>
          <img src="../../assets/images/icon2x.png" alt="勾勾">
          <span>商家运费规则<input type="hidden" id="deliveryFreightShow" value="02"></span>
        </p>
        <div class="ico">

        </div>
      </div>
      <div class="d_switch">
        <a href="javascript:void(0)" tog="spxq_intro" style="border-right:none;" class="box-size">图文详情</a>
        <a href="javascript:void(0)" tog="tcsp_intro" class="f-left box-size hide">优惠套餐</a>
        <a href="javascript:void(0)" class="f-left box-size hide">买家评论</a>
      </div>
      <!--商品详情 intro-->
      <div class="spxq_intro base_introf_b">
        <div class="abstract absattr">商品详情</div>
        <div class="edit" id="goodscontent">
          <p style="font-size: 0" v-for="(item, index) in imgurl" :key="index">
            <img v-lazy="item" alt="22222">
          </p>
        </div>
      </div>
      <div class="fix-bottom-group clean">
        <div class="bottom-1 _left clean">
          <a class="home_icon2 borderBox" href="javascript:void(0)">
            商城
          </a>
          <a class="collect borderBox" href="javascript:void(0)">
            收藏
          </a>
        </div>
        <div class="bottom-2 _left clean">
          <a class="addCar borderBox _left" href="#" @click="addCard">加入购物车</a>
          <a class="oneBuy borderBox _left" href="#">单独购买</a>
          <a class="fightGroup" href="#">去拼团</a>
        </div>
      </div>
    </div>
    <div class="float_nav">
      <a class="control" href="javascript:void(0)">
        <span class="n1">导航</span>
        <span class="n2"></span>
      </a>
      <a class="gwc" href="javascript:void(0)" style="top: -180px;">
        <div class="gwc_info" hidden="hidden" style="display: block;">
          <p>共<em id="car_count">1</em>件</p>
          <p><em>￥</em><em id="car_money">99999</em></p>
        </div>
        <span></span>
      </a>
      <a id="consultBtn" href="javascript:void(0)" class="consult_btn box-size hide_new" style="display: inline;">咨询</a>
    </div>
    <!--子组件  对showdia的值进行v-bind动态绑定  v-on监听子组件传给父组件的值 childtoparent这个一定要与子组件定义的名字一样-->
    <Dial :showdia="showdia" :Picurl="Picurl" :goodsName="goodsName" :headPrice="headPrice" :Attrdata="Attrdata" v-on:childtoparent="showchildmsg" v-on:childtoparent2="gettexts"></Dial>
    <Load v-show="isShow"></Load>
  </div>
</template>
<script>
  import axios from 'axios'
  import filter from '../../assets/js/filter'
  import Load from '../../components/load'
  import Dial from '../../components/dialog'
  import { MessageBox } from 'mint-ui'
  export default {
    data () {
      return {
        imgurl: [],
        isShow: true,
        active: 'is-active',
        isShow2: false,
        goodss: [],
        Attrdata: [],
        table_a: true,
        table_b: false,
        showdia: '',
        Picurl: '',
        goodsName: '',
        headPrice: '',
        Isselect: '',
        Isselectlth: '',
        Attrname: ''
      }
    },
    head () {
      return {
        title: '拼团购详情页'
      }
    },
    async asyncData () {
      return axios.all([
        axios.get('http://127.0.0.1:3222/api/getDetail?name=wangtao&password=1234')
      ])
      .then(axios.spread(function (content) {
//        console.log(content.data.date)
        return {
          imgurl: JSON.parse(content.data.date[0].contentsPic),
          goodss: content.data.date[0].goodsDetail,
          Attrdata: content.data.date[0].showAttributeList,
          Attrname: content.data.date[0].showAttributeList[0].attributeName
        }
      }))
    },
    components: { Load, Dial },
    mounted () {
      this.Picurl = this.imgurl[0]
      this.goodsName = this.goodss.goodsName
      this.headPrice = this.goodss.headPrice
//      console.log('Attrdata:', this.Attrdata)
    },
    beforeMount () {
      let self = this
      // 加载动画
      filter.flter('wrap', true)
      self.isShow2 = true
      setTimeout(function () {
        self.isShow = false
        filter.flter('wrap', false)
      }, Math.random() * 500)
    },
    methods: {
      loadTop: function () { // 加载更多数据  可自行写事件(拉到顶部时)
        this.$refs.loadmore.onTopLoaded()
        let self = this
//        this.goodss[0].title.push(this.goodss[0].title)
        axios.get('http://127.0.0.1:3222/api/getmsg')
          .then(function (response) {
            self.goodss = response.data.cf
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      loadBottom: function () { // 加载更多数据 加载完成时的事件
        this.allLoaded = true// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded()
      },
      showdial: function () { // 当点击属性按钮时 赋值showdia为true
        this.showdia = true
      },
      showchildmsg: function (data) { // 接收来自子组件的值，并赋值给showdia
        this.showdia = data
//        console.log('dialog目前的状态:', data)
      },
      gettexts: function (data) { // 获得已选择属性的数量和属性值
        this.Isselectlth = data.nums
        this.Isselect = data.texts.join('/')
        this.table_a = false
//        console.log('转换后的数据：', this.Isselect, this.Isselectlth)
      },
      Torule: function () {
        location.href = 'rule'
      },
      addCard: function () { // 加入购物车
        let self = this
        if (document.getElementById('table_a')) {
          if (document.getElementById('table_a').children[0].children.length > 0) {
            self.showdia = true
          } else {
            MessageBox({
              title: '',
              message: '商品已成功加入购物车',
              showCancelButton: false,
              showConfirmButton: false
            })// 提示弹框
            setTimeout(() => {
              document.getElementsByClassName('v-modal')[0].click()// 隐藏弹框
            }, 1000)
          }
        } else {
          MessageBox({
            title: '',
            message: '商品已成功加入购物车',
            showCancelButton: false,
            showConfirmButton: false
          })// 提示弹框
          setTimeout(() => {
            document.getElementsByClassName('v-modal')[0].click()// 隐藏弹框
          }, 1000)
        }
      }
    }
  }
</script>
<style>
  @import "~assets/css/myGroups.css";
  .page-swipe .mint-swipe {
    height: 200px;
    color: #fff;
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
  }
  #wrap>div:first-child{
    filter: blur(15px);
    -webkit-filter: blur(15px);
    height: 750px;
  }
  img[lazy=loading] {
    background-image: url("../../assets/images/lay_load.png");
    width: 750px;
    height: 400px;
    margin: auto;
  }

  .float_nav {
    position: fixed;
    right: 9px;
    bottom: 16%;
    width: 85px;
    font-size: 24px;
    z-index: 100;
  }
  .float_nav a {
    bottom: 0;
    display: block;
    position: absolute;
    left: 0;
    box-sizing: border-box;
    width: 85px;
    height: 85px;
    text-align: center;
    color: #00bf8e;
  }
  .float_nav a span.n1 {
    position: absolute;
    top: 0;
    left: 0;
  }
  .float_nav a span {
    display: block;
    width: 85px;
    height: 85px;
    border-radius: 50%;
    border: 2px solid #e3e3e3;
    line-height: 81px;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -webkit-transition: all .3s;
  }
  .float_nav a span.n2 {
    position: absolute;
    top: 0;
    left: 0;
    -webkit-transform: rotateY(180deg);
  }
  .float_nav a:last-child {
    margin-bottom: -94px;
  }
  .float_nav a .gwc_info {
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    position: absolute;
    top: 3px;
    right: 43px;
    height: 79px;
    box-sizing: border-box;
    padding: 8.5px 49px 8.5px 16px;
    border-radius: 0 0 0 20px;
    line-height: 31px;
  }
  .gwc:after {
    content: '';
    display: block;
    width: 46px;
    height: 46px;
    background-image: url("../../assets/images/icon.png");
    background-position: -404px -50px;
    position: absolute;
    top: 38%;
    left: 36%;
    margin: -11px 0 0 -11px;
  }
  .consult_btn {
    display: inline-block;
    line-height: 81px;
    text-align: center;
    color: #00bf8e;
    font-size: 24px;
    width: 85px;
    height: 85px;
    border-radius: 50%;
    border: 2px solid #e3e3e3;
    background-color: #fff;
    position: fixed;
    bottom: 120px;
    right: 9px;
    z-index: 59;
  }
  .mint-msgbox{
    background-color: rgba(0, 0, 0, 0.76);
    width: 50%;
    border-radius: 16px;
    font-size: 24px;
  }

  .mint-msgbox-message {
    color: #fff;
  }
  .mint-msgbox-btn{
    background-color: rgba(0, 0, 0, 0);
  }
  .v-modal{
    background: rgba(141, 141, 141, 0);
  }
  .mint-msgbox-confirm{
    color: #fff;
  }
  .mint-msgbox-content {
    border-bottom: 1px solid #ffffff;
    padding: 40px 20px;
  }
  .mint-msgbox-btns{
    display: none;
  }
</style>
