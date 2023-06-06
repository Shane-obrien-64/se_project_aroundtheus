import Card from "../components/Card.js";
// import { closePopup, openPopup } from "../utils/utils.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";
import "./index.css";

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

const userInfo = new UserInfo("#profile-name", "#profile-description");

// functions
function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  editFormValidator.toggleButtonState();
  profileEditPopup.close();
}

function handleCardFormSubmit(data) {
  const name = data.title;
  const link = data.imageUrl;
  const card = createCard({ name, link });
  cardSection.prependItem(card);
  profileAddPopup.close();
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

previewImagePopup.setEventListeners();
profileEditPopup.setEventListeners();
profileAddPopup.setEventListeners();

// form validation

const editFormValidator = new FormValidator(config, editForm);
const addFormValidator = new FormValidator(config, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// event handlers
profileEditBtn.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  profileNameInput.value = user.name;
  profileDescriptionInput.value = user.description;
  profileEditPopup.open();
});
profileAddBtn.addEventListener("click", () => profileAddPopup.open());
