<template>
<div class="container">
  <div class="row">
    <div class="col-md-12 text-center">
      <h1><strong>ADA:</strong> Over Flow</h1>
    </div>
    <section class="signin" id="signin">
      <div class="text-center">
        <div class="col-md-6">
          <h2><strong>Login</strong> Here:</h2>
          <transition name="fade">
            <div class="status" v-if="status">
                <h3>{{error_msg}}</h3>
            </div>
          </transition>
          <div class="panel-body vcenter">
            <form class="form-signin" action="#" method="post" @submit.prevent="loginuser">
              <div class="form-group">
                <input type="text" name="email" class="form-control input-sm" placeholder="Email" v-model="login.email">
              </div>
              <div class="form-group">
                <input type="password" name="password" class="form-control input-sm" placeholder="Password" v-model="login.password">
              </div>
              <input type="submit" value="Login" class="btn btn-primary">
            </form>
          </div>
        </div>
      </div>
    </section>
    <Register></Register>
  </div>
</div>
</template>

<script>
import Register from '@/components/Register'
export default {
  components: {
    Register
  },
  data () {
    return {
      login: {
        email: '',
        password: ''
      },
      status: false,
      error_msg: ''
    }
  },
  methods: {
    loginuser () {
      this.$http.post('/users/signin', {
        email: this.login.email,
        password: this.login.password
      })
      .then(({data}) => {
        if (!data.hasOwnProperty('errors')) {
          this.$router.push({ name: 'test' })
          localStorage.setItem('ada-overflow', data.token)
        }
        this.status = true
        this.error_msg = data.message
        console.log(data)
      })
      .catch(({message}) => {
        this.status = true
        this.error_msg = message
      })
    }
  }
}
</script>

<style>

.vcenter {
   display: inline-block;
   vertical-align: middle;
   float: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
