<template>
  <!--拼团进行中-->
  <div>
    <div class="everyGroup groupsOne " v-for="(item,$index) in fightData.data.content">
      <section class="itemGroup">
        <div class="groupMsg clean">
          <div class="leftImg _left">
            <img src="../../assets/shoes.jpg" alt="商品"/>
          </div>
          <div class="rightText _left">
            <p class="groupTitle">{{item.title}}</p>
            <p class="groupTime">倒计时：12:00:00:00</p>
            <p class="groupPrice" v-if="hide">
              <i class="g-red">20</i>
              人已支付/已消费 <i class="g-red">2000034</i> 元
            </p>
            <p class="groupHead" v-else>
              <i class="g-red">团长：贾小燕</i>

            </p>

          </div>
        </div>
        <section class="msgSign borderBox" v-if="hide">成功邀约510人购买享受6折优惠/团内消费达到1000元享3折优
        </section>
        <div class="itemPerson borderBox clean" v-if="hide">
          <div class="leftPerson _left">
            <img class="personImg" src="../../assets/shoes.jpg" alt=""/>
            <span class="groupName">第一个人</span>
          </div>
          <div class="rightPrice _right">
            <!--此处是判断是否是支付了-->
            <em class="color999 payState" v-if="item.state==1" state="item.state">未支付</em>
            <em class="color999 payState" v-else>已支付</em>
            <i class="g-red">￥520</i>
          </div>
        </div>

        <div class="payment clean" v-if="hide">
          <a class="payBtn _right" href="javascript:;">提前购买</a>
        </div>
      </section>
      <div class="height18"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'underWay',
    props:["hide","fightData"],
    data () {
      return {
      }
    },
    methods:{
    }
  }
</script>

<style>
  @import "../../assets/css/base.css";
  @import "../../assets/css/myGroups.css";
</style>
