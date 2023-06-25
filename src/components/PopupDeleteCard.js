import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupEl.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector(".modal__save");
  }
  open(cardId) {
    super.open();
    this._cardId = cardId;
    // this.setEventListeners(cardId);
  }

  setSubmitAction(action) {
    this._handleSubmitAction = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmitAction(this._cardId);
    });
  }
}
