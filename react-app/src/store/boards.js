//////////////////////////////// ACTION TYPE CONSTANTS ////////////////////////////////

const GET_ONE_BOARD = "boards/getOneBoard";
const GET_ALL_BOARDS = "boards/getAllBoards";
const CREATE_BOARD = "boards/createBoard";
const UPDATE_BOARD = "boards/updateBoard";
const DELETE_BOARD = "boards/deleteBoard";

//////////////////////////////// ACTION CREATORS ////////////////////////////////

const getOneBoard = (board) => {
  return {
    type: GET_ONE_BOARD,
    board
  }
};

const getAllBoards = (boards) => {
  return {
    type: GET_ALL_BOARDS,
    boards
  }
};

const createBoard = (board) => {
  return {
    type: CREATE_BOARD,
    board
  }
};

const updateBoard = (board) => {
  return {
    type: UPDATE_BOARD,
    board
  }
};

const deleteBoard = (boardId) => {
  return {
    type: DELETE_BOARD,
    boardId
  }
};

//////////////////////////////// THUNKS ////////////////////////////////

export const thunkGetOneBoard = (boardId) => async (dispatch) => {
  const res = await fetch(`/api/boards/${boardId}`, { method: "GET" });

  if (res.ok) {
    const board = await res.json();
    dispatch(getOneBoard(board));
    return board;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkGetAllBoards = (userId) => async (dispatch) => {
  const res = await fetch(`/api/boards/user/${userId}`, { method: "GET" });

  if (res.ok) {
    const boards = await res.json();
    dispatch(getAllBoards(boards));
    return boards;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkCreateBoard = (board) => async (dispatch) => {
  const { imageUrl, title, userId } = board;

  const res = await fetch(`/api/boards/create/user/${userId}`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image_url: imageUrl,
      title,
      user_id: userId,
    })
  })

  if (res.ok) {
    const board = await res.json();
    dispatch(createBoard(board));
    return board;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkUpdateBoard = (board) => async (dispatch) => {
  const { imageUrl, title, id, userId } = board;

  const res = await fetch(`/api/boards/${id}/update`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image_url: imageUrl,
      title,
      user_id: userId,
    })
  })

  if (res.ok) {
    const board = await res.json();
    dispatch(updateBoard(board));
    return board;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkDeleteBoard = (boardId) => async (dispatch) => {
  const res = await fetch(`/api/boards/${boardId}/delete`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteBoard(boardId));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

//////////////////////////////// REDUCER ////////////////////////////////

const initialState = {
  oneBoard: {},
  allBoards: {}
};

export default function boardsReducer(state = initialState, action) {
  switch (action.type) {

    case GET_ONE_BOARD: {
      return {
        ...state,
        oneBoard: action.board,
      };
    }

    case GET_ALL_BOARDS: {
      const newState = {
        ...state,
        allBoards: {}
      };
      action.boards.boards.forEach((board) => {
        newState.allBoards[board.id] = board
      });
      return newState;
    }

    case CREATE_BOARD: {
      return {
        ...state,
        allBoards: {
          ...state.allBoards,
          [action.board.id]: action.board,
        },
      };
    }

    case UPDATE_BOARD: {
      return {
        ...state,
        oneBoard: {},
        allBoards: {
          ...state.allBoards,
          [action.board.id]: action.board,
        },
      };
    }

    case DELETE_BOARD: {
      const newAllBoards = { ...state.allBoards };
      delete newAllBoards[action.boardId];
      return {
        ...state,
        oneBoard: {},
        allBoards: newAllBoards,
      };
    }

    default: {
      return state;
    }
  }
};
