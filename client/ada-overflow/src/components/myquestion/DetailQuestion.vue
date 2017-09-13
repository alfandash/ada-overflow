<template>
<div>
  <div class="panel panel-primary">
    <div class="panel-heading">
      <h4>{{question.title}} </h4>
      <transition name="fade">
        <div class="alert alert-dismissible alert-success" v-if="alert">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <h4>{{alertMsg}}</h4>
        </div>
      </transition>
    </div>
    <div class="panel-body well">
      <p style="white-space: pre-line">{{question.content}}</p>
      <small>By {{question.id_user[0].username}}</small>
    </div>
    <div class="panel-footer well well-sm">
      <ul class="pagination pagination-sm">
        <li><a href="#" class="disabled"> Votes here</a></li>
        <li v-bind:class="{'disabled': downVoted}"><a href="#" @click.prevent="vote('down')">-</a></li>
        <li class="disabled"><a href="#">{{votesAmount}}</a></li>
        <li v-bind:class="{'disabled': upVoted}"><a href="#" @click.prevent="vote('up')">+</a></li>
      </ul>
    </div>
  </div>
  <ul class="list-group">
    <li class="list-group-item" v-for="(answer, index) in question.answer" :key="index">
      <AnswerList :answerProps="answer" @status="getQuestion()"></AnswerList>
    </li>
  </ul>
  <div class="panel">
    <div class="panel-body">
      <AnswerQuestion :idQuestion="id" @status="getQuestion()"></AnswerQuestion>
    </div>
  </div>
  <!-- {{question}} -->
</div>
</template>

<script>
import AnswerQuestion from '@/components/myquestion/AnswerQuestion'
import AnswerList from '@/components/myquestion/AnswerList'
import { mapState } from 'vuex'
export default {
  props: ['id'],
  components: {
    AnswerQuestion,
    AnswerList
  },
  data () {
    return {
      question: {
        votedup: [],
        voteddown: [],
        id_user: [{
          username: ''
        }]
      },
      alert: false,
      alertMsg: ''
    }
  },
  methods: {
    vote (val) {
      this.$http.post('/questions/vote' + val + '?id_question=' + this.id, {}, {
        headers: {
          token: localStorage.getItem('ada-overflow')
        }
      })
      .then(({ data }) => {
        this.alert = false
        this.alert = true
        console.log(data)
        if (data.n === 1) {
          this.alertMsg = 'Question berhasil ' + val + 'vote'
        } else {
          this.alertMsg = 'gagal vote check codingan'
        }
      })
      .catch(err => {
        this.alert = false
        this.alert = true
        this.alertMsg = err
      })
    },
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
    }),
    votesAmount () {
      // console.log('ini id pengguna', this.question.votedup.length)
      return Math.abs(this.question.votedup.length - this.question.voteddown.length)
    },
    upVoted () {
      return this.question.votedup.includes(this.$store.state.userLogin.id)
    },
    downVoted () {
      return this.question.voteddown.includes(this.$store.state.userLogin.id)
    }
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
