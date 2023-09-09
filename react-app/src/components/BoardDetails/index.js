import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { thunkGetOneBoard } from '../../store/boards';
import { thunkGetAllColumnsForBoard } from '../../store/columns';
import { useParams, Link } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import BoardFormUpdate from "../BoardFormUpdate";
import BoardDeleteModal from "../BoardDeleteModal";
import ColumnFormCreate from '../ColumnFormCreate';
import Column from "../Column";
import './BoardDetails.css';

export default function BoardDetails() {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const board = useSelector(state => state.boards.oneBoard);
  // const columns = useSelector(state => state.columns.allColumns);
  const columnsArr = Object.values(useSelector(state => state.columns.allColumns));

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(async () => {
    dispatch(thunkGetOneBoard(boardId))
    dispatch(thunkGetAllColumnsForBoard(boardId))
    setIsLoaded(true)
  }, [dispatch, boardId, board.title, board.imageUrl]);

  return (<>{isLoaded && (
    <div id='boardDetailsPage'>

      <Link to={`/boards`}>
        ⬅ Back to my boards
      </Link>

      <div id='boardDetailsHeader'>
        <div id='boardDetailsTitle'>
          Board: {board.title}
        </div>

        <div id='boardDetailsBtns'>
          <span id='boardDetailsUpdateBtn'>
            <OpenModalButton
              buttonText="Edit"
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

          <span id='boardDetailsAddColBtn'>
            <OpenModalButton
              buttonText="+ Add column"
              modalComponent={
                <ColumnFormCreate
                  boardId={boardId}
                />}
            />
          </span>
        </div>
      </div>

      <div id='boardDetailsImgDiv'>
        <img id='boardDetailsImg' src={board.imageUrl}></img>
      </div>

      <div id='boardDetailsColumns'>
        {columnsArr.length ?
          columnsArr.map((column) => (
            <div className='columnDiv' key={column.id}>
              <Column column={column} />
              {/* Column Board ID: {column.boardId}
              Column Color HEX: {column.colorHex}
              Column Title: {column.title} */}
            </div>
          ))
          :
          (<span>You have no columns!</span>)
        }
      </div>

    </div >
  )
  }</>)
};
