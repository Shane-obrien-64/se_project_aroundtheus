import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupEl.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupForm.querySelector(".modal__save");
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  _getInputValues() {
    const inputList = [...this._popupForm.querySelectorAll(".modal__input")];
    const inputData = {};
    inputList.forEach((input) => {
      inputData[input.name] = input.value;
    });
    return inputData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputData = this._getInputValues();
      this._handleFormSubmit(inputData);
      this.close();
    });
  }
}
