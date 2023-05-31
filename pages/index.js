import Card from "../components/Card.js";
import { closePopup, openPopup } from "../utils/utils.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
  editFormValidator.toggleButtonState();
}

function handleCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const card = createCard({ name, link });
  cardListEl.prepend(card);
  closePopup(profileAddModal);
  profileAddForm.reset();
  addFormValidator.toggleButtonState();
}

const profileEditModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit();
);
const profileAddModal = new PopupWithForm(
  "#profile-add-modal",
  handleCardFormSubmit();
);

// profile edit
const profileEditBtn = document.querySelector("#profile-edit-btn");
// const profileEditModal = document.querySelector("#profile-edit-modal");
// const editModalCloseBtn = profileEditModal.querySelector(
//   "#edit-modal-close-btn"
// );
// const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// profile add
const profileAddBtn = document.querySelector("#profile-add-button");
// const profileAddModal = document.querySelector("#profile-add-modal");
// const addModalCloseBtn = profileAddModal.querySelector("#add-modal-close-btn");
// const profileAddForm = profileAddModal.querySelector(".modal__form");
// const addCardSubmitBtn = profileAddModal.querySelector("#add-card-form-btn");
const cardTitleInput =
  profileAddModal._popupForm.querySelector("#add-title-input");
const cardUrlInput = profileAddForm.querySelector("#add-url-input");

// preview image
const previewImageModal = document.querySelector("#preview-image-modal");
const previewModalCloseBtn = previewImageModal.querySelector(
  "#image-modal-close-btn"
);

// const cardListEl = document.querySelector(".cards__list");

// card rendering
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

const cardList = new Section({ items, renderer }, "#card-list");

function createCard(cardData) {
  const newCard = new Card(cardData, "#card-template");
  return newCard.getView();
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  cardListEl.append(card);
});

// form validation
export const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, profileAddForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// event handlers
profileEditBtn.addEventListener("click", () => {
  // replace with getUserInfo
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditPopup.open();
});
profileAddBtn.addEventListener("click", () => openPopup(profileAddModal));
// editModalCloseBtn.addEventListener("click", () => closePopup(profileEditModal));
// addModalCloseBtn.addEventListener("click", () => closePopup(profileAddModal));

previewModalCloseBtn.addEventListener("click", () =>
  closePopup(previewImageModal)
);

// profileEditForm.addEventListener("submit", handleProfileFormSubmit);
// profileAddForm.addEventListener("submit", handleCardFormSubmit);
