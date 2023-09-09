import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import OpenModalButton from '../../components/OpenModalButton';
// import CardFormCreate from '../CardFormCreate';
import CardFormUpdate from '../CardFormUpdate';
import CardDeleteModal from '../CardDeleteModal';
import './Card.css';

export default function Card({ card, columnId, boardId }) {
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  // const userId = sessionUser.id;
  // console.log('**** in Card, boardId is:', boardId)

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch, columnId])

  return (<>{isLoaded && (
    <div id='card'>
      <span>
        {card.title}
      </span>

      <span id='cardUpdateAndDeleteBtnsBox'>
        <span className='cardUpdateAndDeleteBtns'>
          <OpenModalButton
            buttonText="Edit"
            modalComponent={
              <CardFormUpdate
                card={card}
                boardId={boardId}
              />}
          />
        </span>

        <span className='cardUpdateAndDeleteBtns'>
          <OpenModalButton
            buttonText="X"
            modalComponent={
              <CardDeleteModal
                cardId={card.id}
                boardId={card.boardId}
              />}
          />
        </span>
      </span>
    </div>
  )}</>)
};
