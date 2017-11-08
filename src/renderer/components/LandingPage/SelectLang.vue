<template>
  <div class="input-field col s12">
    <h2>Select your language</h2>
    <select>
      <option v-for="lang in langs" :key="lang">{{lang}}</option>
    </select>
  </div>
</template>

<script>
import * as fs from 'fs';
import * as path from 'path';

export default {
  name: 'select-lang',
  data () {
    return {
      langs: []
    };
  },
  mounted: function() {
    const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory());
    // get the name of all avalaible languages
    // look for directories in the static folder
    this.langs = dirs(__static);
  },
  beforeUpdate() {
    window.$('select').material_select('destroy');
  },
  updated() {
    window.$('select').material_select();
  }
};
</script>

<style>
  h2 {
    font-size: 1.3em;
    color: black;
  }
</style>
