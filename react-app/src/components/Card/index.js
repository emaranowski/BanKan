import { Draggable } from 'react-beautiful-dnd';
import OpenModalButton from '../../components/OpenModalButton';
import CardFormUpdate from '../CardFormUpdate';
import CardDeleteModal from '../CardDeleteModal';
import './Card.css';

export default function Card({ boardId, column, card, index }) {
  const title = card.title;
  const dndId = card.dndId;

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
