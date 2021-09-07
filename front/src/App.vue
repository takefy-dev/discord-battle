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
* {
  font-family: IBM Plex Mono,Menlo,DejaVu Sans Mono,Lucida Console,monospace;
}
body {
  background-color: #161F2D;

}
</style>
