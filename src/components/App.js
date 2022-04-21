import React from "react";
import '../index.css'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    const [isOpenProfile, setIsOpenProfile] = React.useState(false);
    const [isOpenCard, setIsOpenCard] = React.useState(false);
    const [isOpenCardImage, setIsOpenCardImage] = React.useState(false);
    const [isOpenAvatar, setIsOpenAvatar] = React.useState(false);
    const [isOpenAccept, setIsOpenAccept] = React.useState(false);
    const [card, setCard] = React.useState({})

    const handleOpenProfile = () => setIsOpenProfile(true)
    const handleOpenCard = () => setIsOpenCard(true)

    const handleOpenAvatar = () => setIsOpenAvatar(true)
    const handleOpenAccept = () => setIsOpenAccept(true)

    const handleOpenCardImage = (card) => {
        setCard(card)
        setIsOpenCardImage(true)
    }

    const closeAllPopup = () => {
        setIsOpenProfile(false)
        setIsOpenCard(false)
        setIsOpenCardImage(false)
        setIsOpenAvatar(false)
        setIsOpenAccept(false)
    }

    return (

    <div className="page page_type_margin">
      <Header />
      <Main
          handleOpenProfile={handleOpenProfile}
          handleOpenCard={handleOpenCard}
          handleOpenAvatar={handleOpenAvatar}
          handleOpenCardImage={handleOpenCardImage}
      />
      <Footer />
        <PopupWithForm
            closeAllPopup={closeAllPopup}
            selector={'popup popup_profile'}
            heading={'popup-heading popup-heading_type_form'}
            isOpened={isOpenProfile}
            formName={'form form_profile'}
            name={'profile'}
            title={'Редактировать профиль'}
            submit={'submit-btn_type_form'}
            innerButtonText={'Сохранить'}>

            <label className="form__field">
                <input type="text"
                       className="form__item form__item_input_name-profile input"
                       defaultValue =""
                       name="profileName"
                       id="name-input"
                       minLength="2"
                       maxLength="40"
                       required
                       placeholder="Имя профиля" />
                <span className="form__input-error name-input-error"></span>
            </label>

            <label className="form__field">
                <input type="text"
                       className="form__item form__item_input_job-profile input"
                       defaultValue =""
                       name="profileJob"
                       id="job-input"
                       minLength="2"
                       maxLength="200"
                       required
                       placeholder="Деятельность" />
                <span className="form__input-error job-input-error"></span>
            </label>

        </PopupWithForm>

        <PopupWithForm
            closeAllPopup={closeAllPopup}
            selector={'popup popup_card'}
            heading={'popup-heading popup-heading_type_form'}
            isOpened={isOpenCard}
            formName={'form form_card'}
            name={'card'}
            title={'Новое место'}
            submit={'submit-btn_type_form'}
            innerButtonText={'Создать'}>
            <label className="form__field">
                <input type="text"
                       className="form__item form__item_input_name-card input"
                       defaultValue =""
                       name="name"
                       id="cardName-input"
                       minLength="2"
                       maxLength="30"
                       required
                       placeholder="Имя места"/>
                <span className="form__input-error cardName-input-error"></span>
            </label>

            <label className="form__field">
                <input type="url"
                       className="form__item form__item_input_link-card input"
                       defaultValue =""
                       name="link"
                       id="cardUrl-input"
                       required
                       placeholder="Ссылка на место"/>
                <span className="form__input-error cardUrl-input-error"></span>
            </label>
        </PopupWithForm>

        <PopupWithForm
            closeAllPopup={closeAllPopup}
            selector={'popup popup_avatar'}
            heading={'popup-heading popup-heading_type_form'}
            isOpened={isOpenAvatar}
            formName={'form form_avatar'}
            name={'avatar'}
            title={'Обновить аватар'}
            submit={'submit-btn_type_form'}
            innerButtonText={'Сохранить'}>
            <label className="form__field">
                <input type="url"
                       className="form__item form__item_input_link-avatar input"
                       defaultValue=""
                       name="avatar"
                       id="avatarURL-input"
                       required
                       placeholder="Ссылка на аватар"/>
                <span className="form__input-error avatarURL-input-error"></span>
            </label>
        </PopupWithForm>

        <PopupWithForm
            closeAllPopup={closeAllPopup}
            selector={'popup popup_accept-delete-card'}
            heading={'popup-heading'}
            isOpened={false}
            formName={'delete-container'}
            name={'accept-delete-card'}
            title={'Вы уверены?'}
            submit={'submit-btn_type_accept'}
            innerButtonText={'Да'}>
        </PopupWithForm>

        <ImagePopup
            selectedCard={card}
            closeAllPopup={closeAllPopup}
            isOpened={isOpenCardImage}
            selector={"popup popup_photo"} />

    </div>
  );
}

export default App;
