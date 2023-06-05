import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupEl = document.querySelector(popupSelector);
    this._popupImage = this._popupEl.querySelector(".modal__image");
    this._popupTitle = this._popupEl.querySelector(".modal__image-description");
  }

  open(title, link) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = title;
    this._popupTitle.textContent = title;
  }
}
