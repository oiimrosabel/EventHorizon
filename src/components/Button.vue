<script setup>

defineEmits([
  "buttonClicked",
  "deactivatedButtonClicked"
])

defineProps([
  "imageLink",
  "text",
  "important",
  "disabled",
  "retractable"
])

</script>

<template>
  <a
      :class="{'important' : important !== undefined && important === true, 'retractable': retractable !== undefined && retractable === true}"
      class="button"
      @click="$emit(disabled ? 'deactivatedButtonClicked' : 'buttonClicked')">
    <img v-if="imageLink !== undefined && imageLink !== ''" :src="imageLink" :alt="text"/>
    <p v-if="text !== undefined && text !== ''">{{ text }}</p>
  </a>
</template>

<style scoped>
@media screen and (min-width: 1025px) {
  .button {
    padding: 16px 20px;

    background: var(--widget);
    border-radius: var(--button-radius);

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 12px;
  }

  .button:hover {
    background: var(--widget-hover);
  }

  .button > * {
    margin: 0;
  }

  .button > img {
    height: 1.5em;
  }

  .button > p {
    text-align: center;
    font-weight: bold;
  }

  .important {
    background: var(--important);
    color: var(--text-important);
  }

  .retractable {
    min-width: 1px;
  }

  .retractable > p {
    display: none;
    max-width: 1px;
  }

  .retractable:hover > p {
    display: inherit;
    max-width: 128px;
  }
}
</style>