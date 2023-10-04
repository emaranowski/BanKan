import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
// import { thunkGetOneCard } from '../../store/cards';
// import { thunkGetAllCardsForColumn } from '../../store/cards';
// import { thunkGetOneBoard } from '../../store/boards';
import OpenModalButton from '../../components/OpenModalButton';
import CardFormUpdate from '../CardFormUpdate';
import CardDeleteModal from '../CardDeleteModal';
import './Card.css';

export default function Card({ boardId, column, card, index }) { // added index
  const dispatch = useDispatch();
  const cardId = card.id;
  const columnId = card.columnId;
  const title = card.title;
  const dndId = card.dndId;

  // console.log('**** in Card, card:', card)

  // const [isLoaded, setIsLoaded] = useState(false);
  // useEffect(() => {
  //   setIsLoaded(true);
  //   // dispatch(thunkGetAllCardsForColumn(columnId));
  // }, [dispatch, boardId, cardId, title]);

  // key should not include the index
  // can just use draggableId as key
  if (card.id === 2) console.log("RENDERz", card.id)

  return (
    <Draggable draggableId={dndId} index={index}>
      {(provided, snapshot) => (
        <div
          id='card'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span>
            {title}
          </span>

          <span id='card-btns'>
            <OpenModalButton
              buttonText={<i class="fa-regular fa-pen-to-square"></i>}
              modalComponent={
                <CardFormUpdate
                  card={card}
                  column={column}
                  boardId={boardId}
                />}
            />

            <OpenModalButton
              buttonText={<i class="fa-regular fa-trash-can"></i>}
              modalComponent={
                <CardDeleteModal
                  card={card}
                  column={column}
                  boardId={boardId}
                />}
            />
          </span>
        </div>
      )}
    </Draggable>
  )
};
