import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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
    name: "Bald Mountain",
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

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card-template");
card.getView();

// Elements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
// const profileCloseButton = profileEditModal.querySelector(
//   "#profile-close-button"
// );
const profileTitle = document.querySelector(".profile-title");
const profileDescription = document.querySelector(".profile-description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileFormEl = profileEditModal.querySelector(".modal__form");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const addButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormEl = addCardModal.querySelector(".modal__form");
const cardCloseButton = addCardModal.querySelector("#card-close-button");

const cardTitleInput = addCardFormEl.querySelector(".modal__input_type_title");
const cardUrlInput = addCardFormEl.querySelector(".modal__input_type_url");
const previewModal = document.querySelector("#preview-modal");
const modalImageEl = previewModal.querySelector(".modal__image");
const modalCaptionEl = previewModal.querySelector(".modal__caption");
// const previewModalCloseButton = previewModal.querySelector(
//   ".modal__close_type_preview"
// );
const closeButtons = document.querySelectorAll(".modal__close");

// Functions

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.addEventListener("click", () => {
    openPopup(previewModal);
    modalImageEl.src = cardData.link;
    modalImageEl.alt = cardData.name;
    modalCaptionEl.textContent = cardData.name;
  });

  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", handleLikeButton);
  // const cardTrashButton = cardElement.querySelector(".card__trash-button");
  // cardTrashButton.addEventListener("click", handleDeleteCard);
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("mousedown", closeOverlay);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("mousedown", closeOverlay);
}

function closeOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closePopup(evt.target);
  }
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closePopup(openModal);
  }
}

// Event Handlers
const handleLikeButton = (e) => {
  e.target.classList.toggle("card__like-button_active");
};
// const handleDeleteCard = (e) => {
//   e.target.closest(".card").remove();
// };

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  e.target.reset();
  closePopup(addCardModal);
}

// Event Listeners

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileFormEl.addEventListener("submit", handleProfileEditSubmit);
addCardFormEl.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

addButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

// Validation

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(validationSettings, profileFormEl);
const addFormValidator = new FormValidator(validationSettings, addCardFormEl);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
