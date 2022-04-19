import React from 'react';

const Card = () => {
    return (
        <div className="card">
            <button type="button" className="card__delete button"></button>
            <img className="card__picture" src=".." alt="" />
                <div className="card__description">
                    <p className="card__text"></p>
                    <div className="card__like-section">
                        <button type="button"
                                className="card__like"></button>
                        <span className="card__like-counter"></span>
                    </div>
                </div>
        </div>
    );
};

export default Card;