<template>
  <div class="content">
    <folder-form v-model="gamepath"></folder-form>
    <select-lang v-model="lang"></select-lang> 
    <patch-reset-buttons :gamepath="gamepath" :lang="lang" :filespaths="filespaths"></patch-reset-buttons>
    <div class="version">Version: {{version}}</div>
    <div id="update-modal" class="modal">
      <div class="modal-content">
        <h4>Update available !</h4>
        <p>A new version is available. You can download it <a class="update" v-on:click="open('https://github.com/bguyl/x-loc/releases/latest')">there</a>.</p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
      </div>
    </div>
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
  import * as https from 'https';

  export default {
    name: 'landing-page',
    components: { FolderForm, SelectLang, PatchResetButtons },
    data () {
      return {
        filespaths: [],
        gamepath: '',
        lang: '',
        version: ''
      };
    },
    watch: {
      lang: function () {
        if (this.lang) {
          this.filespaths = readDataDirectory(this.lang);
        }
      }
    },
    methods: {
      onPathChanged(gamepath) {
        this.gamepath = gamepath;
      },
      open(link) {
        this.$electron.shell.openExternal(link);
      }
    },
    beforeMount: function() {
      // Give the app version on prod, electron version on dev
      this.version = this.$electron.remote.app.getVersion();
      getDefaultPath()
        .then(gamepath => { this.gamepath = gamepath; });
    },
    mounted: function() {
      window.$('.modal').modal();
      checkUpdate();
    }
  };

  /**
   * Check if a new version is available and open modal if true
   */
  function checkUpdate() {
    if (process.env.NODE_ENV === 'development') { window.$('#update-modal').modal('open'); return; }
    const options = {
      hostname: 'api.github.com',
      path: '/repos/bguyl/x-loc/releases/latest',
      method: 'GET',
      headers: {
        'User-Agent': 'xloc-app'
      }
    };
    let req = https.request(options, (res) => {
      // console.log(`STATUS: ${res.statusCode}`);
      res.setEncoding('utf8');
      let datastr = '';
      res.on('data', (chunk) => {
        datastr += chunk;
      });
      res.on('end', () => {
        // get versions as arrays to compare
        let latest = JSON.parse(datastr).tag_name.split('v')[1].split('.');
        let current = this.version.split('.');
        // compare version (semver)
        if ((latest[0] > current[0]) ||
          (latest[0] === current[0] && latest[1] > current[1]) ||
          (latest[0] === current[0] && latest[1] === current[1] && latest[2] > current[2])
        ) {
          window.$('#update-modal').modal('open');
        }
      });
    });
    req.on('error', (e) => {
      // console.error(`problem with request: ${e.message}`);
    });
    req.end();
  }

  /**
   * Return a list of files available for paths
   */
  function readDataDirectory (lang, dir = path.join(__static, lang), filelist = []) {
    var files = fs.readdirSync(dir);
    files.forEach(function(file) {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        filelist = readDataDirectory(lang, path.join(dir, file), filelist);
      } else {
        filelist.push(path.join(dir.split(lang)[1], file));
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
    let gamepath = '';
    if (os.platform() === 'win32') { // if windows
      return winSteamPath().then(steampath => {
        gamepath = path.join(steampath, 'steamapps', 'common', 'Stardew Valley');
        if (fs.statSync(gamepath)) {
          return Promise.resolve(gamepath);
        }
      });
    } else if (os.platform() === 'linux') {
      gamepath = path.join(process.env.HOME, '.local', 'share', 'Steam', 'steamapps', 'common', 'Stardew Valley');
    } else if (os.platform() === 'darwin') { // if mac
      gamepath = path.join(process.env.HOME, 'Library', 'Application Support', 'Steam', 'SteamApps', 'common', 'Stardew Valley');
    }
    if (fs.statSync(gamepath)) {
      return Promise.resolve(gamepath);
    }
    return Promise.reject(Error('Default path not found'));
  }
</script>

<style>
.content {
  margin: 40px 30px;
}
a.update {
  cursor: pointer;
}
.version {
  color: white;
  position: fixed;
  bottom: 5px;
  right: 5px;
}
</style>
