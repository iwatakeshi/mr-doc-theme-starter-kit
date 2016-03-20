<template>
  <div id="app">
    <header>
        <top-nav-bar><top-nav-bar>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import TopNavBar from './components/TopNavBar'

export default {
  components: {
    TopNavBar
  }
}
</script>

<style>
html { font-family: 'Raleway', sans-serif; }
</style>
