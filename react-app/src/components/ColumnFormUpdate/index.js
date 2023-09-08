import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import ColumnForm from '../ColumnForm';

export default function ColumnFormUpdate({ column }) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <ColumnForm
          formType='Update Column'
          column={column}
        />
      )}
    </>
  )
};
