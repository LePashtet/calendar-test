<template>
  <div id="app">
    <div id="nav">
      <div class="locale-changer">
        <select v-model="$i18n.locale">
          <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{
            lang
          }}</option>
        </select>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return { langs: ["ru", "en"] };
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
@font-face {
  font-family: "Rubik";
  src: url("./assets/fonts/Rubik.ttf") format("ttf");
}
#app {
  font-family: Rubik, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-style: normal;
  font-weight: normal;
  background-color: #f4f4f4;
  padding: 3px;
}
</style>
