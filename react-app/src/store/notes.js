//////////////////////////////// ACTION TYPE CONSTANTS ////////////////////////////////

const GET_ONE_NOTE = "notes/getOneNote";
const GET_ALL_NOTES = "notes/getAllNotes";
const CREATE_NOTE = "notes/createNote";
const UPDATE_NOTE = "notes/updateNote";
const DELETE_NOTE = "notes/deleteNote";

//////////////////////////////// ACTION CREATORS ////////////////////////////////

const getOneNote = (note) => {
  return {
    type: GET_ONE_NOTE,
    note
  }
};

const getAllNotes = (notes) => {
  return {
    type: GET_ALL_NOTES,
    notes
  }
};

const createNote = (note) => {
  return {
    type: CREATE_NOTE,
    note
  }
};

const updateNote = (note) => {
  return {
    type: UPDATE_NOTE,
    note
  }
};

const deleteNote = (noteId) => {
  return {
    type: DELETE_NOTE,
    noteId
  }
};

//////////////////////////////// THUNKS ////////////////////////////////

export const thunkGetOneNote = (noteId) => async (dispatch) => {
  const res = await fetch(`/api/notes/${noteId}`, { method: "GET" });

  if (res.ok) {
    const note = await res.json();
    dispatch(getOneNote(note));
    return note;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkGetAllNotesForNotebook = (notebookId) => async (dispatch) => {
  const res = await fetch(`/api/notebooks/${notebookId}/notes`, { method: "GET" });

  if (res.ok) {
    const notes = await res.json();
    dispatch(getAllNotes(notes));
    return notes;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkCreateNoteForNotebook = (note) => async (dispatch) => {
  const { notebookId, colorName, title, text } = note;

  const res = await fetch(`/api/notebooks/${notebookId}/notes/create`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      notebook_id: notebookId,
      color_name: colorName,
      title,
      text,
    })
  })

  if (res.ok) {
    const note = await res.json();
    dispatch(createNote(note));
    return note;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkUpdateNote = (note) => async (dispatch) => {
  const { id, notebookId, colorName, title, text } = note;

  const res = await fetch(`/api/notes/${id}/update`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      notebook_id: notebookId,
      color_name: colorName,
      title,
      text,
    })
  })

  if (res.ok) {
    const note = await res.json();
    dispatch(updateNote(note));
    return note;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkDeleteNote = (noteId) => async (dispatch) => {
  const res = await fetch(`/api/notes/${noteId}/delete`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteNote(noteId));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

//////////////////////////////// REDUCER ////////////////////////////////

const initialState = {
  oneNote: {},
  allNotes: {}
};

export default function notesReducer(state = initialState, action) {
  switch (action.type) {

    case GET_ONE_NOTE: {
      return {
        ...state,
        oneNote: action.note,
      };
    }

    case GET_ALL_NOTES: {
      const newState = {
        ...state,
        allNotes: {}
      };
      action.notes.notes.forEach((noteObj) => {
        newState.allNotes[noteObj.id] = noteObj
      });
      return newState;
    }

    case CREATE_NOTE: {
      return {
        ...state,
        allNotes: {
          ...state.allNotes,
          [action.note.id]: action.note
        }
      };
    }

    case UPDATE_NOTE: {
      return {
        ...state,
        oneNote: {},
        allNotes: {
          ...state.allNotes,
          [action.note.id]: action.note
        }
      };
    }

    case DELETE_NOTE: {
      const newState = {
        ...state,
        oneNote: {},
        allNotes: {
          ...state.allNotes
        }
      };
      delete newState.allNotes[action.noteId];
      return newState;
    }

    default: {
      return state;
    }
  }
};
