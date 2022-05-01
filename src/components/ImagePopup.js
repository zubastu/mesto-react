import React from "react";

const ImagePopup = ({selector, isOpened, closeAllPopup, selectedCard}) => {
  const popupClassName = `${
    isOpened ? `${selector} popup_opened` : `${selector}`
  }`;
  return (
    <div className={popupClassName}>
      <div className="popup__photo-container">
        <button
          className="close-btn close-btn_photo "
          type="button"
          onClick={closeAllPopup}
        ></button>

        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="popup__photo-image"
        />

        <p className="popup__photo-paragraph">{selectedCard.name}</p>
      </div>
    </div>
  );
};

export default ImagePopup;
