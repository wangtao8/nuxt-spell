let WXUtil = {

      root:"",

     setPrefix :function(root){
        this.root = root
     },

     /**
       *获取url上面的参数值
       *name 参数名
       *return 参数值
      */
      getUrlParam:function(name){
          let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)") //构造一个含有目标参数的正则表达式对象
          let r = window.location.search.substr(1).match(reg)  //匹配目标参数
          if (r!=null) {
            return decodeURIComponent(r[2])
          } else {
            return null //返回参数值
          }
      },

      //隐藏网页右上角按钮
      hideOptionMenu:function(){

              // if (typeof WeixinJSBridge == "undefined"){
              //     if( document.addEventListener ){
              //         document.addEventListener('WeixinJSBridgeReady', function(){WeixinJSBridge.call('hideOptionMenu')}, false)
              //     }else if (document.attachEvent){
              //         document.attachEvent('WeixinJSBridgeReady', function(){WeixinJSBridge.call('hideOptionMenu')})
              //         document.attachEvent('onWeixinJSBridgeReady', function(){WeixinJSBridge.call('hideOptionMenu')})
              //     }
              // }else {
              //     WeixinJSBridge.call('hideOptionMenu')
              // }
      },
       //显示网页右上角按钮
      showOptionMenu:function(){

          // if (typeof WeixinJSBridge == "undefined"){
          //     if( document.addEventListener ){
          //         document.addEventListener('WeixinJSBridgeReady', function(){ WeixinJSBridge.call('showOptionMenu')}, false)
          //     }else if (document.attachEvent){
          //         document.attachEvent('WeixinJSBridgeReady', function(){ WeixinJSBridge.call('showOptionMenu')})
          //         document.attachEvent('onWeixinJSBridgeReady', function(){ WeixinJSBridge.call('showOptionMenu')})
          //     }
          // }else{
          //     WeixinJSBridge.call('showOptionMenu')
          // }
      },

      //隐藏网页底部导航栏
      hideToolbar:function(){
       //   document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
			 //   WeixinJSBridge.call('hideToolbar')
		  // })
      },
      //显示网页底部导航栏
      showToolbar:function(){
       //   document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
			 //   WeixinJSBridge.call('showToolbar')
		  // })
      },
      //关闭当前显示页面
      closeWxWindow:function(){
    	  WeixinJSBridge.call('closeWindow')
      },

      //获取网络状态
      /**
        *network_type:wifi wifi网络
		*network_type:edge 非wifi,包含3G/2G
	    *network_type:fail 网络断开连接
	    *network_type:wwan（2g或者3g）
        *
       */
      getNetworkType:function(){
           WeixinJSBridge.invoke('getNetworkType',{},
              function(e){
                return e.err_msg
	      })
      },



     /**
     *判断是否是微信浏览器
     * @author Bill
	 * @version 1.0
	 * @Since  2013-12-18
     */
    isWeixin:function(){
		let ua = navigator.userAgent.toLowerCase()
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			return true
	 	} else {
			return false
		}
	},

	/**
     *判断是否是iPhone手机
     * @author Bill
	 * @version 1.0
	 * @Since  2013-12-18
     */
    isIphone:function(){
		let ua = navigator.userAgent.toLowerCase()
		if(ua.match(/iPhone/i)=="iphone") {
			return true
	 	} else {
			return false
		}
	},

	/**
     *判断是否是Android手机
     * @author Bill
	 * @version 1.0
	 * @Since  2013-12-18
     */
    isAndroid:function(){
		let ua = navigator.userAgent.toLowerCase()
		if(ua.match(/Android/i)=="android") {
			return true
	 	} else {
			return false
		}
	},
	/**
	 *判断浏览器是否支持本地存储
	 */
	 isStorage:function(){
	   if(window.localStorage)return true
	   return false
	 },

	 /**
	  *设置本地存储值
	  *
	  */
	  setStorage:function(key,value){
	    localStorage[key]=value
	    return localStorage
	  },
	  /**
	  * 设置本地存储值
	  */
	  getStorage:function(key){
	    return localStorage[key]
	  },
	  /**
	   *检测key对应的值是否和被检测值相同
	  */
	  testStorage:function(key,testValue){
	       let key_value = localStorage[key]
	       if(checkMParam(testValue) && key_value===testValue)return true
	       return false
	  },

	  /**
	  *监测参数
	  */

	 checkMParam:function(value){
		if(value != null && value != undefined && value != "" && value != "null" && value != "NULL" && value != "undefined" && value != "UNDEFINED"){
        return true
      } else {
        return false
      }
    },

	  //判断微信版本号是否大于5.2
	 checkWxVersion:function() {
		let ua = navigator.userAgent
		let index = ua.indexOf("MicroMessenger")
		if(index >-1){
				let substr = ua.substr(index)
				substr = substr.replace("MicroMessenger/")
				if(substr>"5.2"){
					return true
				}
				return false

		}else{
			return false
		}
	},




    getParamenter:function(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
        let r = window.location.search.substr(1).match(reg)
        if (r != null) {
          return decodeURIComponent(r[2])
        } else {
          return null
        }
    },

    /**
     *
     * 设置打开链接,去掉连接中的链接参数openid
     *
     */
    set_delOpenid : function(openId){
        window.location.href = window.location.href.replace("openId="+openId,"")
     },



    //设置key，value到本地sessionStorage，自动监测浏览器的支持情况，优先选择本地存储
    set_Storage:function(key,value){
        if(WXUtil.isSessionStorage()){
            WXUtil.setSessionStorage(key,value)
        }
    },
    //获取key，value到本地sessionStorage，自动监测浏览器的支持情况，优先选择本地存储**/
    get_Storage:function(key){
        if(WXUtil.isSessionStorage()){
            return WXUtil.getSessionStorage(key)
        }
    },
    isSessionStorage:function(){
        if(window.sessionStorage)
            return true
        else
            return false
    },
    setSessionStorage:function(key,value){
        sessionStorage.setItem(key,value)
        return sessionStorage
    },
    getSessionStorage:function(key){
        return sessionStorage.getItem(key)
    }
}

