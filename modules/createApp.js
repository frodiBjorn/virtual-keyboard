
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
  
  
    info.append(infoTitle, infoDescription);
    wrapper.append(info, textarea, keyboard);
    return wrapper;
  };
  

  const createApp = () => {
    const content = createContent();
    document.body.append(content);
  };

export default createApp;