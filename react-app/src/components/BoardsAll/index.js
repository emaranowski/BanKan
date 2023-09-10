import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { thunkGetAllBoards } from '../../store/boards';
import BoardCard from "../BoardCard";
// import { Link } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import BoardFormCreate from "../BoardFormCreate";
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

  return (
    <>
      {isLoaded && (
        <div id='boardsPage'>
          <div id='boardsHeader'>
            <span id='boardsHeaderText'>My Boards</span>
            <span id='boardsHeaderAddBtn'>
              <OpenModalButton
                buttonText="+"
                modalComponent={
                  <BoardFormCreate
                    userId={userId}
                  />}
              />
            </span>
          </div>
          <div id='boardCards'>
            {boards.length ?
              boards.map((board) => (
                <div id='boardCardDiv' key={board.id}>
                  <BoardCard board={board} />
                </div>
              ))
              :
              (<span>You have no boards!</span>)
            }
          </div>
        </div>
      )}
    </>
  )
}
