import Card from "../components/Card.js";
import {
  closePopup,
  openPopup,
  handleProfileFormSubmit,
  handleCardFormSubmit,
  addEventHandlers,
} from "../utils/utils.js";
import FormValidator from "../components/FormValidator.js";

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
const cardListEl = document.querySelector(".cards__list");

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template");
  card.renderCard(card, cardListEl);
});

// form validation
export const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editProfileForm = document.querySelector("#profile-edit-modal");
const addCardForm = document.querySelector("#profile-add-modal");

const editFormValidator = new FormValidator(config, editProfileForm);
const addFormValidator = new FormValidator(config, addCardForm);

editFormValidator.enableValidation(config, editFormValidator);
addFormValidator.enableValidation(config, addFormValidator);

// event handlers
addEventHandlers();
