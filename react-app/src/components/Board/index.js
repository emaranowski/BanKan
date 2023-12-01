import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { thunkGetOneBoard } from '../../store/boards';
import { thunkGetAllColumnsForBoard, thunkUpdateColumn } from '../../store/columns';
import { thunkUpdateCard } from '../../store/cards';
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

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function getBoardAndCols() {
      await dispatch(thunkGetOneBoard(boardId));
      await dispatch(thunkGetAllColumnsForBoard(boardId));
    };
    getBoardAndCols();
    setIsLoaded(true);
  }, [dispatch, boardId, imageUrl, title]);

  useEffect(() => {
    if (Object.values(board).length > 0) {
      if (!userId || userId !== board.userId) {
        history.push('/');
        // window.alert('Invalid Permissions')
      }
    }
  }, [sessionUser, board, userId, history]);


  const updateCardOrderOnColumn = async (columnUpdated) => {
    try {
      const res = await dispatch(thunkUpdateColumn(columnUpdated)); // VScode notes not needing 'await', but it IS needed
      if (res.id) {
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
        return res;
      } else {
        return res;
      }
    } catch (res) {
      const data = await res.json();
      return data;
    }
  };

  const onDragEnd = (result) => {

    const { draggableId, source, destination } = result;

    // return if: no destination (dropped into empty space)
    if (!destination) return;
    // return if: destination is same col, same idx (dropped into original spot)
    if (source.droppableId === destination.droppableId &&
      source.index === destination.index) {
      return;
    };

    //////// CASE #1: drop within ONE column (vertical movement)
    //////// 1 item to update: column
    if (source.droppableId === destination.droppableId) {

      // get col to update (where dndId matches source.droppableId)
      const columnToUpdate = columns.filter(column => {
        return column.dndId === source.droppableId;
      })[0];

      // convert cardOrder: from str to arr
      const cardOrderArr = columnToUpdate.cardOrder.split(',');

      // update cardOrder: 1. remove cardDndId at srcIdx, 2. add cardDndId at destIdx
      const movedCardDndId = cardOrderArr.splice(source.index, 1)[0]; // at srcIdx: remove 1
      cardOrderArr.splice(destination.index, 0, movedCardDndId); // at destIdx: remove 0, add movedCardDndId

      // convert cardOrder: from arr to str
      const cardOrderUpdatedStr = cardOrderArr.toString();

      // create colUpdated w/ updated card order
      const columnUpdated = {
        ...columnToUpdate,
        cardOrder: cardOrderUpdatedStr,
      };

      // // get idx of colToUpdate (in orig 'columns' arr)
      // const columnToUpdateIdx = columns.indexOf(columnToUpdate);
      // // at colToUpdateIdx: 1. remove colToUpdate, 2. add colUpdated
      // columns.splice(columnToUpdateIdx, 1, columnUpdated);

      updateCardOrderOnColumn(columnUpdated);
    };

    //////// CASE #2: drop across TWO columns (horizonal movement)
    //////// 3 items to update: card, columnSrc, columnDest
    if (source.droppableId !== destination.droppableId) {

      // SRC + DEST -- get cols to update (to edit cards & cardOrder)
      const columnToUpdateSrc = columns.filter(column => {
        return column.dndId === source.droppableId;
      })[0];
      const columnToUpdateDest = columns.filter(column => {
        return column.dndId === destination.droppableId;
      })[0];

      // CARD -- get card to update (to edit columnId from columnSrc.id to columnDest.id)
      const cardToUpdate = columnToUpdateSrc.cards.filter(card => {
        return card.dndId === draggableId;
      })[0];

      // create cardUpdated, w/ updated columnId
      const cardUpdated = {
        ...cardToUpdate,
        columnId: columnToUpdateDest.id,
      };

      // SRC + DEST -- convert cardOrder: from str to arr
      const cardOrderArrSrc = columnToUpdateSrc.cardOrder.split(',');
      const cardOrderArrDest = columnToUpdateDest.cardOrder.split(',');

      // SRC -- update cardOrder: remove cardDndId at srcIdx
      const movedCardDndId = cardOrderArrSrc.splice(source.index, 1)[0]; // at srcIdx: remove 1

      // DEST -- update cardOrder: add cardDndId at destIdx
      // CASE 1: if dest col has 1+ cards (cardOrder !== ''):
      // at destIdx: remove 0, add movedCardDndId
      if (cardOrderArrDest[destination.index] !== '') {
        cardOrderArrDest.splice(destination.index, 0, movedCardDndId);
        // CASE 2: if dest col has 0 CARDS (cardOrder === ''):
        // at destIdx (will be idx0): remove 1 (to remove ''), add movedCardDndId
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

      // SRC -- get idx of card in 'cards'
      const cardToMoveSrcIdx = columnToUpdateSrc.cards.indexOf(cardToMove);

      // SRC -- remove card from 'cards'
      const movedCard = columnToUpdateSrc.cards.splice(cardToMoveSrcIdx, 1)[0]; // at cardToMoveSrcIdx: remove 1

      // CARD -- update columnId
      movedCard.columnId = columnToUpdateDest.id;

      // DEST -- add card to end of 'cards' (order should not matter, since we sort elsewhere?)
      columnToUpdateDest.cards.push(movedCard);

      ////////////

      // // SRC -- get cardDndId in 'cardDndIds', where cardDndId === movedCardDndId
      // const cardDndIdToMove = columnToUpdateSrc.cardDndIds.filter(cardDndId => {
      //   return cardDndId === movedCardDndId;
      // })[0];
      // // console.log('%%%%%%% 1. cardDndIdToMove:', cardDndIdToMove)

      // // SRC -- get idx of cardDndId in 'cardDndIds'
      // const cardDndIdToMoveSrcIdx = columnToUpdateSrc.cardDndIds.indexOf(cardDndIdToMove);
      // // console.log('%%%%%%% 2. cardDndIdToMoveSrcIdx:', cardDndIdToMoveSrcIdx)

      // // SRC -- remove cardDndId from 'cardDndIds'
      // const cardDndIdForMoving = columnToUpdateSrc.cardDndIds.splice(cardDndIdToMoveSrcIdx, 1)[0]; // at cardToMoveSrcIdx: remove 1
      // // console.log('%%%%%%% 3. cardDndIdForMoving:', cardDndIdForMoving)

      // // DEST -- add cardDndIdForMoving to end of 'cardDndIds'
      // columnToUpdateDest.cardDndIds.splice(destination.index, 0, cardDndIdForMoving);
      // // console.log('%%%%%%% 4. columnToUpdateSrc:', columnToUpdateSrc)
      // // console.log('%%%%%%% 5. columnToUpdateDest:', columnToUpdateDest)

      // SRC + DEST -- create columnUpdated w/ updated cardOrder
      const columnUpdatedSrc = {
        ...columnToUpdateSrc,
        cardOrder: cardOrderUpdatedStrSrc,
      };
      const columnUpdatedDest = {
        ...columnToUpdateDest,
        cardOrder: cardOrderUpdatedStrDest,
      };

      // SRC -- get idx of columnToUpdate (from orig 'columns' arr)
      // SRC -- at that idx: 1. remove columnToUpdate, 2. add columnUpdated
      // const columnToUpdateSrcIdx = columns.indexOf(columnToUpdateSrc);
      // const columnToUpdateDestIdx = columns.indexOf(columnToUpdateDest);
      // columns.splice(columnToUpdateSrcIdx, 1, columnUpdatedSrc);
      // columns.splice(columnToUpdateDestIdx, 1, columnUpdatedDest);

      updateColumnIdOnCard(cardUpdated);
      updateCardOrderOnColumn(columnUpdatedSrc);
      updateCardOrderOnColumn(columnUpdatedDest);
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
  };

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
  )}</>)
};
