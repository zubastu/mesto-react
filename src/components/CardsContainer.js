import React from 'react';
import loadOverlay from "../images/loading.svg";

const CardsContainer = () => {
    return (
        <div id="cards-container" className="photo-cards center">
            <img className="load-overlay" src={loadOverlay} alt={'загрузка'} />
        </div>
    );
};

export default CardsContainer;