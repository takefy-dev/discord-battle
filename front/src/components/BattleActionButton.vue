<template>
  <button type="button" class="button flex">{{text}}</button>
</template>

<script>
export default {
  name: 'BattleActionButton',
  props: ['text']
}
</script>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: .6rem .9rem;
  border: 0;
  background-color: #323F4A;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
  transition: transform .3s ease;
}
.button:hover {
  transform: scale(1.1)
}
</style>
