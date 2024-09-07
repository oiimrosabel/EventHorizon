<template>
  <NuxtLink class="IndexButton" to="/">
    <img alt="Index" src="/images/calendar.svg" />
  </NuxtLink>
</template>

<style lang="sass">
.IndexButton
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  > img
    transition: var(--trans)

    @media (min-width: 801px)
      width: 42px

    @media (max-width: 800px)
      width: 42px

    &:hover
      rotate: 3deg
      scale: 1.05
</style>
