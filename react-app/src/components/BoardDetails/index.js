import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { thunkGetOneBoard } from '../../store/boards';
import { useParams, Link } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import BoardFormUpdate from "../BoardFormUpdate";
import BoardDeleteModal from "../BoardDeleteModal";
import './BoardDetails.css';

export default function BoardDetails() {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const board = useSelector(state => state.boards.oneBoard);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(async () => {
    dispatch(thunkGetOneBoard(boardId))
    setIsLoaded(true)
  }, [dispatch, boardId, board.title, board.imageUrl]);

  return (<>{isLoaded && (
    <div id='boardDetailsPage'>

      <Link to={`/boards`}>
        ⬅ Back to my boards
      </Link>

      <div id='boardDetailsHeader'>
        <div id='boardDetailsTitle'>
          {board.title}
        </div>

        <div id='boardDetailsBtns'>
          <span id='boardDetailsUpdateBtn'>
            <OpenModalButton
              buttonText="Update"
              modalComponent={
                <BoardFormUpdate
                  board={board}
                />}
            />
          </span>

          <span id='boardDetailsDeleteBtn'>
            <OpenModalButton
              buttonText="Delete"
              modalComponent={
                <BoardDeleteModal
                  boardId={boardId}
                />}
            />
          </span>
        </div>
      </div>

      <div id='boardDetailsImgDiv'>
        <img id='boardDetailsImg' src={board.imageUrl}></img>
      </div>

    </div >
  )
  }</>)
};
