<template>
	<div class="everyGroup groupsFour">
            <section class="itemGroup" v-for="(item,$index) in fightData.content" >
                <div class="orderNum clean">
                    <i class="_left numberTxt">订单号：{{item.orderNo}}</i>
                    <span class="g-red _right">大家一起来团购</span>
                </div>
                <div class="groupMsg clean">
                    <div class="leftImg _left">
                        <img :src="item.smPic " alt="商品"/>
                    </div>
                    <div class="rightText _left">
                        <p class="groupTitle">{{item.title}}</p>
                        <p class="groupPrice">
                            <i class="g-red">￥{{item.amount/100}}</i>
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
        activityId:''
      }
    },
    mounted (){
      this.shopId = sessionStorage.getItem('shopId')
      this.storeId = sessionStorage.getItem('storeId')
      this.activityId=sessionStorage.getItem('activityId')
      // console.log("获取首页信息",this.shopId,this.storeId,this.activityId);
    },
    methods:{
  //      botton:function () {
  //     let test=this.fightData.content
  //     for(var i=0;i<=test.length-1;i++){
  //     let aa={}
  //     aa=test[i].teamId
  //     this.teamId=aa
  //
  // }
  //
  // console.log("teameid的值：", this.teamId)
  // location.href="https://emcs.quanyou.com.cn/spell/boon?teamId="+this.teamId+"&shopId="+this.shopId+"&activityId="+this.activityId+"&storeId="+this.storeId
  // }
    }


  }
</script>

<style>
</style>
