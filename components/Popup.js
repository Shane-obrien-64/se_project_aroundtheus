export default class Popup {
  constructor({ popupSelector }) {
    this._popupEl = document.querySelector(popupSelector);
    this._closeIcon = this._popupEl.querySelector(".modal__close");
  }

  open() {
    this._popupEl.classList.add("modal__opened");
  }

  close = () => {
    this._popupEl.classList.remove("modal__opened");
  };

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
    this._popupEl.addEventListener("mousedown", this._closeOnOverlay);
    document.addEventListener("keydown", this._handleEscClose);
  }
  // removeEventListeners() {
  //   // this._closeIcon.removeEventListener("click", this.close);
  //   this._popupEl.removeEventListener("mousedown", this._closeOnOverlay);
  //   document.removeEventListener("keydown", this._handleEscClose);
  // }
}
