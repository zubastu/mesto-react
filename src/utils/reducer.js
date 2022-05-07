export default function (state, action) {
  switch (action.type) {
    case "loading-cards":
      return {
        ...state,
        loadingCards: action.payload,
      };

    case "uploading":
      return {
        ...state,
        isUploading: action.payload,
      };

    case "init":
      return {
        ...state,
        currentUser: action.payload.currentUser,
        cards: action.payload.cards,
      };

    case "init_user":
      return {
        ...state,
        currentUser: action.payload,
      };

    case "update_card":
      return {
        ...state,
        cards: action.payload,
      };

    case "delete_card":
      return {
        ...state,
        cards: action.payload,
      };

    case "add_card":
      return {
        ...state,
        cards: action.payload,
      };

    case "open_profile":
      return {
        ...state,
        isOpenProfile: true,
        openedPopupName: "Profile",
      };

    case "open_card":
      return {
        ...state,
        isOpenCard: true,
        openedPopupName: "Card",
      };

    case "open_avatar":
      return {
        ...state,
        isOpenAvatar: true,
        openedPopupName: "Avatar",
      };

    case "open_image":
      return {
        ...state,
        isOpenImage: true,
        card: action.payload.card,
        openedPopupName: "Image",
      };

    case "open_accept":
      return {
        ...state,
        isOpenAccept: true,
        selectedCardDelete: action.payload.selectedCardDelete,
        openedPopupName: "Accept",
      };

    case "close_popup":
      return {
        ...state,
        [`isOpen${action.payload}`]: false,
      };

    case "close_by_escape":
      return {
        ...state,
        [`isOpen${state.openedPopupName}`]: false,
      };

    default:
      return state;
  }
}
