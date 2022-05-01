import React from "react";

const PopupWithForm = ({
  innerButtonText,
  closeAllPopup,
  formName,
  heading,
  isOpened,
  isUploading,
  name,
  onSubmit,
  selector,
  submit,
  title,
  children,
}) => {
  const popupClassName = `${
    isOpened ? `${selector} popup_opened` : `${selector}`
  }`;

  return (
    <div className={popupClassName}>
      <form
        className={`${formName}`}
        id={`${name}__form`}
        name={`${name}`}
        onSubmit={onSubmit}
        noValidate
      >
        <button
          type="button"
          className="close-btn close-btn_profile"
          onClick={closeAllPopup}
        ></button>

        <h2 className={heading}>{title}</h2>

        <fieldset className="form__input-container input">
          {children}
          <button
            type="submit"
            className={`submit-btn submit-btn_${name} ${submit} button`}
          >
            {isUploading ? "Выполнение..." : innerButtonText}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default PopupWithForm;
