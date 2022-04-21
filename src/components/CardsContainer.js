import React from 'react';
import loadOverlay from "../images/loading.svg";

const CardsContainer = (props) => {
    return (
        <div id="cards-container" className="photo-cards center">
            <img className="load-overlay" src={loadOverlay} alt={'загрузка'} />
            {props.children}
        </div>
    );
};

export default CardsContainer;