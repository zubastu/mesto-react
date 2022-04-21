import React from "react";
import defaultAvatar from '../images/defaultAvatar.jpg';
import {api} from "../utils/API";

function Profile(props) {
    const [avatar, setAvatar] = React.useState(defaultAvatar)
    const [name, setName] = React.useState('Жак-ив')
    const [about, setAbout] = React.useState('Кусто')

    React.useEffect(() => {
        api.getUserInfo().then((data) => {
            setAvatar(data.avatar)
            setName(data.name)
            setAbout(data.about)
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    return (
        <>
            <div className="profile margin center">
                    <span className="profile__hover" onClick={props.handleOpenAvatar}>
                        <img src={avatar} alt="Фото Профиля" className="profile__avatar-image" />
                    </span>

                <div className="profile__info">
                    <div className="profile__info-text">
                        <h1 className="profile__name">{name}</h1>
                        <p className="profile__job">{about}</p>
                        <button type="button"
                                className="profile__info-btn button" onClick={props.handleOpenProfile}></button>
                    </div>
                </div>

                <button type="button"
                        className="profile__add-btn button" onClick={props.handleOpenCard}></button>

            </div>
        </>
    )
}

export default Profile