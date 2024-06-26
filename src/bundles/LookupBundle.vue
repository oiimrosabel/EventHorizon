<script lang="ts" setup>
import OverlayMenu from '@/components/OverlayMenu.vue'
import LookupWidget from '@/components/widgets/LookupWidget.vue'

defineEmits(['hide'])
</script>

<template>
  <OverlayMenu @hide="$emit('hide')">
    <template #title>
      <img alt="Calendar" src="/images/switch.png" />
      <h2>Changer d'emploi du temps</h2>
    </template>
    <LookupWidget />
  </OverlayMenu>
</template>
