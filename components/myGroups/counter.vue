<template>
  <span >{{time}}</span>
</template>

<script>
  export default {
    name: "counter",
    data(){
      return {
        time: '',
      };
    },
    props: ['endtime'],
    created () {
			this.timeDiff(this.endtime)
      this.countDown(this.endtime)
    },
    methods:{
    	timeDiff(starttime){
	    		// 设置截止时间
	        let str=starttime.replace(/-/g,  "/");//转化成2017/5/17 00:00:00格式
	        let  endDate=new Date(str).getTime();
	        // 获取当前时间
				  let currentDate=new Date().getTime();
				   // 时间差
				  let time=endDate - currentDate
				  if(time>=0){
				  	      let  d=Math.floor(time/1000/60/60/24);
			            let  h = Math.floor(time/1000/60/60%24);
			            let m = Math.floor(time/1000/60%60);
			            let  s = Math.floor(time/1000%60);
			            h = h < 10 ? "0" + h : h;
			            m = m < 10 ? "0" + m : m;
			            s = s  < 10 ? "0" + s : s;
			            let endTime = '';
			            if(d > 0){
			              endTime =  d+'天:'+h+':'+m+':'+ s;
			            }
			            if(d <= 0 && h > 0 ){
			              endTime = h+':'+m+':'+ s;
			            }
			            if(d <= 0 && h <= 0){
			              endTime =m+':'+ s;
			            }
			             this.time = endTime;
				  }
    	},
      countDown(starttime){
        let self = this;
//         设置截止时间
        let str=starttime.replace(/-/g,  "/");//转化成2017/5/17 00:00:00格式
        let  endDate=new Date(str).getTime();
        var timer= setInterval(function () {
			          // 获取当前时间
			          let currentDate=new Date().getTime();
			          // 时间差
			          let time=endDate - currentDate
			          if(time>=0){
			            let  d=Math.floor(time/1000/60/60/24);
			            let  h = Math.floor(time/1000/60/60%24);
			            let m = Math.floor(time/1000/60%60);
			            let  s = Math.floor(time/1000%60);
			            h = h < 10 ? "0" + h : h;
			            m = m < 10 ? "0" + m : m;
			            s = s  < 10 ? "0" + s : s;
			            let endTime = '';
			            if(d > 0){
			              endTime =  d+'天:'+h+':'+m+':'+ s;
			            }
			            if(d <= 0 && h > 0 ){
			              endTime = h+':'+m+':'+ s;
			            }
			            if(d <= 0 && h <= 0){
			              endTime =m+':'+ s;
			            }
			            //将倒计时赋值到div中
			            self.time = endTime;
			          }else {
			            clearInterval(timer);
			          }
        },1000)
      }
    }
  }
</script>

<style scoped>
</style>
