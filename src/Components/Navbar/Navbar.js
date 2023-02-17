import './navbar.css';
import { NavLink } from "react-router-dom";
import logo from '../../images/textLogo.jpg';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { VscAccount } from 'react-icons/vsc';
import { baseURL } from '../../config';







export default function Navbar (props) {
    const { user, setUser } = props;

    function loginLogout (user) {
        if (user) {
            return <li className="navbar-items" id="logout"><NavLink to="/" onClick={logout}>Logout</NavLink></li>
        } else {
            return <li className="navbar-items"><NavLink to="/login">Login / Register</NavLink></li>
        }
    }

    async function logout () {
        const response = await fetch(`${baseURL}/auth/logout`, {
            credentials: "include",
        });
        if (response.ok) {
            setUser(false);
        }
    }

    return (
        <section id="navbar">
            <div id="navbar-shadow-container"></div>
            <ul id="navbar-group-1">
                <li className="navbar-items"><NavLink to="/"><img className="nav-icons" src={logo} alt="Salt Tech logo - a text representation of a salt molecule's bond" /></NavLink></li>
                <li className="navbar-items"><NavLink to="/products">Products</NavLink></li>
                
                {user ? 
                    <div id="account-icons">
                        <li className="navbar-items"><NavLink to="/cart"><AiOutlineShoppingCart className="nav-icons"/></NavLink></li>
                        <li className="navbar-items"><NavLink to="/account"><VscAccount className='nav-icons'/></NavLink></li> 
                        {loginLogout(user, setUser)}
                    </div> : 
                    loginLogout(user, setUser)}
            </ul>
            
        </section>
    )
}