import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header({ isAuthenticated, onLogout }) {
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Support Desk</Link>
      </div>
      <ul>
        {isAuthenticated ? (
          <>
            <li>
              <button className='logout-btn' onClick={onLogout}>
                <FaSignOutAlt aria-label='Logout Icon' /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt aria-label='Login Icon' /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser aria-label='Register Icon' /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
