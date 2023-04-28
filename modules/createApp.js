
const createElement = (tag, classList, content = '') => {
    const element = document.createElement(tag);
    element.classList = classList;
    element.innerHTML = content;
    return element;
  };



const createContent = () => {
    const container = createElement('div', 'container');
    const info = createElement('div', 'info');
    const infoTitle = createElement('h1', 'info__title', 'Virtual Keyboard');
    const infoDescription = createElement('p', 'info__description', 'Клавиатура создана в ОС Windows<br>Для переключения языка комбинация: левыe shift + alt');
    const textarea = createElement('textarea', 'textarea');
    const keyboard = createElement('div', 'keyboard');
  
  
    info.append(infoTitle, infoDescription);
    container.append(info, textarea, keyboard);
    return container;
  };
  

  const createApp = () => {
    const content = createContent();
    document.body.append(content);
  };

export default createApp;