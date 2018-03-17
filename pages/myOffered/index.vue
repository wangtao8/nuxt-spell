<template>
	<div>
		<groups :isA='isA' :isB='isB' />
		<section class="groups">
      <div class="everyGroups borderBox" v-for="(item,$index) in groupsData">
        <a class="borderBox" :class="{groupsCur: $index==indexGroup}"   @click="toggleTab(item.group, $index)" href="javascript:;">{{item.name}}</a>
      </div>
		</section>
		<div class="content">

			<underWay :is="currentTab"  :fightData='fightData' keep-alive></underWay>

		</div>
	</div>
</template>

<script>
  import Wxt from '../../assets/js/WXUtil'
	import groups from '../../components/myGroups/groups'
	import underWay from '../../components/myGroups/underWay'
	import offeredSuccess from '../../components/myGroups/offeredSuccess'
	import collageFailure from '../../components/myGroups/collageFailure'
  import axios from 'axios'
	export default {
		name: 'fightGroups',
		components: {
			'groups': groups,
			'underWay': underWay,
			'offeredSuccess': offeredSuccess,
			'collageFailure': collageFailure,

		},
		data() {
			return {
				isA: false,
				isB: true,
				currentTab: 'underWay',
        groupsData:[
          {"name":"参团进行中","group":"underWay"},
          {"name":"参团成功","group":"offeredSuccess"},
          {"name":"参团失败","group":"collageFailure"}
        ],
        "indexGroup":"0",
        fightData:''

			}
		},
    mounted () {

      //微信鉴权
      let storeId = 'bd9164c8-aa81-4303-9164-c8aa817303a7'
      let shopId = 'a7fce96a-0126-4b05-bce9-6a01268b0534'
      Wxt.verify(storeId, shopId)

    },
    async asyncData() {
          	let res = await axios.post('http://emcs.quanyou.com.cn/spellapi/getMyJoin',{"state":1,	"buyerId":20180313002,	"pageIndex":1,	"pageSize":10,	"storeId":"070e6814-c1cc-4243-8e68-14c1cc624388",	"shopId":"a7fce96a-0126-4b05-bce9-6a01268b0534"})
			    	return { fightData:res.data.data}

    },
		methods: {
          toggleTab(tab, $index) {
                  this.currentTab = tab;
                  this.indexGroup = $index;
                  if($index==0){
                            axios.post('../spell/myOffered',{"state":1,"buyerId":20180313002,	"pageIndex":1,	"pageSize":10,	"storeId":"070e6814-c1cc-4243-8e68-14c1cc624388",	"shopId":"a7fce96a-0126-4b05-bce9-6a01268b0534"}).then(({ data }) => {
                              this.fightData=data.data
                            })
                  }else if($index==1){
                          axios.post('../spell/myOffered',{"state":2,"buyerId":20180313002,	"pageIndex":1,	"pageSize":10,	"storeId":"070e6814-c1cc-4243-8e68-14c1cc624388",	"shopId":"a7fce96a-0126-4b05-bce9-6a01268b0534"}).then(({ data }) => {
                            this.fightData=data.data
                          })
                  }else {
                          axios.post('../spell/myOffered',{"state":3,"buyerId":20180313002,	"pageIndex":1,	"pageSize":10,	"storeId":"070e6814-c1cc-4243-8e68-14c1cc624388",	"shopId":"a7fce96a-0126-4b05-bce9-6a01268b0534"}).then(({ data }) => {
                            this.fightData=data.data
                          })
                  }
          }
		}

	}
</script>

<style>

</style>
