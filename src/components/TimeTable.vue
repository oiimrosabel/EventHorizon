<script lang="ts" setup></script>

<template>
  <div class="TimeTable">
    <slot></slot>
  </div>
</template>

<style lang="sass">
.TimeTable
  display: flex
  justify-content: start
  align-items: stretch
  gap: 20px
  padding: 24px
  border-radius: var(--radius-med)
  overflow-x: auto
  overflow-y: visible

  @media (min-width: 1201px)
    height: 100%
    flex: 1 1
    flex-direction: row

    > *
      flex: 0 0 312px
      overflow-x: visible
      overflow-y: auto

  @media (max-width: 1200px)
    flex: 0 0
    flex-direction: column
</style>
