<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper orange accent-3">
        <div class="black-text brand-logo left">
          <span class="title">X-loc</span>
          <span class="subtitle">: {{$t('description')}}</span>
        </div>
        <ul id="nav-mobile" class="right">
          <li><a v-on:click="open('http://github.com/bguyl/x-loc')"><span class="fa fa-px fa-github black-text"></span></a></li>
          <li><a v-on:click="minimize()"><span class="fa fa-minus black-text"></span></a></li>
          <li><a v-on:click="close()"><span class="fa fa-times black-text"></span></a></li>
        </ul>
      </div>
    </nav>
    <landing-page></landing-page>
    <div id="update-modal" class="modal">
      <div class="modal-content">
        <h4>{{$t('update-title')}}</h4>
        <p>{{$t('update-content')}} <a class="update" v-on:click="open('https://github.com/bguyl/x-loc/releases/latest`')"> {{$t('update-there')}}</a>.</p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">{{$t('close')}}</a>
      </div>
    </div>
    <div class="version">Version: {{version}}</div>
  </div>
</template>

<script>
  import * as https from 'https'
  import LandingPage from './components/LandingPage.vue'

  export default {
    name: 'x-loc',
    components: { LandingPage },
    data () {
      return {
        version: ''
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      minimize () {
        this.$electron.remote.getCurrentWindow().minimize()
      },
      close () {
        this.$electron.remote.getCurrentWindow().close()
      }
    },
    beforeMount () {
      // Give the app version on prod, electron version on dev
      if (process.env.NODE_ENV === 'development') {
        this.version = '0.0.3'
      } else {
        this.version = this.$electron.remote.app.getVersion()
      }
    },
    mounted: function () {
      window.$('.modal').modal()
      checkUpdate(this.version)
    }
  }

/**
 * Check if a new version is available and open modal if true
 */
function checkUpdate (current) {
    current = current.split('.')
    const options = {
      hostname: 'api.github.com',
      path: '/repos/bguyl/x-loc/releases/latest',
      method: 'GET',
      headers: {
        'User-Agent': 'xloc-app'
      }
    }
    let req = https.request(options, (res) => {
      // console.log(`STATUS: ${res.statusCode}`);
      res.setEncoding('utf8')
      let datastr = ''
      res.on('data', (chunk) => {
        datastr += chunk
      })
      res.on('end', () => {
        // get versions as arrays to compare
        let latest = JSON.parse(datastr).tag_name.split('v')[1].split('.')
        // compare version (semver)
        if ((latest[0] > current[0]) ||
          (latest[0] === current[0] && latest[1] > current[1]) ||
          (latest[0] === current[0] && latest[1] === current[1] && latest[2] > current[2])
        ) {
          window.$('#update-modal').modal('open')
        }
      })
    })
    req.on('error', (e) => {
      // console.error(`problem with request: ${e.message}`);
    })
    req.end()
}
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

a {
  -webkit-app-region: no-drag;
}

.nav-wrapper {
  padding: 5px 15px;
}

.title {
  font-family: drifttype;
  font-size: 32px;
  color: #7d5a1a;
}

.subtitle {
  font-family: stardewvalley;
  font-size: 24px;
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
  width: 45px;
  text-align: center;
}

.fa-px {
  font-size: 24px
}

h2 {
  font-size: 25px !important; 
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
