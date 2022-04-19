import React from 'react';

const PopupWithImage = () => {
    return (
        <div className="popup popup_photo">

            <div className="popup__photo-container">
                <button className="close-btn close-btn_photo "
                        type="button"></button>

                <img src=".."
                     alt=""
                     className="popup__photo-image" />

                <p className="popup__photo-paragraph">Эта запись для теста</p>
            </div>
        </div>
    );
};

export default PopupWithImage;