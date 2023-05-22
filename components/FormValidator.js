export default class FormValidator {
  constructor(config, formElement) {
    this._form = formElement;

    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError(_form, inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(_form, inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(_form, inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(this._form, inputEl);
    } else {
      this._hideInputError(this._form, inputEl);
    }
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _enableButton(submitButton, _inactiveButtonClass) {
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  _disableButton(submitButton, _inactiveButtonClass) {
    submitButton.classList.add(this._inactiveButtonClass);
    submitButton.disabled = true;
  }

  _toggleButtonState(inputEls, submitButton, _inactiveButtonClass) {
    if (this._hasInvalidInput(inputEls)) {
      this._disableButton(submitButton, this._inactiveButtonClass);
    } else {
      this._enableButton(submitButton, this._inactiveButtonClass);
    }
  }

  _setEventListeners(_form, config) {
    const inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    const submitButton = this._form.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputEls, submitButton, config);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(this._form, inputEl);
        this._toggleButtonState(inputEls, submitButton, config);
      });
    });
  }

  enableValidation(config) {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners(this._form, config);
  }
}
