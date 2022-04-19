import React from "react";
import '../index.css'
import Profile from "./Profile";
import CardsContainer from "./CardsContainer";



function Main({handleOpenProfile, handleOpenAvatar,handleOpenCard}) {

    return (
        <div className="main">
            <Profile
                handleOpenProfile={handleOpenProfile}
                handleOpenAvatar={handleOpenAvatar}
                handleOpenCard={handleOpenCard}
            />
            <CardsContainer />
        </div>
    )
}

export default Main