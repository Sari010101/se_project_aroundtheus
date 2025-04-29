class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formEl;
  }

  _showInputError(inputEl, errorMessageEl) {
    const errorMessageEl = this._form.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl, errorMessageEl) {
    const errorMessageEl = this._form.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.classList.remove(this._errorClass);
    errorMessageEl.textContent = "";
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return showInputError(this._form, inputEl, inputEl.validationMessage);
    }
    hideInputError(this._form, inputEl, settings);
  }

  _toggleButtonState() {
    if (hasInvalidInput(inputEls)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
      return;
    }
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  _hasInvalidInput() {
    return !inputEls.every((inputEl) => {
      return inputEl.validity.valid;
    });
  }

  _setEventListeners() {
    const inputEls = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState();

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(this._form, inputEl, settings);
        this._toggleButtonState();
      });
    });
  }

  _enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(this._form, settings);
  }
}

export default FormValidator;
