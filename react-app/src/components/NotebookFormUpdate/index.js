import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import NotebookForm from '../NotebookForm';

export default function NotebookFormUpdate({ notebook }) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <NotebookForm
          formType='Update Notebook'
          notebook={notebook}
        />
      )}
    </>
  )
};
