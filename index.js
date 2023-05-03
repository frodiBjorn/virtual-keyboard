import createApp from './modules/createApp.js';
import lang from './modules/lang.js';

window.onload = function onload() {
  lang.getLangFromLocalStorage();
  createApp();
};

window.addEventListener('beforeunload', () => { lang.setLangToLocalStorage(); });
