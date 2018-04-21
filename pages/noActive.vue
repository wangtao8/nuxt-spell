<template>
	<div class="wrap">
    <header class="headerImg">
        <img src="../assets/images/logo.png" alt=""/>
    </header>
    <section>
        <div class="noImg">
            <img src="../assets/images/promty.png" alt="" style="width: 220px; height: 220px;"/>
        </div>
        <p class="noTxt">当前活动已经结束！</p>

    </section>
    <footer class="footBtn">
        <!--<a href="javascript:;" class="groupBtn joinBtn" >我要拼团</a>-->
        <a href="javascript:;" class="groupBtn" @click="goMail">去商城看看</a>
        <span class="el_right"></span>
    </footer>
</div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        storeId: ''
      }
    },
    async asyncData(contents) {
      return {
        storeId: contents.query.storeId
      }
    },
    methods: {
      goMail: function () {
        location.href = 'https://emcs.quanyou.com.cn/emallwap/whome/' + this.storeId
      }
    }
  }
</script>

<style scoped>
	@import "../assets/css/base.css";
	.wrap{
    height: 100%;
    width: 100%;
}
	.headerImg{
    height: 66px;
    padding: 60px 0 0 40px;
}

.footBtn{
    background: #fff;
    padding-left: 202px;
    padding-top: 30px;
    /*position: absolute;*/
    /*bottom:16px;*/
    /*left: 0;*/

}
.groupBtn{
    display: inline-block;
    width: 346px;
    height: 88px;
    line-height: 88px;
    font-size: 36px;
    color: #fff;
    background: #58af8a;
    border-radius: 8px;
    box-sizing: border-box;
    padding-left: 64px;
}
.el_right{
  display: inline-block;
  height: 14px;
  width: 14px;
  margin-left: .3em;
  position: relative;
  top: -6px;
  left: -90px;
  border: solid #fff;
  border-width: 2px 2px 0px 0;
  -webkit-transform: rotate(45deg);
  -webkit-animation: emptyBox .5s infinite;
}
@keyframes emptyBox {
  from { left: -90px; }
  to { left: -85px; }
}
.joinBtn{
    color: #58af8a;
    background: #fff;
    border: 1px solid #58af8a;
    margin: 0 18px;
}
.noImg{
    width: 396px;
    height: 292px;
}
.noImg{
    display: block;
    width: 100%;
    height: 100%;
    padding-top: 168px;
    text-align: center;
}
.noTxt{
    padding-top: 46px;
    font-size: 30px;
    color: #999;
    text-align: center;
}
</style>
