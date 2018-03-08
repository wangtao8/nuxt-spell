<template>
  <div class="foot_dialog" v-show="showdia == true">
    <div class="bg" style="opacity: 1;"></div>
    <div class="c" style="visibility: visible; margin-top: 341px; height: 100%;">
      <div class="property_select" :class="[showdia == true ? 'live' : 'come']">
        <span class="close" @click="close"></span>
        <div class="msg clear">
        <img :src="Picurl" id="gawPicShow">
        <div class="info">
          <div class="w">{{ goodsName }}</div>
          <div class="prize">￥<em id="gawPriceShow">{{ headPrice }}</em></div>
          <!--<div id="gawShelfNoShow" style="color: #666;word-break:break-all;display: none">商品货号: 22</div>-->
        </div>
      </div>
        <div class="property" v-if="Attrdata">
          <div id="gawAttributeBox" class="model">
            <span v-for="(item, index) in Attrdata" :key="index">
              <label class="flable">{{ item.attributeName }}</label>
              <p class="btns clear">
                <span v-for="(item2, index2) in item.attributeOptionList" @click="addcur($event, index2)">{{ item2 }}</span>
              </p>
            </span>
          </div>
        </div>
        <div class="counter clear">
          <label style="display: none">数量: (库存 <em id="gawStockShow">3</em>)</label>
          <span class="c-e53546" style="display: none; padding-left:20px;">每个ID限购<em id="limitCount"></em>件</span>
          <div class="count clear">
            <span id="gawBuyNumOp1" @click="minus">-</span>
            <input id="gawBuyNum" type="tel" class="plus-num" value="1" @input="enternum($event)">
            <span id="gawBuyNumOp2" @click="adds">+</span>
          </div>
        </div>
        <div class="control">
      <div class="col-1" style="display: none;">
        <nuxt-link to="javascript:void(0)" class="btn red">确　定</nuxt-link>
      </div>

      <div class="col-2" style="display: block;">
        <a id="gawAddCartBtn" href="javascript:void(0)" class="btn gray" style="background: #fb7c0c;color: #fff!important;" @click="addCard">加入购物车</a>
        <a id="gawBuyNowBtn" href="javascript:void(0)" class="btn red" style="display: none">立即购买</a>
      </div>
    </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui'
  export default {
    data () {
      return {
      }
    },
//    接收来自父组件的值
    props: ['showdia', 'Picurl', 'goodsName', 'headPrice', 'Attrdata'],
    mounted () {
      if (document.getElementById('gawAttributeBox').children.length > 2) {
        document.getElementById('gawAttributeBox').style.height = '500px'
      }
    },
    methods: {
      close: function () {
//        点击关闭按钮时 向父组件发送一个参数 childtoparent为约定的一个名称 父组件接收该值时，监听事件名称要与之相同
        this.$emit('childtoparent', 'false')
        let Curtexts = []
        let Choosenum = document.getElementById('gawBuyNum').value
        let Iscur = document.getElementsByClassName('cur')
        for (let i = 0; i < Iscur.length; i++) {
          Curtexts.push(Iscur[i].innerText)
        }
        let Curobj = {
          'texts': Curtexts,
          'nums': Choosenum
        } // 封装一个对象传递过去 包含选中的类型 和 选择的数量
        this.$emit('childtoparent2', Curobj)
      },
      addcur: function (e, list) {
        let childs = e.target.parentNode.childNodes
        for (let i = 0; i < childs.length; i++) {
          if (i !== list) {
            childs[i].classList.remove('cur')
//            console.log('siblings:', childs[i])
          } else {
            childs[i].classList.add('cur')
//            console.log('self:', childs[i])
          }
        }
      },
      minus: function () {
        if (document.getElementById('gawBuyNum').value > 1) {
          document.getElementById('gawBuyNum').value--
        }
      },
      enternum: function (e) {
        if (e.target.value > 5) {
          e.target.value = 5
        } else if (e.target.value === 0) {
          alert('必须大于0件')
        }
      },
      adds: function () {
        document.getElementById('gawBuyNum').value++
        if (document.getElementById('gawBuyNum').value > 5) {
          document.getElementById('gawBuyNum').value = 5
        }
      },
      addCard: function () {
        MessageBox({
          title: '',
          message: '商品已成功加入购物车',
          showCancelButton: false,
          showConfirmButton: false
        })// 提示弹框
        setTimeout(() => {
          document.getElementsByClassName('v-modal')[0].click()// 隐藏弹框
        }, 1000)
        this.close()
      }
    }
  }
</script>
<style>
@import "~assets/css/dialog.css";
  .live {
    -webkit-transform: translate3d(-50%,0,0);
    transform: translate3d(-50%,0,0);
    transition: -webkit-transform 0.3s ease-out;
    transition: transform 0.3s ease-out;
  }
  .come {
    -webkit-transform: translate3d(-50%,100%,0);
    transform: translate3d(-50%,100%,0);
    transition: -webkit-transform .3s ease-out;
    transition: transform .3s ease-out;
  }


.mint-msgbox{
  background-color: rgba(0, 0, 0, 0.76);
  width: 50%;
  border-radius: 16px;
  font-size: 24px;
}

.mint-msgbox-message {
  color: #fff;
}
.mint-msgbox-btn{
  background-color: rgba(0, 0, 0, 0);
}
.v-modal{
  background: rgba(141, 141, 141, 0);
}
.mint-msgbox-confirm{
  color: #fff;
}
.mint-msgbox-content {
  border-bottom: 1px solid #ffffff;
  padding: 40px 20px;
}
.mint-msgbox-btns{
  display: none;
}
</style>
