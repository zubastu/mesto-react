import React from "react";
import PopupWithForm from "./PopupWithForm";

const PopupDeleteAccept = ({isOpened,onAcceptClick, isUploading, onClose}) => {
  return (
    <PopupWithForm
      isUploading={isUploading}
      closeAllPopup={onClose}
      selector="popup popup_accept-delete-card"
      heading="popup-heading"
      isOpened={isOpened}
      formName="delete-container"
      name="accept-delete-card"
      title="Вы уверены?"
      submit="submit-btn_type_accept"
      onSubmit={onAcceptClick}
      innerButtonText="Да"
    ></PopupWithForm>
  );
};

export default PopupDeleteAccept;
