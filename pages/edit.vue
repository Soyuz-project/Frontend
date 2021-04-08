<template>
  <div>
    <template v-if="!me">
      <div class="tr -td-pad-s -gap-s -center">
        <div class="td">
          <div v-if="!displayForm" class="-pad-s">
            <button
              @click="displayForm = 'register'"
              class="tr -reset -pad-m -b -b-s -bg-c-primary -gap-m -center -color-white -hvr-brightness -mv"
              style="width: 100%"
            >
              Nowe konto
            </button>
            <div class="space -gap-s"></div>
            <button
              @click="displayForm = 'login'"
              class="tr -reset -pad-m -b -b-s -bg-c-primary -gap-m -center -color-white -hvr-brightness -mv"
              style="width: 100%"
            >
              Zaloguj się
            </button>
          </div>
          <div v-else-if="displayForm == 'login'">
            <p>
              <label for="">Login</label>
              <input class="-pad-s -b -b-light-gray" type="text" v-model="form.login">
            </p>
            <p>
              <label for="">Password</label>
              <input class="-pad-s -b -b-light-gray" type="password" v-model="form.password">
            </p>
            <p class="tr -reset -td-pad-s -pad-s">
              <button @click="login" class="-b -b-s -pad-s -bg-c-primary -color-white -hvr-brightness" style="margin-right: 1rem;">Zaloguj</button>
              <button @click="displayForm = false" class="-b -b-s -pad-s -hvr-brightness">Wstecz</button>
            </p>
          </div>
          <div v-else-if="displayForm == 'register'">
            <p>
              <label for="">Email</label>
              <input class="-pad-s -b -b-light-gray" type="email" v-model="form.email">
            </p>
            <p>
              <label for="">Login</label>
              <input class="-pad-s -b -b-light-gray" type="text" v-model="form.login">
            </p>
            <p>
              <label for="">Password</label>
              <input class="-pad-s -b -b-light-gray" type="password" v-model="form.password">
            </p>
            <p class="tr -reset -td-pad-s -pad-s">
              <button @click="register" class="-b -b-s -pad-s -bg-c-primary -color-white -hvr-brightness" style="margin-right: 1rem;">Nowe konto</button>
              <button @click="displayForm = false" class="-b -b-s -pad-s -hvr-brightness">Wstecz</button>
            </p>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="row -pad-s">
        <!-- left column -->
        <div>
          <button class="-b -b-s -pad-s -bg-c-primary -color-white -hvr-brightness" style="width: 100%;" @click="getPages">Pages</button>
          <div class="space -gap-s"></div>
          <button class="-b -b-s -pad-s -bg-c-primary -color-white -hvr-brightness" style="width: 100%;" @click="getPosts">Posts</button>
          <div class="space -gap-s"></div>
          <button class="-b -b-s -pad-s -hvr-brightness" @click="logout" style="width: 100%;">Logout</button>
        </div>
        <!-- right column -->
        <div>
          <div v-if="displayCard == ''">
            <h3 style="padding-top: 0;">Jesteś na stronie edycji</h3>
          </div>
          <div v-else-if="displayCard != ''">
            <h3 v-text="getHeader(displayCard)" style="padding-top: 0;"></h3>
            <div class="space -gap-s"></div>
            <div v-for="page in this[displayCard]" :key="page.id">
              <button
                class="-b -b-s -pad-s -hvr-brightness"
                style="width: 100%; text-align: left;"
                v-text="page.name"
                @click="$router.push({name:'page',params: {slug:page.slug}})"
              ></button>
              <div class="space -gap-s"></div>
            </div>
            <!-- add new page -->
            <div>
              <button class="-b -b-s -pad-s -bg-c-primary -color-white -hvr-brightness" style="width: 100%;" @click="modal = true">Dodaj</button>
              <div class="space -gap-s"></div>
            </div>
          </div>
        </div>
      </div>
    </template>


    <div class="modal" v-if="modal">
      <div>
        <p>
          <label for="">Tytuł</label>
          <input class="-pad-s -b -b-light-gray" type="text" v-model="createForm.title">
        </p>
        <p>
          <label for="">Slug (unikalny)</label>
          <input class="-pad-s -b -b-light-gray" type="text" v-model="createForm.slug">
        </p>
        <div class="space -gap-s"></div>
        <p>
          <button class="-b -b-s -pad-s -hvr-brightness" style="width: 100%;" @click="modal = false">Anuluj</button>
        </p>
        <p>
          <button class="-b -b-s -pad-s -bg-c-primary -color-white -hvr-brightness" style="width: 100%;" @click="saveData">Zapisz</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { soyuzRouter } from '~/plugins/soyuz-actions-router'
