<template>
  <div class="wrapper min-w-full">
    <div class="label text-white bg-gray-600 min-w-full">
      <h3 class="py-2 px-2"><span class="player-name">{{ player1.username }}</span> / <span
        class="player-name">{{ player2.username }}</span></h3>
    </div>
    <div class="container flex  flex-col lg:flex-row">
      <div class="flex-grow sm:min-w-full relative" style="min-width: 50%; min-height:100%;">
        <Ide  class="absolute h-full"/>
      </div>
      <div class="separator hidden lg:block min-h-full min-w-screen bg-gray-600 rounded-sm"></div>
      <div class="flex-grow-0 sm:min-w-full flex-shrink" style="min-width: 38%">
        <DiscordChat class="min-h-full"/>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser } from '@/utils/api'
import Ide from '@/components/Ide'
import DiscordChat from '@/components/DiscordChat'

export default {
  name: 'Battle',
  components: {
    Ide,
    DiscordChat
  },
  data () {
    return {
      player1: null,
      player2: null,
      spectator: []
    }
  },
  methods: {
    async loadUsers () {
      try {
        if (this.$route.params.player1 === this.$route.params.player2) {
          window.location = 'http://localhost:8080/'
          return
        }
        const player1 = await getUser(this.$route.params.player1)
        const player2 = await getUser(this.$route.params.player2)
        this.player1 = player1.data
        this.player2 = player2.data
      } catch (e) {
        window.location = 'http://localhost:8080/'
      }
    }
  },
  created () {
    this.loadUsers()
  }
}
</script>

<style scoped>
.label {
  min-height: 40px;
}

.player-name {
  color: #A4ADE9;
  font-weight: bold;
}
.separator {
  width: 8px;
}
</style>
