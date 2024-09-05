<script lang="ts" setup>
import { ref } from "vue";
import TextButton from "@/components/TextButton.vue";
import { linksService } from "@/assets/code/links/links.service";
import { calendarService } from "@/assets/code/calendar/calendar.service";
import { animationService } from "@/assets/code/animations/animations.service";

const emits = defineEmits(["found"]);

const ERROR_CLASS = "error";
const ERROR_ANIM_DURATION = "0.33s";

const $router = useRouter();
const calId = ref("");
const inputRef = ref(null);

const formatInput = (text?: string) => {
  if (!text) return undefined;
  if (text.startsWith("http")) {
    text = linksService.getDataFromUrl(text, "resources");
    if (!text) return undefined;
  }
  return calendarService.isValidId(text) ? text : undefined;
};

const goToCal = () => {
  const res: string | undefined = formatInput(calId.value);
  if (res) {
    $router.push(`/${res}`);
    emits("found");
  } else
    animationService.animateStep([inputRef.value], {
      callback: () => {},
      classTag: ERROR_CLASS,
      duration: ERROR_ANIM_DURATION,
    });
};
</script>

<template>
  <div class="SearchBar">
    <input
      ref="inputRef"
      v-model="calId"
      placeholder="ID ou URL de l'emploi du temps"
      type="text"
      @keydown.enter="goToCal()"
    />
    <TextButton @click="goToCal()">
      <img alt="Search" src="/icons/search.svg" />
    </TextButton>
  </div>
</template>

<style lang="sass">
.SearchBar
  display: flex
  flex-direction: row
  justify-content: stretch
  align-items: stretch
  gap: 8px

  > input
    flex: 1 1
    background: var(--button)
    border: none
    border-radius: var(--radius-button)
    outline: none
    text-align: center
    color: var(--text)
    transition: var(--trans)
    min-width: 0
    transform-origin: center
    font-family: 'Montserrat', sans-serif
    font-weight: 500

    &.error
      animation: InputError v-bind(ERROR_ANIM_DURATION)

    &:hover
      background: var(--hover)

    &::placeholder
      color: var(--text)
</style>
