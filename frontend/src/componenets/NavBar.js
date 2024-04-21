import "./NavBar.css"

function NavBar() {
    return (
        <nav className="navbar">
            <div className="logo">WriteSpark ⚡</div>
            <div className="menu">
                <button className="btn">Login</button>
                <button className="btn">Signup</button>
            </div>
        </nav>
    )
}

export default NavBar;