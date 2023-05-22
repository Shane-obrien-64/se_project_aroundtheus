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
