import React from "react";
import PopupWithForm from "./PopupWithForm";

const PopupDeleteAccept = (props) => {
  return (
    <PopupWithForm
      isUploading={props.isUploading}
      closeAllPopup={props.closeAllPopup}
      selector="popup popup_accept-delete-card"
      heading="popup-heading"
      isOpened={props.isOpened}
      formName="delete-container"
      name="accept-delete-card"
      title="Вы уверены?"
      submit="submit-btn_type_accept"
      onSubmit={props.onAcceptClick}
      innerButtonText="Да"
    ></PopupWithForm>
  );
};

export default PopupDeleteAccept;
