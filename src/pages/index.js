import Card from "../components/Card.js";
// import { closePopup, openPopup } from "../utils/utils.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

// profile edit
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// profile add
const profileAddBtn = document.querySelector("#profile-add-button");

// preview image

const cardListEl = document.querySelector("#card-list");

const userInfo = new UserInfo(profileName, profileDescription);

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  profileName.textContent = data.name;
  profileDescription.textContent = data.description;
  editFormValidator.toggleButtonState();
}

function handleCardFormSubmit(data) {
  const name = data.title;
  const link = data.imageUrl;
  const card = createCard({ name, link });
  cardListEl.prepend(card);
  addFormValidator.toggleButtonState();
}

function handleCardClick(name, link) {
  previewImagePopup.open(name, link);
}

const previewImagePopup = new PopupWithImage("#preview-image-modal");
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
const profileAddPopup = new PopupWithForm(
  "#profile-add-modal",
  handleCardFormSubmit
);

previewImagePopup.setEventListeners();
profileEditPopup.setEventListeners();
profileAddPopup.setEventListeners();

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

function createCard(cardData) {
  const newCard = new Card(cardData, "#card-template", handleCardClick);
  return newCard.getView();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardSection.addItem(card);
    },
  },
  "#card-list"
);
cardSection.renderItems();

// form validation
export const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  config,
  profileEditPopup._popupForm
);
const addFormValidator = new FormValidator(config, profileAddPopup._popupForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// event handlers
profileEditBtn.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  profileNameInput.value = user.name.textContent;
  profileDescriptionInput.value = user.description.textContent;
  profileEditPopup.open();
});
profileAddBtn.addEventListener("click", () => profileAddPopup.open());
