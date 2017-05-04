<template>
  <div id="app">
      <r415-table :mib ="mib" :inFo ="inFo"></r415-table>
      <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import r415Table from './components/r415Table.vue'
export default {
  name: 'app',
  components: {
    r415Table
  },
  data () {
    return {
      inFo: [],
      mib: []
    }
  },
  mounted () {
    var vm = this
    setInterval(function () {
      axios.get('http://localhost:7001/415').then((response) => {
        vm.mib = response.data
      })
      axios.get('http://localhost:7001/name').then((response) => {
        vm.inFo = response.data
      })
    }, 5000)
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
