import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { thunkGetAllBoards } from '../../store/boards';
import { thunkGetAllNotebooks } from '../../store/notebooks';
import { Link } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import BoardCard from "../BoardCard";
import BoardFormCreate from "../BoardFormCreate";
import NotebookCard from "../NotebookCard";
import NotebookFormCreate from "../NotebookFormCreate";
import './AccountDashboard.css';

export default function AccountDashboard() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser.id;
  const boards = Object.values(useSelector(state => state.boards.allBoards));
  const notebooks = Object.values(useSelector(state => state.notebooks.allNotebooks));

  // console.log('**** in Dashboard, boards:', boards)
  // console.log('**** in Dashboard, notebooks:', notebooks)

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkGetAllBoards(userId))
      .then(() => dispatch(thunkGetAllNotebooks(userId)))
      .then(() => setIsLoaded(true))
  }, [dispatch, userId]);

  return (<>
    {isLoaded && (<>
      <div id='dashboard-page'>

        <div id='dashboard-header'>
          Hello, {sessionUser.username}. Welcome to your dashboard.
        </div>

        <div id='dashboard-section-header'>
          <span id='dashboard-section-subheader'>
            <Link to={`/boards`}>
              Boards
            </Link>
          </span>
          <span id='dashboard-section-add-btn'>
            <OpenModalButton
              buttonText={<i class="fa-solid fa-plus"><span> </span><span>Add board</span></i>}
              modalComponent={
                <BoardFormCreate
                  userId={userId}
                />}
            />
          </span>
        </div>
        <div id='dashboard-section-cards'>
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

        <div id='dashboard-section-header'>
          <span id='dashboard-section-subheader'>
            <Link to={`/notebooks`}>
              Notebooks
            </Link>
          </span>
          <span id='dashboard-section-add-btn-notebook'>
            <OpenModalButton
              buttonText={<i class="fa-solid fa-plus"><span> </span><span>Add notebook</span></i>}
              modalComponent={
                <NotebookFormCreate
                  userId={userId}
                />}
            />
          </span>
        </div>
        <div id='dashboard-section-cards'>
          {notebooks.length ?
            notebooks.map((notebook) => (
              <div key={notebook.id}>
                <NotebookCard notebook={notebook} />
              </div>
            ))
            :
            (<span>You have no notebooks!</span>)
          }
        </div>


      </div>
      <div id='dashboard-bottom-spacer'></div>
    </>)}
  </>)
};
