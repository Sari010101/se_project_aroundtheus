class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formEl;
    this._inputEls = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`.${inputEl.id}-error`);
    if (!errorMessageEl) return;
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`.${inputEl.id}-error`);
    if (!errorMessageEl) return;
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.classList.remove(this._errorClass);
    errorMessageEl.textContent = "";
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _toggleButtonState() {
    if (!this._submitButton) {
      this._submitButton = this._form.querySelector(this._submitButtonSelector);
    }
    if (this._hasInvalidInput(this._inputEls)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _hasInvalidInput(inputEls) {
    return !inputEls.every((inputEl) => {
      return inputEl.validity.valid;
    });
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputElements.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
