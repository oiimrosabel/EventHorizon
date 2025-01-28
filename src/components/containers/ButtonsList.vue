<template>
  <div class="ButtonsList">
    <slot />
  </div>
</template>

<style lang="sass">
.ButtonsList
  display: flex
  flex-direction: row
  flex-wrap: wrap
  gap: 8px
  justify-content: start
  align-items: start
</style>
