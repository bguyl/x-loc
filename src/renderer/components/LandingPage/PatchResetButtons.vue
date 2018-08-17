<template>
  <div class="foo">
    <button @click="patch" class="waves-effect waves-light btn">{{$t('patch')}}</button>
    <button @click="reset" class="waves-effect waves-light btn">{{$t('reset')}}</button>
  </div>
</template>

<script>
import fs from 'fs'
import path from 'path'

export default {
  name: 'patch-reset-buttons',
  props: ['gamepath', 'lang', 'filespaths'],
  methods: {
    patch () {
      this.filespaths.forEach(relpath => {
        let abspath = path.join(this.gamepath, 'Content', relpath)
        if (!fs.existsSync(abspath.concat('.xloc_bak'))) {
          try {
            fs.renameSync(abspath, abspath.concat('.xloc_bak'))
          } catch (e) {}
        }
        copyFile(path.join(__static, this.lang, relpath), abspath, () => { /* ignore callback */ })
      })
      window.Materialize.toast(this.$t('game-patched'), 1000)
    },
    reset () {
      let frompath = path.join(this.gamepath, 'Content')
      let filesToReset = find(frompath, '.*xloc_bak')
      filesToReset.forEach(file => {
        let currentpath = path.join(frompath, file)
        try {
          fs.renameSync(currentpath, currentpath.split('.xloc_bak')[0])
        } catch (e) {}
      })
      window.Materialize.toast(this.$t('game-reset'), 1000)
    }
  }
}
/**
 * Cant's use NodeJS 8.5 fs.copyFile() in Electron
 */
function copyFile (source, target, cb) {
  var cbCalled = false

  var rd = fs.createReadStream(source)
  rd.on('error', function (err) {
    done(err)
  })
  var wr = fs.createWriteStream(target)
  wr.on('error', function (err) {
    done(err)
  })
  wr.on('close', function (ex) {
    done()
  })
  rd.pipe(wr)

  function done (err) {
    if (!cbCalled) {
      cb(err)
      cbCalled = true
    }
  }
}

/**
 * Find a list of files with a regex
 */
function find (start, regex, dir = start, filelist = []) {
  var files = fs.readdirSync(dir)
  files.forEach(function (file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = find(start, regex, path.join(dir, file), filelist)
    } else if (file.match(regex)) {
      filelist.push(path.join(dir.split(start)[1], file))
    }
  })
  return filelist
};
</script>
