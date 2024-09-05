<template>
  <NuxtLink class="IndexButton" to="/">
    <img alt="Index" src="/images/calendar.svg" />
  </NuxtLink>
</template>

<style lang="sass">
.IndexButton
  > img
    width: 42px
    transition: var(--trans)

    &:hover
      rotate: 3deg
      scale: 1.05
</style>
