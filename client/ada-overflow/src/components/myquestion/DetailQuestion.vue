<template>
<div>
  <div class="jumbotron">
    <h2>{{question.title}} </h2>
    <p style="white-space: pre-line">{{question.content}}</p>
    <small>By {{question.id_user[0].username}}</small>
  </div>
  <ul class="list-group">
    <transition name="fade">
      <div class="alert alert-dismissible alert-success" v-if="alert">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4>{{alertMsg}}</h4>
      </div>
    </transition>
    <li class="list-group-item" v-for="(answer, index) in question.answer" :key="index">
      <h4>{{answer.content}}</h4>
      <small>By {{answer.id_user.username}}</small>
      <button class="btn btn-xs btn-danger" type="button" @click.prevent="destroy(answer._id)" v-if="answer.id_user._id === user.id">Delete</button>
    </li>
  </ul>
  <div class="panel">
    <div class="panel-body">
      <AnswerQuestion :idQuestion="id" @status="getQuestion()"></AnswerQuestion>
    </div>
  </div>
</div>
</template>

<script>
import AnswerQuestion from '@/components/myquestion/AnswerQuestion'
import { mapState } from 'vuex'
export default {
  props: ['id'],
  components: {
    AnswerQuestion
  },
  data () {
    return {
      question: '',
      alert: false,
      alertMsg: ''
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
    },
    destroy (id) {
      this.$http.delete('/answers?id_answer=' + id, {
        headers: {
          token: localStorage.getItem('ada-overflow')
        }
      })
      .then(({ data }) => {
        this.alert = false
        this.alert = true
        if (data.n === 1) {
          this.alertMsg = 'Answer berhasil di delete'
        } else {
          this.alertMsg = 'gagal delete check codingan'
        }
      })
      .catch(err => {
        this.alert = false
        this.alert = true
        this.alertMsg = err
      })
    }
  },
  created () {
    this.getQuestion()
  },
  computed: {
    ...mapState({
      user: 'userLogin'
    })
  },
  watch: {
    id: function (val) {
      this.getQuestion()
      this.alert = false
    },
    alertMsg: function (val) {
      this.getQuestion()
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */
{
  opacity: 0
}
</style>
