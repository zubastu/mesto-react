import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";


const Card = (props) => {
    const checkLike = () => {
        return props.card.likes.some(function (id) {
            return userInfo._id === id._id;
        })
    }

    const userInfo = React.useContext(CurrentUserContext)

    const isOwn = props.card.owner._id === userInfo._id;

    const deleteButtonClass = isOwn ? 'card__delete' : 'card__delete_disabled';

    const likeButtonClass = checkLike() ? 'card__like card__like_active' : 'card__like';



    return (
        <div className="card">
            <button type="button" className={`${deleteButtonClass} button`} onClick={() => props.onCardDelete(props.card)}></button>
            <img className="card__picture" src={props.card.link} alt={props.card.name} onClick={() => props.handleOpenCardImage(props.card)}/>
                <div className="card__description">
                    <p className="card__text">{props.card.name}</p>
                    <div className="card__like-section">
                        <button
                            onClick={() => props.onCardLike(props.card, userInfo._id)}
                            type="button"
                            className={likeButtonClass}></button>
                        <span className={props.card.likes.length > 0 ? "card__like-counter" : "card__like-counter_disabled"}>{props.card.likes.length}</span>
                    </div>
                </div>
        </div>
    );
};

export default Card;