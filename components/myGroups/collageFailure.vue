<template>
	  <div class="everyGroup">
            <section class="itemGroup" v-for="(item,$index) in fightData.content" >
                  <div class="groupMsg clean">
                      <div class="leftImg _left">
                          <img :src="item.smPic " alt="商品"/>
                      </div>
                      <div class="rightText _left">
                          <p class="groupTitle">{{item.title}}</p>
                          <p class="groupTime">时间：{{item.startTime | timeFilters}} - {{item.endTime | timeFilters}}</p>
                          <p class="groupPrice">
                              <i class="g-red">活动到期</i>
                          </p>
                      </div>
                  </div>
                  <div class="height18"></div>
            </section>
            <div class="payment clean" v-if="hideBtn">
                <a class="payBtn _right" href="javascript:;">继续拼团</a>
            </div>
        </div>
</template>

<script>
	export default {
		  name: 'collageFailure',
		  props:["hideBtn","fightData"],
		  data () {
		      return {

		      }
		  },
      filters: {
              timeFilters: function (time) {
                        let date  =new Date(time);
                        let arrTime={
                          'y':date.getFullYear(),
                          'm': (date.getMonth()+1) < 10 ? "0" + (date.getMonth()+1) : (date.getMonth()+1),
                          'd':date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
                        }
                      return time=arrTime. y+'-'+arrTime.m+'-'+arrTime.d
              }
      },
		    methods:{

        }


    }
</script>

<style>
@import "../../assets/css/base.css";
@import "../../assets/css/myGroups.css";
</style>
