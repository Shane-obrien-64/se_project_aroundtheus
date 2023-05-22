import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { config } from "../pages/index.js";

// profile edit
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const editModalCloseBtn = profileEditModal.querySelector(
  "#edit-modal-close-btn"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// profile add
const profileAddBtn = document.querySelector("#profile-add-button");
const profileAddModal = document.querySelector("#profile-add-modal");
const addModalCloseBtn = profileAddModal.querySelector("#add-modal-close-btn");
const profileAddForm = profileAddModal.querySelector(".modal__form");
const addCardSubmitBtn = profileAddModal.querySelector("#add-card-form-btn");
const cardTitleInput = profileAddForm.querySelector("#add-title-input");
const cardUrlInput = profileAddForm.querySelector("#add-url-input");

// preview image
const previewImageModal = document.querySelector("#preview-image-modal");
const previewModalCloseBtn = previewImageModal.querySelector(
  "#image-modal-close-btn"
);

const cardListEl = document.querySelector(".cards__list");

function closeModalOnRemoteClick(e) {
  if (e.target === e.currentTarget) {
    closePopup(e.target);
  }
}

function handleEscape(e) {
  const openedModal = document.querySelector(".modal_opened");
  if (e.key === "Escape") {
    closePopup(openedModal);
  }
}

export function closePopup(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
  document.removeEventListener("keydown", handleEscape);
}

export function openPopup(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
  document.addEventListener("keydown", handleEscape);
}

export function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

export function handleCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const card = new Card({ name, link }, "#card-template");

  card.renderCard(card, cardListEl);
  closePopup(profileAddModal);
  profileAddForm.reset();
  const validator = new FormValidator(config, profileAddForm);
  validator._toggleButtonState(
    [cardTitleInput, cardUrlInput],
    addCardSubmitBtn,
    config
  );
}

export function addEventHandlers() {
  profileEditBtn.addEventListener("click", () => {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openPopup(profileEditModal);
  });
  profileAddBtn.addEventListener("click", () => openPopup(profileAddModal));
  editModalCloseBtn.addEventListener("click", () =>
    closePopup(profileEditModal)
  );
  addModalCloseBtn.addEventListener("click", () => closePopup(profileAddModal));
  previewModalCloseBtn.addEventListener("click", () =>
    closePopup(previewImageModal)
  );

  profileEditForm.addEventListener("submit", handleProfileFormSubmit);
  profileAddForm.addEventListener("submit", handleCardFormSubmit);
}
