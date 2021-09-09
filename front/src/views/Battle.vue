<template>
  <div class="wrapper min-w-full">
    <!--    <div class="label flex justify-between text-white bg-gray-600 min-w-full">-->
    <!--      <h3 class="py-2 px-2"><span class="player-name">{{ player1.username }}</span> / <span-->
    <!--        class="player-name">{{ player2.username }}</span></h3>-->
    <!--      <h3 class="py-2 px-2">Output: </h3>-->
    <!--    </div>-->
    <div class="flex flex-col lg:grid lg:grid-cols-3 lg:divide-x-4 divide-gray-600 dynamic-height">
      <div class="dynamic-height" style="display: flex; flex-direction: column;">
        <div class="item-header bg-back">
          <h3 class="py-2 px-2"><span class="player-name">{{ player1.username }}</span> / <span
            class="player-name">{{ player2.username }}</span></h3>
          <div class="extra-header">{{ contentLength }} characters</div>
        </div>
        <Ide :lang="ideLang" @new-lang="updateLang" @new-content="updateContent" :content="content"
             class="dynamic-height flex-grow"/>
        <div class="btn-group flex-grow">
          <BattleActionButton :text="$t('battle.test')"/>
          <BattleActionButton :text="$t('battle.change-lang')"/>
          <BattleActionButton :text="$t('battle.submit')"/>
        </div>
      </div>
      <div class="resize-x dynamic-height">
        <div class="item-header bg-back">
          <h3 class="py-2 px-2">Test</h3>
          <div class="extra-header uppercase">{{ ideLang }}</div>
        </div>
        <DiscordChat class="dynamic-height" style="max-height: calc(100vh - 7rem)"/>
      </div>
      <div class="bg-red dynamic-height">
        <div class="item-header  bg-back">
          <h3 class="py-2 px-2">Output</h3>
          <div class="extra-header">Remove // before submitting</div>
        </div>
        <h1>test</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser } from '@/utils/api'
import Ide from '@/components/Ide'
import DiscordChat from '@/components/DiscordChat'
import BattleActionButton from '@/components/BattleActionButton'

export default {
  name: 'Battle',
  components: {
    Ide,
    DiscordChat,
    BattleActionButton
  },
  data () {
    return {
      player1: null,
      player2: null,
      spectator: [],
      content: '',
      contentLength: 143,
      ideLang: 'javascript'
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
    },
    updateLang (lang) {
      this.ideLang = lang
    },
    updateContent (content) {
      this.content = content
      this.contentLength = content.length
    }
  },
  created () {
    this.content = this.$t('ide.default')
    this.loadUsers()
  }
}
</script>

<style scoped>
.player-name {
  color: #A4ADE9;
  font-weight: bold;
}

.dynamic-height {
  height: calc(100vh - 6.5rem);
  width: 100%

}

.btn-group {
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(120px, auto));
  justify-content: flex-end;
  grid-gap: 1rem;
  gap: 1rem;
  align-items: center;
  background-color: #272A36
}

.item-header {
  color: #CBD1E1;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  height: 30px;
  border-bottom: 1px solid #323F4A;
}

.extra-header {
  flex-grow: 1;
  text-align: right;
  color: #A1B3C6;
  text-transform: none;
  font-weight: 500;
  margin: 1rem;
}

button {
  min-height: 0 !important;
}
</style>
