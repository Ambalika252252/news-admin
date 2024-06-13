import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/auth/login', { username, password });
            if (response.status === 200 || response.status === 201) {
                login();
                navigate('/dashboard');    
                setErrorMessage('');
            } else {
                console.log('Unexpected response status', response.status);
                setErrorMessage(`Unexpected response: ${response.status}`);
            }
        } catch (error) {
            setErrorMessage('Invalid username or password. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleLogin} style={styles.form}>
                <div>
                    <div style={styles.formGroup}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="Enter your password"
                        />
                    </div>
                </div>
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#638889',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '50vh',
        padding: '20px',
        height: '60vh',
        backgroundColor: 'rgb(157 188 152)',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '1px',
        justifyContent: 'space-around',
    },
    formGroup: {
        marginBottom: '15px',
        textAlign: '-webkit-left',
    },
    input: {
        width: '95%',
        padding: '8px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginTop: '5px',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#638889',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
        boxShadow: 'rgb(0 0 0 / 44%) -2px 1px 10px',

    },
    error: {
        color: 'red',
        marginBottom: '15px',
    },
};

export default Login;
