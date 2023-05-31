export default class Popup {
  constructor({ popupSelector }) {
    this._popupEl = document.querySelector(popupSelector);
    this._closeIcon = this._popupEl.querySelector(".modal__close");
  }

  open() {
    this._popupEl.classList.add("modal_opened");
    this.setEventListeners();
  }

  // figure out how to go about removing event listeners,
  // or if its even needed
  // classlist.toggle?
  close() {
    this._popupEl.classList.remove("modal_opened");
    this._popupEl.removeEventListener("mousedown", replaceMe);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }
  closeOnOverlay(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeIcon.addEventListener("click", this.close);
    this._popupEl.addEventListener("mousedown", this.closeOnOverlay);
    document.addEventListener("keydown", this._handleEscClose);
  }
}
