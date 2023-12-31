//////////////////////////////// ACTION TYPE CONSTANTS ////////////////////////////////

const GET_ONE_NOTEBOOK = "notebooks/getOneNotebook";
const GET_ALL_NOTEBOOKS = "notebooks/getAllNotebooks";
const CREATE_NOTEBOOK = "notebooks/createNotebook";
const UPDATE_NOTEBOOK = "notebooks/updateNotebook";
const DELETE_NOTEBOOK = "notebooks/deleteNotebook";

//////////////////////////////// ACTION CREATORS ////////////////////////////////

const getOneNotebook = (notebook) => {
  return {
    type: GET_ONE_NOTEBOOK,
    notebook
  }
};

const getAllNotebooks = (notebooks) => {
  return {
    type: GET_ALL_NOTEBOOKS,
    notebooks
  }
};

const createNotebook = (notebook) => {
  return {
    type: CREATE_NOTEBOOK,
    notebook
  }
};

const updateNotebook = (notebook) => {
  return {
    type: UPDATE_NOTEBOOK,
    notebook
  }
};

const deleteNotebook = (notebookId) => {
  return {
    type: DELETE_NOTEBOOK,
    notebookId
  }
};

//////////////////////////////// THUNKS ////////////////////////////////

// THUNK: GET ONE NOTEBOOK
export const thunkGetOneNotebook = (notebookId) => async (dispatch) => {
  // console.log('*** in thunkGetOneNotebook, notebookId:', notebookId);
  const res = await fetch(`/api/notebooks/${notebookId}`, { method: "GET" });
  // console.log('*** in thunkGetOneNotebook, res:', res);

  if (res.ok) {
    const notebook = await res.json();
    // console.log('*** in thunkGetOneNotebook, RES OK notebook:', notebook);
    dispatch(getOneNotebook(notebook));
    return notebook;
  } else {
    const errors = await res.json();
    // console.log('*** in thunkGetOneNotebook, RES NOTOK errors:', errors);
    return errors;
  }
};

// THUNK: GET ALL NOTEBOOKS
export const thunkGetAllNotebooks = (userId) => async (dispatch) => {
  const res = await fetch(`/api/notebooks/user/${userId}`, { method: "GET" });

  if (res.ok) {
    const notebooks = await res.json();
    dispatch(getAllNotebooks(notebooks));
    return notebooks;
  } else {
    const errors = await res.json();
    return errors;
  }
};

// THUNK: CREATE NOTEBOOK
export const thunkCreateNotebook = (notebook) => async (dispatch) => {
  // console.log('**** in thunkCreateNotebook ****')
  // console.log('**** in thunkCreateNotebook, notebook:', notebook)

  const { userId, imageUrl, title, noteOrder } = notebook;

  const res = await fetch(`/api/notebooks/create/user/${userId}`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      image_url: imageUrl,
      title,
      note_order: noteOrder,
    })
  })

  if (res.ok) {
    const notebook = await res.json();
    dispatch(createNotebook(notebook));
    return notebook;
  } else {
    const errors = await res.json();
    return errors;
  }
};

// THUNK: UPDATE NOTEBOOK
export const thunkUpdateNotebook = (notebook) => async (dispatch) => {
  // console.log('**** in thunkUpdateNotebook, notebook:', notebook)
  const { id, userId, imageUrl, title, noteOrder } = notebook;
  // console.log('**** in thunkUpdateNotebook, id:', id)

  const res = await fetch(`/api/notebooks/${id}/update`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      image_url: imageUrl,
      title,
      note_order: noteOrder,
    })
  })
  // console.log('**** in thunkUpdateNotebook, res:', res)

  if (res.ok) {
    const notebook = await res.json();
    dispatch(updateNotebook(notebook));
    return notebook;
  } else {
    const errors = await res.json();
    // console.log('**** in thunkUpdateNotebook, errors:', errors)
    return errors;
  }
};

// THUNK: DELETE NOTEBOOK
export const thunkDeleteNotebook = (notebookId) => async (dispatch) => {
  const res = await fetch(`/api/notebooks/${notebookId}/delete`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteNotebook(notebookId));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

//////////////////////////////// REDUCER ////////////////////////////////

const initialState = {
  oneNotebook: {},
  allNotebooks: {}
};

export default function notebooksReducer(state = initialState, action) {
  switch (action.type) {

    case GET_ONE_NOTEBOOK: {
      const newState = { ...state, oneNotebook: {} };
      newState.oneNotebook = action.notebook;
      return newState;
    }

    case GET_ALL_NOTEBOOKS: {
      const newState = { ...state, allNotebooks: {} };
      action.notebooks.notebooks.forEach((notebookObj) => {
        newState.allNotebooks[notebookObj.id] = notebookObj
      });
      return newState;
    }

    case CREATE_NOTEBOOK: {
      const newState = { ...state };
      newState.allNotebooks[action.notebook.id] = action.notebook;
      return newState;
    }

    case UPDATE_NOTEBOOK: {
      const newState = { ...state, oneNotebook: {} };
      newState.allNotebooks[action.notebook.id] = action.notebook;
      return newState;
    }

    case DELETE_NOTEBOOK: {
      const newState = { ...state, oneNotebook: {}, allNotebooks: { ...state.allNotebooks } };
      delete newState.allNotebooks[action.notebookId];
      return newState;
    }

    default: {
      return state;
    }
  }
};
