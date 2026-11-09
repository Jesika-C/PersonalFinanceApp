import { NavLink } from "react-router-dom";

export default function Navbar() {
    return(
        <nav>
            <NavLink to="/" className="nav-link">
                Home
            </NavLink>
        </nav>
    );
}