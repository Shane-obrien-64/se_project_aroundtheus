export default class Section {
  constructor({ items, renderer }, sectionSelector) {
    this._items = items;
    this._renderer = renderer;
    this._sectionSelector = sectionSelector;
    this._container = document.querySelector(this._sectionSelector);
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }
  addItem(element) {
    this._container.append(element);
  }
}
