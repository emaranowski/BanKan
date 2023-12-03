import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProfileButton from './ProfileButton';
import './Navigation.css';

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

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
  );
};
