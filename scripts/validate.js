const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.classList.remove(errorClass);
  errorMessageEl.textContent = "";
}

function checkInputValidity(formEl, inputEl, settings) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, inputEl.validationMessage);
  }
  hideInputError(formEl, inputEl, settings);
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

function setEventListeners(formEl, settings) {
  const { inputSelector } = settings;
  const { submitButtonSelector } = settings;
  const inputEls = Array.from(formEl.querySelectorAll(inputSelector));
  const submitButton = formEl.querySelector(submitButtonSelector);
  toggleButtonState(inputEls, submitButton, settings);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, settings);
      toggleButtonState(inputEls, submitButton, settings);
    });
  });
}

function enableValidation(settings) {
  const formEls = Array.from(document.querySelectorAll(settings.formSelector));
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formEl, settings);
  });
}

enableValidation(config);
