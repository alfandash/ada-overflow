<template>
<div class="container">
  <section id="navbar">
    <Navbar></Navbar>
  </section>
  <section id='content'>
    <div class="col col-md-12">
      <router-view></router-view>
    </div>
  </section>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  },
  computed: {
    ...mapState({
      allQuestions: 'questionsAll'
    })
  },
  methods: {
    ...mapActions([
      'getAllQuestions'
    ])
  },
  created () {
    this.getAllQuestions()
  }
}
</script>

<style>

</style>
