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

export const thunkGetOneNotebook = (notebookId) => async (dispatch) => {
  const res = await fetch(`/api/notebooks/${notebookId}`, { method: "GET" });

  if (res.ok) {
    const notebook = await res.json();
    dispatch(getOneNotebook(notebook));
    return notebook;
  } else {
    const errors = await res.json();
    return errors;
  }
};

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

export const thunkCreateNotebook = (notebook) => async (dispatch) => {
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

export const thunkUpdateNotebook = (notebook) => async (dispatch) => {
  const { id, userId, imageUrl, title, noteOrder } = notebook;

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

  if (res.ok) {
    const notebook = await res.json();
    dispatch(updateNotebook(notebook));
    return notebook;
  } else {
    const errors = await res.json();
    return errors;
  }
};

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
      return {
        ...state,
        oneNotebook: action.notebook,
      };
    }

    case GET_ALL_NOTEBOOKS: {
      const newState = {
        ...state,
        allNotebooks: {}
      };
      action.notebooks.notebooks.forEach((notebookObj) => {
        newState.allNotebooks[notebookObj.id] = notebookObj
      });
      return newState;
    }

    case CREATE_NOTEBOOK: {
      return {
        ...state,
        allNotebooks: {
          ...state.allNotebooks,
          [action.notebook.id]: action.notebook
        }
      };
    }

    case UPDATE_NOTEBOOK: {
      return {
        ...state,
        oneNotebook: {},
        allNotebooks: {
          ...state.allNotebooks,
          [action.notebook.id]: action.notebook
        }
      };
    }

    case DELETE_NOTEBOOK: {
      const newState = {
        ...state,
        oneNotebook: {},
        allNotebooks: {
          ...state.allNotebooks
        }
      };
      delete newState.allNotebooks[action.notebookId];
      return newState;
    }

    default: {
      return state;
    }
  }
};
