export default class Popup {
  constructor({ popupSelector }) {
    this._popupEl = document.querySelector(popupSelector);
    this._closeIcon = this._popupEl.querySelector(".modal__close");
    this.close = this.close.bind(this);
  }

  open() {
    this._popupEl.classList.add("modal__opened");
    this._popupEl.addEventListener("mousedown", this._closeOnOverlay);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupEl.classList.remove("modal__opened");
    this._popupEl.removeEventListener("mousedown", this._closeOnOverlay);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  _closeOnOverlay = (e) => {
    if (e.target === e.currentTarget) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeIcon.addEventListener("click", this.close);
  }
}
