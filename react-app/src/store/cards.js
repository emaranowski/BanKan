//////////////////////////////// ACTION TYPE CONSTANTS ////////////////////////////////

const GET_ONE_CARD = "cards/getOneCard";
const GET_ALL_CARDS = "cards/getAllCards";
// const GET_ALL_CARDS_FOR_BOARD = "cards/getAllCardsForBoard";
const CREATE_CARD = "cards/createCard";
const UPDATE_CARD = "cards/updateCard";
const DELETE_CARD = "cards/deleteCard";

//////////////////////////////// ACTION CREATORS ////////////////////////////////

const getOneCard = (card) => {
  return {
    type: GET_ONE_CARD,
    card
  }
};

const getAllCards = (cards) => {
  return {
    type: GET_ALL_CARDS,
    cards
  }
};

// const getAllCardsForBoard = (cards) => {
//   return {
//     type: GET_ALL_CARDS_FOR_BOARD,
//     cards
//   }
// };

const createCard = (card) => {
  return {
    type: CREATE_CARD,
    card
  }
};

const updateCard = (card) => {
  return {
    type: UPDATE_CARD,
    card
  }
};

const deleteCard = (cardId) => {
  return {
    type: DELETE_CARD,
    cardId
  }
};

//////////////////////////////// THUNKS ////////////////////////////////

export const thunkGetOneCard = (cardId) => async (dispatch) => {
  const res = await fetch(`/api/cards/${cardId}`, { method: "GET" });

  if (res.ok) {
    const card = await res.json();
    dispatch(getOneCard(card));
    return card;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkGetAllCardsForColumn = (columnId) => async (dispatch) => {
  const res = await fetch(`/api/columns/${columnId}/cards`, { method: "GET" });

  if (res.ok) {
    const cards = await res.json();
    dispatch(getAllCards(cards));
    return cards;
  } else {
    const errors = await res.json();
    return errors;
  }
};

// // THUNK: GET ALL CARDS FOR BOARD
// export const thunkGetAllCardsForBoard = (boardId) => async (dispatch) => {
//   const res = await fetch(`/api/boards/${boardId}/cards`, { method: "GET" });

//   if (res.ok) {
//     const cards = await res.json();
//     dispatch(getAllCardsForBoard(cards));
//     console.log('*** in thunkGetAllCardsForBoard, RES OK cards:', cards);
//     return cards;
//   } else {
//     const errors = await res.json();
//     return errors;
//   }
// };

export const thunkCreateCardForColumn = (card) => async (dispatch) => {
  const { columnId, index, title, description } = card;

  const res = await fetch(`/api/columns/${columnId}/cards/create`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      column_id: columnId,
      index,
      title,
      description,
    })
  })

  if (res.ok) {
    const card = await res.json();
    dispatch(createCard(card));
    return card;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkUpdateCard = (card) => async (dispatch) => {
  const { id, columnId, index, title, description } = card;
  dispatch(updateCard(card));

  const res = await fetch(`/api/cards/${id}/update`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      column_id: columnId,
      index,
      title,
      description,
    })
  })

  if (res.ok) {
    const card = await res.json();
    // dispatch(updateCard(card));
    return card;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkDeleteCard = (cardId) => async (dispatch) => {
  const res = await fetch(`/api/cards/${cardId}/delete`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteCard(cardId));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

//////////////////////////////// REDUCER ////////////////////////////////

const initialState = {
  oneCard: {},
  allCards: {}
};

export default function cardsReducer(state = initialState, action) {
  switch (action.type) {

    case GET_ONE_CARD: {
      return {
        ...state,
        oneCard: action.card,
      };
    }

    case GET_ALL_CARDS: {
      const newState = {
        ...state,
        allCards: {}
      };
      action.cards.cards.forEach((cardObj) => {
        newState.allCards[cardObj.id] = cardObj
      });
      return newState;
    }

    // case GET_ALL_CARDS_FOR_BOARD: {
    //   const newState = { ...state, allCards: {} };
    //   action.cards.cards.forEach((cardObj) => {
    //     newState.allCards[cardObj.id] = cardObj
    //   });
    //   return newState;
    // }

    case CREATE_CARD: {
      return {
        ...state,
        allCards: {
          ...state.allCards,
          [action.card.id]: action.card
        }
      };
    }

    case UPDATE_CARD: {
      const newState = {
        ...state,
        oneCard: {}
      };
      newState.allCards[action.card.id] = action.card;
      return newState;
    }

    case DELETE_CARD: {
      const newState = {
        ...state,
        oneCard: {},
        allCards: {
          ...state.allCards
        }
      };
      delete newState.allCards[action.cardId];
      return newState;
    }

    default: {
      return state;
    }
  }
};
