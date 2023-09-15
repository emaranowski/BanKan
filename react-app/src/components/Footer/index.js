import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { logout } from "../../store/session";
import { Link } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import './Footer.css';

export default function Footer() {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/');
  };

  return (
    <>
      <div id="footer">

        <div id='footer-row-1'>

          <span id='footer-logo-login'>
            <Link exact to="/">
              <div id='footer-logo'>
                BanKan
              </div>
            </Link>
            <div>
              {!sessionUser ?
                <span id='footer-login'>
                  <OpenModalButton
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                  />
                </span>
                :
                <span id='footer-logout' onClick={handleLogout}>
                  Log Out
                </span>
              }
            </div>
          </span>

          <span id='footer-dev-info'>
            <div id='footer-contact-the-dev'>
              Contact the developer
            </div>
            <div id='footer-dev-name-and-links'>
              Erica Maranowski
              <a href="https://www.linkedin.com/in/erica-maranowski/" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://github.com/emaranowski" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-github" id='github-icon'></i>
              </a>
            </div>
          </span>

        </div>

        <div id='footer-row-2'>

          <span id='footer-copyright'>
            @ 2023 BanKan
          </span>

          <span id='footer-tech'>
            <span id='footer-tech-used'>
              TECHNOLOGIES USED:
            </span>
            <span className='footer-tech-icon'>REACT BEAUTIFUL DND</span>
            <span className='footer-tech-icon'>REACT</span>
            <span className='footer-tech-icon'>REDUX</span>
            <span className='footer-tech-icon'>PYTHON</span>
            <span className='footer-tech-icon'>POSTGRESQL</span>
            <span className='footer-tech-icon'>SQLITE</span>
            <span className='footer-tech-icon'>JS</span>
            <span className='footer-tech-icon'>HTML</span>
            <span className='footer-tech-icon'>CSS</span>
          </span>

        </div>

      </div>
    </>
  )
};
