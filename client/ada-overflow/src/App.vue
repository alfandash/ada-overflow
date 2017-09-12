<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'getUserLogin',
      'getUserLoginQuestions'
    ])
  },
  computed: {
    ...mapState({
      user: 'userLogin'
    })
  },
  created () {
    let token = localStorage.getItem('ada-overflow')
    this.getUserLogin(token)
    this.getUserLoginQuestions(token)
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
