import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { thunkGetAllBoards } from '../../store/boards';
import BoardCard from "../BoardCard";
import { Link } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import BoardFormCreate from "../BoardFormCreate";
import Footer from '../Footer';
import './BoardsAll.css'

export default function BoardsAll() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser.id;
  const boards = Object.values(useSelector(state => state.boards.allBoards));

  // console.log('**** in BoardsAll, boards:', boards)

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkGetAllBoards(userId))
      .then(() => setIsLoaded(true))
  }, [dispatch, userId]);

  return (<>
    {isLoaded && (<>
      <div id='boards-page'>
        <div className='dashboard-breadcrumb'>
          <Link to={`/dashboard`}>
            ⬅ Dashboard
          </Link>
        </div>

        <div id='boards-header'>
          <span id='boards-header-text'>Boards</span>
          <span id='boards-header-add-btn'>
            <OpenModalButton
              buttonText={<i class="fa-solid fa-plus"><span> </span><span>Add board</span></i>}
              modalComponent={
                <BoardFormCreate
                  userId={userId}
                />}
            />
          </span>
        </div>
        <div id='board-cards'>
          {boards.length ?
            boards.map((board) => (
              <div key={board.id}>
                <BoardCard board={board} />
              </div>
            ))
            :
            (<span>You have no boards!</span>)
          }
        </div>
      </div>
      {/* <div id='boardsall-footer'>
        <Footer></Footer>
      </div> */}
    </>)}
  </>)
};
