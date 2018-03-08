<template>
  <div id="goods">
    <div v-for="(item, index) in goodss" :class="goods">
      <div :class="imgs">
        <img src="" alt="">
      </div>
      <div :class="bewrite">
        <ul>
          <li>{{ item.title }}</li>
          <li>零售价:
            <span>￥</span>
            <span>{{ item.userId }}</span>
          </li>
          <li>
            拼团价：
            <span>￥</span>
            <span>{{ item.id }}</span>
            <span>市场价:<span>￥{{ item.body.slice(0, 1) }}</span></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from '../plugins/axios'
  export default {
    name: 'goods',
    data () {
      return {
        goods: 'el_goods',
        imgs: 'el_img',
        bewrite: 'el_bewrite',
        datas: '',
        goodss: []
      }
    },
    async asyncData () {
      let { data } = await axios.get('/api/goods')
      console.log('data:', data)
      return {
        goodss: data.goods
      }
    }
  }
</script>
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .el_goods {
    margin-top: 18px;
    height: 180px;
    padding-bottom: 18px;
    border-bottom: 1px solid #e3e3e3;
    box-sizing: content-box;
  }
  .el_goods>div {
    float: left;
  }
  .el_img {
    width: 180px;
    height: 180px;
    background: rgb(220,220,220);
    margin-left: 32px;
  }
  .el_bewrite {
    margin-left: 28px;
    font-size: 28px;
  }
  .el_bewrite>ul {
    margin-top: 6px;
  }
  .el_bewrite>ul>li:first-child {
    width: 485px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  li {
    list-style: none;
  }
  .el_bewrite>ul>li:nth-child(2) {
    font-size: 26px;
    color: rgb(153,153,153);
    margin-top: 54px;
    margin-bottom: 14px;
  }
  .el_bewrite>ul>li:nth-child(2)>span:first-child {
    font-size: 24px;
  }
  .el_bewrite>ul>li:last-child {
    color: rgb(234,81,47);
  }
  .el_bewrite>ul>li:last-child>span:first-child {
    font-size: 26px;
  }
  .el_bewrite>ul>li:last-child>span:last-child {
    font-size: 26px;
    color: rgb(153,153,153);
    text-decoration: line-through;
    margin-left: 24px;
  }
</style>
