const createKey = (keyCode, keyValues) => {
    const keyboardKey = document.createElement('div');
    keyboardKey.classList = `keyboard__key keyboard__key-${keyCode}`;
    keyboardKey.append(createSpanKey(keyValues.en, 'en'));
    keyboardKey.append(createSpanKey(keyValues.ru, 'ru'));
    keyboardKey.append(createSpanKey(keyValues.shiftEn, 'shiftEn'));
    keyboardKey.append(createSpanKey(keyValues.shiftRu, 'shiftRu'));
    keyboardKey.append(createSpanKey(keyValues.capsLockEn, 'capsLockEn'));
    keyboardKey.append(createSpanKey(keyValues.capsLockRu, 'capsLockRu'));
    return keyboardKey;
  };
  
  const createSpanKey = (key, className) => {
    const keyboardKey = document.createElement('span');
    keyboardKey.classList = `keyboard__key-${className}`;
    keyboardKey.innerHTML = key;
    return keyboardKey;
  };
  
  export default createKey;