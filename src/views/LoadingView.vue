<script lang="ts" setup></script>

<template>
  <div class="LoadingView">
    <div class="LoadingTitle">
      <img alt="Logo" src="/images/loading.png" />
      <h2>Chargement...</h2>
    </div>
  </div>
</template>

<style lang="sass">
.LoadingView
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  display: flex
  flex-direction: column
  justify-content: center
  align-items: stretch
  gap: 32px
  padding: 32px

  > .LoadingTitle
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 32px

    > img
      height: 96px

    > *
      text-align: center
</style>
