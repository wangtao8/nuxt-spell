<template>
	   <div class="everyGroup">
            <section class="itemGroup" v-for="(item,$index) in fightData.content" @click="botton(item.orderNo)">
                <div class="orderNum clean">
                    <i class="_left numberTxt">订单号：{{item.orderNo}}</i>
                    <span class="g-red _right">大家一起来团购</span>
                </div>
                <div class="groupMsg clean">
                    <div class="leftImg _left">
                        <img :src="item.smPic " alt="活动小图"/>
                    </div>
                    <div class="rightText _left">
                        <p class="groupTitle">{{item.title}}</p>
                        <p class="groupPrice">
                            <i class="g-red">拼团商品实付：￥{{item.amount/100}}</i>
                        </p>
                    </div>
                </div>
                <div class="height18"></div>
            </section>

        </div>
</template>

<script>
  export default {
    name: 'offeredSuccess',
    props:["fightData"],
    data () {
      return {
        amountcount:'',
        shopId:'',
        storeId:'',
        activityId:''
      }
    },
    mounted (){
      this.shopId = sessionStorage.getItem('shopId')
      this.storeId = sessionStorage.getItem('storeId')
      this.activityId=sessionStorage.getItem('activityId')
      // console.log("获取首页信息",this.shopId,this.storeId,this.activityId);

    },
    methods: {
      botton:function (e) {
        this.orderNo=e;
        console.log("orderNo的值：", this.orderNo)
        location.href="https://emcs.quanyou.com.cn/emallwap/order/orderDetail/"+this.storeId+"/"+this.orderNo
        // location.href="https://emcs.quanyou.com.cn/spell/boon?teamId="+this.teamId+"&shopId="+this.shopId+"&activityId="+this.activityId+"&storeId="+this.storeId
      }
    }

  }
</script>

<style>
@import "../../assets/css/base.css";
@import "../../assets/css/myGroups.css";
</style>
