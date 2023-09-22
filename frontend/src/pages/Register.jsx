import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await (await fetch('http://127.1.1.0:5010/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: userName, password })
        })).json()
        if (result.error) {
            console.log(result.error);
        } else {
            setUserName('');
            setPassword('');
            navigate('/login');
        }
    }

    return (
        <>
            <div className="container-form">
                <form className='form-login'>
                    <span className='header-form'>Form</span>
                    <div className="container-input-text">
                        <input className='input-text' onChange={(e) => setUserName(e.target.value)} type="email" name="userName" placeholder='User' required />
                        <input className='input-text' onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder='Password' required />
                    </div>
                    <button className='btn-submit-login' type="submit" onClick={handleSubmit}>Register</button>
                    <span>Ya tienes cuenta? <Link to='/login'>Inicia sesion</Link></span>
                </form>
            </div>
        </>
    )
}