import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import defaultAvatar from "../images/defaultAvatar.jpg";

function Profile(props) {
  const { avatar, name, about } = useContext(CurrentUserContext);

  return (
    <div className="profile margin center">
      <span className="profile__hover" onClick={props.handleOpenAvatar}>
        <img
          src={avatar || defaultAvatar}
          alt="Фото Профиля"
          className="profile__avatar-image"
        />
      </span>

      <div className="profile__info">
        <div className="profile__info-text">
          <h1 className="profile__name">{name || "Загрузка..."}</h1>
          <p className="profile__job">{about || "Загрузка..."}</p>
          <button
            type="button"
            className="profile__info-btn button"
            onClick={props.handleOpenProfile}
          ></button>
        </div>
      </div>

      <button
        type="button"
        className="profile__add-btn button"
        onClick={props.handleOpenCard}
      ></button>
    </div>
  );
}

export default Profile;
