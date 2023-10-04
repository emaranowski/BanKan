const _ = require("lodash");

//////////////////////////////// ACTION TYPE CONSTANTS ////////////////////////////////

const GET_ONE_COLUMN = "columns/getOneColumn";
// const GET_ONE_COLUMN_CARD_ORDER = "columns/getOneColumnCardOrder";
const GET_ALL_COLUMNS = "columns/getAllColumns";
const CREATE_COLUMN = "columns/createColumn";
const UPDATE_COLUMN = "columns/updateColumn";
const UPDATE_TWO_COLUMNS = "columns/updateTwoColumns";
const DELETE_COLUMN = "columns/deleteColumn";

//////////////////////////////// ACTION CREATORS ////////////////////////////////

const getOneColumn = (column) => {
    return {
        type: GET_ONE_COLUMN,
        column
    }
};

// const getOneColumnCardOrder = (column) => {
//     return {
//         type: GET_ONE_COLUMN_CARD_ORDER,
//         column
//     }
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

export const updateColumn = (column) => {
    return {
        type: UPDATE_COLUMN,
        column
    }
};

const updateTwoColumns = (columns) => {
    return {
        type: UPDATE_TWO_COLUMNS,
        columns
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
export const thunkGetOneColumn = (columnId) => async (dispatch) => {
    // console.log('*** in thunkGetOneColumn, columnId:', columnId);
    const res = await fetch(`/api/columns/${columnId}`, { method: "GET" });
    // console.log('*** in thunkGetOneColumn, res:', res);

    if (res.ok) {
        const column = await res.json();
        // console.log('*** in thunkGetOneColumn, RES OK column:', column);
        dispatch(getOneColumn(column));
        return column;
    } else {
        const errors = await res.json();
        console.log('*** in thunkGetOneColumn, RES NOTOK errors:', errors);
        return errors;
    }
};

// // THUNK: GET ONE COLUMN CARD ORDER
// export const thunkGetOneColumnCardOrder = (columnId) => async (dispatch) => {
//     // console.log('*** in thunkGetOneColumnCardOrder, columnId:', columnId);
//     // const res = await fetch(`/api/columns/${columnId}`, { method: "GET" });
//     // console.log('*** in thunkGetOneColumnCardOrder, res:', res);
//     dispatch(getOneColumnCardOrder(columnId));
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
    // console.log('**** in thunkCreateColumnForBoard ****')
    // console.log('**** in thunkCreateColumnForBoard, column:', column)

    const { boardId, cardOrder, colorName, title } = column; // removed colorHex

    const res = await fetch(`/api/boards/${boardId}/columns/create`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            board_id: boardId,
            card_order: cardOrder,
            // color_hex: colorHex,
            color_name: colorName,
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
export const thunkUpdateColumn = (columnToUpdate, srcIdx, destIdx) => async (dispatch) => { // maybe add oldCol param
    // console.log('**** in thunkUpdateColumn, column:', column)
    const { id, boardId, cardOrder, colorName, title } = columnToUpdate; // removed colorHex

    console.log('**** in thunkUpdateColumn, cardOrder:', cardOrder)

    // convert cardOrder: from str to arr
    const cardOrderArr = cardOrder.split(',');

    // update cardOrder: 1. remove cardDndId at srcIdx, 2. add cardDndId at destIdx
    const movedCardDndId = cardOrderArr.splice(srcIdx, 1)[0]; // at srcIdx: remove 1
    cardOrderArr.splice(destIdx, 0, movedCardDndId); // at destIdx: remove 0, add movedCardDndId

    // convert cardOrder: from arr to str
    const cardOrderUpdatedStr = cardOrderArr.toString();

    // create colUpdated w/ updated card order
    const columnUpdated = {
        ...columnToUpdate,
        cardOrder: cardOrderUpdatedStr,
    };
    console.log('**** in thunkUpdateColumn, columnUpdated.cardOrder:', columnUpdated.cardOrder)



    // console.log('**** in thunkUpdateColumn, id:', id)
    dispatch(updateColumn(columnUpdated));
    const res = await fetch(`/api/columns/${id}/update`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            board_id: boardId,
            card_order: cardOrderUpdatedStr,
            // color_hex: colorHex,
            color_name: colorName,
            title,
        })
    })
    // console.log('**** in thunkUpdateColumn, res:', res)

    if (res.ok) {
        const column = await res.json();
        console.log('**** in thunkUpdateColumn RES OK, column:', column)

        // dispatch(updateColumn(column));
        // dispatch(thunkGetAllColumnsForBoard(boardId));
        return column;
    } else {
        // dispatch(updateColumn(oldColumn));
        const errors = await res.json();
        // console.log('**** in thunkUpdateColumn, errors:', errors)
        return errors;
    }
};

