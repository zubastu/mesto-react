import React from 'react';

const PopupWithImage = (props) => {
    const popupClassName = `${props.isOpened ? `${props.selector} popup_opened` : `${props.selector}`}`
    return (
        <div className={popupClassName}>

            <div className="popup__photo-container">
                <button className="close-btn close-btn_photo "
                        type="button" onClick={props.handleCloseCardImage}></button>

                <img src={props.link}
                     alt={props.name}
                     className="popup__photo-image" />

                <p className="popup__photo-paragraph">{props.name}</p>
            </div>
        </div>
    );
};

export default PopupWithImage;