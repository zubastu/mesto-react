import React from 'react';

const Card = (props) => {
    const likes = props.card.likes

    return (
        <div className="card">
            <button type="button" className="card__delete button"></button>
            <img className="card__picture" src={props.card.link} alt={props.card.name} onClick={() => props.handleOpenCardImage(props.card)}/>
                <div className="card__description">
                    <p className="card__text">{props.card.name}</p>
                    <div className="card__like-section">
                        <button type="button"
                                className="card__like"></button>
                        <span className={likes.length > 0 ? "card__like-counter" : "card__like-counter_disabled"}>{likes.length}</span>
                    </div>
                </div>
        </div>
    );
};

export default Card;