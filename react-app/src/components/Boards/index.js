import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import BoardFormCreate from "../BoardFormCreate";
import './Boards.css'

export default function Boards() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const userId = sessionUser.id;

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch]);

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
          <div>
            { }
          </div>
        </div>
      )}
    </>
  )
}
