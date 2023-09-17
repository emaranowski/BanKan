import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import NoteForm from '../NoteForm';

export default function NoteFormUpdate({ note }) {
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
          note={note}
        />
      )}
    </>
  )
};
