import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import './Home.css'

export default function Home() {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <>
      <div id='home-banner-bg'>
        {/* <img
						id='home-banner-img'
						src=""
					/> */}
      </div>

      <div id='home-content'>
        <div id='home-banner-text'>
          <div id='home-header'>
            BanKan brings all your<br></br>
            tools and tasks together
          </div>
          <div id='home-sub-header'>
            Keep it all in one place.
          </div>
          {!sessionUser ?
            <div id='home-signup-btn'>
              <OpenModalButton
                buttonText="Sign up - it's free!"
                modalComponent={<SignupFormModal />}
              />
            </div>
            :
            <Link to='/boards'>
              <button id='home-my-boards-btn'>
                Go to my boards
              </button>
            </Link>
          }
        </div>

        <div id='home-content-section'>
          <div id='home-content-mini-header'>
            BANKAN 101
          </div>
          <div id='home-content-section-header'>
            Power your productivity
          </div>
          <div id='home-content-section-text'>
            Streamlined and minimalistic.
            Create dynamic boards. Jot down notes. Check things off your lists.
            Cut the clutter with just what you need. Start in seconds.
          </div>
        </div>

        <div id='home-content-section'>
          <div id='home-content-mini-header'>
            BANKAN IN ACTION
          </div>
          <div id='home-content-section-header'>
            Tackle workflows for any project
          </div>
          <div id='home-content-section-text'>
            Whether it's project management, meetings, brainstorming, or onboarding – BanKan makes it easy.
          </div>
        </div>

        <div id='home-content-section'>
          <div id='home-content-mini-header'>
            POWERFUL WAYS TO GROW
          </div>
          <div id='home-content-section-header'>
            Focus on what inspires
          </div>
          <div id='home-content-section-text'>
            Take the headache out of tasks, notes, and to-dos.
            BanKan keeps it all clear and organized,
            so you can work on what counts.
          </div>
        </div>

      </div>
    </>
  )
}
