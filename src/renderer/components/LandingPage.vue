<template>
  <div class="content">
    <folder-form></folder-form>
    <select-lang></select-lang> 
    <patch-reset-buttons></patch-reset-buttons>
    <ul>
      <li v-for="filepath in filespaths" :key="filepath">{{filepath}}</li>
    </ul>
  </div>
</template>

<script>
  import FolderForm from './LandingPage/FolderForm.vue';
  import SelectLang from './LandingPage/SelectLang.vue';
  import PatchResetButtons from './LandingPage/PatchResetButtons.vue';
  import * as fs from 'fs';
  import * as path from 'path';

  export default {
    name: 'landing-page',
    components: { FolderForm, SelectLang, PatchResetButtons },
    data () {
      return {
        filespaths: []
      };
    },
    mounted: function() {
      this.filespaths = readDataDirectory();
    }
  };
  
  function readDataDirectory (dir = path.join(__static, 'en-EN/'), filelist = []) {
    var files = fs.readdirSync(dir);
    files.forEach(function(file) {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = readDataDirectory(dir + file + '/', filelist);
      } else {
        filelist.push(path.join(dir.split('en-EN')[1], file));
      }
    });
    return filelist;
  };
</script>

<style>
.content {
  margin: 40px 30px;
}
</style>
