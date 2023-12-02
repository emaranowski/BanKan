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

    // return if: no destination (card dropped into empty space)
    if (!destination) return;
    // return if: destination is same col + same idx (card dropped into original spot)
    if (source.droppableId === destination.droppableId &&
      source.index === destination.index) {
      return;
    };

    //////// CASE #1: drop card within ONE column (vertical movement)
    //////// ONE item to update: column
    if (source.droppableId === destination.droppableId) { // if src + dest cols are same

      // get col to update (where dndId matches droppableId)
      // (to edit cardOrder)
      const columnToUpdate = columns.filter(column => {
        return column.dndId === source.droppableId; // could also use destination.droppableId
      })[0];

      // convert cardOrder: from str to arr
      const cardOrderArr = columnToUpdate.cardOrder.split(',');

      // update cardOrder: 1. remove cardDndId at srcIdx, 2. add cardDndId at destIdx
      const movedCardDndId = cardOrderArr.splice(source.index, 1)[0]; // at srcIdx: remove 1 ele
      cardOrderArr.splice(destination.index, 0, movedCardDndId); // at destIdx: remove 0 eles, add movedCardDndId

      // convert cardOrderArr: from arr back to str
      const cardOrderUpdatedStr = cardOrderArr.toString();

      // create columnUpdated, with updated cardOrder string property
      const columnUpdated = {
        ...columnToUpdate,
        cardOrder: cardOrderUpdatedStr,
      };

      updateCardOrderOnColumn(columnUpdated);
    };

    //////// CASE #2: drop card across TWO columns (horizonal movement)
    //////// THREE items to update: SRC COL, DEST COL, CARD
    if (source.droppableId !== destination.droppableId) { // if src + dest cols are different

      // SRC + DEST COLS -- get cols to update (where dndId matches droppableId)
      // (to edit cards & cardOrder)
      const columnToUpdateSrc = columns.filter(column => {
        return column.dndId === source.droppableId;
      })[0];
      const columnToUpdateDest = columns.filter(column => {
        return column.dndId === destination.droppableId;
      })[0];

      // CARD -- get card to update (from SRC col, where dndId matches draggableId)
      // (to edit card's columnId: starts as SRC col id, will become DEST col id)
      const cardToUpdate = columnToUpdateSrc.cards.filter(card => {
        return card.dndId === draggableId;
      })[0];

      // create cardUpdated, and update columnId to become DEST col id
      const cardUpdated = {
        ...cardToUpdate,
        columnId: columnToUpdateDest.id,
      };

      // SRC + DEST COLS -- convert cardOrder: from str to arr
      const cardOrderArrSrc = columnToUpdateSrc.cardOrder.split(',');
      const cardOrderArrDest = columnToUpdateDest.cardOrder.split(',');

      // SRC COL -- update cardOrder: REMOVE cardDndId at srcIdx (for card to move)
      const movedCardDndId = cardOrderArrSrc.splice(source.index, 1)[0]; // at srcIdx: remove 1

      // DEST COL -- update cardOrder: ADD cardDndId at destIdx
      // (note: if col has 0 cards, its cardOrder is just an empty string)
      // CASE #1: if dest col has 1+ cards (i.e. cardOrder !== ''):
      // at destIdx: remove 0, add movedCardDndId
      if (cardOrderArrDest[destination.index] !== '') { // 1+ cards
        cardOrderArrDest.splice(destination.index, 0, movedCardDndId); // destIdx will vary
        // CASE #2: if dest col has 0 cards (i.e. cardOrder === ''):
        // at destIdx (will be idx0): remove 1 (to remove empty str ''), add movedCardDndId
      } else if (cardOrderArrDest[destination.index] === '') { // 0 cards
        cardOrderArrDest.splice(destination.index, 1, movedCardDndId); // destIdx will be 0
      };

      // SRC + DEST COLS -- convert cardOrder: from arr back to str
      const cardOrderUpdatedStrSrc = cardOrderArrSrc.toString();
      const cardOrderUpdatedStrDest = cardOrderArrDest.toString();

      // SRC COL -- get card to move (where dndId matches movedCardDndId)
      const cardToMove = columnToUpdateSrc.cards.filter(card => {
        return card.dndId === movedCardDndId;
      })[0];

      // SRC COL -- get index of cardToMove within SRC 'cards' arr
      const cardToMoveSrcIdx = columnToUpdateSrc.cards.indexOf(cardToMove);

      // SRC COL -- remove cardToMove from SRC 'cards' arr
      const movedCard = columnToUpdateSrc.cards.splice(cardToMoveSrcIdx, 1)[0]; // at cardToMoveSrcIdx: remove 1

      // CARD -- update columnId on movedCard
      // from SRC col id, to become DEST col id
      movedCard.columnId = columnToUpdateDest.id;

      // DEST COL -- add movedCard to end of DEST 'cards' arr
      // (order should not matter, since we sort elsewhere)
      columnToUpdateDest.cards.push(movedCard);

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

      // SRC + DEST COLS -- create columnUpdated, with updated cardOrder string
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

      // send updates to thunks, to update store, and to send to backend to update DB
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
  }; // end of onDragEnd function

  return (
    <>
      {isLoaded && (
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
    </>
  );
};
