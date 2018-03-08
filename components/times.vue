<template>
  <div class="el_right">
    <div class="el_timeTxt">距结束</div>
    <ul class="el_btg_time">
      <li class="el_timeDay">{{ $store.state.day }}天</li>
      <li class="el_timeH">{{ $store.state.hour }}</li>
      <li class="el_timeM">{{ $store.state.minute }}</li>
      <li class="el_timeS">{{ $store.state.second }}</li>
    </ul>
    <nuxt/>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.start()
  },
  methods: {
    start: function () {
      let data = { 'day': 1, 'hour': 1, 'minute': 1, 'second': 1 } // 请求得到的时间
      this.$store.state.day = data.day
      this.$store.state.hour = data.hour
      this.$store.state.minute = data.minute
      this.$store.state.second = data.second// 改变store里面的时分秒数据
      this.$store.commit('increment') // 提交
    }
  }
}
</script>
<style>
  .el_right {
    padding: 18px 28px 18px 0;
    float: right;
  }
  .el_timeTxt {
    display: inline-block;
    font-size: 24px;
    vertical-align: middle;
    color: #d95c34;
  }
  .el_btg_time {
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
  }
  .el_btg_time>li:first-child {
    width: 60px;
    margin-left: 6px;
  }
  .el_btg_time>li {
    text-align: center;
    color: #fff;
    margin-left: 18px;
    float: left;
    display: block;
    position: relative;
    height: 40px;
    line-height: 40px;
    background-color: #ea512f;
    border-radius: 6px;
    width: 40px;
    box-sizing: border-box;
    font-size: 18px;
  }
  li {
    list-style: none;
  }
  .el_btg_time>li:after {
    color: #000;
    content: ":";
    display: block;
    position: absolute;
    top: -2px;
    right: -10px;
  }
</style>