// THUNK: UPDATE TWO COLUMNS
export const thunkUpdateTwoColumns = (columns) => async (dispatch) => { // maybe add oldCol param
    // console.log('**** in thunkUpdateTwoColumns, columns:', columns)
    const { columnUpdatedSrc, columnUpdatedDest } = columns;
    dispatch(updateTwoColumns(columns));
    const resSrc = await fetch(`/api/columns/${columnUpdatedSrc.id}/update`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            board_id: columnUpdatedSrc.boardId,
            card_order: columnUpdatedSrc.cardOrder,
            color_name: columnUpdatedSrc.colorName,
            title: columnUpdatedSrc.title,
        })
    })
    // console.log('**** in thunkUpdateTwoColumns, resSrc:', resSrc)
    const resDest = await fetch(`/api/columns/${columnUpdatedDest.id}/update`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            board_id: columnUpdatedDest.boardId,
            card_order: columnUpdatedDest.cardOrder,
            color_name: columnUpdatedDest.colorName,
            title: columnUpdatedDest.title,
        })
    })
    // console.log('**** in thunkUpdateTwoColumns, resDest:', resDest)

    if (resSrc.ok && resDest.ok) {
        // console.log('**** in thunkUpdateTwoColumns, resSrc OK:', resSrc)
        // console.log('**** in thunkUpdateTwoColumns, resDest OK:', resDest)
        const columnSrc = await resSrc.json();
        const columnDest = await resDest.json();
        // dispatch(updateColumn(column));
        // dispatch(thunkGetAllColumnsForBoard(boardId));
        return { columnSrc, columnDest };
    } else {
        // console.log('**** in thunkUpdateTwoColumns, res NOT OK, resSrc:', resSrc)
        // console.log('**** in thunkUpdateTwoColumns, res NOT OK, resSrc:', resDest)
        // dispatch(updateColumn(oldColumn));
        const errorsSrc = await resSrc.json();
        const errorsDest = await resDest.json();
        // console.log('**** in thunkUpdateTwoColumns, res NOT OK, errorsSrc:', errorsSrc)
        // console.log('**** in thunkUpdateTwoColumns, res NOT OK, errorsDest:', errorsDest)
        return { errorsSrc, errorsDest };
    }
};

// // THUNK: UPDATE TWO COLUMNS
// export const thunkUpdateTwoColumns = (columns) => async (dispatch) => { // maybe add oldCol param
//     console.log('**** in thunkUpdateTwoColumns, columns:', columns)
//     const { columnUpdatedSrc, columnUpdatedDest } = columns;
//     dispatch(updateTwoColumns(columns));
//     const res = await fetch(`/api/columns/update-two-columns`, {
//         method: "PUT",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             column_id_src: columnUpdatedSrc.id,
//             board_id_src: columnUpdatedSrc.boardId,
//             card_order_src: columnUpdatedSrc.cardOrder,
//             color_name_src: columnUpdatedSrc.colorName,
//             title_src: columnUpdatedSrc.title,

