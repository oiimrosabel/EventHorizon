<template>
  <div class="ButtonsList">
    <slot></slot>
  </div>
</template>

<style lang="sass">
.ButtonsList
  display: flex
  flex-direction: row
  flex-wrap: wrap
  gap: 12px
  justify-content: center
  align-items: start
</style>
