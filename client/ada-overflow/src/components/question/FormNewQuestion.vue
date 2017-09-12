<template>
  <div class="row">
    <div class="col col-md-12">
      <form class="form-horizontal" @submit.prevent="createQuestion">
        <fieldset>
          <div class="form-group">
            <transition name="fade">
              <div class="alert alert-dismissible alert-success col-lg-offset-2 col-lg-5" v-if="showAlert">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <h4>{{alertMsg}}</h4>
                <p>Silahkan check pertanyaan anda disini <router-link to="/myquestion">My Question</router-link></p>
              </div>
            </transition>
          </div>
          <div class="form-group">
            <label for="inputEmail" class="col-lg-2 control-label">Title</label>
            <div class="col-lg-5">
              <input class="form-control" id="inputEmail" placeholder="Title" type="text" v-model="question.title" required>
            </div>
          </div>
          <div class="form-group">
            <label for="textArea" class="col-lg-2 control-label">Your Question</label>
            <div class="col-lg-5">
              <textarea class="form-control" rows="3" id="textArea" v-model="question.content" required></textarea>
              <span class="help-block">Tanya lah pertanyaan yang tidak bisa di jawab oleh hati anda</span>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-5 col-lg-offset-2">
              <button type="reset" class="btn btn-default">Cancel</button>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      question: {
        title: '',
        content: ''
      },
      showAlert: false,
      alertMsg: ''
    }
  },
  methods: {
    ...mapActions([
      'getUserLoginQuestions'
    ]),
    createQuestion () {
      this.$http.post('/questions', {
        title: this.question.title,
        content: this.question.content
      }, {
        headers: {
          token: localStorage.getItem('ada-overflow')
        }
      })
      .then(({ data }) => {
        console.log(data)
        if (!data.hasOwnProperty('error')) {
          this.question.title = ''
          this.question.content = ''
          this.showAlert = true
          this.alertMsg = 'Question berhasil di tambahkan'
        } else {
          this.showAlert = true
          this.alertMsg = data
        }
      })
      .catch((error) => {
        this.showAlert = true
        this.alertMsg = error
      })
    },
    cancel () {
      this.question.title = ''
      this.question.content = ''
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
