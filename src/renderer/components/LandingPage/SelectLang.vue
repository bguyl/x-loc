<template>
  <div class="input-field col s12">
    <h2>Select your language</h2>
    <material-select @input="onInput" :value="value">
      <option value="null" disabled>Select one</option>
      <option v-for="lang in langs" :value="lang" :key="lang" v-text="lang"></option>
    </material-select>
  </div>
</template>

<script>
import * as fs from 'fs';
import * as path from 'path';
import MaterialSelect from './MaterialSelect';

export default {
  name: 'select-lang',
  props: ['value'],
  components: { MaterialSelect },
  data () {
    return {
      langs: []
    };
  },
  methods: {
    onInput(value) {
      this.$emit('input', value);
    }
  },
  beforeMount() {
    const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory());
    // get the name of all avalaible languages
    // look for directories in the static folder
    this.langs = dirs(__static);
  }
};
</script>

<style>
  h2 {
    font-size: 1.3em;
    color: black;
  }
</style>
