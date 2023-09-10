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
import { thunkGetAllCardsForColumn } from '../../store/cards';

export default function BoardDetails() {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const board = useSelector(state => state.boards.oneBoard);
  const columnsArr = Object.values(useSelector(state => state.columns.allColumns));
  // console.log('**** in BoardDetails, columnsArr:', columnsArr)

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(async () => {
    // async function getAllItemsForBoardDetails() {
    dispatch(thunkGetOneBoard(boardId))
    dispatch(thunkGetAllColumnsForBoard(boardId))
    columnsArr.forEach(column => {
      dispatch(thunkGetAllCardsForColumn(column.id))
    })
    setIsLoaded(true)
    // };
    // getAllItemsForBoardDetails();
  }, [dispatch, boardId, board.title, board.imageUrl]);

  return (<>{isLoaded && (
    <div id='board_details_page' style={{ backgroundImage: `url(${board.imageUrl})` }}>

      <div id='board_details_page_content'>
        <Link to={`/boards`}>
          ⬅ Back to my boards
        </Link>

        <div id='board_details_header'>
          <div id='board_details_title'>
            Board: <span id='board_details_title_text'>{board.title}</span>
          </div>

          <div id='board_details_btns'>
            <span id='board_details_update_btn'>
              <OpenModalButton
                buttonText="Edit"
                modalComponent={
                  <BoardFormUpdate
                    board={board}
                  />}
              />
            </span>

            <span id='board_details_delete_btn'>
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

        <div id='board_details_all_columns'>
          {columnsArr.length ?
            columnsArr.map((column) => (
              <div className='board_details_one_column' key={column.id}>
                <Column column={column} />
              </div>
            ))
            :
            (<span>You have no columns!</span>)
          }

          <span id='board_details_add_col_btn'>
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

    </div >
  )
  }</>)
};
