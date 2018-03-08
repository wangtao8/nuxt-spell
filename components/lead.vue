<template>
  <div id="lead">
    <ul :class="choose">
      <li>
        <div @click="openwin1" ref="0">引导</div>
      </li>
      <li>
        <div @click="openwin1" ref="1">参团</div>
      </li>
      <li>
        <div @click="openwin1" ref="2">我的团</div>
      </li>
    </ul>
    <nuxt/>
  </div>
</template>
<script>

  export default {
    name: 'lead',
    data () {
      return {
        choose: 'el_choose'
      }
    },
    methods: {
      openwin1: function (e) {
        console.log('123:', e.target.innerText)
        if (e.target.innerText === '引导') {
          this.data1 = true
          this.data2 = true
        } else if (e.target.innerText === '参团') {
          location.href = '/'
        } else {
          location.href = '/'
        }
      }
    }
  }
</script>
<style>
  .el_choose {
    font-size: 26px;
    position: fixed;
    bottom: 138px;
    right: 16px;
  }
  .el_choose>li {
    width: 84px;
    height: 84px;
    border-radius: 42px;
    border: 1px solid rgb(205,205,205);
    text-align: center;
    line-height: 84px;
    margin-top: 22px;
    list-style: none;
    background: #fff;
  }
  .el_choose>li>a, .el_choose>li>div {
    text-decoration: none;
    color: rgb(0,191,142);
  }
</style>