import { S, store } from '~/plugins/soyuz-store-api'
import { local_push } from '~/plugins/soyuz-resolver'
import { storeRouter } from '~/plugins/soyuz-actions-router'
export default {
  data() {
    return {
      pages: [],
      posts: [],
      // me: JSON.parse(localStorage.getItem('soyuz-loged-user' || '{}')).id || null,
      me: null,
      displayForm: false,
      displayCard: '',
      form: {
        login: '',
        email: '',
        password: '',
      },
      createForm: {
        title: '',
        slug: ''
      },
      modal: false,
      sampleBlocks: [
        {
          "blockName": "core/paragraph",
          "attrs": {
            "tagName":"h2",
            "className": "-tight -left -middle",
            "content": "New post page"
          }
        },
        {
          "blockName": "core/paragraph",
          "attrs": {
            "tagName":"2",
            "className": "-tight -left -middle",
            "content": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, distinctio odio? Recusandae exercitationem quasi nemo!"
          }
        }
      ]
    }
  },
  mounted() {
    storeRouter(this.$route.query)
  },
  methods: {
    login() {
      this.$apollo.mutate({
        mutation: require('~/gql/mutation-login.gql'),
        variables: this.form,
      }).then((data) => {
        this.form.login = ''
        this.form.email = ''
        this.form.password = ''
        this.me = data.data.login.user.id
        this.$apolloHelpers.onLogin(data.data.login.jwt)
        // try {
        //   window.localStorage.setItem('soyuz-loged-user', JSON.stringify({ jwt: data.data.login.jwt, id: data.data.login.user.id }));
        // } catch {}
      }).catch()
    },
    register() {
      this.$apollo.mutate({
        mutation: require('~/gql/mutation-register.gql'),
        variables: this.form,
      }).then(({ data: { register: { jwt, user: { id } }}}) => {
        this.form.login = ''
        this.form.email = ''
        this.form.password = ''
        this.me = id
        this.$apolloHelpers.onLogin(jwt)
        // try {
        //   window.localStorage.setItem('soyuz-loged-user', JSON.stringify({ jwt, id }));
        // } catch {}
      }).catch()
    },
    logout() {
      this.$apolloHelpers.onLogout()
      this.me = null
    },
    saveData() {
      let query;
      switch(this.displayCard){
        case 'pages':
          query = require('~/gql/mutation-page.gql');
          break;
        case 'posts':
          query = require('~/gql/mutation-post.gql');
          break;
      }

      this.$apollo.mutate({
        mutation: query,
        variables: {
          ...this.createForm,
          blocks: this.sampleBlocks,
          user: this.me
        },
      }).then(({data}) => {
        switch(this.displayCard){
          case 'pages':
            this.pages.push({
              id: data.createPage.page.id,
              name: data.createPage.page.name,
              blocks: JSON.stringify(this.sampleBlocks),
              plugin: null,
              user: {
                id: this.me
              }
            })
            break;
          case 'posts':
            this.posts.push({
              id: data.createPost.post.id,
              name: data.createPost.post.name,
              blocks: JSON.stringify(this.sampleBlocks),
              user: {
                id: this.me
              }
            })
            break;
        }
        this.createForm = {title:'',slug:''}
        this.modal = false;
      }).catch()
    },
    getPages() {
      this.$apollo.query({
        query: require('~/gql/query-pages.gql'),
        variables: {
          where: {
            user: {
              id: this.me
            }
          }
        },
      }).then(({data: { pages }}) => {
        this.pages = pages
        this.displayCard = 'pages'
      }).catch()
    },
    getPosts() {
      this.$apollo.query({
        query: require('~/gql/query-posts.gql'),
        variables: {
          where: {
            user: {
              id: this.me
            }
          }
        },
      }).then(({data: { posts }}) => {
        this.posts = posts
        this.displayCard = 'posts'
      }).catch()
    },
    displayModal() {
      this.$router.push({ query: { rightpanel: 'login' } } )
    },
    getHeader(page) {
      let result = 'Brak aktywności.'
      switch(page) {
        case 'pages':
          result = 'Przeglądasz strony'
          break;
        case 'posts':
          result = 'Przeglądasz posty'
          break;
        default:
          result = 'Brak aktywności.'
      }
      return result
    }
  },
  watch: {
    pages(nextState) {
      if(nextState) {
        nextState.forEach((item) => {
          !store.soyuz_pages.some(x => x.slug === item.slug)
            local_push({source: 'pages', value: {
              name: item.name,
              slug: item.slug,
              type: 'page',
              blocks: item.blocks
            }});
        })
      }
      soyuzRouter.routerQuery({'tick':Math.random(10)});
    },
    posts(nextState) {
      if(nextState) {
        nextState.forEach((item) => {
          !store.soyuz_pages.some(x => x.slug === item.slug)
            local_push({source: 'post', value: {
              name: item.name,
              slug: item.slug,
              type: 'post',
              blocks: item.blocks
            }});
        })
      }
      soyuzRouter.routerQuery({'tick':Math.random(10)});
    }
  },
  apollo: {
    me: {
      query: require('~/gql/query-me.gql'),
      update: data => data.me.id
    }
  },
}
</script>


<style lang="css" scope>
  .row {
    display: grid;
    grid-template-columns: 15% calc(85% - 2rem);
    gap: 2rem;
  }

  .modal {
    position: fixed;
    max-width: 80vw;
    width: 100%;
    min-height: 50vh;
    max-height: 90vh;
    height: 100%;
    background: #fff;
    border-radius: 1rem;
    padding: 3rem;
    top: 5vh;
    left: 10vw;
    border: 1px solid #c4c4c4;
    box-shadow: 1rem 2rem 2rem #c4c4c4;
  }
</style>