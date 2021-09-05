<template>
  <nav class="flex items-center p-3 mt-4">
    <h1 class="logo text-secondary font-medium">DISCORDBattle</h1>
    <router-link to="/how-to-play" class="bg-gray-600 hover:bg-secondary transition duration-300 ease-in-out text-white rounded-md px-7 py-3 uppercase">
      {{$t('navbar.how-to-play')}}
    </router-link>
    <ul class="hidden sm:flex flex-1 text-white text-bold cursor-pointer justify-end items-center gap-5 uppercase text-sm">
      <router-link to="/how-to-play" class="bg-gray-600 hover:bg-secondary transition duration-300 ease-in-out text-white rounded-md px-7 py-3 uppercase">
        {{$t('navbar.how-to-play')}}
      </router-link>
      <router-link to="/login"
              class="bg-gray-600 hover:bg-secondary transition duration-300 ease-in-out text-white rounded-md px-7 py-3 uppercase">
         Sign In / Sign Up
      </router-link>
    </ul>
    <div class="flex text-xs sm:hidden flex-1 justify-end">
      <Menu class="text-2xl text-bold"/>
    </div>
  </nav>
</template>

<script>
import { Menu } from 'mdue'

export default {
  name: 'Navbar',
  components: {
    Menu
  },
  methods: {
    redirect (link) {
      window.open(link)
    }
  }
}
</script>

<style scoped>

</style>
