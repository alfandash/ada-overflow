<template>
<div>
  <div class="panel panel-default">
    <div class="panel-heading">My Question Recent Added</div>
    <div class="panel-body">
      <p
      v-for="(question, index) in allQuestionsSortDate"
      :key="question._id">
      <router-link :to="'/myquestion/' + question._id">
         {{question.title}}
      </router-link></p>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      allQuestions: 'userLoginQuestions'
    }),
    allQuestionsSortDate () {
      return this.allQuestions.sort(function (a, b) {
        return Date(b.created_at) - Date(a.created_at)
      })
    }
  }
}
</script>

<style>

</style>
