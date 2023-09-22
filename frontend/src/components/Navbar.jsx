import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="main-nav">
            <Link className="link-pages" to='/'>Home</Link>
            <Link className="link-pages" to='/register'>Register</Link>
            <Link className="link-pages" to='/login'>Login</Link>
        </nav>
    )
}
