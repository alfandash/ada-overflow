import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Question from '@/components/Question'
import newQuestion from '@/components/NewQuestion'
import SummaryQuestion from '@/components/myquestion/SummaryQuestion'
import DetailQuestion from '@/components/myquestion/DetailQuestion'
import HighlighQuestions from '@/components/home/HighlightQuestions'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: HighlighQuestions
        },
        {
          path: ':id',
          component: DetailQuestion,
          props: true
        }
      ]
    },
    {
      path: '/myquestion',
      component: Question,
      children: [
        {
          path: '',
          component: SummaryQuestion
        },
        {
          path: ':id',
          component: DetailQuestion,
          props: true
        }
      ]
    },
    {
      path: '/create-question',
      component: newQuestion
    }
  ]
})
