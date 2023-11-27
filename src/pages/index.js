import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { config } from "../utils/constants.js";
import Api from "../components/Api.js";
import "./index.css";
import { data } from "autoprefixer";

const api = new Api({
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
const profileImageForm = document.querySelector("#edit-profile-img-modal");
// form inputs
const profileNameInput = editForm.querySelector("#profile-name-input");
const profileDescriptionInput = editForm.querySelector(
  "#profile-description-input"
);

const userInfo = new UserInfo(
  "#profile-name",
  "#profile-des",
  "#profile-image"
);

let userId;
let cardSection;

// functions
function handleProfileFormSubmit(data) {
  const { name, about } = data;
  profileEditPopup.editSubmitBtn();
  api
    .updateProfile(name, about)
    .then(() => {
      userInfo.setUserInfo(name, about);
    })
    .then(() => {
      profileEditPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileEditPopup.resetSubmitBtn();
    });
}

function handleCardFormSubmit(data) {
  profileAddPopup.editSubmitBtn();
  api
    .postCard(data)
    .then((data) => {
      const card = createCard(data);
      cardSection.prependItem(card);
    })
    .then(() => {
      profileAddPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileAddPopup.resetSubmitBtn();
    });
}

function handleDeleteIcon(cardId, card) {
  deleteCardPopup.open(cardId);
  deleteCardPopup.setSubmitAction(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.remove();
      })
      .then(() => {
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function handleProfileImgFormSubmit(data) {
  profileImagePopup.editSubmitBtn();
  api
    .updateProfileImg(data.link)
    .then(() => {
      userInfo.setUserProfileImage(data.link);
    })
    .then(() => {
      profileImagePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileImagePopup.resetSubmitBtn();
    });
}

function handleCardClick(name, link) {
  previewImagePopup.open(name, link);
}

function addLike(card) {
  api
    .addLike(card._id)
    .then((res) => {
      card.cardLikeCount.textContent = res.likes.length;
    })
    .then(() => {
      card.likeCard();
      card.updateLikeIcon();
    })
    .catch((err) => {
      console.error(err);
    });
}

function deleteLike(card) {
  api
    .deleteLike(card._id)
    .then((res) => {
      card.cardLikeCount.textContent = res.likes.length;
    })
    .then(() => {
      card.unlikeCard();
      card.updateLikeIcon();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleCardLike(card) {
  if (card.isLiked) {
    deleteLike(card);
  } else {
    addLike(card);
  }
}

function createCard(cardData) {
  const newCard = new Card(
    cardData,
    "#card-template",
    userId,
    handleCardClick,
    handleCardLike,
    handleDeleteIcon
  );
  return newCard.getView();
}

// render initial data
api
  .getInitialData()
  .then((res) => {
    const { name, about, avatar, _id } = res[1];
    userId = _id;
    userInfo.setUserInfo(name, about);
    userInfo.setUserProfileImage(avatar);

    cardSection = new Section(
      {
        items: res[0],
        renderer: (item) => {
          const card = createCard(item);
          cardSection.appendItem(card);
        },
      },
      "#card-list"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
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
const deleteCardPopup = new PopupDeleteCard("#delete-image-modal");
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
const profileImageFormValidator = new FormValidator(config, profileImageForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
profileImageFormValidator.enableValidation();

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
  profileImageFormValidator.toggleButtonState();
});
