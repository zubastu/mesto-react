import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  function handleChangeCardName(e) {
    setCardName(e.target.value);
  }
  function handleChangeCardLink(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard({
      name: cardName,
      link: cardLink,
    });
    setCardLink("");
    setCardName("");
  }

  return (
    <PopupWithForm
      isUploading={props.isUploading}
      closeAllPopup={props.onClose}
      selector={"popup popup_card"}
      heading={"popup-heading popup-heading_type_form"}
      isOpened={props.isOpened}
      formName={"form form_card"}
      name={"card"}
      title={"Новое место"}
      submit={"submit-btn_type_form"}
      onSubmit={handleSubmit}
      innerButtonText={"Создать"}
    >
      <label className="form__field">
        <input
          type="text"
          className="form__item form__item_input_name-card input"
          value={cardName}
          onChange={handleChangeCardName}
          name="name"
          id="cardName-input"
          minLength="2"
          maxLength="30"
          required
          placeholder="Имя места"
        />
        <span className="form__input-error cardName-input-error"></span>
      </label>

      <label className="form__field">
        <input
          type="url"
          className="form__item form__item_input_link-card input"
          value={cardLink}
          onChange={handleChangeCardLink}
          name="link"
          id="cardUrl-input"
          required
          placeholder="Ссылка на место"
        />
        <span className="form__input-error cardUrl-input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
