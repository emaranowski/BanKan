import { Link } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import { useSelector } from 'react-redux';
import './Footer.css';

export default function Footer() {

  const sessionUser = useSelector(state => state.session.user)

  return (
    <>
      <div id="footer">

        <div id='footer-row-1'>

          <span id='footer-col-1'>
            <Link exact to="/">
              <div id='footer-logo'>
                BanKan
              </div>
            </Link>
            <div>
              <span id='footer-login'>
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                />
              </span>
            </div>
          </span>

          <span className='footer-col-2'>

          </span>

        </div>

        <div id='footer-row-2'>

          <div id='footer-copyright'>
            @ 2023 BanKan
          </div>

        </div>

      </div>
    </>
  )
};
