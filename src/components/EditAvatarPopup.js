import React from 'react';
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
    const ref = React.useRef()
    function handleSubmit(e) {
        e.preventDefault()
        props.onUpdateAvatar({
            avatar: ref.current.value
        })
        ref.current.value = ''
    }
    return (
            <PopupWithForm
                isUploading={props.isUploading}
                closeAllPopup={props.onClose}
                selector={'popup popup_avatar'}
                heading={'popup-heading popup-heading_type_form'}
                isOpened={props.isOpened}
                formName={'form form_avatar'}
                name={'avatar'}
                onSubmit={handleSubmit}
                title={'Обновить аватар'}
                submit={'submit-btn_type_form'}
                innerButtonText={'Сохранить'}>
                <label className="form__field">
                    <input type="url"
                           className="form__item form__item_input_link-avatar input"
                           name="avatar"
                           id="avatarURL-input"
                           ref={ref}
                           required
                           placeholder="Ссылка на аватар"/>
                    <span className="form__input-error avatarURL-input-error"></span>
                </label>
            </PopupWithForm>
    );
};

export default EditAvatarPopup;