import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupForm.querySelector(".modal__save");
  }

  close() {
    this._popupForm.reset();
    super.close;
  }

  setEventListeners() {
    this._submitButton.addEventListeners("submit", this._handleFormSubmit);
    super.setEventListeners;
  }

  _getInputValues() {
    // figure this out.
  }
}

const profileEditModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
const profileAddModal = new PopupWithForm(
  "#profile-add-modal",
  handleCardFormSubmit
);
