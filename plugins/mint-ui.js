import Vue from 'vue'
// import Mint from 'mint-ui'
import { Button, Swipe, SwipeItem, Loadmore, InfiniteScroll, Lazyload } from 'mint-ui'
import 'mint-ui/lib/swipe/style.css'
import 'mint-ui/lib/button/style.css'
import 'mint-ui/lib/loadmore/style.css'
import 'mint-ui/lib/indicator/style.css'
import 'mint-ui/lib/infinite-scroll/style.css'
import 'mint-ui/lib/message-box/style.css'

Vue.component(Loadmore.name, Loadmore)
Vue.component(Button.name, Button)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.use(Loadmore)
Vue.use(InfiniteScroll)
Vue.use(Lazyload)
// Mint注释掉了 按需引用
// Vue.use(Mint)
