import { closePopup, openPopup } from "../utils/utils.js";

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeicon();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        const previewImageModal = document.querySelector(
          "#preview-image-modal"
        );
        const previewImage = previewImageModal.querySelector(".modal__image");
        const imageDescription = previewImageModal.querySelector(
          ".modal__image-description"
        );

        previewImage.src = this._link;
        previewImage.alt = this._name;
        imageDescription.textContent = this._name;
        openPopup(previewImageModal);
      });
  }

  _handleLikeicon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  getView() {
    // get the card view
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__description");
    // set event listeners
    this._setEventListeners();
    // return the card
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    console.log("boom");
    return this._cardElement;
  }
  renderCard(card, list) {
    const cardElement = card.getView();
    list.prepend(cardElement);
    console.log("bam");
  }
}
