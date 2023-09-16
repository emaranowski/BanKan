import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import OpenModalButton from '../../components/OpenModalButton';
// import NotebookDeleteModal from '../NotebookDeleteModal';
// import NotebookFormUpdate from '../NotebookFormUpdate';
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
          <img id='notebook-card-img' src={imageUrl}></img>
        </div>

        <div id='notebook-card-title'>
          {title}
        </div>

        {/* <div id='notebook-card-btns'>
          <div className='notebook-card-update-and-delete-btns'>
            <OpenModalButton
              buttonText="Update"
              modalComponent={
                <NotebookFormUpdate
                  notebook={notebook}
                />}
            />
          </div>
          <div className='notebook-card-update-and-delete-btns'>
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<NotebookDeleteModal
                notebookId={notebookId}
                userId={userId}
              />}
            />
          </div>
        </div> */}

      </div>
    </Link>
  )}</>)
};
