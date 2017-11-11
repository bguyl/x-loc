<template>
  <div class="content">
    <folder-form v-model="gamepath"></folder-form>
    <select-lang v-model="lang"></select-lang> 
    <patch-reset-buttons></patch-reset-buttons>
    <p>{{gamepath}}</p>
    <p>{{lang}}</p>
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
  import * as os from 'os';
  import * as Registry from 'winreg';

  export default {
    name: 'landing-page',
    components: { FolderForm, SelectLang, PatchResetButtons },
    data () {
      return {
        filespaths: [],
        gamepath: '',
        lang: ''
      };
    },
    methods: {
      onPathChanged(gamepath) {
        this.gamepath = gamepath;
      }
    },
    beforeMount: function() {
      getDefaultPath()
        .then(gamepath => { this.gamepath = gamepath; });
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

  function getRegKeyValue(regKey) {
    return new Promise((resolve, reject) => {
      // find the path value
      regKey.values((err, items) => {
        if (err) { reject(err); };
        resolve(items);
      });
    });
  }
  
  function winSteamPath() {
    // get steam windows registery
    const regKey = new Registry({ hive: Registry.HKCU, key: '\\Software\\Valve\\Steam' });

    return getRegKeyValue(regKey).then(items => {
      for (let item of items) {
        if (item.name === 'SteamPath') {
          return Promise.resolve(item.value);
        }
      } return Promise.reject(Error('Steam path not found'));
    }
    );
  }

  function getDefaultPath() {
    // Tests for Windows
    if (os.platform() === 'win32') {
      return winSteamPath().then(steampath => {
        let gamepath = path.join(steampath, 'steamapps', 'common', 'Stardew Valley');
        if (fs.existsSync(gamepath)) {
          return Promise.resolve(gamepath);
        }
      });
    }
    return Promise.reject(Error('Default path not found'));
  }
</script>

<style>
.content {
  margin: 40px 30px;
}
</style>
