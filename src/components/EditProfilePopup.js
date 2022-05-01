import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const EditProfilePopup = (props) => {
    const [name, setName] = React.useState('')
    const [about, setAbout] = React.useState('')
    const userInfo = React.useContext(CurrentUserContext)
    React.useEffect(() => {
        setName(userInfo.name)
        setAbout(userInfo.about)
    }, [userInfo, props.isOpened])

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeAbout(e) {
        setAbout(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.onUpdateUser({
            name: name,
            about: about
        })
    }

    return (
        <div>
            <PopupWithForm
                onSubmit={handleSubmit}
                isUploading={props.isUploading}
                closeAllPopup={props.onClose}
                selector={'popup popup_profile'}
                heading={'popup-heading popup-heading_type_form'}
                isOpened={props.isOpened}
                formName={'form form_profile'}
                name={'profile'}
                title={'Редактировать профиль'}
                submit={'submit-btn_type_form'}
                innerButtonText={'Сохранить'}>

                <label className="form__field">
                    <input type="text"
                           className="form__item form__item_input_name-profile input"
                           name="profileName"
                           id="name-input"
                           minLength="2"
                           maxLength="40"
                           required
                           value={name || ''}
                           onChange={handleChangeName}
                           placeholder="Имя профиля" />
                    <span className="form__input-error name-input-error"></span>
                </label>

                <label className="form__field">
                    <input type="text"
                           className="form__item form__item_input_job-profile input"
                           name="profileJob"
                           id="job-input"
                           minLength="2"
                           maxLength="200"
                           required
                           value={about || ''}
                           onChange={handleChangeAbout}
                           placeholder="Деятельность" />
                    <span className="form__input-error job-input-error"></span>
                </label>

            </PopupWithForm>
        </div>
    );
};

export default EditProfilePopup;