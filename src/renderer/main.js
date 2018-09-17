import Vue from 'vue'

import i18next from 'i18next'
import VueI18Next from '@panter/vue-i18next'
import LanguageDetector from 'i18next-electron-language-detector'

import App from './App'

// Import css librairies
import 'materialize-css/dist/css/materialize.css'
import 'font-awesome/css/font-awesome.css'

// Import js librairies

import * as $ from 'jquery'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
window.$ = window.jQuery = $
require('hammerjs')
require('materialize-css')

Vue.use(VueI18Next)
i18next.init({
  fallbackLng: 'en',
  resources: {
    en: { translation: {
      'description': 'Extra localizations for Stardew Valley',
      'update-title': 'Update available !',
      'update-content': 'A new version is available. You can download it',
      'update-there': 'there',
      'files-location': 'Gamefiles location',
      'browse': 'Browse',
      'folder-placeholder': 'Game files folder',
      'patch': 'Patch',
      'reset': 'Reset',
      'game-patched': 'Game patched !',
      'game-reset': 'Files reset',
      'select-lang': 'Select your language',
      'select-one': 'Select one',
      'close': 'Close'
    } },
    fr: { translation: {
      'description': 'Localisations supplémentaires pour Stardew Valley',
      'update-title': 'Mise à jour disponible !',
      'update-content': 'Une nouvelle version est disponible. Vous pouvez la télécharger',
      'update-there': 'ici',
      'files-location': 'Fichiers du jeu',
      'browse': 'Parcourir',
      'folder-placeholder': 'Dossier des fichiers du jeu',
      'patch': 'Appliquer',
      'reset': 'Réinitialiser',
      'game-patched': 'Correctif appliqué !',
      'game-reset': 'Fichiers réinitialisés',
      'select-lang': 'Sélectionnez la langue',
      'select-one': 'Selectionnez en une',
      'close': 'Fermer'
    } }
  }
})
i18next.use(LanguageDetector).init()
const i18n = new VueI18Next(i18next)

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>',
  i18n
}).$mount('#app')
