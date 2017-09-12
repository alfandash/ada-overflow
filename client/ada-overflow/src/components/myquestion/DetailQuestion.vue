<template>
<div>
  <div class="jumbotron">
    <h2>{{question.title}} </h2>
    <p style="white-space: pre-line">{{question.content}}</p>
  </div>
  {{question}}
</div>
</template>

<script>
import AnswerQuestion from '@/components/myquestion/AnswerQuestion'
export default {
  components: {
    AnswerQuestion
  },
  props: ['id'],
  data () {
    return {
      question: ''
    }
  },
  methods: {
    getQuestion () {
      this.$http.get('/questions/' + this.id, {
        headers: {
          token: localStorage.getItem('ada-overflow')
        }
      })
      .then(({ data }) => {
        this.question = data[0]
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.getQuestion()
  },
  watch: {
    id: function (val) {
      this.getQuestion()
    }
  }
}
</script>

<style>

</style>
