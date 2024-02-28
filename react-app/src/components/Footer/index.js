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
      <footer id="footer-content">

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
            <div id='footer-reach-the-dev'>
              Reach the developer
            </div>
            <div id='footer-dev-name-and-links'>
              <a href="https://emaranowski.com" target="_blank" rel="noopener noreferrer">
                <span id='footer-dev-name'>Erica Maranowski</span>
              </a>
              <span id='footer-dev-icons'>
                <a href="https://linkedin.com/in/erica-maranowski/" target="_blank" rel="noopener noreferrer">
                  <i class="fa-brands fa-linkedin"></i>
                </a>
                <a href="https://github.com/emaranowski" target="_blank" rel="noopener noreferrer">
                  <i class="fa-brands fa-github" id='github-icon'></i>
                </a>
              </span>
            </div>
          </span>

        </div>

        <div id='footer-row-2'>
          <span id='footer-copyright'>
            @ 2024 BanKan
          </span>

          <span id='footer-tech'>
            <span id='footer-tech-used'>
              Technologies Used:
            </span>
            <span className='footer-tech-icon'>React Beautiful DnD</span>
            <span className='footer-tech-icon'>React</span>
            <span className='footer-tech-icon'>Redux</span>
            <span className='footer-tech-icon'>Flask</span>
            <span className='footer-tech-icon'>SQLAlchemy</span>
            <span className='footer-tech-icon'>PostgreSQL</span>
            <span className='footer-tech-icon'>SQLite</span>
            <span className='footer-tech-icon'>SQL</span>
            <span className='footer-tech-icon'>Python</span>
            <span className='footer-tech-icon'>JS</span>
            <span className='footer-tech-icon'>HTML</span>
            <span className='footer-tech-icon'>CSS</span>
          </span>
        </div>

      </footer>
    </>
  )
};
