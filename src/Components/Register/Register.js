import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../config';
import './register.css';

export default function Register (props) {
    const { setUser } = props;
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

        const response = await fetch(`${baseURL}/auth/register`, {
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
            const jsonResponse = await response.json();
            setUser(jsonResponse);
            navigate('/');
        }
    }


    return (
        <section id="register">
            <form className='bg-color-slate' onSubmit={handleSubmit}>
                <label>Register New User</label>
                <input type="email" id="email" name="email" placeholder="Email address" onChange={handleEmail}></input>
                <input type="password" id="password" name="password" placeholder="Password" onChange={handlePassword}></input>
                <input type="submit" value="Register" id="register-button" className='bg-color-slate'></input>
            </form>
        </section>
    )
}