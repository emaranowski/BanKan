import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { thunkGetOneBoard } from '../../store/boards';
import { updateColumn, thunkGetAllColumnsForBoard, thunkUpdateColumn } from '../../store/columns';
// import { thunkUpdateCard } from '../../store/cards';
import { useParams, Link } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import OpenModalButton from "../OpenModalButton";
import BoardFormUpdate from "../BoardFormUpdate";
import BoardDeleteModal from "../BoardDeleteModal";
import ColumnFormCreate from '../ColumnFormCreate';
import Column from "../Column";
import './BoardDetails.css';

export default function BoardDetails() {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const board = useSelector(state => state.boards.oneBoard);
  const imageUrl = board.imageUrl;
  const title = board.title;
  const columns = Object.values(useSelector(state => state.columns.allColumns));
  const dndId = board.dndId;
  const columnDndIds = board.columnDndIds;
  const columnsDnd = board.columnsDnd;

  const [triggerRerenderToggle, setTriggerRerenderToggle] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    dispatch(thunkGetOneBoard(boardId))
    dispatch(thunkGetAllColumnsForBoard(boardId))
    setIsLoaded(true)
  }, [dispatch, boardId, imageUrl, title, triggerRerenderToggle]);

  const onDragEnd = (result) => { // TODO: CHANGE WHICH COLUMN A CARD BELONGS TO
    const { draggableId, source, destination } = result;

    // return if: no destination, or dropped back into original spot
    if (!destination) return;
    if (source.droppableId === destination.droppableId &&
      source.index === destination.index) {
      return;
    };

    // get col to update (col where dndId matches source.droppableId)
    const oneColumnArr = columns.filter(column => {
      return column.dndId === source.droppableId;
    });
    const columnToUpdate = oneColumnArr[0];

    // may not need to edit index on card, but keep architecture for now
    const cards = columnToUpdate.cards;
    const oneCardArr = cards.filter(card => {
      return card.dndId === draggableId;
    });
    const cardToUpdate = oneCardArr[0];
    const cardUpdated = {
      ...cardToUpdate,
      index: destination.index,
    };

    // ORIG
    // cardOrderArr.splice(source.index, 1); // remove 1 at idx
    // cardOrderArr.splice(destination.index, 0, draggableId); // remove 0, add draggableId at idx

    // convert cardOrder: str to arr
    const cardOrderStr = columnToUpdate.cardOrder;
    const cardOrderArr = cardOrderStr.split(',');

    // update cardOrder:
    // 1. remove cardDndId at source idx
    // 2. add cardDndId at destination idx
    const movedCardDndIdArr = cardOrderArr.splice(source.index, 1); // at srcIdx: remove 1
    const movedCardDndId = movedCardDndIdArr[0];
    cardOrderArr.splice(destination.index, 0, movedCardDndId); // at destIdx: remove 0, add movedCardDndId

    // convert cardOrder: arr to str
    const cardOrderUpdatedStr = cardOrderArr.toString();

    // create columnUpdated w/ updated card order
    const columnUpdated = {
      ...columnToUpdate,
      cardOrder: cardOrderUpdatedStr,
    };

    // get idx of columnToUpdate (in orig 'columns' arr)
    const columnToUpdateIdx = columns.indexOf(columnToUpdate);
    // at columnToUpdateIdx in 'columns':
    // remove columnToUpdate; add columnUpdated
    columns.splice(columnToUpdateIdx, 1, columnUpdated);


    // const newState = {
    //   ...state.columns,
    //   allColumns: {
    //     ...state.columns.allColumns,
    //     [columnUpdated.id]: columnUpdated,
    //   },
    // };

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
    // updateIndexOnCard(cardUpdated);

    const updateCardOrderOnColumn = async (columnUpdated) => {
      try {
        dispatch(updateColumn(columnUpdated));
        const res = await dispatch(thunkUpdateColumn(columnUpdated)); // VScode notes not needing 'await', but it IS needed
        if (res.id) {
          // dispatch(thunkGetOneBoard(boardId));
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

    // update card order property on col
    updateCardOrderOnColumn(columnUpdated);
    // trigger useEffect when onDragEnd is done
    setTriggerRerenderToggle(!triggerRerenderToggle);
  };


  return (<>{isLoaded && (
    <DragDropContext onDragEnd={onDragEnd}>
      <div id='board_details_page' style={{ backgroundImage: `url(${imageUrl})` }}>

        <div id='board_details_page_content'>
          <Link to={`/boards`}>
            ⬅ Back to my boards
          </Link>

          <div id='board_details_header'>
            <div id='board_details_title'>
              <span id='board_details_title_text'>{title}</span>
            </div>

            <div id='board_details_btns'>
              <span id='board_details_update_btn'>
                <OpenModalButton
                  buttonText={<i class="fa-regular fa-pen-to-square"></i>}
                  modalComponent={
                    <BoardFormUpdate
                      board={board}
                    />}
                />
              </span>

              <span id='board_details_delete_btn'>
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

          <div id='board_details_all_columns'>
            {columns && (
              columns.map((column) => (
                <span className='board_details_one_column' key={column.id}>
                  <Column key={column.id} column={column} />
                </span>
              ))
            )}

            <span id='board_details_add_col_btn'>
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
  )}</>)
};
