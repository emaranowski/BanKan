import { Link } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import { useSelector } from 'react-redux';
import './Footer.css';

export default function Footer() {

  const sessionUser = useSelector(state => state.session.user)

  return (
    <>
      <div id="footer">

        <span id='footer_left_col'>
          <Link exact to="/">
            <div id='footer_logo'>BanKan</div>
          </Link>
        </span>

        <span className='footer_right_col'>
          <div id='footer_copyright'>
            @ 2023 BanKan
          </div>
        </span>

      </div>
    </>
  )
};
