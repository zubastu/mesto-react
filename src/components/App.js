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


function App() {

  const [state, setState] = React.useState({
    isOpenProfile: false,
    isOpenCard: false,
    isOpenCardImage: false,
    isOpenAvatar: false,
    isOpenAccept: false,
    card: {},
    selectedCardDelete: {},
    loadingCards: false,
    isUploading: false,
  })

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);


  React.useEffect(() => {
    setState({...state, loadingCards: true});
    Promise.all([api.getUserInfo(), api.loadAllCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setState({...state, loadingCards: false});
        });
  }, []);

  function handleCardLike(card, userId) {
    const isLiked = card.likes.some((i) => i._id === userId);
    api
        .changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
          setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
  }

  function handleDeleteCard(card) {
    setState({...state, loadingCards: true});
    api
        .deleteCard(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
          setState({...state, isOpenAccept: false})
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setState({...state, loadingCards: false});
        });
  }

  function handleUpdateUser(props) {
    setState({...state, loadingCards: true});
    api
        .setUserInfo(props)
        .then((data) => {
          setCurrentUser(data);
          closeAllPopup();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setState({...state, loadingCards: false});
        });
  }

  function handleUpdateAvatar(props) {
    setState({...state, loadingCards: true});
    api
        .setAvatar(props)
        .then((data) => {
          setCurrentUser(data);
          closeAllPopup();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setState({...state, loadingCards: false});
        });
  }
  const handleOpenProfile = () => setState({...state, isOpenProfile: true});
  const handleOpenCard = () => setState({...state, isOpenCard: true});
  const handleOpenAvatar = () => setState({...state, isOpenAvatar: true});
  const handleOpenCardImage = (card) => {
    setState({...state,
      card: card,
      isOpenCardImage: true
    });
  };

  function closeAllPopup() {
    setState({...state,
      isOpenProfile: false,
      isOpenCard: false,
      isOpenAvatar: false,
      isOpenAccept: false
    });
  }

  function handleAddPlaceSubmit(cardInfo) {
    setState({...state, loadingCards: true});
    api
        .createCard(cardInfo)
        .then((newCard) => {
          setState({...state, cards: {...state.cards, newCard}})
          closeAllPopup();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setState({...state, loadingCards: false});
        });
  }

  function deleteCardAccept(e) {
    e.preventDefault();
    handleDeleteCard(state.selectedCardDelete);
  }

  function openAcceptDeletePopup(card) {
    setState({...state,
      isOpenAccept: true,
      selectedCardDelete: card
    });
  }

  console.log(state)

  return (
      <div className="page page_type_margin">
        <Header />
        <CurrentUserContext.Provider value={currentUser}>
          <Main
              handleOpenProfile={handleOpenProfile}
              handleOpenCard={handleOpenCard}
              handleOpenAvatar={handleOpenAvatar}
              handleOpenCardImage={handleOpenCardImage}
              cards={cards}
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