import React from "react";
import Popup from "./Popup";

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
    <Popup className={popupClassName} closeAllPopup={closeAllPopup}>
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
        />

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
    </Popup>
  );
};

export default PopupWithForm;
