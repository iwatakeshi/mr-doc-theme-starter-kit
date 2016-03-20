import Vue from 'vue'
import Router from 'vue-router'
import App from './App'

Vue.use(Router)

const router = new Router({
  hashbang: false,
  root: '/'
})

router.map({
  '/': {
    component: Vue.extend({
      template: '<p>This is foo!</p>'
    })
  },
  '/api': {
    component: Vue.extend({
      template: '<div class="bar">' +
      '<h2>This is bar!</h2>' +
      '<a v-link="{ path: "api/", params: { id: 123 }}">Modules</a>' +
      '<router-view></router-view>' +
    '</div>'
    }),
    subRoutes: {
      '/:id': {
        name: 'module',
        component: Vue.extend({
          template: '<div class="foobar"' +
          '<p>This is foo bar!</p>' +
          '<router-view></router-view>' +
          '<div>'
        })
      }
    }
  }
})

/* eslint-disable no-new */
router.start(App, 'body')
