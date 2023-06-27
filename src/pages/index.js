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
  api
    .updateProfile(name, about)
    .then(profileEditPopup.editSubmitBtn())
    .then(() => {
      userInfo.setUserInfo(name, about);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileEditPopup.resetSubmitBtn();
      profileEditPopup.close();
    });
}

function handleCardFormSubmit(data) {
  api
    .postCard(data)
    .then(profileAddPopup.editSubmitBtn())
    .then((data) => {
      const card = createCard(data);
      cardSection.prependItem(card);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileAddPopup.resetSubmitBtn();
      profileAddPopup.close();
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
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        deleteCardPopup.close();
      });
  });
}

function handleProfileImgFormSubmit(data) {
  api
    .updateProfileImg(data.link)
    .then(profileImagePopup.editSubmitBtn())
    .then(() => {
      userInfo.setUserProfileImage(data.link);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileImagePopup.resetSubmitBtn();
      profileImagePopup.close();
    });
}

function handleCardClick(name, link) {
  previewImagePopup.open(name, link);
}
function addLike(cardId, likeCounter, likeBtn) {
  api
    .addLike(cardId)
    .then((res) => {
      likeCounter.textContent = res.likes.length;
      console.log(likeBtn);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      likeBtn.classList.add("card__like-button_active");
    });
}

function deleteLike(cardId, likeCounter, likeBtn) {
  api
    .deleteLike(cardId)
    .then((res) => {
      likeCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      likeBtn.classList.remove("card__like-button_active");
    });
}

function handleCardLike(cardId, isLiked, likeCounter, likeBtn) {
  if (isLiked) {
    deleteLike(cardId, likeCounter, likeBtn);
  } else {
    addLike(cardId, likeCounter, likeBtn);
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
