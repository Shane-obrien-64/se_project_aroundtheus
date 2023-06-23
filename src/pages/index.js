import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { config } from "../utils/constants.js";
import Api from "../components/Api.js";
import "./index.css";
import { data } from "autoprefixer";

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "cd56466a-c69a-4082-86d8-efb553341f31",
    "Content-Type": "application/json",
  },
});

// profile buttons
const profileAddBtn = document.querySelector("#profile-add-button");
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileImgEditBtn = document.querySelector("#edit-avatar-btn");
// forms
const editForm = document.querySelector("#profile-edit-modal");
const addForm = document.querySelector("#profile-add-modal");
// form inputs
const profileNameInput = editForm.querySelector("#profile-name-input");
const profileDescriptionInput = editForm.querySelector(
  "#profile-description-input"
);

const userInfo = new UserInfo("#profile-name", "#profile-des");

api
  .getUserinfo()
  .then((data) => {
    const { name, about } = data;
    userInfo.setUserInfo(name, about);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// functions
function handleProfileFormSubmit(data) {
  const name = data.name;
  const about = data.about;

  api
    .updateProfile(name, about)
    .then((res) => {
      userInfo.setUserInfo(name, about);
      // console.log(name, about);
      console.log(res);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  profileEditPopup.close();
}

function handleCardFormSubmit(data) {
  api.postCard(data).then((res) => {
    console.log(res);
  });
  const name = data.name;
  const link = data.link;
  const card = createCard({ name, link });
  cardSection.prependItem(card);
  profileAddPopup.close();
  // #10 btn text content changes while saving
}

function handleDeleteCardSubmit(cardId) {
  console.log(cardId + " submited");
  deleteCardPopup.close();
  // this one works!! v
  // api
  //   .deleteCard(cardId)
  //   .then((res) => {
  //     console.log(res);
  //     cardSection.remove;
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
}

function handleDeleteIcon(cardId) {
  deleteCardPopup.open(cardId);
}

function handleProfileImgFormSubmit(data) {
  api
    .updateProfileImg(data)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function handleCardClick(name, link) {
  previewImagePopup.open(name, link);
}

function createCard(cardData) {
  const newCard = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    handleDeleteIcon
  );
  return newCard.getView();
}

// render initial cards
let cardSection;
api.getInitialCards().then((result) => {
  cardSection = new Section(
    {
      items: result,
      renderer: (item) => {
        const card = createCard(item);
        cardSection.appendItem(card);
      },
    },
    "#card-list"
  );
  cardSection.renderItems();
});

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
  handleDeleteCardSubmit
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
profileImgEditBtn.addEventListener("click", () => {
  profileImagePopup.open();
  // profileImagePopup.enableValidation();
});