function verify(store, shop) {
  let storeId = store
  let shopId = shop
  let isWxBrowser = WXUtil.isWeixin()
  let user_login_m = "user_login_mobile_s_" + shopId
  let user_login_p = "user_login_password_s" + shopId
  let user_wx_openid_s = "user_wx_openid_s" + shopId
  let openId = sessionStorage.getItem('openId')
  /**
   * 网页授权，获取openid
   * @param appId
   * @param getOpenidUrl
   */
  function gainOpenId(appId,getOpenidUrl){
    WXUtil.set_Storage("auth-status",1) //标记授权
    //微信授权的固定url
    let redirect_uri = window.location.href.replace(/#.*/g, "") //去掉链接里的#号
    if (redirect_uri.indexOf('openId=') > 0){
      //去掉连接上的openId，免得和授权后的混了
      redirect_uri = redirect_uri.replace(/(^|\?)openId=([^&]*)/g, "?ao=1").replace(/(^|&)openId=([^&]*)/g, "")
    }
    let param = "/oauth2?appId="+appId+"&scope=snsapi_base&state=hyxt&url="+encodeURIComponent(redirect_uri)
    let url = getOpenidUrl + param
    console.log('gainOpenIdUrl:', url)
    window.location.href = url
  }
  /**
   * 网页授权，获取用户信息，昵称，头像，openId 会弹出框
   * @param appId
   * @param getOpenidUrl
   */
  function gainOpenUserInfo(appId,getOpenidUrl){
    //微信授权的固定url
    let redirect_uri = window.location.href.replace(/#.*/g, "") //去掉链接里的#号
    let param = "/oauth2?appId="+appId+"&scope=snsapi_userinfo&state=o2o&url="+encodeURIComponent(redirect_uri)
    let url = getOpenidUrl + param
    console.log('gainOpenUserInfoUrl:', url)
    window.location.href = url
  }

  if(isWxBrowser){
    if (openId) {

    } else {
      let openId = WXUtil.get_Storage("openId")
      console.log('openId:', openId)
      if(!WXUtil.checkMParam(openId)){
        console.log('11111111111111111111111111')
        //获取连接上的openId
        openId = WXUtil.getParamenter("openId")
        console.log('openId2:', openId)
        if(!WXUtil.checkMParam(openId)){
          console.log('222222222222222222222222222222222')
          openId  = getOpenIdLocalStorage()
          console.log('openId3:', openId)
          //如缓存里有 ，就用缓存里的
          if (WXUtil.checkMParam(openId)){
            console.log('333333333333333333333333333333333333')
            WXUtil.set_Storage("openId",openId)
            authWX(storeId,shopId,openId)
          }else{
            console.log('4444444444444444444444444444444444444444')
            gainOpenId('wx59a6dafd3e869779','http://wxcs.quanyou.com.cn/wx-proxy-web')
          }
        }else{
          console.log('555555555555555555555555555555555555555555')
          //如果有，需要判断是否是微信授权后的，如果是直接在链接上的，就要重新授权
          let authStatus = WXUtil.get_Storage("auth-status")
          if (authStatus && authStatus == 1){
            console.log('66666666666666666666666666666666666666666666666')
            WXUtil.set_Storage("openId",openId)
            setOpenIdLocalStorage(openId)
            authWX(storeId,shopId,openId)
          }else{
            console.log('77777777777777777777777777777777777777777777')
            gainOpenId('wx59a6dafd3e869779','http://wxcs.quanyou.com.cn/wx-proxy-web')
          }
        }
      }else{
        console.log('88888888888888888888888888888888888888888888888888')
        if (WXUtil.get_Storage("userionfo_s") == "true"){
          console.log('99999999999999999999999999999999999999999999')
          //如果已经通过网页授权获取过用户信息
          refreshUserInfo(storeId,shopId,openId)
        }else{
          console.log('10000000000000000000000000000000000000000')
          authWX(storeId,shopId,openId)
        }
      }
    }
  }else {
    // 如果不是微信浏览器
    console.log('1313131313131313131313131313131313131313')
    if( document.getElementById('validate_div') ){
      authMobile()
    } else {
      window.location.href = 'http://emcs.quanyou.com.cn/spell/test/index6'
    }
  }
// 分四步走  1-2-4    1-5-6  鉴权确定  8-9
  function authMobile(){
    let o = getBuyerLocalStorage()
    if (o && WXUtil.checkMParam(o.m) && WXUtil.checkMParam(o.p)){
      axios.post("emcs.quanyou.com.cn/buyer/authByMobile/" + storeId + "/" + shopId,{mobile:o.m, password:o.p,md5:true},function (data) {
        console.log(data)
      })
    }else{
      showValidateTip('get')
    }
  }

  function setOpenIdLocalStorage(openId) {
    let s = getOpenIdLocalStorage()
    if (!s || !WXUtil.checkMParam(s)){
      let expires = (new Date()).getTime()
      WXUtil.setStorage(user_wx_openid_s,openId)
      WXUtil.setStorage(user_wx_openid_s + '_time',expires)
    }
  }

  function refreshUserInfo(storeId,shopId,openId){
    WXUtil.set_Storage("userionfo_s","")  //清空获取用户信息的标识
  }

  function getBuyerLocalStorage(){
    let d = (new Date()).getTime()
    let time = WXUtil.getStorage(user_login_m + user_login_p)
    if (time && parseInt(time) + 604800000 >= d  ){
      // 有效期内
      return {m:WXUtil.getStorage(user_login_m),p:WXUtil.getStorage(user_login_p)}
    }else{
      WXUtil.setStorage(user_login_m,'')
      WXUtil.setStorage(user_login_p,'')
      return null
    }
  }

  //是否显示输入电话验证
  function showValidateTip(type){
    document.getElementById('validate_div').style.height = '100%'
    document.getElementById('validate_div').style.display = 'block'
    if(type == 'get'){
      console.log('1212121212121212121212121212121212')
      document.getElementById('validate_box_div').style.display = 'block'
    }else{
      console.log('123123123123123123123123123123123123')
      document.getElementById('validate_div').style.display = 'none'
      document.getElementById('validate_box_div').style.display = 'none'
    }
  }

  function getOpenIdLocalStorage() {
    let d = (new Date()).getTime()
    let time = WXUtil.getStorage(user_wx_openid_s + '_time')
    if (time && parseInt(time) + 604800000 >= d  ){
      // 有效期内
      return WXUtil.getStorage(user_wx_openid_s)
    }else{
      WXUtil.setStorage(user_wx_openid_s,'')
      return null
    }
  }

  function authWX(storeId,shopId,openId){
    WXUtil.set_Storage("userionfo_s","true") //需要采用网页授权获取用户信息
    gainOpenUserInfo('wx59a6dafd3e869779','http://wxcs.quanyou.com.cn/wx-proxy-web')
  }
}

WXUtil.hideOptionMenu()

export default {
  WXUtil,
  verify
}


