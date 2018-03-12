<template>
	<div class="everyGroup groupsFour">
            <section class="itemGroup" v-for="(item,$index) in fightData.content">
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
                            <i class="g-red">￥{{item.amount}}</i>
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

      }
    },
    methods:{

    }


  }
</script>

<style>
</style>
