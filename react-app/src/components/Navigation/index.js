import React from 'react';
// import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
// import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProfileButton from './ProfileButton';
import './Navigation.css';

export default function Navigation({ isLoaded }) {
  // const dispatch = useDispatch();
  // const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   dispatch(logout());
  //   history.push('/');
  // };

  return (
    <nav>
      <span id="nav-right">
        <NavLink exact to="/">
          <span id='nav-logo-text'>
            BanKan
          </span>
        </NavLink>
        {/* <NavLink exact to="/features">
          <span id='nav-features'>
            Features
          </span>
        </NavLink> */}
        {/* <NavLink exact to="/plans">
          <span id='nav-plans'>
            Plans & Pricing
          </span>
        </NavLink> */}
      </span>
      <span id="nav-left">
        {sessionUser ?
          (<>
            <NavLink exact to="/dashboard">
              <span id='nav-dashboard'>
                Dashboard
              </span>
            </NavLink>
            <span>
              {isLoaded && (<ProfileButton user={sessionUser} />)}
            </span>
          </>)
          :
          (<>
            <span id='nav-login'>
              <OpenModalButton
                buttonText="Log in"
                modalComponent={<LoginFormModal />}
              />
            </span>
            <span id='nav-signup'>
              <OpenModalButton
                buttonText="Get BanKan for free"
                modalComponent={<SignupFormModal />}
              />
            </span>
          </>)
        }
      </span>
    </nav>
  )
};
