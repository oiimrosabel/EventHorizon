<script setup>

import {ref} from "vue";
import Button from "@/components/Button.vue";
import {dayAssociation, monthAssociation} from "@/assets/js/dateUtils.js";
import calendars from "@/assets/json/calendars.json"
import MenuContainer from "@/components/MenuContainer.vue";
import {changeLoc, copyText, getCurrentURL, reload, shareText} from "@/assets/js/otherUtils.js";
import {switchTheme} from "@/assets/js/themeUtils.js";
import {getCookie, setCookie} from "@/assets/js/cookieUtils.js";

const date = ref(new Date());

const calMenuShown = ref(false);
const themeMenuShown = ref(false);
const shareMenuShown = ref(false);

const customURL = ref("");

function setCustomLink(value) {
  setCookie('customURL', value);
  changeLoc('/custom', false);
}

</script>

<template>
  <div class="top">
    <div class="top-left">
      <div>
        <h1>{{ dayAssociation[date.getDay()] }} {{ date.getDate() }}</h1>
        <p>{{ monthAssociation[date.getMonth()] }} {{ date.getFullYear() }} </p>
      </div>
      <div v-if="$route.name === 'Calendar' && calendars[$route.params.cal] !== undefined">
        <p>Préréglage</p>
        <h1>
          {{ calendars[$route.params.cal]["name"] }}</h1>
      </div>
    </div>
    <div class="top-right">
      <Button
          text="Partager"
          image-link="/icons/share.png"
          :retractable="true"
          @buttonClicked="shareMenuShown = true"
          v-if="$route.name === 'Calendar'"
      />
      <Button
          text="Rafraîchir"
          image-link="/icons/refresh.png"
          :retractable="true" @buttonClicked="reload()"
      />
      <Button
          text="Changer"
          image-link="/icons/switch.png"
          @buttonClicked="calMenuShown = true"
          :class="{'blinking' : $route.name === 'Welcome'}"
      />
      <Button
          text="Thème"
          :image-link="`/icons/theme.png`"
          :important="true"
          @buttonClicked="themeMenuShown = true"
      />
    </div>
  </div>
  <MenuContainer
      v-if="calMenuShown"
      @goBack="calMenuShown = false">
    <div class="menuc">
      <img src="/icons/switch.png"/>
      <h1>Changer de calendrier</h1>
      <h2>Préréglages</h2>
      <div>
        <Button
            text="Accueil"
            image-link="/icons/home.png"
            @buttonClicked="changeLoc('/', false);"
        />
        <Button
            v-for="(elem, index) in calendars"
            :text="elem['name']"
            image-link="/icons/calendar.png"
            @buttonClicked="changeLoc('/' + index, false);"
        />
      </div>
      <h2>Lien personnalisé</h2>
      <div>
        <input type="text" v-model="customURL"
               @keyup.enter="setCustomLink(customURL)"/>
        <Button
            image-link="/icons/search.png"
            @buttonClicked="setCustomLink(customURL)"/>
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
      <img :src="`/icons/theme.png`"/>
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
  <MenuContainer
      v-if="shareMenuShown"
      @goBack="shareMenuShown = false">
    <div class="menuc">
      <img :src="`/icons/share.png`"/>
      <h1>Partager</h1>
      <h2>Lien EventHorizon</h2>
      <h3 v-if="calendars[$route.params.cal] === undefined">Il est impossible de partager un lien EventHorizon
        personnalisé.</h3>
      <div>
        <Button
            text="Copier le lien EventHorizon"
            image-link="/icons/copy.png"
            :disabled="calendars[$route.params.cal] === undefined"
            @buttonClicked="copyText(getCurrentURL())"
        />
        <Button
            text="Partager le lien EventHorizon"
            image-link="/icons/share.png"
            :disabled="calendars[$route.params.cal] === undefined"
            @buttonClicked="shareText(getCurrentURL())"
        />
      </div>
      <h2 v-if="calendars[$route.params.cal] !== undefined">Lien ADECampus</h2>
      <div v-if="calendars[$route.params.cal] !== undefined">
        <Button
            text="Copier le lien ADECampus"
            image-link="/icons/copy.png"
            @buttonClicked="copyText(calendars[$route.params.cal]['url'])"
        />
        <Button
            text="Partager le lien ADECampus"
            image-link="/icons/share.png"
            @buttonClicked="shareText(calendars[$route.params.cal]['url'])"
        />
        <h2 v-if="$route.name === 'custom'">Lien personnalisé</h2>
        <div v-if="$route.name === 'custom'">
          <Button
              text="Copier le lien personnalisé"
              image-link="/icons/copy.png"
              @buttonClicked="copyText(getCookie('customURL'))"
          />
          <Button
              text="Partager le lien personnalisé"
              image-link="/icons/share.png"
              @buttonClicked="shareText(getCookie('customURL'))"
          />
        </div>
      </div>
      <Button
          image-link="/icons/back.png"
          text="Retour"
          @buttonClicked="shareMenuShown = false"
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

  .menuc > h3 {
    padding: 16px 24px;
    border-radius: var(--button-radius);
    color: var(--text-important);
    background: var(--important);
  }

  .menuc > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
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

  .blinking {
    animation: Attention 2s ease-out infinite;
  }
}
</style>