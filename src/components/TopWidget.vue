<script setup>

import {ref} from "vue";
import Button from "@/components/Button.vue";
import {dayAssociation, monthAssociation} from "@/assets/js/dateUtils.js";
import calendars from "@/assets/json/calendars.json"
import MenuContainer from "@/components/Menu/MenuContainer.vue";
import {changeLoc} from "@/assets/js/otherUtils.js";
import {getTheme, switchTheme} from "@/assets/js/themeUtils.js";

const date = ref(new Date());

function reload() {
  location.reload();
}

const calMenuShown = ref(false);
const themeMenuShown = ref(false);
const shareMenuShown = ref(false);

</script>

<template>
  <div class="top">
    <div class="top-left">
      <div>
        <h1>{{ dayAssociation[date.getDay()] }} {{ date.getDate() }}</h1>
        <p>{{ monthAssociation[date.getMonth()] }} {{ date.getFullYear() }} </p>
      </div>
      <div v-if="$route.name !== 'Welcome'">
        <p>Groupe</p>
        <h1>
          {{ calendars[$route.params.cal] === undefined ? "Personnalisé" : calendars[$route.params.cal]["name"] }}</h1>
      </div>
    </div>
    <div class="top-right">
      <Button text="Partager" image-link="/icons/share.png" :retractable="true"/>
      <Button text="Rafraîchir" image-link="/icons/refresh.png" :retractable="true" @buttonClicked="reload()"/>
      <Button text="Changer" image-link="/icons/switch.png" @buttonClicked="calMenuShown = true"/>
      <Button text="Thème" :image-link="`/icons/${getTheme()}.png`" :important="true"
              @buttonClicked="themeMenuShown = true"/>
    </div>
  </div>
  <MenuContainer
      v-if="calMenuShown"
      @goBack="calMenuShown = false">
    <div class="menuc">
      <img src="/icons/switch.png"/>
      <h1>Changer de calendrier</h1>
      <h2>Présets</h2>
      <div>
        <Button
            v-for="(elem, index) in calendars"
            :text="elem['name']"
            image-link="/icons/calendar.png"
            @buttonClicked="changeLoc('/' + index, false);"
        />
      </div>
      <h2>Lien personnalisé</h2>
      <div>
        <input type="text">
        <Button
            image-link="/icons/search.png"
        />
      </div>
      <Button
          image-link="/icons/back.png"
          text="Retour"
          @buttonClicked="calMenuShown = false"
      />
    </div>
  </MenuContainer>
  <MenuContainer
      v-if="themeMenuShown"
      @goBack="themeMenuShown = false">
    <div class="menuc">
      <img :src="`/icons/${getTheme()}.png`"/>
      <h1>Changer de thème</h1>
      <h2>Thèmes statiques</h2>
      <div>
        <Button
            text="Sage"
            image-link="/icons/sage.png"
            @buttonClicked="switchTheme('sage')"
        />
        <Button
            text="Solstice"
            image-link="/icons/solstice.png"
            @buttonClicked="switchTheme('solstice')"
        />
        <Button
            text="Stars"
            image-link="/icons/stars.png"
            @buttonClicked="switchTheme('stars')"
        />
        <Button
            text="OLED"
            image-link="/icons/oled.png"
            @buttonClicked="switchTheme('oled')"
        />
      </div>
      <h2>Thèmes automatiques</h2>
      <div>
        <Button
            text="Basé sur l'heure"
            image-link="/icons/time.png"
            @buttonClicked="switchTheme('time')"
        />
        <Button
            text="Système"
            image-link="/icons/system.png"
            @buttonClicked="switchTheme('system')"
        />
      </div>
      <Button
          image-link="/icons/back.png"
          text="Retour"
          @buttonClicked="themeMenuShown = false"
      />
    </div>
  </MenuContainer>
</template>

<style scoped>
@media screen and (min-width: 1025px) {
  .top {
    background: var(--bg-image);
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 16px;
    border-radius: var(--widget-radius);
  }

  .top-left {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    gap: 16px;
  }

  .top-left > * {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 4px;

    background: var(--widget);
    border-radius: var(--widget-radius);
    padding: 16px 24px;
  }

  .top-left > * > * {
    margin: 0;
  }

  .top-left > * > h1 {
    font-size: 1.5em;
  }

  .top-right {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: start;

    gap: 8px;
  }

  .menuc {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 64px 64px 32px;
    justify-content: start;
    align-items: center;
  }

  .menuc > img {
    height: 64px;
    filter: var(--img-filter);
  }

  .menuc > * {
    margin: 0;
  }

  .menuc > h2 {
    opacity: 0.9;
  }

  .menuc > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    align-items: stretch;
    gap: 12px;
  }

  .menuc > div > input {
    border-radius: var(--button-radius);
    border: none;
    background: var(--widget);
    width: 500px;
    padding: 0 24px;
    transition: var(--transition);
  }

  .menuc > div > input:hover {
    background: var(--widget-hover);
  }
}
</style>