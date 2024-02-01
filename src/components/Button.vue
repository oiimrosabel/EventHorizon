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

    cursor: pointer;
    transition: var(--transition);
  }

  .button:hover {
    background: var(--widget-hover);
  }

  .button > * {
    margin: 0;
  }

  .button > img {
    height: 1.5em;
    filter: var(--img-filter);
  }

  .button > p {
    text-align: center;
    font-weight: bold;
    margin: 0 0 0 12px;
  }

  .important {
    background: var(--important);
    color: var(--text-important);
  }

  .important > img {
    filter: var(--imp-filter);
  }

  .retractable {
    min-width: 1px;
  }

  .retractable > p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
    max-width: 1px;
    margin: 0;
    opacity: 0;
    transition: var(--transition);
  }

  .retractable:hover > p {
    max-width: 128px;
    margin: 0 0 0 12px;
    opacity: 1;
  }
}
</style>