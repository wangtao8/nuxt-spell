<template>
  <div @click="$store.commit('increment')">{{ $store.state.counter }}</div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    mounted () {

    }
  }
</script>
