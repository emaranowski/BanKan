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
  const imageUrl = board.imageUrl;
  const title = board.title;
  const columns = Object.values(useSelector(state => state.columns.allColumns));
  const droppableId = board.droppableId;

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(async () => {
    dispatch(thunkGetOneBoard(boardId))
    dispatch(thunkGetAllColumnsForBoard(boardId))
    setIsLoaded(true)
  }, [dispatch, boardId, imageUrl, title]);

  return (<>{isLoaded && (
    <div id='board_details_page' style={{ backgroundImage: `url(${imageUrl})` }}>

      <div id='board_details_page_content'>
        <Link to={`/boards`}>
          ⬅ Back to my boards
        </Link>

        <div id='board_details_header'>
          <div id='board_details_title'>
            Board: <span id='board_details_title_text'>{title}</span>
          </div>

          <div id='board_details_btns'>
            <span id='board_details_update_btn'>
              <OpenModalButton
                buttonText={<i class="fa-regular fa-pen-to-square"></i>}
                modalComponent={
                  <BoardFormUpdate
                    board={board}
                  />}
              />
            </span>

            <span id='board_details_delete_btn'>
              <OpenModalButton
                buttonText={<i class="fa-regular fa-trash-can"></i>}
                modalComponent={
                  <BoardDeleteModal
                    boardId={boardId}
                  />}
              />
            </span>

          </div>
        </div>

        <div id='board_details_all_columns'>
          {columns && (
            columns.map((column) => (
              <div className='board_details_one_column' key={column.id}>
                <Column column={column} />
              </div>
            ))
          )}

          <span id='board_details_add_col_btn'>
            <OpenModalButton
              buttonText={<i class="fa-solid fa-plus"><span> </span><span>Add column</span></i>}
              modalComponent={
                <ColumnFormCreate
                  boardId={boardId}
                />}
            />
          </span>
        </div>
      </div>

    </div >
  )
  }</>)
};
