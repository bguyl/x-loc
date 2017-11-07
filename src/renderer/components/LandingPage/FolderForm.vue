<template>
  <form action="#">
    <div class="file-field input-field">
      <div class="btn">
        <span>Browse</span>
        <input type="file" @change="onChange" webkitdirectory>
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text" v-model="gamepath" placeholder="Game files folder">
      </div>
    </div>
  </form>
</template>

<script>
  const fs = require('fs');
  const os = require('os');
  const path = require('path');
  const Registry = require('winreg');

  export default {
    name: 'folder-form',
    data () {
      return {
        gamepath: ''
      };
    },
    methods: {
      onChange(e) {
        this.gamepath = e.target.files[0].path;
      }
    },
    beforeMount: function() {
      getDefaultPath().then(gamepath => { this.gamepath = gamepath; });
    }
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
    ).catch(err => console.log(err));
  }

  function getDefaultPath() {
    // Tests for Windows
    if (os.platform() === 'win32') {
      return winSteamPath().then(steampath => {
        let gamepath = path.join(steampath, 'steamapps');
        console.log(gamepath);
        if (fs.existsSync(gamepath)) {
          return Promise.resolve(gamepath);
        }
      });
    }
    return Promise.reject(Error('Default path not found'));
  }
</script>

<style>

</style>
