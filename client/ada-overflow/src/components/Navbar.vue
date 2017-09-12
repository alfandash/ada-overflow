<template>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link class="navbar-brand" to="/home">Home</router-link>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
        <ul class="nav navbar-nav">
          <li>
            <router-link to="/myquestion">My Question</router-link>
          </li>
          <li>
            <router-link to="/create-question">Create Question</router-link>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">  
          <li><a href="#">Selamat datang {{user.username}}</a></li>
          <li><a href="#" @click.prevent="logoutUser">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      user: 'userLogin'
    })
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    logoutUser () {
      this.logout()
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>

</style>
