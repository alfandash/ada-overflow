<template>
  <div>
  <form class="form-horizontal">
    <transition name="fade">
      <div class="alert alert-dismissible alert-success" v-if="alert">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4>{{alertMsg}}</h4>
      </div>
    </transition>
    <fieldset>
      <div class="form-group">
        <label for="textArea" class="col-lg-2 control-label">Your Answer</label>
        <div class="col-lg-10">
          <textarea class="form-control" rows="3" id="textArea" v-model="content" required></textarea>
          <span class="help-block">Tanya lah pertanyaan yang tidak bisa di jawab oleh hati anda</span>
        </div>
      </div>
      <div class="form-group">
        <div class="col-lg-5 col-lg-offset-2">
          <button type="reset" class="btn btn-default btn-xs">Cancel</button>
          <button type="submit" class="btn btn-primary btn-xs" @click.prevent="addAnswer()">Submit</button>
        </div>
      </div>
    </fieldset>
  </form>
  </div>
</template>

<script>
export default {
  props: ['idQuestion'],
  data () {
    return {
      content: '',
      alert: false,
      alertMsg: ''
    }
  },
  methods: {
    addAnswer () {
      this.$http.post('/answers?id_question=' + this.idQuestion, {content: this.content}, {
        headers: {
          token: localStorage.getItem('ada-overflow')
        }
      })
      .then(({ data }) => {
        this.alert = true
        if (data.n === 1) {
          this.alertMsg = 'Jawaban berhasil di add'
          this.$emit('status', true)
          this.content = ''
        } else {
          this.alertMsg = 'gagal delete check codingan'
        }
      })
    }
  },
  watch: {
    alert: function (val) {
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
