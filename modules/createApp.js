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
  const infoDescription = createElement(
    'p',
    'info__description',
    'Клавиатура создана в ОС Windows<br>Для переключения языка комбинация: левыe shift + alt',
  );
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
  if (
    lang.isEnLang
        && ((!isShift && !isCapsLock) || (isShift && isCapsLock))
  ) {
    currentState = 'en';
  } else if (
    !lang.isEnLang
        && ((!isShift && !isCapsLock) || (isShift && isCapsLock))
  ) {
    currentState = 'ru';
  } else if (lang.isEnLang && isShift) {
    currentState = 'shiftEn';
  } else if (!lang.isEnLang && isShift) {
    currentState = 'shiftRu';
  } else if (lang.isEnLang && isCapsLock) {
    currentState = 'capsLockEn';
  } else {
    currentState = 'capsLockRu';
  }
};
const keysCurrentValue = () => {
  setCurrentState();
  const valuesOfKeys = document.querySelectorAll('.keyboard__key span');
  const currentValueOfKeys = document.querySelectorAll(
    `.keyboard__key-${currentState}`,
  );
  valuesOfKeys.forEach((key) => key.classList.add('hidden'));
  currentValueOfKeys.forEach((keyValue) => keyValue.classList.remove('hidden'));
};

const addKeyboardHandler = () => {
  const keyboard = document.querySelector('.keyboard');
  const pressedKeys = new Set();

  const keydownHandler = (e) => {
    const keyCode = e.code;
    const key = document.querySelector(`.keyboard__key-${keyCode}`);
    key.classList.add('active');
    pressedKeys.add(keyCode);
    checkChangeLang(pressedKeys);
    keysCurrentValue();
    checkKey(keyCode);
    e.preventDefault();
  };
  const keyupHandler = (e) => {
    const key = document.querySelector(`.keyboard__key-${e.code}`);
    if (e.code !== 'CapsLock') {
      key.classList.remove('active');
    }
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      isShift = false;
      keysCurrentValue();
    }
    pressedKeys.delete(e.code);
  };
  const keyboardHandler = (e) => {
    const eventTarget = e.target;
    const key = eventTarget.closest('.keyboard__key');
    if (!key) return;
    const keyCode = key.classList[1].split('-')[1];
    checkKey(keyCode);
  };

  document.addEventListener('keydown', keydownHandler);
  document.addEventListener('keyup', keyupHandler);
  keyboard.addEventListener('click', keyboardHandler);
};
const checkKey = (key) => {
  const keyDom = document.querySelector(`.keyboard__key-${key}`);
  if (key === 'ShiftLeft' || key === 'ShiftRight') {
    isShift = !isShift;
    if (isShift) {
      keyDom.classList.add('active');
    } else {
      keyDom.classList.remove('active');
    }
    keysCurrentValue();
  } else if (key === 'CapsLock') {
    isCapsLock = !isCapsLock;
    if (isCapsLock) {
      keyDom.classList.add('active');
    } else {
      keyDom.classList.remove('active');
    }
    keysCurrentValue();
  } else if (key === 'Tab') {
    setValueInTextarea('\t');
  } else if (key === 'Enter') {
    setValueInTextarea('\n');
  } else if (
    key === 'ControlLeft'
        || key === 'ControlRight'
        || key === 'AltLeft'
        || key === 'AltRight'
        || key === 'MetaLeft'
  ) {
    return;
  } else if (key === 'Delete' || key === 'Backspace') {
    deleteValueInTextarea(key);
  } else {
    const keyValue = keys[key][currentState];
    setValueInTextarea(keyValue);
  }
};
const setValueInTextarea = (value) => {
  const textarea = document.querySelector('.textarea');
  const indexOfCursor = textarea.selectionStart;
  textarea.value = textarea.value.slice(0, indexOfCursor)
        + value
        + textarea.value.slice(indexOfCursor);
  textarea.selectionStart = indexOfCursor + 1;
  textarea.selectionEnd = indexOfCursor + 1;
};
const deleteValueInTextarea = (key) => {
  const textarea = document.querySelector('.textarea');
  const indexOfCursor = textarea.selectionStart;
  const indexOfValue = key === 'Delete' ? indexOfCursor : indexOfCursor - 1;
  textarea.value = textarea.value.slice(0, indexOfValue)
        + textarea.value.slice(indexOfValue + 1);
  textarea.selectionStart = indexOfValue;
  textarea.selectionEnd = indexOfValue;
};
const checkChangeLang = (pressedKeys) => {
  if (pressedKeys.has('ShiftLeft') && pressedKeys.has('AltLeft')) {
    lang.isEnLang = !lang.isEnLang;
    keysCurrentValue();
  }
};
const createApp = () => {
  const content = createContent();
  document.body.append(content);
  keysCurrentValue();
  addKeyboardHandler();
};

export default createApp;
