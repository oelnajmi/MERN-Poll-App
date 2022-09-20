import { Link } from 'react-router-dom'
import './Navbar.css';

const Navbar = () => {

  return (
    <header>
      <div className="nav-container">
        <Link to="/">
          <h1>Poll◐</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar