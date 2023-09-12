import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { thunkGetOneBoard } from '../../store/boards';
import { thunkGetAllColumnsForBoard } from '../../store/columns';
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

  const [cardId, setCardId] = useState('');
  const [card, setCard] = useState({});

  // columns.forEach(column => {
  //   console.log(column.dndId)
  //   console.log(column.cardDndIds)
  // })

  // const columnArr = columns.filter(column => {
  //   return column.dndId === 'column-1';
  // });
  // const column = columnArr[0]

  // console.log('*** in BoardDetails, column:', column)
  // console.log('*** in BoardDetails, typeof column:', typeof column)
  // console.log('*** in BoardDetails, Array.isArray(column):', Array.isArray(column))

  // console.log('*** in BoardDetails, columns:', columns)
  // console.log('*** in BoardDetails, board.columns:', board.columns)
  // console.log('*** in BoardDetails, columnDndIds:', columnDndIds)
  // console.log('*** in BoardDetails, columnsDnd:', columnsDnd)


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
    // dispatch(thunkUpdateCard(card))
    setIsLoaded(true)
  }, [dispatch, boardId, imageUrl, title, cardId, card]);




  // example result
  const exampleResult = {
    draggableId: 'card-1',
    // type: 'CARD',
    // reason: 'DROP',
    source: {
      droppableId: 'column-1',
      index: 0,
    },
    destination: {
      droppableId: 'column-1',
      index: 1,
    },
  };

  // const onDragStart = (result) => {
  //   console.log('**** in BoardDetails onDragStart')
  //   const { draggableId, source } = result;
  //   console.log('**** in BoardDetails onDragStart, result:', result) // {}
  //   // draggableId: "card-4"
  //   // mode:  "FLUID"
  //   // source: {droppableId: 'column-1', index: 3}
  //   // type: "DEFAULT"
  //   console.log('**** in BoardDetails onDragStart, draggableId:', draggableId) // "card-4"
  //   console.log('**** in BoardDetails onDragStart, source:', source) // {droppableId: 'column-1', index: 3}
  // };


  const updateCard = (cardId) => {

  };

  const onDragEnd = (result) => { // TODO: CHANGE WHICH COLUMN A CARD BELONGS TO
    // console.log('**** in BoardDetails onDragEnd')
    const { draggableId, source, destination } = result;
    const cardId = draggableId.split('-')[1];
    setCardId(cardId);


    console.log('**** in BoardDetails onDragEnd, draggableId:', draggableId)
    console.log('**** in BoardDetails onDragEnd, cardId:', cardId)
    // console.log('**** in BoardDetails onDragEnd, card:', card)

    // console.log('**** in BoardDetails onDragEnd, source:', source)
    // console.log('**** in BoardDetails onDragEnd, destination:', destination)

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    };

    // get source column
    // const column = this.state.columns[source.droppableId]; // normalized, like... column-1: {}

    const columnArr = columns.filter(column => {
      return column.dndId === source.droppableId;
    });

    const column = columnArr[0];
    const cards = column.cards;

    const cardArr = cards.filter(card => {
      return card.dndId === draggableId;
    });

    const cardToUpdate = cardArr[0];

    // console.log('**** in BoardDetails onDragEnd, column:', column)
    // console.log('**** in BoardDetails onDragEnd, cards:', cards)
    console.log('**** in BoardDetails onDragEnd, cardToUpdate:', cardToUpdate)
    console.log('**** in BoardDetails onDragEnd, cardToUpdate.index:', cardToUpdate.index)
    cardToUpdate.index = destination.index;
    console.log('**** in BoardDetails onDragEnd, cardToUpdate:', cardToUpdate)
    console.log('**** in BoardDetails onDragEnd, cardToUpdate.index:', cardToUpdate.index)

    const cardUpdated = {
      ...cardToUpdate,
      index: destination.index,
    };


    const updateCard = async (cardUpdated) => {
      try {
        const res = await dispatch(thunkUpdateCard(cardUpdated)); // VScode notes not needing 'await', but it IS needed
        console.log('**** !!!! in onDragEnd -- updateCard, TRY, res:', res)
        console.log('****************')

        if (res.id) {
          // setErrors({});
          console.log('**** !!!! in onDragEnd -- updateCard, RES OK:', res)

          dispatch(thunkGetAllColumnsForBoard(boardId));
        } else {
          console.log('**** !!!! in onDragEnd -- updateCard, RES NOT OK:', res)

          return res;
        }
      } catch (res) {
        // const data = await res.json();
        // if (data && data.errors) {
        //   setErrors(data.errors);
        // }
      }
    };
    updateCard(cardUpdated);








    const newCardDndIds = Array.from(column.cardDndIds);
    // console.log('**** !!!! in BoardDetails onDragEnd, newCardDndIds:', newCardDndIds)
    newCardDndIds.splice(source.index, 1); // remove 1 at idx
    newCardDndIds.splice(destination.index, 0, draggableId); // remove 0, add draggableId at idx
    // console.log('**** !!!! in BoardDetails onDragEnd, newCardDndIds:', newCardDndIds)

    // console.log('**** !!!! in BoardDetails onDragEnd, column:', column)
    const newColumn = { // more like updatedColumn than newColumn
      ...column,
      cardDndIds: newCardDndIds, // collide to update cardDndIds, after splicing
    };
    // console.log('**** !!!! in BoardDetails onDragEnd, newColumn:', newColumn)

    // const newState = {
    //   ...this.state,
    //   columns: { // update columns
    //     ...this.state.columns,
    //     [newColumn.id]: newColumn, // update to newColumn (normalized, like column-1: {})
    //   }, // ^^^ !!! may need dndId instead of id !!!
    // };

    // this.setState(newState);

    ///////////////////////
    ///////////////////////
    ///////////////////////


    // const updateCard = async () => {
    //   card = {
    //     ...card,
    //     title,
    //     description,
    //     index: destination.index
    //   };
    //   // console.log('**** in UPDATE CARD, card:', card)

    //   try {
    //     const res = await dispatch(thunkUpdateCard(card)); // VScode notes not needing 'await', but it IS needed
    //     if (res.id) {
    //       setErrors({});
    //       closeModal();
    //       dispatch(thunkGetAllColumnsForBoard(boardId));
    //     } else {
    //       return res;
    //     }
    //   } catch (res) {
    //     const data = await res.json();
    //     if (data && data.errors) {
    //       setErrors(data.errors);
    //     }
    //   }
    // };
    // updateCard();
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
