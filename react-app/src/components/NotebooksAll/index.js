import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { thunkGetAllNotebooks } from '../../store/notebooks';
import NotebookCard from "../NotebookCard";
// import { Link } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import NotebookFormCreate from "../NotebookFormCreate";
import './NotebooksAll.css'

export default function NotebooksAll() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser.id;
  const notebooks = Object.values(useSelector(state => state.notebooks.allNotebooks));

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkGetAllNotebooks(userId))
      .then(() => setIsLoaded(true))
  }, [dispatch, userId]);

  return (
    <>
      {isLoaded && (
        <div id='notebooks-page'>
          <div id='notebooks-header'>
            <span id='notebooks-header-text'>My Notebooks</span>
            <span id='notebooks-header-add-btn'>
              <OpenModalButton
                buttonText={<i class="fa-solid fa-plus"><span> </span><span>Add notebook</span></i>}
                modalComponent={
                  <NotebookFormCreate
                    userId={userId}
                  />}
              />
            </span>
          </div>
          <div id='notebook-cards'>
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
      )}
    </>
  )
}
