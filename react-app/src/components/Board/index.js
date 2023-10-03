import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { thunkGetOneBoard } from '../../store/boards';
import { updateColumn, thunkGetOneColumn, thunkGetAllColumnsForBoard, thunkUpdateColumn, thunkUpdateTwoColumns } from '../../store/columns';
import { thunkUpdateCard } from '../../store/cards';
import { useParams, Link } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import OpenModalButton from "../OpenModalButton";
import BoardFormUpdate from "../BoardFormUpdate";
import BoardDeleteModal from "../BoardDeleteModal";
import ColumnFormCreate from '../ColumnFormCreate';
import Column from "../Column";
import './Board.css';

import useToggle from '../../hooks/useToggle';
import useInputState from '../../hooks/useInputState';
import AppContext from '../../context/Context';
import buildBoardOrg from '../../utils';
import { baseUrl } from '../../config';

export default function Board() {
  const [show, toggleShow] = useToggle(false);
  const [listText, updateListText, resetListText] = useInputState();
  const [hidden, toggleHidden] = useToggle(false);
  const { boardOrg, setBoardOrg, token } = useContext(AppContext);

  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser.id;
  const { boardId } = useParams();
  const boardIdAsNum = parseInt(boardId);
  const board = useSelector(state => state.boards.oneBoard);
  const imageUrl = board.imageUrl;
  const title = board.title;
  const columns = Object.values(useSelector(state => state.columns.allColumns));

  // console.log('||||||| in Board, board:', board)
  // console.log('||||||| in Board, board.columns:', board.columns)
  // console.log('||||||| columns:', columns)
  // console.log('||||||| columns[0]:', columns[0])

  const [triggerRerenderToggle, setTriggerRerenderToggle] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // get board & cols, 1x on mount
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/boards/${boardIdAsNum}/get-board-and-cols`,
        {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
        });
      console.log('******* in board & cols, 1x on mount, res:', res)
      const data = await res.json();
      console.log('******* in board & cols, 1x on mount, data:', data)
      const { board, columns } = data;
      const loadBoardOrg = buildBoardOrg(board, columns);
      console.log('******* in board & cols, 1x on mount, loadBoardOrg:', loadBoardOrg)
      setBoardOrg(loadBoardOrg);
    })();
  }, [boardId]);


  // const saveBoard = async (newBoard) => {
  //   // const { board, columns } = newBoard
  //   // console.log('@@@@@ in onDragEnd, baseUrl:', baseUrl)
  //   // console.log('@@@@@ in onDragEnd, newBoard:', newBoard)
  //   // console.log('@@@@@ in onDragEnd, newBoard.columns:', newBoard.columns)

  //   // const res = await fetch(`${baseUrl}/boards/save`,
  //   const res = await fetch(`/api/boards/save`,
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         newBoard
  //         // board,
  //         // columns
  //       }),
  //     }
  //   );
  //   const data = res.json();
  //   if (data.error) {
  //     alert("Board could not be saved.");
  //   };
  // };


  useEffect(() => {
    // dispatch(thunkGetOneBoard(boardId));
    // dispatch(thunkGetAllColumnsForBoard(boardId));
    async function getBoardAndCols() {
      await dispatch(thunkGetOneBoard(boardId));
      await dispatch(thunkGetAllColumnsForBoard(boardId));
    };
    getBoardAndCols();
    setIsLoaded(true);
  }, [dispatch, boardId, imageUrl, title]);

  useEffect(() => {
  }, [triggerRerenderToggle]);

  useEffect(() => {
    if (Object.values(board).length > 0) {
      if (!userId || userId !== board.userId) {
        // console.log('///////////', userId, board.userId);
        history.push('/');
        // window.alert('Invalid Permissions')
      }
    }
  }, [sessionUser, board, userId, history]);


  // const getUpdatedBoardAndCols = async () => {
  //   dispatch(thunkGetOneBoard(boardId));
  //   setTriggerRerenderToggle(!triggerRerenderToggle);
  //   dispatch(thunkGetAllColumnsForBoard(boardId));
  //   // console.log('/////////// in getUpdatedBoardAndCols, res1:', res1);
  //   // console.log('/////////// in getUpdatedBoardAndCols, res2:', res2);
  //   setTriggerRerenderToggle(!triggerRerenderToggle);
  // };

  const updateCardOrderOnColumn = async (columnUpdated) => {
    try {
      // dispatch(updateColumn(columnUpdated));
      const res = await dispatch(thunkUpdateColumn(columnUpdated)); // VScode notes not needing 'await', but it IS needed
      if (res.id) {
        setTriggerRerenderToggle(!triggerRerenderToggle);
        // dispatch(thunkGetOneBoard(boardId));
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

  const updateColumnIdOnCard = async (cardUpdated) => {
    try {
      const res = await dispatch(thunkUpdateCard(cardUpdated)); // VScode notes not needing 'await', but it IS needed
      if (res.id) {
        setTriggerRerenderToggle(!triggerRerenderToggle);
        // dispatch(thunkGetOneBoard(boardId));

        // dispatch(thunkGetOneCard(cardUpdated.id));
        // dispatch(thunkGetOneColumn(cardUpdated.columnId))
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

  const updateCardOrderOnTwoColumns = async (twoColumnsUpdated) => {
    // console.log('*** in Board updateCardOrderOnTwoColumns');
    try {
      // dispatch(updateColumn(columnUpdated));
      const res = await dispatch(thunkUpdateTwoColumns(twoColumnsUpdated)); // VScode notes not needing 'await', but it IS needed
      // console.log('*** in Board updateCardOrderOnTwoColumns TRY, res', res);
      // dispatch(thunkGetOneBoard(boardId));
      if (res.id) {
        // setTriggerRerenderToggle(!triggerRerenderToggle);
        // dispatch(thunkGetAllColumnsForBoard(boardId));
        // dispatch(thunkGetOneColumn(columnUpdated.id))
        return res;
      } else {
        return res;
      }
    } catch (res) {
      console.log('*** in Board updateCardOrderOnTwoColumns CATCH, res', res);
      const data = await res.json();
      return data;
    }
  };

  const updateCardAndCols = async (cardUpdated, columnUpdatedSrc, columnUpdatedDest) => {
    try {
      const card = await updateColumnIdOnCard(cardUpdated); // VScode notes not needing 'await', but it IS needed
      const colSrc = await updateCardOrderOnColumn(columnUpdatedSrc); // VScode notes not needing 'await', but it IS needed
      const colDest = await updateCardOrderOnColumn(columnUpdatedDest); // VScode notes not needing 'await', but it IS needed
      if (card.id && colSrc.id && colDest.id) {
        setTriggerRerenderToggle(!triggerRerenderToggle);
        // dispatch(thunkGetOneCard(cardUpdated.id));
        // dispatch(thunkGetOneColumn(cardUpdated.columnId))
        // await dispatch(thunkGetOneBoard(boardId));
        // await dispatch(thunkGetAllColumnsForBoard(boardId));
        return { card, colSrc, colDest };
      } else {
        return { card, colSrc, colDest };
      }
    } catch (res) {
      const data = await res.json();
      return data;
    }
  };

  // // ORIG
  // const updateCardAndCols = async (cardUpdated, columnUpdatedSrc, columnUpdatedDest) => {
  //   try {
  //     const card = await dispatch(thunkUpdateCard(cardUpdated)); // VScode notes not needing 'await', but it IS needed
  //     const colSrc = await dispatch(thunkUpdateColumn(columnUpdatedSrc)); // VScode notes not needing 'await', but it IS needed
  //     const colDest = await dispatch(thunkUpdateColumn(columnUpdatedDest)); // VScode notes not needing 'await', but it IS needed
  //     if (card.id && colSrc.id && colDest.id) {
  //       setTriggerRerenderToggle(!triggerRerenderToggle);
  //       // dispatch(thunkGetOneCard(cardUpdated.id));
  //       // dispatch(thunkGetOneColumn(cardUpdated.columnId))
  //       // await dispatch(thunkGetOneBoard(boardId));
  //       // await dispatch(thunkGetAllColumnsForBoard(boardId));
  //       return { card, colSrc, colDest };
  //     } else {
  //       return { card, colSrc, colDest };
  //     }
  //   } catch (res) {
  //     const data = await res.json();
  //     return data;
  //   }
  // };

  // const onDragStart = (result) => {
  //   console.log('-----||||||| onDragStart BEGINS')
  //   console.log('||||||| columns[0]:', columns[0])
  //   console.log('-----||||||| onDragStart ENDS')
  // }

  // console.log('||||||| columns[0]:', columns[0])


















  const saveBoard = async (newBoard) => {
    // const { board, columns } = newBoard
    // console.log('@@@@@ in onDragEnd, baseUrl:', baseUrl)
    // console.log('@@@@@ in onDragEnd, newBoard:', newBoard)
    // console.log('@@@@@ in onDragEnd, newBoard.columns:', newBoard.columns)

    // const res = await fetch(`${baseUrl}/boards/save`,
    const res = await fetch(`/api/boards/save`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newBoard
          // board,
          // columns
        }),
      }
    );
    const data = res.json();
    if (data.error) {
      alert("Board could not be saved.");
    };
  };

  const onDragEnd = (result) => {
    const { draggableId, source, destination } = result;
    // console.log('@@@@@ in onDragEnd')
    // console.log('@@@@@ in onDragEnd, result:', result)

    // return if: no destination
    if (!destination) return;
    // return if: dropped into original spot
    if (source.droppableId === destination.droppableId &&
      source.index === destination.index) {
      return;
    };

    // //////// CASE 1: drop within one single col
    // if (source.droppableId === destination.droppableId) {

    //   // get col to update (where dndId matches source.droppableId)
    //   const columnToUpdate = columns.filter(column => {
    //     return column.dndId === source.droppableId;
    //   })[0];

    //   // convert cardOrder: from str to arr
    //   const cardOrderArr = columnToUpdate.cardOrder.split(',');

    //   // update cardOrder: 1. remove cardDndId at srcIdx, 2. add cardDndId at destIdx
    //   const movedCardDndId = cardOrderArr.splice(source.index, 1)[0]; // at srcIdx: remove 1
    //   cardOrderArr.splice(destination.index, 0, movedCardDndId); // at destIdx: remove 0, add movedCardDndId

    //   // convert cardOrder: from arr to str
    //   const cardOrderUpdatedStr = cardOrderArr.toString();

    //   // create colUpdated w/ updated card order
    //   const columnUpdated = {
    //     ...columnToUpdate,
    //     cardOrder: cardOrderUpdatedStr,
    //   };

    //   // get idx of colToUpdate (in orig 'columns' arr)
    //   const columnToUpdateIdx = columns.indexOf(columnToUpdate);
    //   // at colToUpdateIdx: 1. remove colToUpdate, 2. add colUpdated
    //   columns.splice(columnToUpdateIdx, 1, columnUpdated);

    //   // console.log('||||||| in onDragEnd, columns[0]:', columns[0])
    //   // const res = updateCardOrderOnColumn(columnUpdated); // update card order on col
    //   async function updateCardOrderOnColumnWrap() {
    //     const res = await updateCardOrderOnColumn(columnUpdated); // update card order on col
    //     // console.log('---- in updateCardOrderOnColumnWrap, res:', res)
    //   };
    //   updateCardOrderOnColumnWrap();
    //   // console.log('||||||| in onDragEnd, columns[0]:', columns[0])

    //   // setTriggerRerenderToggle(!triggerRerenderToggle); // trigger useEffect when onDragEnd is done
    // };

    // CASE #1 -- within ONE column:
    const start = columns.filter(column => {
      return column.dndId === source.droppableId;
    })[0];
    const finish = columns.filter(column => {
      return column.dndId === destination.droppableId;
    })[0];

    // console.log('@@@@@ in onDragEnd, boardOrg:', boardOrg)

    // console.log('@@@@@ in onDragEnd, board:', board)


    // console.log('@@@@@ in onDragEnd, start:', start)
    // console.log('@@@@@ in onDragEnd, finish:', finish)


    if (start === finish) {

      // // STEP 1: Update 'cardDndIds'
      const newCardDndIds = Array.from(start.cardDndIds);
      // console.log('@@@@@ in onDragEnd, newCardDndIds BEFORE SPLICE:', newCardDndIds) // good

      newCardDndIds.splice(source.index, 1);
      newCardDndIds.splice(destination.index, 0, draggableId);
      // console.log('@@@@@ in onDragEnd, newCardDndIds AFTER SPLICE:', newCardDndIds) // good

      // // STEP 2: Update 'cardOrder'
      // convert cardOrder: from str to arr
      const cardOrderArr = start.cardOrder.split(',');
      // console.log('@@@@@ in onDragEnd, cardOrderArr BEFORE SPLICE:', cardOrderArr) // good

      // update cardOrder: 1. remove cardDndId at srcIdx, 2. add cardDndId at destIdx
      const movedCardDndId = cardOrderArr.splice(source.index, 1)[0]; // at srcIdx: remove 1
      cardOrderArr.splice(destination.index, 0, movedCardDndId); // at destIdx: remove 0, add movedCardDndId
      // console.log('@@@@@ in onDragEnd, movedCardDndId:', movedCardDndId) // good
      // console.log('@@@@@ in onDragEnd, cardOrderArr AFTER SPLICE:', cardOrderArr) // good

      // convert cardOrder: from arr to str
      const cardOrderUpdatedStr = cardOrderArr.toString();
      // console.log('@@@@@ in onDragEnd, cardOrderUpdatedStr:', cardOrderUpdatedStr) // good

      // // STEP 3: Update 'cards'
      const newCards = Array.from(start.cards);
      // console.log('@@@@@ in onDragEnd, newCards BEFORE SPLICE:', newCards) // good

      const movedCard = newCards.splice(source.index, 1)[0];
      newCards.splice(destination.index, 0, movedCard);
      // console.log('@@@@@ in onDragEnd, newCards AFTER SPLICE:', newCards) // good

      // // STEP 4: Create 'newColumn'
      // create newColumn, w/ updated 'cardDndIds', 'cardOrder', 'cards'
      const newColumn = {
        ...start,
        cardDndIds: newCardDndIds,
        cardOrder: cardOrderUpdatedStr,
        cards: newCards,
      };

      // console.log('@@@@@ in onDragEnd, start.cards:', start.cards) // good

      // console.log('@@@@@ in onDragEnd, start:', start) // good
      // console.log('@@@@@ in onDragEnd, newColumn:', newColumn) // good



      // // STEP 5: Update 'columns' arr in board obj, changing it to 'columns' obj
      // (each key is the corresponding idx in 'columns' arr)

      // get idx of start (in orig 'columns' arr)
      const newColumnIdx = columns.indexOf(start);
      // at newColumnIdx: 1. remove orig column, 2. add newColumn
      // columns.splice(newColumnIdx, 1, newColumn);

      const newBoard = {
        ...board,
        columns: {
          ...board.columns, // spreading in eles from arr: will set each key as idx of ele in arr
          [newColumnIdx]: newColumn,
        },
      };

      console.log('@@@@@ in onDragEnd, board:', board)
      console.log('@@@@@ in onDragEnd, newBoard:', newBoard)

      // console.log('@@@@@ in onDragEnd, newBoard.columns:', newBoard.columns)

      setBoardOrg(newBoard);
      saveBoard(newBoard);
      return;
    };




    // CASE #2 -- across TWO columns:
    const startCardDndIds = Array.from(start.cardDndIds);
    startCardDndIds.splice(source.index, 1);
    const newStart = {
      ...start,
      cardDndIds: startCardDndIds,
    };

    const finishCardDndIds = Array.from(finish.cardDndIds);
    finishCardDndIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      cardDndIds: finishCardDndIds,
    };
    const newContext = {
      ...boardOrg,
      columns: {
        ...boardOrg.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setBoardOrg(newContext);
    saveBoard(newContext);
  };



  //// ---- //// ---- //// ---- //// ---- ////
  //// ---- //// ---- //// ---- //// ---- ////
  //// ---- //// ---- //// ---- //// ---- ////
  //// ---- //// ---- //// ---- //// ---- ////
  //// ---- //// ---- //// ---- //// ---- ////
  //// ---- //// ---- //// ---- //// ---- ////
  //// ---- //// ---- //// ---- //// ---- ////
  //// ---- //// ---- //// ---- //// ---- ////
  //// ---- //// ---- //// ---- //// ---- ////

  // const onDragEnd = (result) => {
  //   console.log('-----||||||| onDragEnd BEGINS')
  //   // console.log('||||||| in onDragEnd, columns[0]:', columns[0])

  //   const { draggableId, source, destination } = result;

  //   // return if: no destination, or dropped back into original spot
  //   if (!destination) return;
  //   if (source.droppableId === destination.droppableId &&
  //     source.index === destination.index) {
  //     return;
  //   };

  //   //////// CASE 1: drop within one single col
  //   if (source.droppableId === destination.droppableId) {

  //     // get col to update (where dndId matches source.droppableId)
  //     const columnArr = columns.filter(column => {
  //       return column.dndId === source.droppableId;
  //     });
  //     const columnToUpdate = columnArr[0];

  //     // convert cardOrder: from str to arr
  //     const cardOrderStr = columnToUpdate.cardOrder;
  //     const cardOrderArr = cardOrderStr.split(',');

  //     // update cardOrder: 1. remove cardDndId at srcIdx, 2. add cardDndId at destIdx
  //     const movedCardDndIdArr = cardOrderArr.splice(source.index, 1); // at srcIdx: remove 1
  //     const movedCardDndId = movedCardDndIdArr[0];
  //     cardOrderArr.splice(destination.index, 0, movedCardDndId); // at destIdx: remove 0, add movedCardDndId

  //     // convert cardOrder: from arr to str
  //     const cardOrderUpdatedStr = cardOrderArr.toString();

  //     // create colUpdated w/ updated card order
  //     const columnUpdated = {
  //       ...columnToUpdate,
  //       cardOrder: cardOrderUpdatedStr,
  //     };

  //     // get idx of colToUpdate (in orig 'columns' arr)
  //     const columnToUpdateIdx = columns.indexOf(columnToUpdate);
  //     // at colToUpdateIdx: 1. remove colToUpdate, 2. add colUpdated
  //     columns.splice(columnToUpdateIdx, 1, columnUpdated);

  //     // console.log('||||||| in onDragEnd, columns[0]:', columns[0])
  //     // const res = updateCardOrderOnColumn(columnUpdated); // update card order on col
  //     async function updateCardOrderOnColumnWrap() {
  //       const res = await updateCardOrderOnColumn(columnUpdated); // update card order on col
  //       // console.log('---- in updateCardOrderOnColumnWrap, res:', res)
  //     };
  //     updateCardOrderOnColumnWrap();
  //     // console.log('||||||| in onDragEnd, columns[0]:', columns[0])

  //     // setTriggerRerenderToggle(!triggerRerenderToggle); // trigger useEffect when onDragEnd is done
  //   };

  //   //////// CASE 2: drop across two diff cols
  //   if (source.droppableId !== destination.droppableId) {

  //     // SRC + DEST -- get cols to update (to edit cards & cardOrder)
  //     const columnArrSrc = columns.filter(column => {
  //       return column.dndId === source.droppableId;
  //     });
  //     const columnArrDest = columns.filter(column => {
  //       return column.dndId === destination.droppableId;
  //     });
  //     const columnToUpdateSrc = columnArrSrc[0];
  //     const columnToUpdateDest = columnArrDest[0];

  //     // get card to update (to edit columnId from SRC to DEST)
  //     const cardsFromSrc = columnToUpdateSrc.cards;
  //     const cardArr = cardsFromSrc.filter(card => {
  //       return card.dndId === draggableId;
  //     });
  //     const cardToUpdate = cardArr[0];
  //     // create cardUpdated w/ updated columnId
  //     const cardUpdated = {
  //       ...cardToUpdate,
  //       columnId: columnToUpdateDest.id,
  //     };

  //     // SRC + DEST -- convert cardOrder: from str to arr
  //     const cardOrderStrSrc = columnToUpdateSrc.cardOrder;
  //     const cardOrderStrDest = columnToUpdateDest.cardOrder;
  //     const cardOrderArrSrc = cardOrderStrSrc.split(',');
  //     const cardOrderArrDest = cardOrderStrDest.split(',');

  //     // SRC -- update cardOrder: remove cardDndId at srcIdx
  //     const movedCardDndId = cardOrderArrSrc.splice(source.index, 1)[0]; // at srcIdx: remove 1
  //     // const movedCardDndId = movedCardDndIdArr[0];

  //     // DEST -- update cardOrder: add cardDndId at destIdx
  //     // CASE 1: if dest col has 1+ CARDS (i.e. cardOrder has cards):
  //     // at destIdx: remove 0; add movedCardDndId
  //     if (cardOrderArrDest[destination.index] !== '') {
  //       cardOrderArrDest.splice(destination.index, 0, movedCardDndId);
  //       // CASE 2: if dest col has ZERO CARDS (i.e. cardOrder is empty str: ''):
  //       // at destIdx (will be idx0): remove 1 (to remove ''); add movedCardDndId
  //     } else if (cardOrderArrDest[destination.index] === '') {
  //       cardOrderArrDest.splice(destination.index, 1, movedCardDndId);
  //     };

  //     // SRC + DEST -- convert cardOrder: from arr to str
  //     const cardOrderUpdatedStrSrc = cardOrderArrSrc.toString();
  //     const cardOrderUpdatedStrDest = cardOrderArrDest.toString();




  //     // SRC -- get card in 'cards', where card.dndId === movedCardDndId
  //     const cardToMove = columnToUpdateSrc.cards.filter(card => {
  //       return card.dndId === movedCardDndId;
  //     })[0];
  //     // console.log('%%%%%%% 1. cardToMove:', cardToMove)

  //     // SRC -- get idx of card in 'cards'
  //     const cardToMoveSrcIdx = columnToUpdateSrc.cards.indexOf(cardToMove);
  //     // console.log('%%%%%%% 2. cardToMoveSrcIdx:', cardToMoveSrcIdx)

  //     // SRC -- remove card from 'cards'
  //     const movedCard = columnToUpdateSrc.cards.splice(cardToMoveSrcIdx, 1)[0]; // at cardToMoveSrcIdx: remove 1
  //     // console.log('%%%%%%% 3. movedCard:', movedCard)

  //     // CARD -- update columnId
  //     movedCard.columnId = columnToUpdateDest.id;
  //     // console.log('%%%%%%% 4. movedCard:', movedCard)

  //     // DEST -- add card to end of 'cards' (order should not matter, since we sort elsewhere?)
  //     columnToUpdateDest.cards.push(movedCard);
  //     // console.log('%%%%%%% 5. columnToUpdateSrc:', columnToUpdateSrc)
  //     // console.log('%%%%%%% 6. columnToUpdateDest:', columnToUpdateDest)

  //     ////////////

  //     // // SRC -- get cardDndId in 'cardDndIds', where cardDndId === movedCardDndId
  //     // const cardDndIdToMove = columnToUpdateSrc.cardDndIds.filter(cardDndId => {
  //     //   return cardDndId === movedCardDndId;
  //     // })[0];
  //     // // console.log('%%%%%%% 1. cardDndIdToMove:', cardDndIdToMove)

  //     // // SRC -- get idx of cardDndId in 'cardDndIds'
  //     // const cardDndIdToMoveSrcIdx = columnToUpdateSrc.cardDndIds.indexOf(cardDndIdToMove);
  //     // // console.log('%%%%%%% 2. cardDndIdToMoveSrcIdx:', cardDndIdToMoveSrcIdx)

  //     // // SRC -- remove cardDndId from 'cardDndIds'
  //     // const cardDndIdForMoving = columnToUpdateSrc.cardDndIds.splice(cardDndIdToMoveSrcIdx, 1)[0]; // at cardToMoveSrcIdx: remove 1
  //     // // console.log('%%%%%%% 3. cardDndIdForMoving:', cardDndIdForMoving)

  //     // // DEST -- add cardDndIdForMoving to end of 'cardDndIds'
  //     // columnToUpdateDest.cardDndIds.splice(destination.index, 0, cardDndIdForMoving);
  //     // // console.log('%%%%%%% 4. columnToUpdateSrc:', columnToUpdateSrc)
  //     // // console.log('%%%%%%% 5. columnToUpdateDest:', columnToUpdateDest)

  //     // SRC + DEST -- create columnUpdated w/ updated cardOrder
  //     const columnUpdatedSrc = {
  //       ...columnToUpdateSrc,
  //       cardOrder: cardOrderUpdatedStrSrc,
  //     };
  //     const columnUpdatedDest = {
  //       ...columnToUpdateDest,
  //       cardOrder: cardOrderUpdatedStrDest,
  //     };

  //     // console.log('|||||| cardUpdated:', cardUpdated)
  //     // console.log('|||||| columnUpdatedSrc:', columnUpdatedSrc)
  //     // console.log('|||||| columnUpdatedDest:', columnUpdatedDest)

  //     // SRC -- get idx of columnToUpdate (from orig 'columns' arr)
  //     // SRC -- at that idx: 1. remove columnToUpdate, 2. add columnUpdated
  //     const columnToUpdateSrcIdx = columns.indexOf(columnToUpdateSrc);
  //     const columnToUpdateDestIdx = columns.indexOf(columnToUpdateDest);
  //     columns.splice(columnToUpdateSrcIdx, 1, columnUpdatedSrc);
  //     columns.splice(columnToUpdateDestIdx, 1, columnUpdatedDest);

  //     // const updateCardAndBothCols = async () => {
  //     //   updateColumnIdOnCard(cardUpdated);
  //     //   updateCardOrderOnColumn(columnUpdatedSrc);
  //     //   updateCardOrderOnColumn(columnUpdatedDest);
  //     // };
  //     // updateCardAndBothCols();

  //     // updateCardAndCols(cardUpdated, columnUpdatedSrc, columnUpdatedDest);

  //     const twoColumnsUpdated = { columnUpdatedSrc, columnUpdatedDest };

  //     console.log('$$$$$$ in Board, board is:', board);
  //     // console.log('$$$$$$ in Board, cardUpdated:', cardUpdated);
  //     console.log('$$$$$$ in Board, columnUpdatedSrc:', columnUpdatedSrc);
  //     console.log('$$$$$$ in Board, columnUpdatedDest:', columnUpdatedDest);


  //     const boardToUpdate = {
  //       ...board
  //     }

  //     console.log('$$$$$$ in Board, boardToUpdate:', boardToUpdate);
  //     boardToUpdate.columns.splice(columnToUpdateSrcIdx, 1, columnUpdatedSrc);
  //     boardToUpdate.columns.splice(columnToUpdateDestIdx, 1, columnUpdatedDest);
  //     console.log('$$$$$$ in Board, boardToUpdate:', boardToUpdate);


  //     updateColumnIdOnCard(cardUpdated);
  //     updateCardOrderOnTwoColumns(twoColumnsUpdated);
  //     // updateCardOrderOnColumn(columnUpdatedSrc);
  //     // updateCardOrderOnColumn(columnUpdatedDest);
  //     // dispatch(thunkGetOneBoard(boardId));
  //     // getUpdatedBoardAndCols();
  //     // setTriggerRerenderToggle(!triggerRerenderToggle); // trigger useEffect when onDragEnd is done


  //     // console.log('||||||| in onDragEnd, columns[0]:', columns[0])
  //     // console.log('||||||| in onDragEnd, columns[1]:', columns[1])

  //     // async function updateCardAndColsWrap() {
  //     //   const res = await updateCardAndCols(cardUpdated, columnUpdatedSrc, columnUpdatedDest); // update card order on col
  //     //   // console.log('---- in updateCardAndColsWrap, :', res)
  //     //   // await dispatch(thunkGetOneBoard(boardId));
  //     //   // await dispatch(thunkGetAllColumnsForBoard(boardId));
  //     // };
  //     // updateCardAndColsWrap();

  //     // console.log('||||||| in onDragEnd, columns[0]:', columns[0])
  //     // console.log('||||||| in onDragEnd, columns[1]:', columns[1])

  //   };

  //   // ORIG
  //   // cardOrderArr.splice(source.index, 1); // remove 1 at idx
  //   // cardOrderArr.splice(destination.index, 0, draggableId); // remove 0, add draggableId at idx

  //   // const newState = {
  //   //   ...state.columns,
  //   //   allColumns: {
  //   //     ...state.columns.allColumns,
  //   //     [columnUpdated.id]: columnUpdated,
  //   //   },
  //   // };

  //   setTriggerRerenderToggle(!triggerRerenderToggle); // trigger useEffect when onDragEnd is done
  //   console.log('-----||||||| onDragEnd ENDS')
  // };

  //// ---- //// ---- //// ---- //// ---- ////
  //// ---- //// ---- //// ---- //// ---- ////
  //// ---- //// ---- //// ---- //// ---- ////
  //// ---- //// ---- //// ---- //// ---- ////
  //// ---- //// ---- //// ---- //// ---- ////
  //// ---- //// ---- //// ---- //// ---- ////
  //// ---- //// ---- //// ---- //// ---- ////
  //// ---- //// ---- //// ---- //// ---- ////
  //// ---- //// ---- //// ---- //// ---- ////


  return (<>{isLoaded && (
    <DragDropContext onDragEnd={onDragEnd}>
      <div id='board-page' style={{ backgroundImage: `url(${imageUrl})` }}>

        <div id='board-page-content'>
          <Link to={`/dashboard`}>
            ⬅ Dashboard
          </Link>

          {board && (
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
          )}

          <div id='board-columns'>
            {columns && (
              columns.map((column) => (
                <span className='board-one-column' key={column.id}>
                  <Column key={column.id} boardId={boardId} columnId={column.id} column={column} />
                </span>
              ))
            )}

            {board && (
              <span id='board-add-col-btn'>
                <OpenModalButton
                  buttonText={<i class="fa-solid fa-plus"><span> </span><span>Add column</span></i>}
                  modalComponent={
                    <ColumnFormCreate
                      boardId={boardId}
                    />}
                />
              </span>
            )}
          </div>
        </div>

      </div >
    </DragDropContext>
  )}
  </>)
};
