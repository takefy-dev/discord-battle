<template>
  <div @click="active = !active"
       class="hidden md:block dropdown  relative inline-block bg-back hover:bg-secondary transition duration-300 ease-in-out text-white rounded-md px-7 py-3 uppercase">
    🌐 Change region
    <div
      class="dropdown-content -ml-6 mt-5 text-white absolute bg-primary transition duration-300 ease-in-out rounded-md px-7 py-3"
      :class="{'hidden': !active, 'block': active}">
      <language-switcher active-class="bg-primary underline" v-slot="{ links }"
                         tag="ul">
        <li :class="link.activeClass" class="bg-secondary" v-for="link in links" :key="link.langIndex">
          <a class="bg-secondary" :href="link.url">{{ link.langName }}</a>
        </li>
      </language-switcher>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LangSwitcher',

  data () {
    return {
      active: false
    }
  }
}
</script>

<style scoped>

.dropdown-content {
  min-width: 200px;
  z-index: 5;
}

</style>
