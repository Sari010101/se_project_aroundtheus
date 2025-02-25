const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
git;
const formEl = document.querySelector(config.formSelector);
const inputEl = formEl.querySelector(config.inputSelector);

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl) {
  const errorMessageEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.remove("modal__input_type_error");
  errorMessageEl.classList.remove("modal__error_visible");
  errorMessageEl.textContent = "";
}

function checkInputValidity(formEl, inputEl) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, inputEl.validationMessage);
  }
  hideInputError(formEl, inputEl);
}

function hasInvalidInput(inputEls) {
  return !inputEls.every((inputEl) => {
    return inputEl.validity.valid;
  });
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formEl, config) {
  const { inputSelector } = config;
  const inputEls = Array.from(formEl.querySelectorAll(inputSelector));
  const submitButton = formEl.querySelector(".modal__button");
  toggleButtonState(inputEls, submitButton, config);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputEls, submitButton, config);
    });
  });
}

function enableValidation(config) {
  const formEls = Array.from(document.querySelectorAll(config.formSelector));
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formEl, config);
  });
}

enableValidation(config);
