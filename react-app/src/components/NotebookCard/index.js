// this component is a small card representing each notebook, displayed when viewing all notebooks
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotebookCard.css';

export default function NotebookCard({ notebook }) {
  const dispatch = useDispatch();
  const notebookId = notebook.id;
  const imageUrl = notebook.imageUrl;
  const title = notebook.title;

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch])

  return (<>{isLoaded && (
    <Link to={`/notebooks/${notebookId}`}>
      <div id='notebook-card'>

        <div id='notebook-card-img-div'>
          <img id='notebook-card-img' src={imageUrl} alt='Notebook background'></img>
        </div>

        <div id='notebook-card-title'>
          {title}
        </div>

      </div>
    </Link>
  )}</>)
};
