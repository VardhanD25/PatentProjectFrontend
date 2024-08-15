import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import './css/Navbar.css'; // Import the CSS file

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        
        <Link to="/" className="navbar-brand">
         
          <h1>Logo</h1>
        </Link>
        <nav className="navbar-nav">
          {user ? (
            <div className="navbar-user">
              <Link to="/addpart" className="navbar-link">Add Part Page |</Link>
              <Link to="/userinput" className="navbar-link">User Input Page |</Link>
              <span className="navbar-email">{user.email}</span>
              <button onClick={handleClick} className="navbar-button">Log out</button>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/signup" className="navbar-link">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
