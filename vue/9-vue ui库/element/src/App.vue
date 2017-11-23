<template>
  <div id="app">
    <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <router-view></router-view>    
    </transition>
  </div>
</template>

<script>
export default{
  name:'app',
}
</script>

<style>
#app{
  height: 100%
}
</style>
