<template>
  <!--拼团进行中-->
  <div>
    <div class="everyGroup groupsOne " v-for="(item,$index) in fightData.content">
      <section class="itemGroup">
        <div class="groupMsg clean">
          <div class="leftImg _left">
            <img :src="item.smPic " alt="商品"/>
          </div>
          <div class="rightText _left">
            <p class="groupTitle">{{item.title}}</p>
            <p class="groupTime">
              倒计时：
              <counter :endtime='item.endTime'></counter>
            </p>
            <p class="groupPrice" v-if="hide">
              <!--此处是判断拼团的条件是人还是钱-->
              <span v-if=" item.spellRule. headConditionWay==1">
                                        <i class="g-red">{{item.payCount}}</i>人已支付
                                </span>
              <span v-else>
                                                                        已消费 <i class="g-red">{{item.amountCount}}</i>
                                </span>
            </p>
            <p class="groupHead" v-else>
              <i class="g-red">团长：{{item.nickName}}</i>

            </p>

          </div>
        </div>
        <section class="msgSign borderBox" v-if="hide">
          <span v-if=" item.spellRule.headConditionWay==1">成功邀约{{item.spellRule.headConditionNum}}人购买享受{{item.spellRule.headDiscount}}折优惠</span>
          <span v-else>团内消费达到{{item.spellRule.headConditionMoney}}元享{{item.spellRule.headDiscount}}折优</span>
        </section>
        <div class="itemPerson borderBox clean" v-if="hide"  data-test="item.memberPay" v-for="(itemPerson,$index) in item.memberPay">
          <div class="leftPerson _left">
            <img class="personImg" :src=" itemPerson.photo" alt="头像"/>
            <span class="groupName">{{itemPerson.nickName}}</span>
          </div>
          <div class="rightPrice _right">
            <!--此处是判断是否是支付了-->
            <em class="color999 payState" v-if="itemPerson.isPayed==0" state="itemPerson.isPayed">未支付</em>
            <em class="color999 payState" v-else>已支付</em>
            <i class="g-red">￥{{itemPerson.amount}}</i>
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
  import counter from './counter.vue';
  export default {
    name: 'underWay',
    props:["hide","fightData"],
    components:{
      'counter':counter
    },
    data () {
      return {
        endTime:' '
      }
    }

  }
</script>

<style>
  @import "../../assets/css/base.css";
  @import "../../assets/css/myGroups.css";
</style>
