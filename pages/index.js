import Card from "../components/Card.js";
import {
  closePopup,
  openPopup,
  handleProfileFormSubmit,
  handleCardFormSubmit,
} from "../utils/utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddBtn = document.querySelector("#profile-add-button");
const profileAddModal = document.querySelector("#profile-add-modal");
const editModalCloseBtn = profileEditModal.querySelector(
  "#edit-modal-close-btn"
);
const addModalCloseBtn = profileAddModal.querySelector("#add-modal-close-btn");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewModalCloseBtn = previewImageModal.querySelector(
  "#image-modal-close-btn"
);
const addCardSubmitBtn = profileAddModal.querySelector("#add-card-form-btn");

const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileAddForm = profileAddModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = profileAddForm.querySelector("#add-title-input");
const cardUrlInput = profileAddForm.querySelector("#add-url-input");

// function closeModalOnRemoteClick(e) {
//   if (e.target === e.currentTarget) {
//     closePopup(e.target);
//   }
// }

// function handleEscape(event) {
//   const openedModal = document.querySelector(".modal_opened");
//   if (event.key === "Escape") {
//     closePopup(openedModal);
//   }
// }

// function closePopup(modal) {
//   modal.classList.remove("modal_opened");
//   modal.removeEventListener("mousedown", closeModalOnRemoteClick);
//   document.removeEventListener("keydown", handleEscape);
// }

// function openPopup(modal) {
//   modal.classList.add("modal_opened");
//   modal.addEventListener("mousedown", closeModalOnRemoteClick);
//   document.addEventListener("keydown", handleEscape);
// }

// Card.js
// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__description");
//   const likeBtn = cardElement.querySelector(".card__like-button");
//   const deleteBtn = cardElement.querySelector(".card__delete-button");
//   const previewImage = previewImageModal.querySelector(".modal__image");
//   const imageDescription = previewImageModal.querySelector(
//     ".modal__image-description"
//   );

//   deleteBtn.addEventListener("click", () => {
//     cardElement.remove();
//   });

// move to card.js v
// cardImageEl.addEventListener("click", () => {
//   previewImage.src = cardData.link;
//   previewImage.alt = cardData.name;
//   imageDescription.textContent = cardData.name;
//   openPopup(previewImageModal);
// });

//   likeBtn.addEventListener("click", () => {
//     likeBtn.classList.toggle("card__like-button_active");
//   });

//   cardImageEl.src = cardData.link;
//   cardImageEl.alt = cardData.name;
//   cardTitleEl.textContent = cardData.name;

//   return cardElement;
// }

function renderCard(card, list) {
  const cardElement = card.getView();
  list.prepend(cardElement);
}

// function handleProfileFormSubmit(e) {
//   e.preventDefault();
//   profileName.textContent = profileNameInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   closePopup(profileEditModal);
// }

// function handleCardFormSubmit(e) {
//   e.preventDefault();
//   const name = cardTitleInput.value;
//   const link = cardUrlInput.value;
//   const card = new Card({ name, link }, "#card-template");

//   renderCard(card, cardListEl);
//   closePopup(profileAddModal);
//   profileAddForm.reset();
//   toggleButtonState([cardTitleInput, cardUrlInput], addCardSubmitBtn, config);
// }

// event listeners
profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});
profileAddBtn.addEventListener("click", () => openPopup(profileAddModal));
editModalCloseBtn.addEventListener("click", () => closePopup(profileEditModal));
addModalCloseBtn.addEventListener("click", () => closePopup(profileAddModal));
previewModalCloseBtn.addEventListener("click", () =>
  closePopup(previewImageModal)
);

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
profileAddForm.addEventListener("submit", handleCardFormSubmit);

// card.getView();
// console.log(card._cardElement);
// renderCard(card, cardListEl);

// loops
// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template");
  renderCard(card, cardListEl);
});
