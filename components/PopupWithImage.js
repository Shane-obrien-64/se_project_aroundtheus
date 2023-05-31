import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupEl = document.querySelector(popupSelector);
    this._popupImage = this._popupEl.querySelector(".modal__image");
    this._popupTitle = this._popupEl.querySelector(".modal__image-description");
  }

  open() {
    super.open;
    // figure out how to find the card values
    // pass values in a peremeters?
    // this._popupImage.src = ;
    // this._popupImage.alt = ;
    // this._popupTitle.textContent = ;
  }
}
