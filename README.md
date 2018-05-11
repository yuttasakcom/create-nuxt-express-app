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
      { src: 'https://code.jquery.com/jquery-3.2.1.min.js' }
    ]
```
