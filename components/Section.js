export default class Section {
  constructor({ items, renderer }, sectionSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(sectionSelector);
  }

  rendererItems() {
    this._items.forEach((item) => this._renderer(item));
  }
  addItem(element) {
    this._container.append(element);
  }
}
