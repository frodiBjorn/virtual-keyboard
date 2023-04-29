import keys from './keys.js';
import createKey from './createKey.js';
import lang from './lang.js';


let isCapsLock = false;
let isShift = false;
let currentState = null;

const createElement = (tag, classList, content = '') => {
    const element = document.createElement(tag);
    element.classList = classList;
    element.innerHTML = content;
    return element;
  };



const createContent = () => {
    const wrapper = createElement('div', 'wrapper');
    const info = createElement('div', 'info');
    const infoTitle = createElement('h1', 'info__title', 'Virtual Keyboard');
    const infoDescription = createElement('p', 'info__description', 'Клавиатура создана в ОС Windows<br>Для переключения языка комбинация: левыe shift + alt');
    const textarea = createElement('textarea', 'textarea');
    const keyboard = createElement('div', 'keyboard');
  

    Object.keys(keys).forEach((key) => {
      const keyboardKey = createKey(key, keys[key]);
      keyboard.append(keyboardKey);
    });
  
    info.append(infoTitle, infoDescription);
    wrapper.append(info, textarea, keyboard);
    return wrapper;
  };
  
  const setCurrentState = () => {
    if (lang.isEnLang && ((!isShift && !isCapsLock) || (isShift && isCapsLock))) {
      currentState = 'en';
    } else if (!lang.isEnLang && ((!isShift && !isCapsLock) || (isShift && isCapsLock))) {
      currentState = 'ru';
    } else if (lang.isEnLang && isShift) {
      currentState = 'shiftEn';
    } else if (!lang.isEnLang && isShift) {
      currentState = 'shiftRu';
    } else if ((lang.isEnLang && isCapsLock)) {
      currentState = 'capsLockEn';
    } else {
      currentState = 'capsLockRu';
    }
  };
  const keysCurrentValue = () => {
    setCurrentState();
    const valuesOfKeys = document.querySelectorAll('.keyboard__key span');
    const currentValueOfKeys = document.querySelectorAll(`.keyboard__key-${currentState}`);
    valuesOfKeys.forEach((key) => key.classList.add('hidden'));
    currentValueOfKeys.forEach((keyValue) => keyValue.classList.remove('hidden'));
  };

  const createApp = () => {
    const content = createContent();
    document.body.append(content);
    keysCurrentValue()
  };

export default createApp;