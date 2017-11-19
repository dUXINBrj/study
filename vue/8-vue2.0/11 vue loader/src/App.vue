<template>
  <div id="app">
    <h1 v-if="$route.path!='/news'">{{ msg }}</h1>
    <!-- 切换路由后隐藏组件 -->
    <ul>
      <li><router-link to="/home">首页</router-link></li>
      <li><router-link to="/news">新闻</router-link></li>
    </ul>
    <div>
      <transition enter-active-class='animated bounceInLeft' leave-active-class='animated bounceOutRight'>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
