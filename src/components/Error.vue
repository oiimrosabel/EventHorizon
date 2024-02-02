<script setup>

defineProps([
    "code",
    "name",
    "message"
])

</script>

<template>
  <div class="loading">
    <img src="/images/error.png">
    <h1>Une erreur est survenue <img src="/images/err2.png"></h1>
    <code>Error {{ code }} - {{name}}</code>
    <p>{{ message}}</p>
  </div>
</template>

<style scoped>
@media screen and (min-width: 1025px) {
  .loading {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--widget);
    gap: 24px;
    border-radius: var(--widget-radius);
    animation: BottomPanel ease-out 0.5s;
  }

  .loading * {
    margin: 0;
  }

  .loading > h1 {
    display: flex;
    flex-direction: row;
    gap: 0.25em;
    justify-content: center;
    align-items: center;
  }

  .loading > h1 > img {
    height: 1em;
  }

  .loading > code {
    font-weight: bold;
    padding: 12px 20px;
    border-radius: var(--button-radius);
    background: var(--event);
    transition: var(--transition);
  }

  .loading > code:hover {
    background: var(--widget-hover);

  }

  .loading > img {
    height: 160px;
  }
}
</style>