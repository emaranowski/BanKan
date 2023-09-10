import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import CardForm from '../CardForm';

export default function CardFormUpdate({ card, boardId }) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <CardForm
          formType='Update Card'
          card={card}
          boardId={boardId}
        />
      )}
    </>
  )
};
