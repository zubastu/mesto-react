import React from "react";

const Popup = (props) => {
  const closeByOverlayClick = (e) => {
    if (
      e.target.classList.contains("popup_opened") ||
      e.target.classList.contains("close-btn")
    ) {
      props.closeAllPopup();
    }
  };


  return (
    <div className={props.className} onClick={closeByOverlayClick}>
      {props.children}
    </div>
  );
};

export default Popup;
