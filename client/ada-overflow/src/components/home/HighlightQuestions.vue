<template>
  <div class="list-group">
    <!-- <articleSummary v-for="article in allArticles" :key="article._id" :article="article">
    </articleSummary> -->
    <router-link v-for="(question, index) in allQuestions" :to="'home/' + question._id" :key="index" class="list-group-item">
      <h3 class="list-group-item-heading">{{question.title}} </h3>
      <p class="list-group-item-text" style="padding:10px">{{question.content.substring(0,30)}}</p>
      <p><a class="btn btn-primary btn-sm">Learn more</a></p>
      <h5>by {{question.id_user[0].username}}</h5>
    </router-link>
    <!-- {{allQuestions}} -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      allQuestions: 'questionsAll'
    })
  }
}
</script>

<style>

</style>
