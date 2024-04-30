import { Link } from 'react-router-dom';

import "./NavBar.css"

function NavBar() {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">WriteSpark ⚡</Link>
            <div className="menu">
                <button className="btn">Login</button>
                <button className="btn">Signup</button>
            </div>
        </nav>
    )
}

export default NavBar;