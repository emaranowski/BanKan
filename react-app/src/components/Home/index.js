import React from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import OpenModalButton from '../OpenModalButton';
// import SignupFormModal from '../SignupFormModal';
import './Home.css'

export default function Home() {
  // const sessionUser = useSelector(state => state.session.user)

  return (
    <>
      <div id='homeBanner'>
        <div id='homeBannerBg'>
          {/* <img
						id='homeBannerImg'
						src=""
					/> */}
        </div>
        <div id='homeBannerText'>
          <div id='homeHeader'>
            BanKan brings all your<br></br>
            tools and tasks together
          </div>
          <div id='homeSubHeader'>
            Keep it all in one place
          </div>
          {/* <div id='homeSignupBtn'>
						Sign up for free
					</div> */}

          {/* {!sessionUser ?
						<div id='homeSignupBtn'>
							<OpenModalButton
								buttonText="Sign up - it's free!"
								modalComponent={<SignupFormModal />}
							/>
						</div>
						: null
					} */}

        </div>
      </div>
    </>
  )
}
