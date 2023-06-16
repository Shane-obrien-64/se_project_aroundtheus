import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";
import "./index.css";
import { api } from "../components/Api.js";

// profile buttons
const profileAddBtn = document.querySelector("#profile-add-button");
const profileEditBtn = document.querySelector("#profile-edit-btn");
// forms
const editForm = document.querySelector("#profile-edit-modal");
const addForm = document.querySelector("#profile-add-modal");
// form inputs
const profileNameInput = editForm.querySelector("#profile-name-input");
const profileDescriptionInput = editForm.querySelector(
  "#profile-description-input"
);

const userInfo = new UserInfo("#profile-name", "#profile-des");

// functions
function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  profileEditPopup.close();
}

function handleCardFormSubmit(data) {
  const name = data.title;
  const link = data.imageUrl;
  const card = createCard({ name, link });
  cardSection.prependItem(card);
  profileAddPopup.close();
}

function handleDeleteCard() {
  // code here
}

function handleProfileImgFormSubmit() {
  // code here
}

function handleCardClick(name, link) {
  previewImagePopup.open(name, link);
}

function createCard(cardData) {
  const newCard = new Card(cardData, "#card-template", handleCardClick);
  return newCard.getView();
}

// section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardSection.appendItem(card);
    },
  },
  "#card-list"
);
cardSection.renderItems();

// popups
const previewImagePopup = new PopupWithImage("#preview-image-modal");
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
const profileAddPopup = new PopupWithForm(
  "#profile-add-modal",
  handleCardFormSubmit
);
const deleteCardPopup = new PopupWithForm(
  "#delete-image-modal",
  handleDeleteCard
);
const profileImagePopup = new PopupWithForm(
  "#edit-profile-img-modal",
  handleProfileImgFormSubmit
);

previewImagePopup.setEventListeners();
profileEditPopup.setEventListeners();
profileAddPopup.setEventListeners();
deleteCardPopup.setEventListeners();
profileImagePopup.setEventListeners();

// form validation

const editFormValidator = new FormValidator(config, editForm);
const addFormValidator = new FormValidator(config, addForm);
// const deleteFormValidator = new FormValidator(config,  form here );
// const profileImageFormValidator = new FormValidator(config,  form here );

editFormValidator.enableValidation();
addFormValidator.enableValidation();
// deleteCardPopup.enableValidation();
// profileImagePopup.enableValidation();

// event handlers
profileEditBtn.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  profileNameInput.value = user.name;
  profileDescriptionInput.value = user.description;
  profileEditPopup.open();
  editFormValidator.toggleButtonState();
});
profileAddBtn.addEventListener("click", () => {
  profileAddPopup.open();
  addFormValidator.toggleButtonState();
});
