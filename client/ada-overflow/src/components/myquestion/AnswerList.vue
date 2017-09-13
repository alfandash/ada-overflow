<template>
  <div>
    <transition name="fade">
      <div class="alert alert-dismissible alert-success" v-if="alert">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4>{{alertMsg}}</h4>
      </div>
    </transition>
    <h4 class="well well-sm">{{answer.content}}</h4>
    <small>By {{answer.id_user.username}}</small>
    <button class="btn btn-xs btn-danger" type="button" @click.prevent="destroy(answer._id)" v-if="answer.id_user._id === user.id">Delete</button>
    <div>
       <ul class="pagination pagination-sm">
          <li><a href="#" class="disabled"> Votes here</a></li>
          <li v-bind:class="{'disabled': downVoted}"><a href="#" @click.prevent="vote('down')">-</a></li>
          <li class="disabled"><a href="#">{{votesAmount}}</a></li>
          <li v-bind:class="{'disabled': upVoted}"><a href="#" @click.prevent="vote('up')">+</a></li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['answerProps'],
  data () {
    return {
      answer: {
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
  computed: {
    user () {
      return this.$store.state.userLogin
    },
    votesAmount () {
      // console.log('ini id pengguna', this.anwerProps.votedup.length)
      return this.answer.votedup.length - this.answer.voteddown.length
    },
    upVoted () {
      return this.answer.votedup.includes(this.$store.state.userLogin.id)
    },
    downVoted () {
      return this.answer.voteddown.includes(this.$store.state.userLogin.id)
    }
  },
  methods: {
    getAnswer () {
      this.answer = this.answerProps
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
        this.$emit('status', true)
        if (data.n === 1) {
          this.alertMsg = 'Answer berhasil di delete'
        } else {
          this.alertMsg = 'gagal delete check codingan'
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    vote (val) {
      this.$http.post('/answers/vote' + val + '?id_answer=' + this.answer._id, {}, {
        headers: {
          token: localStorage.getItem('ada-overflow')
        }
      })
      .then(({ data }) => {
        this.$emit('status', false)
        this.getAnswer()
        this.$emit('status', true)
        this.alert = false
        this.alert = true
        if (data.n === 1) {
          this.alertMsg = 'Answer berhasil ' + val + 'vote'
        } else {
          this.alertMsg = 'gagal vote check codingan'
        }
      })
      .catch(err => {
        console.log(err)
        this.alert = false
        this.alert = true
        this.alertMsg = err
      })
    }
  },
  created () {
    this.getAnswer()
  },
  watch: {
    answerProps: function (val) {
      this.getAnswer()
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
