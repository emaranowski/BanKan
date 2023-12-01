// this component is a small card representing each board, displayed when viewing all boards
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
          <img id='board-card-img' src={imageUrl} alt='Board background'></img>
        </div>

        <div id='board-card-title'>
          {title}
        </div>

      </div>
    </Link>
  )}</>)
};
