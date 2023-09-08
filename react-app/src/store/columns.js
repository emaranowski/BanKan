//////////////////////////////// ACTION TYPE CONSTANTS ////////////////////////////////

// const GET_ONE_COLUMN = "columns/getOneColumn";
const GET_ALL_COLUMNS = "columns/getAllColumns";
const CREATE_COLUMN = "columns/createColumn";
const UPDATE_COLUMN = "columns/updateColumn";
const DELETE_COLUMN = "columns/deleteColumn";

//////////////////////////////// ACTION CREATORS ////////////////////////////////

// const getOneColumn = (column) => {
//   return {
//     type: GET_ONE_COLUMN,
//     column
//   }
// };

const getAllColumns = (columns) => {
    return {
        type: GET_ALL_COLUMNS,
        columns
    }
};

const createColumn = (column) => {
    return {
        type: CREATE_COLUMN,
        column
    }
};

const updateColumn = (column) => {
    return {
        type: UPDATE_COLUMN,
        column
    }
};

const deleteColumn = (columnId) => {
    return {
        type: DELETE_COLUMN,
        columnId
    }
};

//////////////////////////////// THUNKS ////////////////////////////////

// THUNK: GET ONE COLUMN
// export const thunkGetOneColumn = (columnId) => async (dispatch) => {
//   // console.log('*** in thunkGetOneColumn, columnId:', columnId);
//   const res = await fetch(`/api/columns/${columnId}`, { method: "GET" });
//   // console.log('*** in thunkGetOneColumn, res:', res);

//   if (res.ok) {
//     const column = await res.json();
//     // console.log('*** in thunkGetOneColumn, RES OK column:', column);
//     dispatch(getOneColumn(column));
//     return column;
//   } else {
//     const errors = await res.json();
//     // console.log('*** in thunkGetOneColumn, RES NOTOK errors:', errors);
//     return errors;
//   }
// };

// THUNK: GET ALL COLUMNS
export const thunkGetAllColumnsForBoard = (boardId) => async (dispatch) => {
    const res = await fetch(`/api/boards/${boardId}/columns`, { method: "GET" });

    if (res.ok) {
        const columns = await res.json();
        dispatch(getAllColumns(columns));
        return columns;
    } else {
        const errors = await res.json();
        return errors;
    }
};

// THUNK: CREATE COLUMN
export const thunkCreateColumnForBoard = (column) => async (dispatch) => {
    console.log('**** in thunkCreateColumnForBoard ****')
    console.log('**** in thunkCreateColumnForBoard, column:', column)

    const { boardId, colorHex, title } = column;

    const res = await fetch(`/api/boards/${boardId}/columns/create`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            board_id: boardId,
            color_hex: colorHex,
            title,
        })
    })

    if (res.ok) {
        const column = await res.json();
        dispatch(createColumn(column));
        return column;
    } else {
        const errors = await res.json();
        return errors;
    }
};

// THUNK: UPDATE COLUMN
export const thunkUpdateColumn = (column) => async (dispatch) => {
    // console.log('**** in thunkUpdateColumn, column:', column)
    const { id, boardId, colorHex, title } = column;
    // console.log('**** in thunkUpdateColumn, id:', id)

    const res = await fetch(`/api/columns/${id}/update`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            board_id: boardId,
            color_hex: colorHex,
            title,
        })
    })
    console.log('**** in thunkUpdateColumn, res:', res)

    if (res.ok) {
        const column = await res.json();
        dispatch(updateColumn(column));
        return column;
    } else {
        const errors = await res.json();
        console.log('**** in thunkUpdateColumn, errors:', errors)
        return errors;
    }
};

// THUNK: DELETE COLUMN
export const thunkDeleteColumn = (columnId) => async (dispatch) => {
    const res = await fetch(`/api/columns/${columnId}/delete`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(deleteColumn(columnId));
        return data;
    } else {
        const errors = await res.json();
        return errors;
    }
};

//////////////////////////////// REDUCER ////////////////////////////////

const initialState = {
    oneColumn: {},
    allColumns: {}
};

export default function columnsReducer(state = initialState, action) {
    switch (action.type) {

        // case GET_ONE_COLUMN: {
        //   const newState = { ...state, oneColumn: {} };
        //   newState.oneColumn = action.column;
        //   return newState;
        // }

        case GET_ALL_COLUMNS: {
            const newState = { ...state, allColumns: {} };
            action.columns.columns.forEach((columnObj) => {
                newState.allColumns[columnObj.id] = columnObj
            });
            return newState;
        }

        case CREATE_COLUMN: {
            const newState = { ...state };
            newState.allColumns[action.column.id] = action.column;
            return newState;
        }

        case UPDATE_COLUMN: {
            const newState = { ...state, oneColumn: {} };
            newState.allColumns[action.column.id] = action.column;
            return newState;
        }

        case DELETE_COLUMN: {
            const newState = { ...state, oneColumn: {}, allColumns: { ...state.allColumns } };
            delete newState.allColumns[action.columnId];
            return newState;
        }

        default: {
            return state;
        }
    }
};
