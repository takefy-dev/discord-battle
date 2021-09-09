<template>
  <nav class="flex items-center p-3 mt-4">
    <h1 class="logo cursor-pointer text-secondary font-medium">DISCORDBattle</h1>
    <router-link to="/how-to-play"
                 class="hidden mx-4 md:block bg-back hover:bg-secondary transition duration-300 ease-in-out text-white rounded-md px-7 py-3 uppercase">
      {{ $t('navbar.speedgame') }}
    </router-link>
    <LangSwitcher/>
    <ul
      class="hidden md:flex flex-1 text-white text-bold cursor-pointer justify-end items-center gap-5 text-sm">
      <router-link to="/how-to-play"
                   class="bg-back hover:bg-secondary transition duration-300 ease-in-out text-white rounded-md px-7 py-3 uppercase">
        {{ $t('navbar.how-to-play') }}
      </router-link>
      <button v-if="!isLogin" @click="login"
              class="bg-back hover:bg-secondary transition duration-300 ease-in-out text-white rounded-md px-7 py-3 uppercase">
        Sign In / Sign Up
      </button>
      <div
        @click="profileDropdownActive=!profileDropdownActive"
        @mouseenter="displayAvatar = user.avatarLinkGif"
        @mouseleave="displayAvatar = user.avatarLinkPng"
        class="profile-container bg-back flex items-center text-center hover:bg-secondary transition duration-300 ease-in-out text-white rounded-md px-7  py-3"
        v-if="isLogin">
        <img class="rounded-full mx-2" :src="displayAvatar">
        <span class="username transition duration-300 ease-in-out bg-back font-bold">{{ user.username }}</span>
      </div>
      <div :class="{'hidden': !profileDropdownActive, 'visible': profileDropdownActive}"
           class="profile-settings bg-back absolute items-center mt-40 rounded-b-md">
        <div class="ml-1 pt-1">
          <ProfilDropdowSettings href="/profile" :text="`👤️ ${$t('navbar.profile-dropdown.profile')}`"/>
          <ProfilDropdowSettings href="/friends" :text="`👥 ${$t('navbar.profile-dropdown.friends')}`"/>
          <ProfilDropdowSettings href="/settings" :text="`⚙️ ${$t('navbar.profile-dropdown.settings')}`"/>
          <ProfilDropdowSettings @click="logoutUser" href="" :text="`🚪 ${$t('navbar.profile-dropdown.logout')}`"/>
        </div>
      </div>
    </ul>
    <div class="flex text-xs lg:hidden flex-1 justify-end">
      <Menu class="text-2xl text-bold"/>
    </div>
  </nav>
</template>

<script>
import { Menu } from 'mdue'
import { getUser, logout } from '@/utils/api'
import LangSwitcher from '@/components/LangSwitcher'
import ProfilDropdowSettings from '@/components/ProfilDropdowSettings'

export default {
  name: 'Navbar',
  components: {
    Menu,
    LangSwitcher,
    ProfilDropdowSettings
  },
  data () {
    return {
      isLogin: false,
      profileDropdownActive: false,
      displayAvatar: null
    }
  },
  methods: {
    redirect (link) {
      window.open(link)
    },
    login () {
      window.open('https://discord.com/api/oauth2/authorize?client_id=884363092513939457&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fdiscord%2Fredirect&response_type=code&scope=email%20identify')
    },
    async logoutUser () {
      const { status } = await logout()
      if (status === 200) {
        window.location.reload()
      }
    },
    async checkIfLogin () {
      const {
        status,
        data
      } = await getUser()
      if (status === 200) {
        this.isLogin = true
        this.user = data
        this.user.avatarLinkPng = `https://cdn.discordapp.com/avatars/${this.user.discordId}/${this.user.avatar}.png?size=32`
        this.user.avatarLinkGif = `https://cdn.discordapp.com/avatars/${this.user.discordId}/${this.user.avatar}.gif?size=32`
        this.displayAvatar = this.user.avatarLinkPng
      } else {
        this.isLogin = false
      }
    }
  },
  created () {
    this.checkIfLogin()
  }
}
</script>

<style scoped>

.profile-container:hover > .username {
  background-color: #A4ADE9;
}

.profile-settings {
  min-width: 171px;
}
</style>
