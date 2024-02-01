<script setup>
import TopWidget from "@/components/TopWidget.vue";
import {setTheme} from "@/assets/js/themeUtils.js";

setTheme();

</script>

<template>
  <div id="root">
    <TopWidget/>
    <Suspense>
      <RouterView/>
    </Suspense>
  </div>
</template>

<style scoped>
@media screen and (min-width: 1025px) {
  #root {
    position: absolute;
    top: var(--root-padding);
    bottom: var(--root-padding);
    left: var(--root-padding);
    right: var(--root-padding);

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: stretch;

    gap: var(--root-padding);
  }
}

/*min width 1024px ? hmmmmm...*/
</style>
