export default class Card {
  constructor(data, cardSelector, handleCardClick, handleCardDelete) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this.likeCount = data.likes;
    // #8 add card like counter
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._likeButton.addEventListener("click", () => this._handleLikeIcon());
    // #6 only add delete button if its the users card
    this._deleteButton.addEventListener("click", () =>
      this._handleCardDelete(this._id)
    );
    // this._deleteButton.addEventListener("click", () =>
    //   this._handleDeleteCard()
    // );
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
    // #7 PUT and DELETE request with api
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getElement();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__description");
    this.cardLikeCount = this._cardElement.querySelector(".card__like-counter");

    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this.cardLikeCount.textContent = this.likeCount.length;
    return this._cardElement;
  }
}
