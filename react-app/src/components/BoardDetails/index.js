import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { thunkGetOneBoard } from '../../store/boards';
import { updateColumn, thunkGetAllColumnsForBoard, thunkUpdateColumn } from '../../store/columns';
import { thunkUpdateCard } from '../../store/cards';
import { useParams, Link } from 'react-router-dom';
// import { DragDropContext } from 'react-beautiful-dnd';
import DragDropContext from "../../context/ReactBeautifulDnd";

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
  // const columns = board.columns;
  const columns = Object.values(useSelector(state => state.columns.allColumns));
  const dndId = board.dndId;
  const columnDndIds = board.columnDndIds;
  const columnsDnd = board.columnsDnd;

  // columns.forEach(column => {
  //   console.log(column.dndId)
  //   console.log(column.cardDndIds)
  // })

  // console.log('*** in BoardDetails, cols:', cols)
  // console.log('*** in BoardDetails, cols:', cols)
  // console.log('*** in BoardDetails, cols:', cols)
  // console.log('*** in BoardDetails, cols:', cols)
  // console.log('*** in BoardDetails, cols:', cols)


  // 1. add idx to card models, forms, etc.
  // 2. create/update idx when creating/updating card
  // 3. update idx in onDragEnd of card:
  // trigger submit of update form, where only change is idx

  // let columnsOrdered = [];
  // const columnOrder = state.columns.columnOrder = ['column-2', 'column-1', 'column-3']
  // using col order, we can map over 'columns' from state.columns.allColumns,
  // and if column.dndId === columnOrder[i], then: columnsOrdered.push(columnOrder[i])
  // column-2 has idx 0, etc.
  // then render columnsOrdered.map

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(async () => {
    dispatch(thunkGetOneBoard(boardId))
    dispatch(thunkGetAllColumnsForBoard(boardId))
    setIsLoaded(true)
  }, [dispatch, boardId, imageUrl, title]);

  const onDragEnd = (result) => { // TODO: CHANGE WHICH COLUMN A CARD BELONGS TO
    const { draggableId, source, destination } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId &&
      source.index === destination.index) {
      return;
    };

    const oneColumnArr = columns.filter(column => {
      return column.dndId === source.droppableId;
    });

    const columnToUpdate = oneColumnArr[0];

    const cards = columnToUpdate.cards;

    const oneCardArr = cards.filter(card => {
      return card.dndId === draggableId;
    });

    const cardToUpdate = oneCardArr[0];

    const cardUpdated = {
      ...cardToUpdate,
      index: destination.index,
    };

    const cardOrderStr = columnToUpdate.cardOrder;

    const cardOrderArr = cardOrderStr.split(',');

    // ORIG
    // cardOrderArr.splice(source.index, 1); // remove 1 at idx
    // cardOrderArr.splice(destination.index, 0, draggableId); // remove 0, add draggableId at idx

    const draggableRemovedArr = cardOrderArr.splice(source.index, 1); // remove 1 at idx
    const draggableRemoved = draggableRemovedArr[0];
    cardOrderArr.splice(destination.index, 0, draggableRemoved); // remove 0, add draggableId at idx

    // 1 2 3 4
    // 1 2 3
    // 1 2 4 3

    // 1 2 4 3
    // 1 2 4
    // 1 2 4 4

    const cardOrderUpdatedStr = cardOrderArr.toString();

    // console.log('||||||||| in onDragEnd -- columnToUpdate:', columnToUpdate)
    const columnUpdated = {
      ...columnToUpdate,
      cardOrder: cardOrderUpdatedStr,
    };
    // console.log('||||||||| in onDragEnd -- columnUpdated:', columnUpdated)


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
    //       // console.log('||||||||| in onDragEnd -- updateIndexOnCard, TRY RES OK:', res)
    //       dispatch(thunkGetOneBoard(boardId));
    //       dispatch(thunkGetAllColumnsForBoard(boardId));
    //       return res;
    //     } else {
    //       // console.log('||||||||| in onDragEnd -- updateIndexOnCard, TRY RES NOT OK:', res)
    //       return res;
    //     }
    //   } catch (res) {
    //     // console.log('||||||||| in onDragEnd -- updateIndexOnCard, CATCH RES:', res)
    //     const data = await res.json();
    //     // console.log('||||||||| in onDragEnd -- updateIndexOnCard, CATCH data:', data)
    //     return data;
    //   }
    // };
    // updateIndexOnCard(cardUpdated);

    const updateCardOrderOnColumn = async (columnUpdated) => {
      try {
        dispatch(updateColumn(columnUpdated));
        const res = await dispatch(thunkUpdateColumn(columnUpdated)); // VScode notes not needing 'await', but it IS needed
        if (res.id) {
          // console.log('||||||||| in onDragEnd -- updateCardOrderOnColumn, TRY RES OK:', res)
          // dispatch(thunkGetOneBoard(boardId));
          dispatch(thunkGetAllColumnsForBoard(boardId));
          return res;
        } else {
          // console.log('||||||||| in onDragEnd -- updateCardOrderOnColumn, TRY RES NOT OK:', res)
          return res;
        }
      } catch (res) {
        // console.log('||||||||| in onDragEnd -- updateCardOrderOnColumn, CATCH RES:', res)
        const data = await res.json();
        // console.log('||||||||| in onDragEnd -- updateCardOrderOnColumn, CATCH data:', data)
        return data;
      }
    };
    updateCardOrderOnColumn(columnUpdated);
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
