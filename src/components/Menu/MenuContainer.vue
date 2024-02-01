<script setup>
import Button from "@/components/Button.vue";

defineEmits(["goBack"])
</script>

<template>
  <div class="bg" @click="$emit('goBack')">
    <div class="menu">
      <slot>
      </slot>
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 1025px) {
  .bg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: color-mix(in srgb, var(--background), transparent 50%);

    z-index: 10;

    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
  }

  .menu {
    background: var(--background);
    width: 800px;
    border-radius: var(--widget-radius) var(--widget-radius) 0 0;
  }
}
</style>