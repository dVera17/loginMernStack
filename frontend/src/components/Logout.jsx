import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    const handleClick = async () => {
        let result = await (await fetch('http://127.1.1.0:5010/auth/login', { method: "POST" })).json()
        console.log(result.message);
        navigate('/')
    }

    return (
        <button onClick={handleClick}>
            Logout
        </button>
    )
}

