import React, { useReducer, useEffect } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupDeleteAccept from "./PopupDeleteAccept";
import reducer from "../utils/reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, {
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

  useEffect(() => {
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
  useEffect(() => {
    document.addEventListener("keyup", closeByEscape);
    return () => {
      document.removeEventListener("keyup", closeByEscape);
    };
  }, []);

  const handleCardLike = (card, userId) => {
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
  };

  const handleDeleteCard = (card) => {
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
        closePopup("accept");
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
  };

  const handleUpdateUser = (cardInfo) => {
    dispatch({
      type: "uploading",
      payload: true,
    });
    api
      .setUserInfo(cardInfo)
      .then((data) => {
        dispatch({
          type: "init_user",
          payload: data,
        });
        closePopup("profile");
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
  };

  const handleUpdateAvatar = (avatarInfo) => {
    dispatch({
      type: "uploading",
      payload: true,
    });
    api
      .setAvatar(avatarInfo)
      .then((data) => {
        dispatch({
          type: "init_user",
          payload: data,
        });
        closePopup("avatar");
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
  };

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

  const closePopup = (popupType) => {
    switch (popupType) {
      case "profile":
        dispatch({
          type: "close_profile",
          payload: false,
        });
        break;
      case "card":
        dispatch({
          type: "close_card",
          payload: false,
        });
        break;
      case "avatar":
        dispatch({
          type: "close_avatar",
          payload: false,
        });
        break;
      case "image":
        dispatch({
          type: "close_image",
          payload: false,
        });
        break;
      case "accept":
        dispatch({
          type: "close_accept",
          payload: false,
        });
        break;
      case "all":
        dispatch({
          type: "close_all",
          payload: false,
        });
    }
  };

  const handleAddPlaceSubmit = (cardInfo) => {
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
        closePopup("card");
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
  };

  const deleteCardAccept = (e) => {
    e.preventDefault();
    handleDeleteCard(state.selectedCardDelete);
  };

  const openAcceptDeletePopup = (card) => {
    dispatch({
      type: "open_accept",
      payload: {
        isOpenAccept: true,
        selectedCardDelete: card,
      },
    });
  };

  const closeByEscape = (event) => {
    event.stopPropagation();
    if (event.key === "Escape") {
      closePopup("all");
    }
  };

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
          onClose={closePopup}
          isOpened={state.isOpenProfile}
        />
        <EditAvatarPopup
          isUploading={state.isUploading}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closePopup}
          isOpened={state.isOpenAvatar}
        />
        <AddPlacePopup
          isUploading={state.isUploading}
          onAddCard={handleAddPlaceSubmit}
          onClose={closePopup}
          isOpened={state.isOpenCard}
        />
        <PopupDeleteAccept
          isUploading={state.isUploading}
          onAcceptClick={deleteCardAccept}
          onClose={closePopup}
          isOpened={state.isOpenAccept}
        />
      </CurrentUserContext.Provider>

      <Footer />

      <ImagePopup
        selectedCard={state.card}
        onClose={closePopup}
        isOpened={state.isOpenCardImage}
        selector="popup popup_photo"
        name="image"
      />
    </div>
  );
}

export default App;
