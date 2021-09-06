<template>
  <header>
    <Navbar/>
  </header>

  <router-view/>

</template>

<script>
import Navbar from './components/Navbar'

export default {
  components: { Navbar }
}
</script>

<style>
#nav {
  padding: 30px;
}

* {
  background-color: #161F2D;
  font-family: IBM Plex Mono,Menlo,DejaVu Sans Mono,Lucida Console,monospace;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
