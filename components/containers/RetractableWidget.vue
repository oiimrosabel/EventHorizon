<script setup lang="ts">
import { ref } from "vue";
import TextButton from "~/components/buttons/TextButton.vue";

const props = defineProps({
  forceOpen: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "Widget",
  },
  image: {
    type: String,
    default: undefined,
  },
});

const tag = `${props.tag}State`;

const stateRef = ref<boolean>(
  props.forceOpen || (localStorage.getItem(tag) ?? "0") === "1",
);

const switchState = () => {
  stateRef.value = !stateRef.value;
  localStorage.setItem(tag, stateRef.value ? "1" : "0");
};
</script>

<template>
  <div class="RetractableWidget">
    <div>
      <img v-if="image && !stateRef" :src="image" :alt="title" >
      <p class="subtitle">{{ title }}</p>
      <TextButton
        :title="stateRef ? 'Minimiser' : 'Afficher'"
        @click="switchState()"
      >
        <img :src="`/icons/${stateRef ? 'up' : 'down'}.svg`" alt="Toggle" >
      </TextButton>
    </div>
    <slot v-if="stateRef" name="default" />
  </div>
</template>

<style lang="sass">
.RetractableWidget
  display: flex
  flex-direction: column
  justify-content: space-between
  align-items: stretch
  padding: 16px
  background: var(--widget)
  border-radius: var(--radius-small)
  gap: 16px

  > div:first-of-type
    display: flex
    flex-direction: row
    justify-content: start
    align-items: center
    gap: 12px

    > p
      flex-grow: 1

    > img
      height: 24px
</style>
