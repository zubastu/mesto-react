import React from "react";
import loadOverlay from '../images/loading.svg';
import '../index.css'

function Main() {
    return (
        <div className="main">

            <section className="profile margin center">
                <span className="profile__hover">
                    <img src="#" alt="Фото Профиля" className="profile__avatar-image" />
                </span>

                <div className="profile__info">
                    <div className="profile__info-text">
                        <h1 className="profile__name"></h1>
                        <p className="profile__job"></p>
                        <button type="button"
                                className="profile__info-btn button"></button>
                    </div>
                </div>
                <button type="button"
                        className="profile__add-btn button"></button>
            </section>

            <section id="cards-container" className="photo-cards center">
                <img className="load-overlay" src={loadOverlay} alt={'загрузка'} />
            </section>

            <section className="popup popup_profile">

                <form className="form form_profile"
                      id="profile__form"
                      name="profile"
                      noValidate>
                    <button type="button"
                            className="close-btn close-btn_profile "></button>

                    <h2 className="popup-heading popup-heading_type_form">Редактировать профиль</h2>

                    <fieldset className="form__input-container input">

                        <label className="form__field">
                            <input type="text"
                                   className="form__item form__item_input_name-profile input"
                                   value=""
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
                                   value=""
                                   name="profileJob"
                                   id="job-input"
                                   minLength="2"
                                   maxLength="200"
                                   required
                                   placeholder="Деятельность" />
                                <span className="form__input-error job-input-error"></span>
                        </label>

                        <button type="submit"
                                className="submit-btn submit-btn_profile submit-btn_type_form button">Сохранить
                        </button>
                    </fieldset>
                </form>
            </section>

            <section className="popup popup_card">

                <form className="form form_card"
                      id="card__form"
                      name="card"
                      noValidate>

                    <button type="button"
                            className="close-btn close-btn_card "></button>

                    <h2 className="popup-heading popup-heading_type_form">Новое место</h2>

                    <fieldset className="form__input-container input">

                        <label className="form__field">
                            <input type="text"
                                   className="form__item form__item_input_name-card input"
                                   value=""
                                   name="name"
                                   id="cardName-input"
                                   minLength="2"
                                   maxLength="30"
                                   required
                                   placeholder="Имя места" />
                                <span className="form__input-error cardName-input-error"></span>
                        </label>

                        <label className="form__field">
                            <input type="url"
                                   className="form__item form__item_input_link-card input"
                                   value=""
                                   name="link"
                                   id="cardUrl-input"
                                   required
                                   placeholder="Ссылка на место" />
                                <span className="form__input-error cardUrl-input-error"></span>
                        </label>

                        <button type="submit"
                                className="submit-btn submit-btn_card submit-btn_type_form button">Создать
                        </button>

                    </fieldset>
                </form>
            </section>

            <section className="popup popup_photo">

                <div className="popup__photo-container">
                    <button className="close-btn close-btn_photo "
                            type="button"></button>

                    <img src=".."
                         alt=""
                         className="popup__photo-image" />

                        <p className="popup__photo-paragraph">Эта запись для теста</p>
                </div>
            </section>

            <section className="popup popup_avatar">

                <form className="form form_type_avatar"
                      id="avatar__form"
                      name="avatar"
                      noValidate>

                    <button type="button"
                            className="close-btn close-btn_avatar button"></button>

                    <h2 className="popup-heading popup-heading_type_form">Обновить аватар</h2>

                    <fieldset className="form__input-container input">

                        <label className="form__field">
                            <input type="url"
                                   className="form__item form__item_input_link-avatar input"
                                   value=""
                                   name="avatar"
                                   id="avatarURL-input"
                                   required
                                   placeholder="Ссылка на аватар" />
                                <span className="form__input-error avatarURL-input-error"></span>
                        </label>

                        <button type="submit"
                                className="submit-btn submit-btn_avatar submit-btn_type_form button">Сохранить
                        </button>

                    </fieldset>
                </form>
            </section>

            <section className="popup popup_accept-delete-card">
                <div className="delete-container">
                    <form className="form-accept">
                        <h2 className="popup-heading">Вы уверены?</h2>
                        <input className="hide-input" type="hidden" name="cardId" value="" />
                            <button type="submit"
                                    className="submit-btn submit-btn_type_accept button">Да
                            </button>

                            <button className="close-btn close-btn_accept-delete-card "
                                    type="button"></button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Main