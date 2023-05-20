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

  renderCard(card, cardListEl);
  closePopup(profileAddModal);
  profileAddForm.reset();
  // toggleButtonState needs to be imported?
  toggleButtonState([cardTitleInput, cardUrlInput], addCardSubmitBtn, config);
}
