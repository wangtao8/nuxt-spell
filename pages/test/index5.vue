<template>
  <ul>
    <li v-for="(item, index) in titles" :key="index">
      <div class="tops"></div>
      <div>{{item.title}}</div>
    </li>
  </ul>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        titles: []
      }
    },
    async asyncData () {
      return axios.all([
        axios.get('http://127.0.0.1:3222/api/gettest')
      ])
        .then(axios.spread(function (title) {
          console.log(title.data.data)
          return {
            titles: title.data.data
          }
        }))
    }
  }
</script>
<style>
  ul{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  li{
    list-style:none;
    width: 300px;
    background: red;
    margin-top: 10px;
  }
  div .tops{
    height: 200px;
    background: green;
  }
</style>
