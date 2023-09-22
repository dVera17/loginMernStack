import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

export default function Login() {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await (await fetch('http://127.1.1.0:5010/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: userName, password })
        })).json()
        console.log(result);
        if (result.error) {
            console.log(result.error);
        } if (result.access) {
            setUserName('');
            setPassword('');
            navigate('/profile');
        }
    }

    return (
        <>
            <div className="container-form">
                <form method='POST' className='form-login'>
                    <span className='header-form'>Login</span>
                    <div className="container-input-text">
                        <input className='input-text' onChange={(e) => setUserName(e.target.value)} type="text" name="userName" placeholder='User' required />
                        <input className='input-text' onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder='Password' required />
                    </div>
                    <button className='btn-submit-login' type="submit" onClick={handleSubmit}>Sign in</button>
                    <span>No tienes cuenta? <Link to='/register'>registrate aqui</Link></span>
                </form>
            </div>
        </>
    )
}