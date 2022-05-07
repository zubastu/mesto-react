import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupDeleteAccept from "./PopupDeleteAccept";
import reducer from "../utils/reducer";

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    isOpenProfile: false,
    isOpenCard: false,
    isOpenCardImage: false,
    isOpenAvatar: false,
    isOpenAccept: false,
    card: {},
    selectedCardDelete: {},
    loadingCards: false,
    isUploading: false,
    currentUser: {},
    cards: [],
  });

  React.useEffect(() => {
    dispatch({
      type: "loading-cards",
      payload: true,
    });
    Promise.all([api.getUserInfo(), api.loadAllCards()])
      .then(([userData, cardsData]) => {
        dispatch({
          type: "init",
          payload: {
            currentUser: userData,
            cards: cardsData,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: "loading-cards",
          payload: false,
        });
      });
  }, []);

  function handleCardLike(card, userId) {
    const isLiked = card.likes.some((i) => i._id === userId);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = state.cards.map((c) =>
          c._id === card._id ? newCard : c
        );
        dispatch({
          type: "update_card",
          payload: newCards,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteCard(card) {
    dispatch({
      type: "uploading",
      payload: true,
    });
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = state.cards.filter((c) => c._id !== card._id);
        dispatch({
          type: "delete_card",
          payload: newCards,
        });
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: "uploading",
          payload: false,
        });
      });
  }

  function handleUpdateUser(props) {
    dispatch({
      type: "uploading",
      payload: true,
    });
    api
      .setUserInfo(props)
      .then((data) => {
        dispatch({
          type: "init_user",
          payload: data,
        });
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: "uploading",
          payload: false,
        });
      });
  }

  function handleUpdateAvatar(props) {
    dispatch({
      type: "uploading",
      payload: true,
    });
    api
      .setAvatar(props)
      .then((data) => {
        dispatch({
          type: "init_user",
          payload: data,
        });
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: "uploading",
          payload: false,
        });
      });
  }

  const handleOpenProfile = () =>
    dispatch({
      type: "open_profile",
      payload: true,
    });
  const handleOpenCard = () =>
    dispatch({
      type: "open_card",
      payload: true,
    });
  const handleOpenAvatar = () =>
    dispatch({
      type: "open_avatar",
      payload: true,
    });
  const handleOpenCardImage = (card) => {
    dispatch({
      type: "open_image",
      payload: {
        card: card,
        isOpenCardImage: true,
      },
    });
  };

  const closeAllPopup = () => {
    dispatch({
      type: "close_popups",
      payload: {
        isOpenProfile: false,
        isOpenCard: false,
        isOpenCardImage: false,
        isOpenAvatar: false,
        isOpenAccept: false,
      },
    });
  };

  function handleAddPlaceSubmit(cardInfo) {
    dispatch({
      type: "uploading",
      payload: true,
    });
    api
      .createCard(cardInfo)
      .then((newCard) => {
        const newCards = [newCard, ...state.cards];
        dispatch({
          type: "delete_card",
          payload: newCards,
        });
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: "uploading",
          payload: false,
        });
      });
  }

  function deleteCardAccept(e) {
    e.preventDefault();
    handleDeleteCard(state.selectedCardDelete);
  }

  function openAcceptDeletePopup(card) {
    dispatch({
      type: "open_accept",
      payload: {
        isOpenAccept: true,
        selectedCardDelete: card,
      },
    });
  }
  const closeByEscape = (event) => {
    event.stopPropagation()
    if (event.key === "Escape") {
      closeAllPopup();
    }
  };
  React.useEffect(() => {
    document.addEventListener("keyup", closeByEscape);
    return () => {
      document.removeEventListener("keyup", closeByEscape);
    };
  }, []);

  return (
    <div className="page page_type_margin">
      <Header />
      <CurrentUserContext.Provider value={state.currentUser}>
        <Main
          handleOpenProfile={handleOpenProfile}
          handleOpenCard={handleOpenCard}
          handleOpenAvatar={handleOpenAvatar}
          handleOpenCardImage={handleOpenCardImage}
          cards={state.cards}
          handleCardLike={handleCardLike}
          openAcceptDeletePopup={openAcceptDeletePopup}
          isLoadingCards={state.loadingCards}
        />
        <EditProfilePopup
          isUploading={state.isUploading}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopup}
          isOpened={state.isOpenProfile}
        />
        <EditAvatarPopup
          isUploading={state.isUploading}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopup}
          isOpened={state.isOpenAvatar}
        />
        <AddPlacePopup
          isUploading={state.isUploading}
          onAddCard={handleAddPlaceSubmit}
          onClose={closeAllPopup}
          isOpened={state.isOpenCard}
        />
        <PopupDeleteAccept
          isUploading={state.isUploading}
          onAcceptClick={deleteCardAccept}
          onClose={closeAllPopup}
          isOpened={state.isOpenAccept}
        />
      </CurrentUserContext.Provider>

      <Footer />

      <ImagePopup
        selectedCard={state.card}
        closeAllPopup={closeAllPopup}
        isOpened={state.isOpenCardImage}
        selector="popup popup_photo"
      />
    </div>
  );
}

export default App;
