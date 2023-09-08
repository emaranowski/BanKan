import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { thunkGetOneBoard } from '../../store/boards';
import { Link, useParams } from 'react-router-dom';
import './BoardDetails.css';

export default function BoardDetails() {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const state = useSelector(state => state);
  const board = useSelector(state => state.boards.oneBoard);
  // console.log('*** in BoardDetails, state:', state);
  // console.log('*** in BoardDetails, board:', board);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkGetOneBoard(boardId))
      .then(() => setIsLoaded(true))
  }, [dispatch]);

  return (<>{isLoaded && (
    <div id='boardDetailsPage'>
      <Link to={`/boards`}>⬅ Back to my boards</Link>

      <div id='boardDetailsTitle'>
        Board: {board.title}
      </div>

      <div id='boardDetailsImgDiv'>
        <img id='boardDetailsImg' src={board.imageUrl}></img>
      </div>

    </div >
  )
  }</>)
};
