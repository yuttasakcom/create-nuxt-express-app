# create-nuxt-express-app

## Before Setup

```bash
$ cp .env.example .env
```

## Start Mongo

```bash
$ docker-compose up -d mongo
```

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev
```

## Docker Compose Setup

```bash
$ docker-compose up -d --build
```

## Note

```
* Pages
  |_ index.vue
  |_ users
     \_ _id
         \_index.vue <-- /users/:id

* Router
  * $route.params.id
  * validate(data) { return /^\d+$/.test(data.params.id)} <-- validate property in export default{}
  * this.$router.push()
  * nuxt-child

* Link
  * nuxt-link

* Layouts
  * <nuxt />
  * users.vue
  * layout: 'users' <-- layout property in export default{}
  * error.vue <-- overwrite nuxt error page

* Assets
  * assets
    \_ styles
    |  \_ main.css
    |_ images
  * css:[ '~/assets/styles/main.css' ] <-- nuxt.config.js

* Header <-- nuxt.config.js
  * link: [
      { rel: 'stylesheet', href: ''}
    ]
  * script: [
      { src: '' }
    ]

* Handling Data
  * asyncData(context, callback) { return {} } <-- property in export default {}
  * asyncData(context) { return new Promise((resolve, reject)=> resolve({loadedSomethink: []}))
      .then(data => data)
      .catch(err => context.error(err))
    } <-- property in export default {}
  * fetch(context) { return {} } <-- property in export default {}
    * context.store.commit('SET_SOMETHINK', data.loadedSomethink) <-- in then(data => {})

* Store
  * nuxtServerInit(vuexContext, context) {} <-- in actions
    * vuexContext.commit('SET_SOMETHINK', [])

* Client & Server Connecting
  * !process.client can use context.req <-- in nuxtServerInit

* Config
  * nuxt.config.js -> https://nuxtjs.org/guide/configuration
  * head: { title: 'title'} <-- property in export default {}
  * loadingIndicator: { name: 'circle', color: 'hexcode'} <-- in nuxt.config.js
    \_ mode: 'spa'
  * env: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000' <-- use process.env.baseUrl in client
    }
  * rootDir: '/my-app/'
  * router: {
      base: '/my-app/' or extendRoutes(routes, resolve) { path: '*', component: resolve(__dirname, 'pages/index.vue') }
    }
  * transition: { name: 'page' or 'fade', mode: 'out-in' }
  * serverMiddleware: [ bodyParser.json(), '~/api ]
  * generate: { routes: function() {
      return axios.get('url').then(res => {
        const routes = []
        for (const key in res.data) {
          routes.push(`/paths/${key}`)
        }
        return routes
      })
    }}

* Pluins
  |_ plugins
     \_ coreComponent.js
  * plugins: ["~plugins/coreComponent.js"] <-- in nuxt.config.js

* Modules
  * modules: [
      '@nuxtjs/axios
    ],
    axios: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000'
    } <-- use in nuxtServerInit := context.app.$axios.get('/path')
      <-- use in asyncData(context) { return this.$axios.$get('/path')}

* Middleware
  |_ middleware
     \_ auth.js
  * middleware: ['auth'] <-- property in export default {}
```

## Module should to learning more

* @nuxtjs/axios
* vue-socket.io
* js-cookie
