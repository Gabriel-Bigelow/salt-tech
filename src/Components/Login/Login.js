import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { baseURL } from '../../config';
import './login.css';

export default function Login (props) {
    const { setLoggedIn } = props;
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();


    function handleEmail ({target}) {
        setEmail(target.value);
    }

    function handlePassword ({target}) {
        setPassword(target.value);
    }

    async function handleSubmit (event) {
        event.preventDefault();
        
        const response = await fetch(`${baseURL}/auth/login`, {
            'method': 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
            credentials: "include"
        })

        if (response.ok) {
            setLoggedIn(true);
            navigate('/');
        } else {
            console.log('Unauthorized');
        }
    }


    return (
        <section id="login">
            <form className='color-slate' onSubmit={handleSubmit}>
                <label>Welcome Back</label>
                <input type="email" id="email" name="email" placeholder="Email address" onChange={handleEmail}></input>
                <input type="password" id="password" name="password" placeholder="Password" onChange={handlePassword}></input>
                <input type="submit" value="Sign In" id="login-button" className='color-slate'></input>
            </form>
            <p id="new-user">New user? <NavLink>Register</ NavLink></p>
        </section>
    )
}