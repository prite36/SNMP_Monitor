<template>
  <div id="app">
      <input @click="test()" type="button" name="test" value="test">
      <r415-table :mib ="mib"></r415-table>
      <router-view></router-view>
  </div>
</template>

<script>
import r415Table from './components/r415Table.vue'
export default {
  name: 'app',
  components: {
    r415Table
  },
  data () {
    return {
      mib: ''
    }
  },
  methods: {
    test () {
      var vm = this
      this.axios.get('http://localhost:7001/415').then((response) => {
        vm.mib = response.data
        console.log(vm.mib)
      })
    }
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
