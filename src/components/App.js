import React from "react";
import '../index.css'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupDeleteAccept from "./PopupDeleteAccept";

function App() {
    const [isOpenProfile, setIsOpenProfile] = React.useState(false);
    const [isOpenCard, setIsOpenCard] = React.useState(false);
    const [isOpenCardImage, setIsOpenCardImage] = React.useState(false);
    const [isOpenAvatar, setIsOpenAvatar] = React.useState(false);
    const [isOpenAccept, setIsOpenAccept] = React.useState(false);
    const [card, setCard] = React.useState({})
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([])
    const [selectedCardDelete, setSelectedCardDelete] = React.useState({})
    const [loadingCards, setIsLoadingCards] = React.useState(false)
    const [isUploading, setIsUploading] = React.useState(false)

    React.useEffect(() => {
        setIsLoadingCards(true)
        api.loadAllCards().then((cards) => {
            const reverseCards = []
            cards.forEach(card => reverseCards.push(card))
            setCards(reverseCards)
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsLoadingCards(false)
        })
    }, [])


    function handleCardLike(card, userId) {
        const isLiked = card.likes.some((i) => i._id === userId );
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    function handleDeleteCard(card) {
        setIsUploading(true)
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id))
            closeAllPopup()
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsUploading(false)
        })
    }

    React.useEffect(() => {
        api.getUserInfo().then((data) => {
            setCurrentUser(data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    function handleUpdateUser(props) {
        setIsUploading(true)
        api.setUserInfo(props).then((data) => {
            setCurrentUser(data)
            closeAllPopup()
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsUploading(false)
        })
    }

    function handleUpdateAvatar(props) {
        setIsUploading(true)
        api.setAvatar(props).then((data) => {
            setCurrentUser(data)
            closeAllPopup()
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsUploading(false)
        })
    }

    const handleOpenProfile = () => setIsOpenProfile(true)
    const handleOpenCard = () => setIsOpenCard(true)
    const handleOpenAvatar = () => setIsOpenAvatar(true)
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

    function handleAddPlaceSubmit(cardInfo) {
        setIsUploading(true)
        api.createCard(cardInfo).then((newCard) => {
            setCards([newCard, ...cards])
            closeAllPopup()
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsUploading(false)
        })
    }

    function deleteCardAccept(e) {
        e.preventDefault()
        handleDeleteCard(selectedCardDelete)
    }

    function openAcceptDeletePopup(card) {
        setIsOpenAccept(true)
        setSelectedCardDelete(card)
    }

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
                  isLoadingCards={loadingCards}

              />
                <EditProfilePopup isUploading={isUploading} onUpdateUser={handleUpdateUser} onClose={closeAllPopup} isOpened={isOpenProfile} />
                <EditAvatarPopup isUploading={isUploading} onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopup} isOpened={isOpenAvatar} />
                <AddPlacePopup isUploading={isUploading} onAddCard={handleAddPlaceSubmit} onClose={closeAllPopup} isOpened={isOpenCard} />
                <PopupDeleteAccept isUploading={isUploading} onAcceptClick={deleteCardAccept} onClose={closeAllPopup} isOpened={isOpenAccept} />
            </CurrentUserContext.Provider>

          <Footer />



            <ImagePopup
                selectedCard={card}
                closeAllPopup={closeAllPopup}
                isOpened={isOpenCardImage}
                selector={"popup popup_photo"} />
        </div>
  );
}

export default App;
