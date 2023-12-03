import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';

export default function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/');
  };

  const ulClassName = "nav-profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button id='nav-profile-dropdown-btn' onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div id='nav-profile-dropdown-username'>
              Welcome, <br></br>{user.username}
            </div>
            <Link exact to="/dashboard">
              <span
                className='nav-profile-dropdown-links'
                onClick={closeMenu}
              >
                Dashboard
              </span>
            </Link>
            <Link exact to="/boards">
              <span
                className='nav-profile-dropdown-links'
                onClick={closeMenu}
              >
                Boards
              </span>
            </Link>
            <Link exact to="/notebooks">
              <span
                className='nav-profile-dropdown-links'
                onClick={closeMenu}
              >
                Notebooks
              </span>
            </Link>
            {/* <Link exact to="/account">
              <span
                id='dropdown-account'
                onClick={closeMenu} >
                Account
              </span>
            </Link> */}
            <div>
              <span
                className='nav-profile-dropdown-links'
                id='nav-profile-dropdown-logout'
                onClick={handleLogout}
              >
                Log Out
              </span>
            </div>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </>
  )
};
