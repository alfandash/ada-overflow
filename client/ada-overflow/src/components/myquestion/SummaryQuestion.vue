<template>
  <div>
     <transition name="fade">
      <div class="alert alert-dismissible alert-success" v-if="alert">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4>{{alertMsg}}</h4>
      </div>
    </transition>
    <table class="table table-striped table-hover ">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(question, index) in allQuestionsConvertDate" :key="question._id">
          <td>{{index + 1}}</td>
          <td><router-link :to="'/myquestion/' + question._id">
            {{question.title}}
          </router-link></td>
          <td>{{question.created_at}}</td>
          <td>
            <button type="button" class="btn btn-xs btn-info" data-toggle="modal" data-target="#myModal" @click.prevent="editAction(question._id,question.title,question.content)">Edit</button>
            <button class="btn btn-xs btn-danger" type="button" @click.prevent="destroy(question._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    
  <div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">Edit Question</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal">
            <fieldset>
              <div class="form-group">
                <label for="inputEmail" class="col-lg-2 control-label">Title</label>
                <div class="col-lg-10">
                  <input class="form-control" id="inputEmail" placeholder="Title" type="text" v-model="editQuestion.title" required>
                </div>
              </div>
              <div class="form-group">
                <label for="textArea" class="col-lg-2 control-label">Your Question</label>
                <div class="col-lg-10">
                  <textarea class="form-control" rows="3" id="textArea" v-model="editQuestion.content" required></textarea>
                  <span class="help-block">Tanya lah pertanyaan yang tidak bisa di jawab oleh hati anda</span>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateQuestion()">Save changes</button>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      alert: false,
      alertMsg: '',
      editQuestion: {
        id: '',
        title: '',
        content: ''
      }
    }
  },
  methods: {
    editAction (id, title, content) {
      this.editQuestion.id = id
      this.editQuestion.title = title
      this.editQuestion.content = content
    },
    updateQuestion () {
      this.alert = false
      this.$http.put('/questions?id_question=' + this.editQuestion.id, {
        title: this.editQuestion.title,
        content: this.editQuestion.content
      }, {
        headers: {
          token: localStorage.getItem('ada-overflow')
        }
      })
      .then(({ data }) => {
        this.alert = true
        if (data.n === 1) {
          this.alertMsg = 'Pertanyaan berhasil di edit'
        } else {
          this.alertMsg = 'gagal delete check codingan'
        }
      })
    },
    destroy (id) {
      this.$http.delete('/questions?id_question=' + id, {
        headers: {
          token: localStorage.getItem('ada-overflow')
        }
      })
      .then(({ data }) => {
        this.alert = true
        if (data.n === 1) {
          this.alertMsg = 'Pertanyaan berhasil di hapus'
        } else {
          this.alertMsg = 'gagal delete check codingan'
        }
      })
    },
    ...mapActions([
      'getUserLoginQuestions'
    ])
  },
  computed: {
    ...mapState({
      allQuestion: 'userLoginQuestions'
    }),
    allQuestionsConvertDate () {
      let sorted = this.allQuestion.map((x) => {
        // x.created_at = Date(x.created_at)
        return x
      })
      return sorted
    }
  },
  watch: {
    alertMsg: function (val) {
      let token = localStorage.getItem('ada-overflow')
      this.getUserLoginQuestions(token)
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
