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
    async asyncData() {
          	let res = await axios.post('http://localhost:3222/api/myGroups',{"state":1})
			    	return { fightData:res.data.data}

    },
		methods: {
          toggleTab(tab, $index) {
                  this.currentTab = tab;
                  this.indexGroup = $index;
                  if($index==0){
                            axios.post('http://localhost:3222/api/myGroups',{"state":1}).then(({ data }) => {
                              this.fightData=data.data
                            })
                  }else if($index==1){
                          axios.post('http://localhost:3222/api/myGroups',{"state":2}).then(({ data }) => {
                            this.fightData=data.data
                          })
                  }else {
                          axios.post('http://localhost:3222/api/myGroups',{"state":3}).then(({ data }) => {
                            this.fightData=data.data
                          })
                  }
          }
		}

	}
</script>

<style>

</style>