//             column_id_dest: columnUpdatedDest.id,
//             board_id_dest: columnUpdatedDest.boardId,
//             card_order_dest: columnUpdatedDest.cardOrder,
//             color_name_dest: columnUpdatedDest.colorName,
//             title_dest: columnUpdatedDest.title,
//         })
//     })
//     console.log('**** in thunkUpdateTwoColumns, res:', res)

//     if (res.ok) {
//         console.log('**** in thunkUpdateTwoColumns, res OK:', res)
//         const columns = await res.json();
//         // dispatch(updateColumn(column));
//         // dispatch(thunkGetAllColumnsForBoard(boardId));
//         return columns;
//     } else {
//         console.log('**** in thunkUpdateTwoColumns, res NOT OK, res:', res)
//         // dispatch(updateColumn(oldColumn));
//         const errors = await res.json(); // THIS IS WHERE I'M GETTING AN ISSUE
//         console.log('**** in thunkUpdateTwoColumns, res NOT OK, errors:', errors)
//         return errors;
//     }
// };

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
    allColumns: {},
    // oneColumnCardOrder: {}
};

export default function columnsReducer(state = initialState, action) {
    switch (action.type) {

        case GET_ONE_COLUMN: {
            const newState = { ...state, oneColumn: {} };
            newState.oneColumn = action.column;
            return newState;
        }

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
            const newState = { ...state };
            newState.allColumns[action.column.id] = action.column;
            return newState;
        }

        case UPDATE_TWO_COLUMNS: {
            const newState = { ...state };

            console.log('**** in UPDATE_TWO_COLUMNS, action.columns:', action.columns)
            _.merge({}, newState.allColumns, action.columns.columnUpdatedSrc, action.columns.columnUpdatedDest);
            console.log('**** in UPDATE_TWO_COLUMNS, newState:', newState)

            const stateCopy = { ...state };
            // allColumns['1'] = action.columns.columnUpdatedSrc;
            // allColumns['2'] = action.columns.columnUpdatedDest;

            const allColumnsCopy = stateCopy.allColumns;
            console.log('**** in UPDATE_TWO_COLUMNS, allColumnsCopy:', allColumnsCopy)

            const updatedTwoCols = action.columns;
            console.log('**** in UPDATE_TWO_COLUMNS, updatedTwoCols:', updatedTwoCols)





            // // console.log('**** in UPDATE_TWO_COLUMNS, action:', action)
            // newState.allColumns[action.columns.columnUpdatedSrc.id] = { ...action.columns.columnUpdatedSrc };
            // newState.allColumns[action.columns.columnUpdatedDest.id] = { ...action.columns.columnUpdatedDest };
            // // console.log('**** in UPDATE_TWO_COLUMNS, newState:', newState)

            // const deepCopyOfDndIdsSrc = [...action.columns.columnUpdatedSrc.cardDndIds];
            // // console.log('**** in UPDATE_TWO_COLUMNS, deepCopyOfDndIdsSrc:', deepCopyOfDndIdsSrc);
            // newState.allColumns[action.columns.columnUpdatedSrc.id].cardDndIds = deepCopyOfDndIdsSrc;
            // // console.log('**** in UPDATE_TWO_COLUMNS, newState:', newState.allColumns[action.columns.columnUpdatedSrc.id].cardDndIds);
            // // console.log('**** in UPDATE_TWO_COLUMNS, newState:', newState);
            // const deepCopyOfDndIdsDest = [...action.columns.columnUpdatedDest.cardDndIds];
            // newState.allColumns[action.columns.columnUpdatedDest.id].cardDndIds = deepCopyOfDndIdsDest;

            // const deepCopyOfCardsSrc = [...action.columns.columnUpdatedSrc.cards];
            // newState.allColumns[action.columns.columnUpdatedSrc.id].cards = deepCopyOfCardsSrc;
            // const deepCopyOfCardsDest = [...action.columns.columnUpdatedDest.cards];
            // newState.allColumns[action.columns.columnUpdatedDest.id].cards = deepCopyOfCardsDest;

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
