import './navbar.css';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from '../../images/textLogoW.png';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { baseURL } from '../../config';







export default function Navbar (props) {
    const { loggedIn, setLoggedIn } = props;

    function loginLogout (user) {
        if (user) {
            return <li className="navbar-items"><NavLink to="/" onClick={logout}>Logout</NavLink></li>
        } else {
            return <li className="navbar-items"><NavLink to="/login">Login / Register</NavLink></li>
        }
    }

    async function logout () {
        const response = await fetch(`${baseURL}/auth/logout`, {
            credentials: "include",
        });
        if (response.ok) {
            setLoggedIn(false);
        }
    }

    return (
        <section id="navbar">
            <ul id="navbar-group-1">
                <li className="navbar-items"><NavLink to="/"><img className="nav-icons" src={logo} alt="Salt Tech logo - a text representation of a salt molecule's bond" /></NavLink></li>
                <li className="navbar-items"><NavLink to="/products">Products</NavLink></li>
                {loginLogout(loggedIn, setLoggedIn)}
                {/* <li className="navbar-items"><NavLink to="/login">Login / Register</NavLink></li> */}
                <li className="navbar-items"><NavLink><AiOutlineShoppingCart className="nav-icons"/></NavLink></li>

            </ul>
        </section>
    )
}