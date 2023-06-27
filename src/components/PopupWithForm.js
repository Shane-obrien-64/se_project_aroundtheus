import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupEl.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupForm.querySelector(".modal__save");
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const inputList = [...this._popupForm.querySelectorAll(".modal__input")];
    const inputData = {};
    inputList.forEach((input) => {
      inputData[input.name] = input.value;
    });
    return inputData;
  }

  editSubmitBtn() {
    this._submitButton.textContent = "Saving...";
  }

  resetSubmitBtn() {
    this._submitButton.textContent = "Save";
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputData = this._getInputValues();
      this._handleFormSubmit(inputData);
    });
  }
}
