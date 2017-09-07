<template>
  <section class="register">
    <div class="text-center">
      <div class="col-md-6">
        <h2><strong>Register</strong> Here:</h2>
        <transition name="fade">
          <div class="status" v-if="status">
              <h3>{{error_msg}}</h3>
          </div>
        </transition>
        <div class="panel-body vcenter">
          <form class="form-signin" action="#" method="post" @submit.prevent="registeruser">
            <div class="form-group">
              <input type="text" name="username" class="form-control input-sm" placeholder="Username" v-model="register.username">
            </div>
            <div class="form-group">
              <input type="email" name="email" class="form-control input-sm" placeholder="Email" v-model="register.email">
            </div>
            <div class="form-group">
              <input type="password" name="password" class="form-control input-sm" placeholder="Password" v-model="register.password">
            </div>
            <input type="submit" value="Register" class="btn btn-info">
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      register: {
        password: '',
        email: '',
        username: ''
      },
      status: false,
      error_msg: ''
    }
  },
  methods: {
    registeruser () {
      this.error_msg = ''
      this.status = false
      this.$http.post('/users', {
        username: this.register.username,
        email: this.register.email,
        password: this.register.password
      })
      .then(({data}) => {
        if (!data.hasOwnProperty('errors')) {
          this.status = true
          this.error_msg = data.message
        } else {
          this.status = true
          this.error_msg = data._message
        }
        if (data.hasOwnProperty('errmsg')) {
          console.log('masuk')
          this.status = true
          this.error_msg = 'Email atau username sudah digunakan'
        }
        console.log(data.hasOwnProperty('errmsg'))
      })
      .catch(({message}) => {
        this.status = true
        this.error_msg = message
      })
    }
  }
}
</script>

<style scoped>
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
