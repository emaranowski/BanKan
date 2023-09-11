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
  const dndId = board.dndId;
  const columnDndIds = board.columnDndIds;
  const columnsDnd = board.columnsDnd;

  // console.log('*** in BoardDetails, board:', board)
  console.log('*** in BoardDetails, board.columns:', board.columns)
  // console.log('*** in BoardDetails, columnDndIds:', columnDndIds)
  // console.log('*** in BoardDetails, columnsDnd:', columnsDnd)


  // separate model/table/etc for columnOrderIndex and cardOrderIndex?
  // or index could just live on existing col/card models,
  // and whenever creating/updating or drag/dropping a col/card,
  // orderIndex would be created/updated behind the scenes;
  // moving a col/card would trigger submission of update form,
  // where only change would be orderIndex

  // let columnsOrdered = [];
  // const columnOrder = state.columns.columnOrder = ['column-2', 'column-1', 'column-3']
  // using col order, we can map over 'columns' from state.columns.allColumns,
  // and if column.dndId === columnOrder[i], then: columnsOrdered.push(columnOrder[i])
  // column-2 has index 0, etc.
  // then render columnsOrdered.map

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
            <span id='board_details_title_text'>{title}</span>
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
              <span className='board_details_one_column' key={column.id}>
                <Column key={column.id} column={column} />
              </span>
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
