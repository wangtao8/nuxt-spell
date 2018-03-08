<template>
  <div class="everyGroup">
    <section class="itemGroup">
      <div class="groupMsg clean">
        <div class="leftImg _left">
          <img src="../../assets/shoes.jpg" alt="商品"/>
        </div>
        <div class="rightText _left">
          <p class="groupTitle">全友家居 我的家呀全友家居很好全友家居很好全友家居很好全友家居很好全友家居很好全友家居很好</p>
          <p class="groupTime">时间：2018.02.31 - 2018.03.31</p>
          <p class="groupPrice">
            <i class="g-red">活动到期</i>
          </p>
        </div>
      </div>
    </section>
    <div class="height18"></div>
    <section class="itemGroup">
      <div class="groupMsg clean">
        <div class="leftImg _left">
          <img src="../../assets/shoes.jpg" alt="商品"/>
        </div>
        <div class="rightText _left">
          <p class="groupTitle">全友家居 我的家呀全友家居很好全友家居很好全友家居很好全友家居很好全友家居很好全友家居很好</p>
          <p class="groupTime">时间：2018.02.31 - 2018.03.31</p>
          <p class="groupPrice">
            <i class="g-red">活动到期</i>
          </p>
        </div>
      </div>
    </section>
    <div class="payment clean" v-if="hideBtn">
      <a class="payBtn _right" href="javascript:;">继续拼团</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'collageFailure',
    props:["hideBtn"],
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
