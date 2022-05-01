import React from "react";

const PopupWithForm = (props) => {
  const popupClassName = `${
    props.isOpened ? `${props.selector} popup_opened` : `${props.selector}`
  }`;

  return (
    <div className={popupClassName}>
      <form
        className={`${props.formName}`}
        id={`${props.name}__form`}
        name={`${props.name}`}
        onSubmit={props.onSubmit}
        noValidate
      >
        <button
          type="button"
          className="close-btn close-btn_profile"
          onClick={props.closeAllPopup}
        ></button>

        <h2 className={props.heading}>{props.title}</h2>

        <fieldset className="form__input-container input">
          {props.children}
          <button
            type="submit"
            className={`submit-btn submit-btn_${props.name} ${props.submit} button`}
          >
            {props.isUploading ? "Выполнение..." : props.innerButtonText}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default PopupWithForm;
