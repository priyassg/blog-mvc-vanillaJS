const store = new Store('blog-app');

const template = new Template();
const view = new View(template);

const controller = new Controller(store, view);

const init = () => controller.init();

window.addEventListener('load', init);
