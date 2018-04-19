<template>
	  <div class="everyGroup">
            <section class="itemGroup" v-for="(item,$index) in fightData.content">
                  <div class="groupMsg clean">
                      <div class="leftImg _left">
                          <img :src="item.smPic " alt="商品"/>
                      </div>
                      <div class="rightText _left">
                          <p class="groupTitle">{{item.title}}</p>
                          <!--<p class="groupTime">时间：{{item.startTime | timeFilters}} - {{item.endTime | timeFilters}}</p>-->
                        <p class="groupTime">时间：{{item.startTime.replace(/-/g,  "/").substr(0,10)}} - {{item.endTime.replace(/-/g,  "/").substr(0,10)}}</p>
                          <p class="groupPrice">
                              <i class="g-red">{{dataDate}}</i>
                          </p>
                      </div>
                  </div>
                  <div class="height18"></div>
            </section>
            <!--<div class="payment clean" v-if="hideBtn">-->
                <!--<a class="payBtn _right" href="javascript:;">继续拼团</a>-->
            <!--</div>-->
        </div>
</template>
<script>
	export default {
		  name: 'collageFailure',
		  props:["hideBtn","fightData"],
		  data () {
		      return {
            shopId:'',
            storeId:'',
            activityId:'',
            dataDate:'',
            createTime:'',

		      }
		  },
    // created(){
    //   console.log("拼团失败页面信息：",this.fightData.content[0].createTime)
    //   let starttime=this.fightData.content[0].createTime
    //   let str=starttime.replace(/-/g,  "/");//转化成2017/5/17 00:00:00格式
    //   this.createTime=str.substr(0,10);
    //
    // },
    mounted (){
      this.shopId = sessionStorage.getItem('shopId')
      this.storeId = sessionStorage.getItem('storeId')
      this.activityId=sessionStorage.getItem('activityId')
      // console.log("获取首页信息",this.shopId,this.storeId,this.activityId);

      Date.prototype.format =function(format)
      {
        var o = {
          "M+" : this.getMonth()+1, //month
          "d+" : this.getDate(), //day
          "h+" : this.getHours(), //hour
          "m+" : this.getMinutes(), //minute
          "s+" : this.getSeconds(), //second
          "q+" : Math.floor((this.getMonth()+3)/3), //quarter
          "S" : this.getMilliseconds() //millisecond
        }
        if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
          (this.getFullYear()+"").substr(4- RegExp.$1.length));
        for(var k in o)if(new RegExp("("+ k +")").test(format))
          format = format.replace(RegExp.$1,
            RegExp.$1.length==1? o[k] :
              ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
      }

      let datadate=this.fightData.content[0].endTime
      for(var i=0;i<=datadate.length-1;i++){
        let newdate = new Date().format("yyyy-MM-dd hh:mm:ss");
         if(newdate<datadate){
           // console.log("111")
           this.dataDate='活动停用';
         }else{
           this.dataDate='活动到期';
         }

        // console.log("活动时间：",datadate)
        // console.log("当前时间：",newdate)
      }
    },
      // filters: {
      //         timeFilters: function (time) {
      //                   let date  =new Date(time);
      //                   let arrTime={
      //                     'y':date.getFullYear(),
      //                     'm': (date.getMonth()+1) < 10 ? "0" + (date.getMonth()+1) : (date.getMonth()+1),
      //                     'd':date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
      //                   }
      //                 return time=arrTime. y+'-'+arrTime.m+'-'+arrTime.d
      //         }
      // },
		    methods:{
          // botton:function () {
          //   let test=this.fightData.content
          //   for(var i=0;i<=test.length-1;i++){
          //     let aa={}
          //     aa=test[i].teamId
          //     this.teamId=aa
          //
          //   }
          //
          //   console.log("teameid的值：", this.teamId)
          //   console.log("teameid传值：",this.teamId)
          //   location.href="https://emcs.quanyou.com.cn/spell/boon?teamId="+this.teamId+"&shopId="+this.shopId+"&activityId="+this.activityId+"&storeId="+this.storeId
          // }

        }


    }
</script>

<style>
@import "../../assets/css/base.css";
@import "../../assets/css/myGroups.css";
</style>
