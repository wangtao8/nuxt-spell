<template>
  <div id="wrap">
    <groups :isA='isA' :isB='isB' />
    <div class="content">
      <div class="noTxt">
        <p>您好，您目前占未参与参团活动</p>
        <p>请点击下方按钮，开启参团抢优惠之旅。</p>

      </div>
      <div class='groupFoot'>
        <nuxt-link to="/about" class='groupBtn'>我要参团</nuxt-link>
      </div>

    </div>
  </div>
</template>

<script>
  import groups from '../../components/myGroups/groups'
  export default {
    name: 'noGroups',
    data () {
      return {
        isA: false,
        isB: true
      }
    },
    components: {
      'groups': groups

    }
  }
</script>

<style>
  @import "../../assets/css/base.css";
  #__nuxt, .warpPage, #wrap{
    width: 100%;
    height: 100%;
  }
  .content{
    width: 100%;
    height:calc(100% - 90px);
    position: relative;
  }
  .noTxt{
    position: absolute;
    width: 540px;
    height: 100px;
    font-size: 30px;
    top: calc((100% - 100px)/2);
    left: calc((100% - 540px)/2);
  }
  .noTxt>p{text-align: center;}
  .groupFoot{
    width: 100%;
    height: 120px;
    position: absolute;
    bottom:0 ;
    display: inline-flex;
    align-items: center;
    justify-content: center
  }
  .groupBtn{
    width: 90%;
    height: 96px;
    display: inline-block;
    color: #fff;
    font-size: 30px;
    text-align: center;
    line-height: 96px;
    background: #da451f;
  }

</style>
