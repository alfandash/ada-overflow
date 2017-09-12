<template>
  <div class="container">
    <section id='navbar'>
      <Navbar></Navbar>
    </section>
    <section id='content'>
      <div class="row">
        <div class="col col-md-8">
          <router-view></router-view>
        </div>
        <div class="col col-md-4">
          <Sidebar></Sidebar>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/myquestion/Sidebar'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    Navbar,
    Sidebar
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      allQuestions: 'userLoginQuestions'
    })
  },
  methods: {
    ...mapActions([
      'getUserLoginQuestions',
      'getUserLogin'
    ])
  },
  created () {
    let token = localStorage.getItem('ada-overflow')
    this.getUserLogin(token)
    this.getUserLoginQuestions(token)
  }
}
</script>

<style>

</style>
