<template>
  <nav class="flex items-center p-3 mt-4">
    <h1 class="logo cursor-pointer text-secondary font-medium">DISCORDBattle</h1>
    <router-link to="/how-to-play"
                 class="hidden mx-4 sm:block bg-gray-600 hover:bg-secondary transition duration-300 ease-in-out text-white rounded-md px-7 py-3 uppercase">
      {{ $t('navbar.speedgame') }}
    </router-link>
    <LangSwicher/>
    <ul
      class="hidden sm:flex flex-1 text-white text-bold cursor-pointer justify-end items-center gap-5 uppercase text-sm">
      <router-link to="/how-to-play"
                   class="bg-gray-600 hover:bg-secondary transition duration-300 ease-in-out text-white rounded-md px-7 py-3 uppercase">
        {{ $t('navbar.how-to-play') }}
      </router-link>
      <button v-if="!isLogin" @click="login"
              class="bg-gray-600 hover:bg-secondary transition duration-300 ease-in-out text-white rounded-md px-7 py-3 uppercase">
        Sign In / Sign Up
      </button>
      <div
        class="profile-container bg-gray-600 flex items-center text-center hover:bg-secondary transition duration-300 ease-in-out text-white rounded-md px-7  py-3 uppercase"
        v-if="isLogin">
        <img class="rounded-full mx-2" :src="user.avatarLink">
        {{ `\n` + user.username }}
      </div>
    </ul>
    <div class="flex text-xs sm:hidden flex-1 justify-end">
      <Menu class="text-2xl text-bold"/>
    </div>
  </nav>
</template>

<script>
import { Menu } from 'mdue'
import { getUser } from '@/utils/api'
import LangSwicher from '@/components/LangSwicher'
export default {
  name: 'Navbar',
  components: {
    Menu,
    LangSwicher
  },
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    redirect (link) {
      window.open(link)
    },
    login () {
      window.open('https://discord.com/api/oauth2/authorize?client_id=884363092513939457&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fdiscord%2Fredirect&response_type=code&scope=identify%20email')
    },
    async checkIfLogin () {
      const {
        status,
        data
      } = await getUser()
      if (status === 200) {
        this.isLogin = true
        this.user = data
        this.user.avatarLink = `https://cdn.discordapp.com/avatars/${this.user.discordId}/${this.user.avatar}?size=32`
      } else {
        this.isLogin = false
      }
      console.log(this.user)
    }
  },
  created () {
    this.checkIfLogin()
  }
}
</script>

<style scoped>

</style>
