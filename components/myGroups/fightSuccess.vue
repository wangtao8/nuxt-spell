<template>
	<div>
		 <div class="everyGroup groupsTwo" v-for="(item,$index) in fightData.content">
            <section class="itemGroup">
                <div class="groupMsg clean">
                    <div class="leftImg _left">
                        <img :src="item.smPic " alt="商品"/>
                    </div>
                    <div class="rightText _left">
                        <p class="groupTitle">{{item.title}}</p>

                        <p class="groupTime">倒计时：
                          <counter :endtime='item.endTime'></counter>
                        </p>

                        <p class="groupPrice">
                                  <!--此处是判断拼团的条件是人还是钱-->
                                  <span v-if=" item.spellRule. headConditionWay==1">
                                                <i class="g-red">{{item.payCount}}</i>人已支付
                                        </span>
                                  <span v-else>
                                                已消费 <i class="g-red">{{item.amountCount}}</i>
                                   </span>
                        </p>
                    </div>
                </div>
            </section>
            <section class="msgSign borderBox">拼团成功啦，快去享受团长专属福利吧！
            </section>

            <div class="payment clean">
                <a class="payBtn _right g-payBtn" href="javascript:;">折上折购买</a>
            </div>
            <div class="height18"></div>
        </div>
	</div>
</template>

<script>
  import counter from './counter.vue';

  export default {
    name: 'fightSuccess',
    props:["fightData"],
    components:{
      'counter':counter
    },
    data () {
      return {
      }
    }

  }
</script>

<style>
@import "../../assets/css/base.css";
@import "../../assets/css/myGroups.css";
</style>
