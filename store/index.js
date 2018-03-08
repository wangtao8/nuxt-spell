import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// vuex应用示例
const store = () => new Vuex.Store({
  state: {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    activityId: ''
  },
  mutations: {
    increment (state) {
      let timeId = setInterval(() => {
        if (state.day === 0 && state.hour === 0 && state.minute === 0 && state.second === 0) {
          clearInterval(timeId)
        } else {
          state.second--
          if (state.day > 0 || state.hour > 0 || state.minute > 0 || state.second > 0) {
            if (state.second < 0) {
              state.second = 59
              if (state.hour !== 0 && state.minute === 0) {
                state.hour--
                state.minute = 59
              } else if (state.hour !== 0 && state.minute !== 0) {
                state.minute--
              } else if (state.hour === 0 && state.minute !== 0) {
                state.minute--
              } else if (state.hour === 0 && state.minute === 0) {
                state.day--
                state.hour = 23
                state.minute = 59
              }
            }
          } else {
            clearInterval(timeId)
          }
        }
      }, 1000)
    }
  }
})

export default store
