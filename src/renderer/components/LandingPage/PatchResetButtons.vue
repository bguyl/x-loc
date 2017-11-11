<template>
  <div>
    <button @click="patch" class="waves-effect waves-light btn">Patch</button>
    <button @click="reset" class="waves-effect waves-light btn">Reset</button>
    <p>{{gamepath}}</p>
    <ul>
      <li v-for="filepath in filespaths" :key="filepath">{{filepath}}</li>
    </ul>
  </div>
</template>

<script>
import fs from 'fs';
import path from 'path';

export default {
  name: 'patch-reset-buttons',
  props: ['gamepath', 'lang', 'filespaths'],
  methods: {
    patch() {
      this.filespaths.forEach(relpath => {
        let abspath = path.join(this.gamepath, 'Content', relpath);
        try {
          fs.renameSync(abspath, abspath.concat('.xloc_bak'));
        } catch (e) {}
        copyFile(path.join(__static, this.lang, relpath), abspath, () => { /* ignore callback */ });
      });
      console.log('patched');
    },
    reset() {
      console.log('reset');
    }
  }
};
/**
 * Cant's use NodeJS 8.5 copy file in Electron
 */
function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on('error', function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on('error', function(err) {
    done(err);
  });
  wr.on('close', function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}
</script>

<style>
</style>
