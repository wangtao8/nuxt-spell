<template>
  <div>
    <header class="header">
      <!--[myGroups,currGroups]-->
      <div :class="isA ? 'myGroups currGroups':'myGroups'" @click="myGroups">我的拼团</div>
      <div :class="isB ? 'myGroups currGroups':'myGroups'" @click="myOffered">我的参团</div>
    </header>
  </div>
</template>

<script>
  export default {
    name: 'groups',
    props:["isA",'isB'],
    data () {
      return {
        myAllSpell:''
      }
    },
    methods:{
      myGroups (){
        this.myAllSpell='1',
          location.href = '/myGroups'
        this.$emit('myGroups',[this.myAllSpell]);
      },
      myOffered(){
        this.myAllSpell='2',
          location.href = '/myOffered'
      }
    }
  }
</script>

<style>
  @import "../../assets/css/base.css";
  @import "../../assets/css/myGroups.css";
</style>
