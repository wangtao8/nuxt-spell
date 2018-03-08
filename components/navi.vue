<template>
  <div :class="navs" id="navs">
    <ul :class="clear" ref="mybox">
      <li :class="{active: active == index}" @click="check(index)" v-for='(item, index) in clas' :key="index">{{ item.choose }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'navs',
  data () {
    return {
      navs: 'el_navs',
      clear: 'clear',
      activex2: '',
      active: 0,
      clas: [{
        choose: '厨房'
      }, {
        choose: '餐厅'
      }, {
        choose: '书房'
      }, {
        choose: '客厅'
      }, {
        choose: '儿童'
      }, {
        choose: '户外/阳台'
      }]
    }
  },
//  async asyncData () {
//    return axios.get('http://127.0.0.1:3666/getall')
//      .then((res) => {
//        return { clas: res.data }
//      })
//  },
  mounted () {
    let self = this
    let elWidth = 0
    let lis = self.$refs.mybox.children
    for (var i = 0; i < lis.length; i++) {
      elWidth += lis[i].clientWidth
    }
    self.$refs.mybox.style.width = elWidth + 60 + 'px'
  },
  methods: {
    check: function (e) {
      this.active = e
    }
  }
}
</script>
<style>
  .el_navs {
    width: 750px;
    overflow-x: scroll;
    border-bottom: 1px solid #e3e3e3;
  }
  .el_navs>ul {
    width: 999px;
    overflow-x: scroll;
    margin-left: 32px;
  }
  .el_navs>ul>li {
    font-size: 28px;
    padding: 18px 30px;
    float: left;
  }
  .active {
    border-bottom: 6px solid rgb(234,81,47);
  }
  .clear:after {
    content: "";
    display: block;
    clear: both;
  }
</style>
