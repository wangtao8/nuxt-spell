<template>
  <div id="content" style="height: 100%; display: block;">
    <div class="el-height">
      <div class="abstract" v-for="(item, index) in rules.date.deliveryFreight">
        <div class="absAddress">
          <span class="absGreen">配送区域</span>
          <div style="width: 600px;float: left;">
            <div class="el_ssq">{{ item.deliveryArea }}</div>
            <!--<div class="el_jd">东坡街道&nbsp;,光华街道&nbsp;</div>-->
          </div>
        </div>
        <div class="absAddress" style="border-bottom: 1px solid #cbcbcb">
          <span class="absGreen ">配送费用</span>
          <div style="width: 524px;float: left;margin-bottom: 18px;">
            <span>{{ item.deliveryPrice }}</span>
            <!--<span>10.01-1000元运装费为0元；</span>-->
          </div>
        </div>
      </div>
      <div class="absAddress" style="border: none;">
        <span class="absGreen ">送装说明</span>
        <div style="width: 600px; float: left; line-height: 46px; display: inline-block; word-break: break-word; height: 506px;">
          {{rules.date.sendDetail}}
        </div>
      </div>
    </div>
    <div class="btn-later">
      <div id="closeDeliveryFreightShow" class="btn-confirm close" @click="Todetail">
        确 定
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        rules: {}
      }
    },
    async asyncData () {
      return axios.all([
        axios.get('http://192.168.79.12:3222/api/getRule')
      ])
        .then(axios.spread(function (rule) {
          return {
            rules: rule.data
          }
        }))
    },
    mounted () {
      console.log(this.rules)
    },
    methods: {
      Todetail: function () {
        history.back(-1)
      }
    },
    head () {
      return {
        title: '运费规则'
      }
    }
  }
</script>
<style>
  html,body,#__nuxt{
    height: 100%;
  }
  #__nuxt>div{
    height: 100%;
  }
  #content {
    width: 750px;
    display: none;
    padding-top: 30px;
    background-color: #fff;
    color: #444444;
    font-size: 26px;
    position: relative;
  }
  .el-height {
    height: 100%;
    overflow-y: auto;
  }
  .absAddress {
    height: auto;
    width: 750px;
    border-bottom: 1px dashed #ccc;
    overflow: hidden;
    margin-top: 20px;
    padding-bottom: 10px;
  }
  .absGreen {
    float: left;
    color: #EA512F;
    border: 1px solid #EA512F;
    padding: 4px;
    border-radius: 6px;
    margin-right: 24px;
    margin-left: 20px;
    font-size: 22px;
  }
  .el_ssq {
    margin-bottom: 5px;
    display: inline-block;
    /* width: 300px; */
  }
  .el_jd {
    margin-bottom: 10px;
    display: inline-block;
    line-height: 36px;
  }
  .btn-later {
    width: 100%;
    height: 104px;
    border-top: 1px solid #e3e3e3;
    padding-top: 14px;
    position: absolute;
    bottom: 0;
  }
  .btn-confirm {
    position: absolute;
    bottom: 8px;
    left: 20px;
    display: block;
    width: 708px;
    height: 84px;
    background-color: #EA512F;
    font-size: 30px;
    color: #fff;
    text-align: center;
    line-height: 84px;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
