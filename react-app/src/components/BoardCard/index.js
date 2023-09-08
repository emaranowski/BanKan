import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import OpenModalButton from '../../components/OpenModalButton';
// import BoardDeleteModal from '../BoardDeleteModal';
// import BoardFormUpdate from '../BoardFormUpdate';
import './BoardCard.css';

export default function BoardCard({ board }) {
  const dispatch = useDispatch();
  const boardId = board.id;
  const sessionUser = useSelector(state => state.session.user);
  // const userId = sessionUser.id;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch])

  return (<>{isLoaded && (
    <Link to={`/boards/${boardId}`}>
      <div id='boardCard'>

        <div id='boardCardImgDiv'>
          <img id='boardCardImg' src={board.imageUrl}></img>
        </div>

        <div id='boardCardTitle'>
          {board.title}
        </div>

        <div id='boardCardBtns'>

          {/* <div className='boardCardUpdateAndDeleteBtns'>
        <OpenModalButton
          buttonText="Update"
          modalComponent={
            <BoardFormUpdate
              board={board}
            />}
        />
      </div> */}

          {/* <div className='boardCardUpdateAndDeleteBtns'>
        <OpenModalButton
          buttonText="Delete"
          modalComponent={<BoardDeleteModal
            boardId={boardId}
            userId={userId}
          />}
        />
      </div> */}

        </div>

      </div>
    </Link>
  )}</>)
};
