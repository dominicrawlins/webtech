<template>
  <div id="app">
      <toolbar />

      <main>
          <router-view></router-view>
      </main>
  </div>
</template>
<script>
import Toolbar from '@/components/Toolbar.vue'
export default {
  name: 'app',
  components: {
    Toolbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
