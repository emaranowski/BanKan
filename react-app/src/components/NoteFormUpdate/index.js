import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import NoteForm from '../NoteForm';

export default function NoteFormUpdate({ notebook, note }) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <NoteForm
          formType='Update Note'
          notebook={notebook}
          note={note}
        />
      )}
    </>
  )
};
