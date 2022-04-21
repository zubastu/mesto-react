import React from "react";
import '../index.css'
import Profile from "./Profile";
import CardsContainer from "./CardsContainer";
import {api} from "../utils/API";
import Card from "./Card";


function Main({handleOpenProfile, handleOpenAvatar,handleOpenCard, handleOpenCardImage}) {
    const [cards, setCards] = React.useState([])
    React.useEffect(() => {
        api.loadAllCards().then((cards) => {
            setCards(cards)
        }).catch((err) => {
            console.log(err);
        });
    })

    return (
        <div className="main">
            <Profile
                handleOpenProfile={handleOpenProfile}
                handleOpenAvatar={handleOpenAvatar}
                handleOpenCard={handleOpenCard}
            />
            <CardsContainer>
                {cards.map((card) => <Card key={card.id} card={card} handleOpenCardImage={handleOpenCardImage} />)}
            </CardsContainer>
        </div>
    )
}

export default Main