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

// THUNK: GET ONE BOARD
export const thunkGetOneBoard = (boardId) => async (dispatch) => {
  // console.log('*** in thunkGetOneBoard, boardId:', boardId);
  const res = await fetch(`/api/boards/${boardId}`, { method: "GET" });
  // console.log('*** in thunkGetOneBoard, res:', res);

  if (res.ok) {
    const board = await res.json();
    // console.log('*** in thunkGetOneBoard, RES OK board:', board);
    dispatch(getOneBoard(board));
    return board;
  } else {
    const errors = await res.json();
    // console.log('*** in thunkGetOneBoard, RES NOTOK errors:', errors);
    return errors;
  }
};

// THUNK: GET ALL BOARDS
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

// THUNK: CREATE BOARD
export const thunkCreateBoard = (board) => async (dispatch) => {
  // console.log('**** in thunkCreateBoard ****')
  // console.log('**** in thunkCreateBoard, board:', board)

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

// THUNK: UPDATE BOARD
export const thunkUpdateBoard = (board) => async (dispatch) => {
  // console.log('**** in thunkUpdateBoard, board:', board)
  const { imageUrl, title, id, userId } = board;
  // console.log('**** in thunkUpdateBoard, id:', id)

  const res = await fetch(`/api/boards/${id}/update`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image_url: imageUrl,
      title,
      user_id: userId,
    })
  })
  // console.log('**** in thunkUpdateBoard, res:', res)

  if (res.ok) {
    const board = await res.json();
    dispatch(updateBoard(board));
    return board;
  } else {
    const errors = await res.json();
    // console.log('**** in thunkUpdateBoard, errors:', errors)
    return errors;
  }
};

// THUNK: DELETE BOARD
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
      const newState = { ...state, oneBoard: {} };
      newState.oneBoard = action.board;
      return newState;
    }

    case GET_ALL_BOARDS: {
      const newState = { ...state, allBoards: {} };
      action.boards.boards.forEach((boardObj) => {
        newState.allBoards[boardObj.id] = boardObj
      });
      return newState;
    }

    case CREATE_BOARD: {
      const newState = { ...state };
      newState.allBoards[action.board.id] = action.board;
      return newState;
    }

    case UPDATE_BOARD: {
      const newState = { ...state, oneBoard: {} };
      newState.allBoards[action.board.id] = action.board;
      return newState;
    }

    case DELETE_BOARD: {
      const newState = { ...state, oneBoard: {}, allBoards: { ...state.allBoards } };
      delete newState.allBoards[action.boardId];
      return newState;
    }

    default: {
      return state;
    }
  }
};
