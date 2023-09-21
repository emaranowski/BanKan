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

  // console.log('||||||| in Board, board:', board)
  // console.log('||||||| in Board, board.columns:', board.columns)
  // console.log('||||||| columns:', columns)
  // console.log('||||||| columns[0]:', columns[0])

  const [triggerRerenderToggle, setTriggerRerenderToggle] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // dispatch(thunkGetOneBoard(boardId));
    // dispatch(thunkGetAllColumnsForBoard(boardId));
    // setIsLoaded(true);
    async function getUpdatedBoardAndCols() {
      await dispatch(thunkGetOneBoard(boardId));
      await dispatch(thunkGetAllColumnsForBoard(boardId));
    };
    getUpdatedBoardAndCols();
    setIsLoaded(true);
  }, [dispatch, boardId, imageUrl, title, triggerRerenderToggle]);

  useEffect(() => {
    if (Object.values(board).length > 0) {
      if (!userId || userId !== board.userId) {
        // console.log('///////////', userId, board.userId);
        history.push('/');
        // window.alert('Invalid Permissions')
      }
    }
  }, [sessionUser, board, userId, history]);

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

  const updateCardAndCols = async (cardUpdated, columnUpdatedSrc, columnUpdatedDest) => {
    const card = await dispatch(thunkUpdateCard(cardUpdated)); // VScode notes not needing 'await', but it IS needed
    const colSrc = await dispatch(thunkUpdateColumn(columnUpdatedSrc)); // VScode notes not needing 'await', but it IS needed
    const colDest = await dispatch(thunkUpdateColumn(columnUpdatedDest)); // VScode notes not needing 'await', but it IS needed
    if (card.id && colSrc.id && colDest.id) {
      setTriggerRerenderToggle(!triggerRerenderToggle);
      // dispatch(thunkGetOneCard(cardUpdated.id));
      dispatch(thunkGetOneColumn(cardUpdated.columnId))
      dispatch(thunkGetOneBoard(boardId));
      dispatch(thunkGetAllColumnsForBoard(boardId));
      return { card, colSrc, colDest };
    } else {
      return;
    }
  }

  const onDragStart = (result) => {
    console.log('-----||||||| onDragStart BEGINS')

    console.log('||||||| columns[0]:', columns[0])

    console.log('-----||||||| onDragStart ENDS')
  }

  console.log('||||||| columns[0]:', columns[0])

  const onDragEnd = (result) => {
    console.log('-----||||||| onDragEnd BEGINS')
    console.log('||||||| columns[0]:', columns[0])

    const { draggableId, source, destination } = result;

    // return if: no destination, or dropped back into original spot
    if (!destination) return;
    if (source.droppableId === destination.droppableId &&
      source.index === destination.index) {
      return;
    };

    //////// CASE 1: drop within one single col
    if (source.droppableId === destination.droppableId) {

      // get col to update (where dndId matches source.droppableId)
      const columnArr = columns.filter(column => {
        return column.dndId === source.droppableId;
      });
      const columnToUpdate = columnArr[0];

      // convert cardOrder: from str to arr
      const cardOrderStr = columnToUpdate.cardOrder;
      const cardOrderArr = cardOrderStr.split(',');

      // update cardOrder: 1. remove cardDndId at srcIdx, 2. add cardDndId at destIdx
      const movedCardDndIdArr = cardOrderArr.splice(source.index, 1); // at srcIdx: remove 1
      const movedCardDndId = movedCardDndIdArr[0];
      cardOrderArr.splice(destination.index, 0, movedCardDndId); // at destIdx: remove 0, add movedCardDndId

      // convert cardOrder: from arr to str
      const cardOrderUpdatedStr = cardOrderArr.toString();

      // create colUpdated w/ updated card order
      const columnUpdated = {
        ...columnToUpdate,
        cardOrder: cardOrderUpdatedStr,
      };

      // get idx of colToUpdate (in orig 'columns' arr)
      const columnToUpdateIdx = columns.indexOf(columnToUpdate);
      // at colToUpdateIdx: 1. remove colToUpdate, 2. add colUpdated
      columns.splice(columnToUpdateIdx, 1, columnUpdated);

      console.log('||||||| columns[0]:', columns[0])
      // const res = updateCardOrderOnColumn(columnUpdated); // update card order on col
      async function updateCardOrderOnColumnWrap() {
        const res = await updateCardOrderOnColumn(columnUpdated); // update card order on col
        console.log('--- ||||||| res:', res)
      };
      updateCardOrderOnColumnWrap();
      console.log('||||||| columns[0]:', columns[0])

      setTriggerRerenderToggle(!triggerRerenderToggle); // trigger useEffect when onDragEnd is done
    };

    //////// CASE 2: drop across two diff cols
    if (source.droppableId !== destination.droppableId) {

      // SRC + DEST -- get cols to update (to edit cards & cardOrder)
      const columnArrSrc = columns.filter(column => {
        return column.dndId === source.droppableId;
      });
      const columnArrDest = columns.filter(column => {
        return column.dndId === destination.droppableId;
      });
      const columnToUpdateSrc = columnArrSrc[0];
      const columnToUpdateDest = columnArrDest[0];

      // get card to update (to edit columnId from SRC to DEST)
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

      // SRC + DEST -- convert cardOrder: from str to arr
      const cardOrderStrSrc = columnToUpdateSrc.cardOrder;
      const cardOrderStrDest = columnToUpdateDest.cardOrder;
      const cardOrderArrSrc = cardOrderStrSrc.split(',');
      const cardOrderArrDest = cardOrderStrDest.split(',');

      // SRC -- update cardOrder: remove cardDndId at srcIdx
      const movedCardDndIdArr = cardOrderArrSrc.splice(source.index, 1); // at srcIdx: remove 1
      const movedCardDndId = movedCardDndIdArr[0];

      // DEST -- update cardOrder: add cardDndId at destIdx
      // CASE 1: if dest col has 1+ CARDS (i.e. cardOrder has cards):
      // at destIdx: remove 0; add movedCardDndId
      if (cardOrderArrDest[destination.index] !== '') {
        cardOrderArrDest.splice(destination.index, 0, movedCardDndId);
        // CASE 2: if dest col has ZERO CARDS (i.e. cardOrder is empty str: ''):
        // at destIdx (will be idx0): remove 1 (to remove ''); add movedCardDndId
      } else if (cardOrderArrDest[destination.index] === '') {
        cardOrderArrDest.splice(destination.index, 1, movedCardDndId);
      };

      // SRC + DEST -- convert cardOrder: from arr to str
      const cardOrderUpdatedStrSrc = cardOrderArrSrc.toString();
      const cardOrderUpdatedStrDest = cardOrderArrDest.toString();




      // SRC -- get card in 'cards', where card.dndId === movedCardDndId
      const cardToMove = columnToUpdateSrc.cards.filter(card => {
        return card.dndId === movedCardDndId;
      })[0];
      console.log('%%%%%%% 1. cardToMove:', cardToMove)

      // SRC -- get idx of card in 'cards'
      const cardToMoveSrcIdx = columnToUpdateSrc.cards.indexOf(cardToMove);
      console.log('%%%%%%% 2. cardToMoveSrcIdx:', cardToMoveSrcIdx)

      // SRC -- remove card from 'cards'
      const movedCard = columnToUpdateSrc.cards.splice(cardToMoveSrcIdx, 1)[0]; // at cardToMoveSrcIdx: remove 1
      // const movedCard = movedCardArr[0];
      // console.log('%%%%%%% 1. movedCardArr:', movedCardArr)
      console.log('%%%%%%% 3. movedCard:', movedCard)

      // CARD -- update columnId
      movedCard.columnId = columnToUpdateDest.id;
      console.log('%%%%%%% 4. movedCard:', movedCard)

      // DEST -- add card to end of 'cards' (order should not matter, since we sort elsewhere?)
      columnToUpdateDest.cards.push(movedCard);
      console.log('%%%%%%% 5. columnToUpdateSrc:', columnToUpdateSrc)
      console.log('%%%%%%% 6. columnToUpdateDest:', columnToUpdateDest)




      // SRC + DEST -- create columnUpdated w/ updated cardOrder
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
      // SRC -- at that idx: 1. remove columnToUpdate, 2. add columnUpdated
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


      console.log('||||||| columns[0]:', columns[0])
      console.log('||||||| columns[1]:', columns[1])
      async function updateCardAndColsWrap() {
        const res = await updateCardAndCols(cardUpdated, columnUpdatedSrc, columnUpdatedDest); // update card order on col
        console.log('--- ||||||| res:', res)
      };
      updateCardAndColsWrap();
      console.log('||||||| columns[0]:', columns[0])
      console.log('||||||| columns[1]:', columns[1])

      setTriggerRerenderToggle(!triggerRerenderToggle); // trigger useEffect when onDragEnd is done

    };

    console.log('-----||||||| onDragEnd ENDS')

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
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
