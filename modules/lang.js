const lang = {
    isEnLang: true,
    setLangToLocalStorage() {
      localStorage.setItem('isEnLang', this.isEnLang);
    },
    getLangFromLocalStorage() {
      this.isEnLang = (localStorage.getItem('isEnLang')) ? localStorage.getItem('isEnLang') === 'true' : true;
    },
  };
  
  export default lang;