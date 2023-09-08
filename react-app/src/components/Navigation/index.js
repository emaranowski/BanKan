import React from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProfileButton from './ProfileButton';
import './Navigation.css';

export default function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/');
  };

  return (
    <nav>
      <span id="navRight">
        <span id='navLogo'>
          <NavLink exact to="/">BanKan</NavLink>
        </span>
        <NavLink exact to="/features">
          <span id='navFeatures'>
            Features
          </span>
        </NavLink>
        <NavLink exact to="/plans">
          <span id='navPlans'>
            Plans & Pricing
          </span>
        </NavLink>
      </span>
      <span id="navLeft">
        {sessionUser ?
          (<>
            {/* <button onClick={handleLogout}>
              Log Out
            </button> */}
            <span>
              {isLoaded && (<ProfileButton user={sessionUser} />)}
            </span>
          </>)
          :
          (<>
            <span id='navLogin'>
              <OpenModalButton
                buttonText="Log in"
                modalComponent={<LoginFormModal />}
              />
            </span>
            <span id='navSignup'>
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
