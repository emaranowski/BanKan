import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { thunkGetOneBoard } from '../../store/boards';
import { updateColumn, thunkGetOneColumn, thunkGetAllColumnsForBoard, thunkUpdateColumn } from '../../store/columns';
import { thunkUpdateCard } from '../../store/cards';
// import { thunkGetOneCard } from '../../store/cards';
// import { thunkGetOneColumn } from '../../store/columns';
import { useParams, Link } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import OpenModalButton from "../OpenModalButton";
import BoardFormUpdate from "../BoardFormUpdate";
import BoardDeleteModal from "../BoardDeleteModal";
import ColumnFormCreate from '../ColumnFormCreate';
import Column from "../Column";
import './Board.css';

export default function Board() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser.id;
  const { boardId } = useParams();
  const board = useSelector(state => state.boards.oneBoard);
  const imageUrl = board.imageUrl;
  const title = board.title;
  const columns = Object.values(useSelector(state => state.columns.allColumns));
  // const dndId = board.dndId;
  // const columnDndIds = board.columnDndIds;
  // const columnsDnd = board.columnsDnd;

  // const board2Arr = sessionUser.boards.filter(board => {
  //   return board.userId === sessionUser.id;
  // })
  // const board = board2Arr[0];
  // const imageUrl = board.imageUrl;
  // const title = board.title;
  // const columns = board.columns;

  // console.log('||||||| in Board, sessionUser:', sessionUser)
  // console.log('||||||| in Board, board:', board)
  // console.log('||||||| in Board, board.columns:', board.columns)
  // console.log('||||||| in Board, board2Arr:', board2Arr)
  // console.log('||||||| in Board, board2:', board2)

  const [triggerRerenderToggle, setTriggerRerenderToggle] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    dispatch(thunkGetOneBoard(boardId))
    dispatch(thunkGetAllColumnsForBoard(boardId))
    setIsLoaded(true)
  }, [dispatch, boardId, imageUrl, title, triggerRerenderToggle]);

  useEffect(async () => {
    if (Object.values(board).length > 0) {
      if (!userId || userId !== board.userId) {
        // console.log('///////////', userId, board.userId);
        history.push('/');
        // window.alert('Invalid Permissions')
      }
    }
  }, [sessionUser, board]);

  const updateCardOrderOnColumn = async (columnUpdated) => {
    try {
      // dispatch(updateColumn(columnUpdated));
      const res = await dispatch(thunkUpdateColumn(columnUpdated)); // VScode notes not needing 'await', but it IS needed
      if (res.id) {
        // setTriggerRerenderToggle(!triggerRerenderToggle);
        dispatch(thunkGetOneBoard(boardId));
        // dispatch(thunkGetAllColumnsForBoard(boardId));
        // dispatch(thunkGetOneColumn(columnUpdated.id))
        return res;
      } else {
        return res;
      }
    } catch (res) {
      const data = await res.json();
      return data;
    }
  };

  const updateColumnIdOnCard = async (cardUpdated, columnUpdatedSrc, columnUpdatedDest) => {
    try {
      // dispatch(updateColumn(columnUpdatedSrc));
      // dispatch(updateColumn(columnUpdatedDest));
      const res = await dispatch(thunkUpdateCard(cardUpdated)); // VScode notes not needing 'await', but it IS needed
      if (res.id) {
        // setTriggerRerenderToggle(!triggerRerenderToggle);
        // dispatch(thunkGetOneCard(cardUpdated.id));
        // dispatch(thunkGetOneColumn(cardUpdated.columnId))
        dispatch(thunkGetOneBoard(boardId));
        // dispatch(thunkGetAllColumnsForBoard(boardId));
        return res;
      } else {
        return res;
      }
    } catch (res) {
      const data = await res.json();
      return data;
    }
  };

  // const updateCardAndCols = async (cardUpdated, columnUpdatedSrc, columnUpdatedDest) => {
  //   const res1 = await dispatch(thunkUpdateColumn(columnUpdatedSrc)); // VScode notes not needing 'await', but it IS needed
  //   const res2 = await dispatch(thunkUpdateColumn(columnUpdatedDest)); // VScode notes not needing 'await', but it IS needed
  //   const res3 = await dispatch(thunkUpdateCard(cardUpdated)); // VScode notes not needing 'await', but it IS needed
  //   if (res1.id && res2.id && res3.id) {
  //     setTriggerRerenderToggle(!triggerRerenderToggle);
  //     dispatch(thunkGetOneCard(cardUpdated.id));
  //     dispatch(thunkGetOneColumn(cardUpdated.columnId))
  //     dispatch(thunkGetOneBoard(boardId));
  //     dispatch(thunkGetAllColumnsForBoard(boardId));
  //     return;
  //   } else {
  //     return;
  //   }
  // }

  const onDragEnd = (result) => {
    console.log('||||||| ondragend begins')
    const { draggableId, source, destination } = result;

    // return if: no destination, or dropped back into original spot
    if (!destination) return;
    if (source.droppableId === destination.droppableId &&
      source.index === destination.index) {
      return;
    };

    //////// CASE 1: drop within one single col
    if (source.droppableId === destination.droppableId) {

      // get col to update (col where dndId matches source.droppableId)
      const columnArr = columns.filter(column => {
        return column.dndId === source.droppableId;
      });
      const columnToUpdate = columnArr[0];

      // convert cardOrder: str to arr
      const cardOrderStr = columnToUpdate.cardOrder;
      const cardOrderArr = cardOrderStr.split(',');

      // update cardOrder: 1. remove cardDndId at srcIdx, 2. add cardDndId at destIdx
      const movedCardDndIdArr = cardOrderArr.splice(source.index, 1); // at srcIdx: remove 1
      const movedCardDndId = movedCardDndIdArr[0];
      cardOrderArr.splice(destination.index, 0, movedCardDndId); // at destIdx: remove 0, add movedCardDndId

      // convert cardOrder: arr to str
      const cardOrderUpdatedStr = cardOrderArr.toString();

      // create colUpdated w/ updated card order
      const columnUpdated = {
        ...columnToUpdate,
        cardOrder: cardOrderUpdatedStr,
      };

      // get idx of colToUpdate (in orig 'columns' arr)
      const columnToUpdateIdx = columns.indexOf(columnToUpdate);
      // at colToUpdateIdx in 'columns': 1. remove colToUpdate, 2. add colUpdated
      columns.splice(columnToUpdateIdx, 1, columnUpdated);

      updateCardOrderOnColumn(columnUpdated); // update card order property on col
      setTriggerRerenderToggle(!triggerRerenderToggle); // trigger useEffect when onDragEnd is done
    };



    //////// CASE 2: drop across two diff cols
    if (source.droppableId !== destination.droppableId) {

      // SRC + DEST -- get col to update (where dndId matches source/dest.droppableId)
      const columnArrSrc = columns.filter(column => {
        return column.dndId === source.droppableId;
      });
      const columnArrDest = columns.filter(column => {
        return column.dndId === destination.droppableId;
      });
      const columnToUpdateSrc = columnArrSrc[0];
      const columnToUpdateDest = columnArrDest[0];

      // get card to update (must change columnId from SRC to DEST)
      const cardsFromSrc = columnToUpdateSrc.cards;
      const cardArr = cardsFromSrc.filter(card => {
        return card.dndId === draggableId;
      });
      const cardToUpdate = cardArr[0];
      // create cardUpdated w/ updated columnId
      const cardUpdated = {
        ...cardToUpdate,
        columnId: columnToUpdateDest.id,
      };

      // SRC + DEST -- convert cardOrder: str to arr
      const cardOrderStrSrc = columnToUpdateSrc.cardOrder;
      const cardOrderStrDest = columnToUpdateDest.cardOrder;
      const cardOrderArrSrc = cardOrderStrSrc.split(',');
      const cardOrderArrDest = cardOrderStrDest.split(',');

      // SRC -- update cardOrder: remove cardDndId at srcIdx
      const movedCardDndIdArr = cardOrderArrSrc.splice(source.index, 1); // at srcIdx: remove 1
      const movedCardDndId = movedCardDndIdArr[0];

      // DEST -- update cardOrder: add cardDndId at destIdx
      // CASE 1: dest col has 1+ CARDS (cardOrder has cards):
      // at destIdx: remove 0; add movedCardDndId
      if (cardOrderArrDest[destination.index] !== '') {
        cardOrderArrDest.splice(destination.index, 0, movedCardDndId);
        // CASE 2: dest col has ZERO CARDS (cardOrder is empty str: ''):
        // at destIdx (will be idx0): remove 1 (to remove ''); add movedCardDndId
      } else if (cardOrderArrDest[destination.index] === '') {
        cardOrderArrDest.splice(destination.index, 1, movedCardDndId);
      };

      // SRC + DEST -- convert cardOrder: arr to str
      const cardOrderUpdatedStrSrc = cardOrderArrSrc.toString();
      const cardOrderUpdatedStrDest = cardOrderArrDest.toString();

      // SRC + DEST -- create columnUpdated w/ updated card order
      const columnUpdatedSrc = {
        ...columnToUpdateSrc,
        cardOrder: cardOrderUpdatedStrSrc,
      };
      const columnUpdatedDest = {
        ...columnToUpdateDest,
        cardOrder: cardOrderUpdatedStrDest,
      };

      // console.log('|||||| cardUpdated:', cardUpdated)
      // console.log('|||||| columnUpdatedSrc:', columnUpdatedSrc)
      // console.log('|||||| columnUpdatedDest:', columnUpdatedDest)

      // SRC -- get idx of columnToUpdate (from orig 'columns' arr)
      // SRC -- at that idx in 'columns': 1. remove columnToUpdate, 2. add colUpdated
      const columnToUpdateIdxSrc = columns.indexOf(columnToUpdateSrc);
      const columnToUpdateIdxDest = columns.indexOf(columnToUpdateDest);
      columns.splice(columnToUpdateIdxSrc, 1, columnUpdatedSrc);
      columns.splice(columnToUpdateIdxDest, 1, columnUpdatedDest);

      // const updateCardAndBothCols = async () => {
      //   const res1 = await updateCardOrderOnColumn(columnUpdatedSrc);
      //   const res2 = await updateColumnIdOnCard(cardUpdated);
      //   const res3 = await updateCardOrderOnColumn(columnUpdatedDest);
      //   if (res1 && res2 && res3) setTriggerRerenderToggle(!triggerRerenderToggle);
      // };
      // updateCardAndBothCols();

      // updateCardAndCols(cardUpdated, columnUpdatedSrc, columnUpdatedDest);

      updateCardOrderOnColumn(columnUpdatedSrc);
      updateColumnIdOnCard(cardUpdated, columnUpdatedSrc, columnUpdatedDest);
      updateCardOrderOnColumn(columnUpdatedDest);
      // dispatch(thunkGetOneBoard(boardId));
      // dispatch(thunkGetAllColumnsForBoard(boardId));
      setTriggerRerenderToggle(!triggerRerenderToggle); // trigger useEffect when onDragEnd is done
    };



    // ORIG
    // cardOrderArr.splice(source.index, 1); // remove 1 at idx
    // cardOrderArr.splice(destination.index, 0, draggableId); // remove 0, add draggableId at idx

    // const newState = {
    //   ...state.columns,
    //   allColumns: {
    //     ...state.columns.allColumns,
    //     [columnUpdated.id]: columnUpdated,
    //   },
    // };

    // may not need to edit index on card, but keep architecture for now:
    // const cards = columnToUpdate.cards;
    // const oneCardArr = cards.filter(card => {
    //   return card.dndId === draggableId;
    // });
    // const cardToUpdate = oneCardArr[0];
    // const cardUpdated = {
    //   ...cardToUpdate,
    //   index: destination.index,
    // };
    // ORIG to update index on card
    // const updateIndexOnCard = async (cardUpdated) => {
    //   try {
    //     const res = await dispatch(thunkUpdateCard(cardUpdated)); // VScode notes not needing 'await', but it IS needed
    //     if (res.id) {
    //       // dispatch(thunkGetOneBoard(boardId));
    //       // dispatch(thunkGetAllColumnsForBoard(boardId));
    //       return res;
    //     } else {
    //       return res;
    //     }
    //   } catch (res) {
    //     const data = await res.json();
    //     return data;
    //   }
    // };

  };


  return (<>{isLoaded && (
    <DragDropContext onDragEnd={onDragEnd}>
      <div id='board-page' style={{ backgroundImage: `url(${imageUrl})` }}>

        <div id='board-page-content'>
          <Link to={`/dashboard`}>
            ⬅ Dashboard
          </Link>

          <div id='board-header'>
            <div id='board-title'>
              <span id='board-title-text'>{title}</span>
            </div>

            <div id='board-btns'>
              <span>
                <OpenModalButton
                  buttonText={<i class="fa-regular fa-pen-to-square"></i>}
                  modalComponent={
                    <BoardFormUpdate
                      board={board}
                    />}
                />
              </span>

              <span>
                <OpenModalButton
                  buttonText={<i class="fa-regular fa-trash-can"></i>}
                  modalComponent={
                    <BoardDeleteModal
                      boardId={boardId}
                    />}
                />
              </span>

            </div>
          </div>

          <div id='board-columns'>
            {columns && (
              columns.map((column) => (
                <span className='board-one-column' key={column.id}>
                  <Column key={column.id} column={column} />
                </span>
              ))
            )}

            <span id='board-add-col-btn'>
              <OpenModalButton
                buttonText={<i class="fa-solid fa-plus"><span> </span><span>Add column</span></i>}
                modalComponent={
                  <ColumnFormCreate
                    boardId={boardId}
                  />}
              />
            </span>
          </div>
        </div>

      </div >
    </DragDropContext>
  )}
  </>)
};
