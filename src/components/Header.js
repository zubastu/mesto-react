import React from "react";
import headerLogo from "../images/logo__header.svg";
import shine from "../images/shine.png";
import moon from "../images/moon.png";

function Header() {
  return (
    <div className="header center">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <img className="theme-image" src={moon} alt="Изменить стиль" />
    </div>
  );
}

export default Header;
