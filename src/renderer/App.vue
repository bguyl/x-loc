<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper orange accent-3">
        <div class="brand-logo black-text">
          <router-link to="/" class="title">X-loc</router-link>
          <span class="subtitle">: Extra localizations for Stardew Valley</span>
        </div>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <!-- <li><router-link to="about"><span class="fa fa-2x fa-question black-text"></span></router-link></li> -->
          <li><a v-on:click="open('http://github.com/bguyl/x-loc')"><span class="fa fa-2x fa-github black-text"></span></a></li>
          <li><a v-on:click="minimize()"><span class="fa fa-2x fa-minus black-text"></span></a></li>
          <li><a v-on:click="close()"><span class="fa fa-2x fa-times black-text"></span></a></li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'x-loc',
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
      minimize() {
        this.$electron.remote.getCurrentWindow().minimize();
      },
      close() {
        this.$electron.remote.getCurrentWindow().close();
      }
    }
  };
</script>

<style>
@font-face {
  font-family: stardewvalley;
  src: url('assets/Stardew_Valley.ttf');
}

@font-face {
  font-family: drifttype;
  src: url('assets/Drifttype.ttf');
}

nav {
  -webkit-app-region: drag;
}

router-link, a {
  -webkit-app-region: no-drag;
}

.nav-wrapper {
  padding: 5px 15px;
}

.title {
  font-family: drifttype;
  font-size: 1.5em;
  color: #7d5a1a;
}

.subtitle {
  font-family: stardewvalley;
  font-size: 0.8em;
}

body {
  /* min-height: 100vh; */
  font-family: stardewvalley;
  background-color: #0360b9;
  background-image: url('assets/mountainsBgWithCloudsGlowing_websiteBG2.png');
  background-size: cover;
  background-attachment: fixed;
}

#nav-mobile > li {
  width: 75px;
  text-align: center;
}
</style>
