import React from 'react';

const ImagePopup = (props) => {
    const popupClassName = `${props.isOpened ? `${props.selector} popup_opened` : `${props.selector}`}`
    return (
        <div className={popupClassName}>

            <div className="popup__photo-container">
                <button className="close-btn close-btn_photo "
                        type="button" onClick={props.closeAllPopup}></button>

                <img src={props.selectedCard.link}
                     alt={props.selectedCard.name}
                     className="popup__photo-image" />

                <p className="popup__photo-paragraph">{props.selectedCard.name}</p>
            </div>
        </div>
    );
};

export default ImagePopup;