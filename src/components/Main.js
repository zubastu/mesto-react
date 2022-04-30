import React from "react";
import '../index.css'
import Profile from "./Profile";
import CardsContainer from "./CardsContainer";
import {api} from "../utils/API";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";




function Main({handleOpenProfile, handleOpenAvatar,handleOpenCard, handleOpenCardImage}) {
    const [cards, setCards] = React.useState([])

    React.useEffect(() => {
        api.loadAllCards().then((cards) => {
            const reverseCards = []
            cards.forEach(card => reverseCards.push(card))
            setCards(reverseCards)
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    const userInfo = React.useContext(CurrentUserContext);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === userInfo._id);
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    function handleDeleteCard(card) {
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id))
        })
    }

    return (
        <div className="main">
            <Profile
                handleOpenProfile={handleOpenProfile}
                handleOpenAvatar={handleOpenAvatar}
                handleOpenCard={handleOpenCard}
            />
            <CardsContainer>
                {cards.map((card) => <Card key={card._id}
                                           card={card}
                                           onCardDelete={handleDeleteCard}
                                           onCardLike={handleCardLike}
                                           handleOpenCardImage={handleOpenCardImage}/>)}
            </CardsContainer>
        </div>
    )
}

export default Main