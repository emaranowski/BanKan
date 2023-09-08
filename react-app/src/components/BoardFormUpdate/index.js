import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import BoardForm from '../BoardForm';

export default function BoardFormUpdate({ board }) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <BoardForm
          formType='Update Board'
          board={board}
        />
      )}
    </>
  )
};
