import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import OpenModalButton from '../../components/OpenModalButton';
// import BoardDeleteModal from '../BoardDeleteModal';
// import BoardFormUpdate from '../BoardFormUpdate';
import './BoardCard.css';

export default function BoardCard({ board }) {
  const dispatch = useDispatch();
  const boardId = board.id;
  const imageUrl = board.imageUrl;
  const title = board.title;

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch])

  return (<>{isLoaded && (
    <Link to={`/boards/${boardId}`}>
      <div id='board-card'>

        <div id='board-card-img-div'>
          <img id='board-card-img' src={imageUrl}></img>
        </div>

        <div id='board-card-title'>
          {title}
        </div>

        {/* <div id='board-card-btns'>
          <div className='board-card-update-and-delete-btns'>
            <OpenModalButton
              buttonText="Update"
              modalComponent={
                <BoardFormUpdate
                  board={board}
                />}
            />
          </div>
          <div className='board-card-update-and-delete-btns'>
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<BoardDeleteModal
                boardId={boardId}
                userId={userId}
              />}
            />
          </div>
        </div> */}

      </div>
    </Link>
  )}</>)
};
