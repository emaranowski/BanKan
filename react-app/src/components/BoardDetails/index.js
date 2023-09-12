import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { thunkGetOneBoard } from '../../store/boards';
import { thunkGetAllColumnsForBoard, thunkUpdateColumn } from '../../store/columns';
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
  const columns = Object.values(useSelector(state => state.columns.allColumns));
  const dndId = board.dndId;
  const columnDndIds = board.columnDndIds;
  const columnsDnd = board.columnsDnd;

  // columns.forEach(column => {
  //   console.log(column.dndId)
  //   console.log(column.cardDndIds)
  // })

  // console.log('*** in BoardDetails, column:', column)

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
    // const cardId = draggableId.split('-')[1];

    if (!destination) return;
    if (source.droppableId === destination.droppableId &&
      source.index === destination.index) {
      return;
    };

    const oneColumnArr = columns.filter(column => {
      return column.dndId === source.droppableId;
    });

    const column = oneColumnArr[0];
    const cards = column.cards;

    const oneCardArr = cards.filter(card => {
      return card.dndId === draggableId;
    });

    const cardToUpdate = oneCardArr[0];
    const cardWithUpdate = {
      ...cardToUpdate,
      index: destination.index,
    };

    const updateIndexOnCard = async (cardWithUpdate) => {
      try {
        const res = await dispatch(thunkUpdateCard(cardWithUpdate)); // VScode notes not needing 'await', but it IS needed
        if (res.id) {
          console.log('**** !!!! in onDragEnd -- updateIndexOnCard, RES OK:', res)
          dispatch(thunkGetAllColumnsForBoard(boardId));
        } else {
          console.log('**** !!!! in onDragEnd -- updateIndexOnCard, RES NOT OK:', res)
          return res;
        }
      } catch (res) {
        const data = await res.json();
        return data;
      }
    };
    updateIndexOnCard(cardWithUpdate);




    // const updateCardOrderOnColumn = async (columnUpdated) => {
    //   try {
    //     const res = await dispatch(thunkUpdateColumn(columnUpdated)); // VScode notes not needing 'await', but it IS needed
    //     if (res.id) {
    //       dispatch(thunkGetAllColumnsForBoard(boardId));
    //     } else {
    //       return res;
    //     }
    //   } catch (res) {
    //     const data = await res.json();
    //     return data;
    //   }
    // };
    // updateCardOrderOnColumn(columnUpdated);




    const newCardDndIds = Array.from(column.cardDndIds);
    console.log('**** !!!! in BoardDetails onDragEnd, newCardDndIds:', newCardDndIds)
    newCardDndIds.splice(source.index, 1); // remove 1 at idx
    newCardDndIds.splice(destination.index, 0, draggableId); // remove 0, add draggableId at idx
    console.log('**** !!!! in BoardDetails onDragEnd, newCardDndIds:', newCardDndIds)

    // // console.log('**** !!!! in BoardDetails onDragEnd, column:', column)
    // const newColumn = { // more like updatedColumn than newColumn
    //   ...column,
    //   cardDndIds: newCardDndIds, // collide to update cardDndIds, after splicing
    // };
    // console.log('**** !!!! in BoardDetails onDragEnd, newColumn:', newColumn)

    // const newState = {
    //   ...this.state,
    //   columns: { // update columns
    //     ...this.state.columns,
    //     [newColumn.id]: newColumn, // update to newColumn (normalized, like column-1: {})
    //   }, // ^^^ !!! may need dndId instead of id !!!
    // };

    // this.setState(newState);
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
