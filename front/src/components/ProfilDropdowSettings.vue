<template>
  <div class="bg-gray-600 mb-2 ml-1">
    <router-link class="hover:underline" :to="href">
      <span>{{ text }}</span>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'ProfilDropdowSettings',
  props: ['text', 'href']
}
</script>

<style scoped>
span {
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
