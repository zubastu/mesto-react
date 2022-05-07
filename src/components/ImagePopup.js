import React from "react";
import Popup from "./Popup";

const ImagePopup = ({ selector, isOpened, closeAllPopup, selectedCard }) => {
  const popupClassName = `${
    isOpened ? `${selector} popup_opened` : `${selector}`
  }`;

  return (
    <Popup className={popupClassName} closeAllPopup={closeAllPopup}>
      <div className="popup__photo-container">
        <button
          className="close-btn close-btn_photo "
          type="button"
          onClick={closeAllPopup}
        />

        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="popup__photo-image"
        />

        <p className="popup__photo-paragraph">{selectedCard.name}</p>
      </div>
    </Popup>
  );
};

export default ImagePopup;
