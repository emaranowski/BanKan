import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import OpenModalButton from '../../components/OpenModalButton';
import CardFormUpdate from '../CardFormUpdate';
import CardDeleteModal from '../CardDeleteModal';
import './Card.css';

export default function Card({ card, boardId }) {
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  // const userId = sessionUser.id;
  // console.log('**** in Card, boardId is:', boardId)

  // const card = useSelector(state => state.cards.oneCard);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch, card.columnId])

  return (<>{isLoaded && (
    <div id='card'>

      <span id='card_title'>
        {card.title}
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
                cardId={card.id}
                boardId={boardId}
              />}
          />
        </span>
      </span>

    </div>
  )}</>)
};
