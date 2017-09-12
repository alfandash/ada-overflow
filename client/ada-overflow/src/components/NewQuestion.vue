<template>
  <div class="container">
    <section id='navbar'>
      <Navbar></Navbar>
    </section>
    <section id='content'>
      <FormNewQuestion></FormNewQuestion>
    </section>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar'
import FormNewQuestion from '@/components/question/FormNewQuestion'
export default {
  components: {
    Navbar,
    FormNewQuestion
  }
}
</script>

<style>

</style>
