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

    case "open_profile":
      return {
        ...state,
        isOpenProfile: action.payload,
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

    case "open_card":
      return {
        ...state,
        isOpenCard: action.payload,
      };

    case "open_avatar":
      return {
        ...state,
        isOpenAvatar: action.payload,
      };

    case "open_image":
      return {
        ...state,
        isOpenCardImage: action.payload.isOpenCardImage,
        card: action.payload.card,
      };

    case "open_accept":
      return {
        ...state,
        isOpenAccept: action.payload.isOpenAccept,
        selectedCardDelete: action.payload.selectedCardDelete,
      };

    case "close_profile":
      return {
        ...state,
        isOpenProfile: action.payload,
      };

    case "close_card":
      return {
        ...state,
        isOpenCard: action.payload,
      };

    case "close_image":
      return {
        ...state,
        isOpenCardImage: action.payload,
      };

    case "close_avatar":
      return {
        ...state,
        isOpenAvatar: action.payload,
      };

    case "close_accept":
      return {
        ...state,
        isOpenAccept: action.payload,
      };
    case "close_all":
      return {
        ...state,
        isOpenProfile: action.payload,
        isOpenCard: action.payload,
        isOpenCardImage: action.payload,
        isOpenAvatar: action.payload,
        isOpenAccept: action.payload,
      };

    default:
      return state;
  }
}