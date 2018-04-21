<template>
	<div class="everyGroup groupsFour">
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
    name: 'collageFull',
    props:["fightData"],
    data () {
      return {
        shopId:'',
        storeId:'',
        activityId:'',
        orderNo:''
      }
    },
    mounted (){
      this.shopId = sessionStorage.getItem('shopId')
      this.storeId = sessionStorage.getItem('storeId')
      this.activityId=sessionStorage.getItem('activityId')
      // console.log("获取首页信息",this.shopId,this.storeId,this.activityId);
    },
    methods:{
       botton:function (e) {
       this.orderNo=e;
         location.href="https://emcs.quanyou.com.cn/emallwap/order/orderDetail/"+this.storeId+"/"+this.orderNo
  }
    }


  }
</script>

<style>
</style>
