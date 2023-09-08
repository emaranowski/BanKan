import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { thunkGetAllBoards } from '../../store/boards';
// import { Link } from 'react-router-dom';
// import OpenModalButton from "../OpenModalButton";
// import BoardFormCreate from "../BoardFormCreate";
import './Boards.css'

export default function Boards() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser.id;
  // const boards = useSelector(state => state.boards.allBoards);
  const boardsArr = Object.values(useSelector(state => state.boards.allBoards));

  // console.log('**** in Boards, sessionUser:', sessionUser)
  // console.log('**** in Boards, boards:', boards)
  console.log('**** in Boards, boardsArr:', boardsArr)

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
            <span id='boardsHeaderText'>Boards</span>
            <span id='boardsHeaderAddBtn'>
              {/* <OpenModalButton
            buttonText="+"
            modalComponent={
              <BoardFormCreate
                userId={userId}
              />}
          /> */}
            </span>
          </div>
          <div id='boardCards'>
            {boardsArr.length ?
              boardsArr.map((board) => (
                <div id='boardCardDiv' key={board.id}>
                  {/* <BoardCard board={board} /> */}
                  {board.title}
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
