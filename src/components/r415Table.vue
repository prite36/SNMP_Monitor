<template>
  <div class="">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.1/css/bulma.min.css" />
    <table class="table">
      <thead>
    <tr>
      <th><abbr >Pos</abbr></th>
      <th><abbr >Interface</abbr></th>
      <th><abbr >Port</abbr></th>
      <th><abbr >In Octet</abbr></th>
      <th><abbr >Out Octet</abbr></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(data, index) in mib">

        <th>{{index}}</th>
        <td>{{data.int}}</td>
        <td>{{data.port}}</td>
        <td>{{data.inOctet}}</td>
        <td>{{data.outOctet}}</td>

    </tr>
  </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['mib'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
