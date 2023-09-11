import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import OpenModalButton from '../../components/OpenModalButton';
import CardFormUpdate from '../CardFormUpdate';
import CardDeleteModal from '../CardDeleteModal';
import './Card.css';

export default function Card({ boardId, card, index }) { // added index
  const dispatch = useDispatch();
  const cardId = card.id;
  const columnId = card.columnId;
  const title = card.title;
  const draggableId = 'card-' + cardId;

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch, cardId, columnId, boardId, title]);

  // key should not include the index
  // can just use draggableId as key

  return (<>{isLoaded && (
    <Draggable
      draggableId={draggableId}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          id='card'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span id='card_title'>
            {title}
          </span>

          <span id='card_btns'>
            <span className='card_btn'>
              <OpenModalButton
                buttonText={<i class="fa-regular fa-pen-to-square"></i>}
                modalComponent={
                  <CardFormUpdate
                    card={card}
                    boardId={boardId}
                  />}
              />
            </span>

            <span className='card_btn'>
              <OpenModalButton
                buttonText={<i class="fa-regular fa-trash-can"></i>}
                modalComponent={
                  <CardDeleteModal
                    cardId={cardId}
                    boardId={boardId}
                  />}
              />
            </span>
          </span>
        </div>
      )}
    </Draggable>
  )}</>)
};
