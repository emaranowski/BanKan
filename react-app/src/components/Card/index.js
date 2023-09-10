import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import OpenModalButton from '../../components/OpenModalButton';
import CardFormUpdate from '../CardFormUpdate';
import CardDeleteModal from '../CardDeleteModal';
import './Card.css';

export default function Card({ card, boardId }) {
  const dispatch = useDispatch();
  const cardId = card.id;
  const columnId = card.columnId;
  const title = card.title;

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch, cardId, columnId, boardId, title]);

  return (<>{isLoaded && (
    <div id='card'>

      <span id='card_title'>
        {title}
      </span>

      <span id='card_btns'>
        <span className='card_btn'>
          <OpenModalButton
            buttonText="🖊️"
            modalComponent={
              <CardFormUpdate
                card={card}
                boardId={boardId}
              />}
          />
        </span>

        <span className='card_btn'>
          <OpenModalButton
            buttonText="🗑️"
            modalComponent={
              <CardDeleteModal
                cardId={cardId}
                boardId={boardId}
              />}
          />
        </span>
      </span>

    </div>
  )}</>)
};
