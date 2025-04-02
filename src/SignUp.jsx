import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import './styles/signUp.css';
import { IoIosClose } from "react-icons/io";
import { SiTicktick } from "react-icons/si";
import { IoWarning } from "react-icons/io5";


function SignUp() {
    const [register, setRegister] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const navigate = useNavigate();

    const handleRegister = () => {
        setRegister(!register);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5009/users/login', {
                name,
                password
            });

            if (response.data.success) {
                sessionStorage.setItem('user', JSON.stringify(response.data.user));
                
                // Show success message
                setSuccessMessage(true);
                
                // Auto-close popup & navigate to welcome after 3s
                setTimeout(() => {
                    setSuccessMessage(false);
                
                    const user = response.data.user;
                    console.log("Logged in user:", response.data.user);
                    if (user.userName === 'Wanda456' && user.userRole === 'Admin') {
                        navigate('/dashboard');
                    } else {
                        navigate('/welcome');
                    }
                }, 3000);
            } else {
                setErrorMessage('Login failed: Invalid credentials.');
            }
        } catch (error) {
            setErrorMessage(true);
            setTimeout(() => {
                setErrorMessage(false);
            }, 3000);
        }
    };

    return (
        <div className='container-signup'>
            {register && <Login handleRegister={handleRegister} />}

            {/* Error Box */}
            {errorMessage && (
                <div className='success-popup'>
                    <div className='success-content'>
                        <IoWarning color='#D9AB0B'/>Login Failed
                    <button className='close-btn' onClick={() => setErrorMessage(false)}><IoIosClose /></button>
                    </div>
                    <div className="success-timer"></div>
                </div>
            )}

            {/* Success Pop-up Message */}
            {successMessage && (
                <div className="success-popup">
                    <div className="success-content">
                    <SiTicktick />Login Successful
                        <button className="close-btn" onClick={() => setSuccessMessage(false)}><IoIosClose /></button>
                    </div>
                    <div className="success-timer"></div>
                </div>
            )}

            <div className='LoginPage'>
                <div className='entire-form'>
                    <h3>Login to Account</h3>
                    <form className='login-form' onSubmit={(e) => e.preventDefault()}>
                        <label className='username-text'>Username</label>
                        <input
                            type='text'
                            placeholder='Enter username'
                            className='username-holder'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label className='username-text'>Password</label>
                        <input
                            type='password'
                            placeholder='Enter password'
                            className='password-holder'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type='button' className='login-button' onClick={handleLogin}>
                            Log in
                        </button>
                        <p className='password-recover'>Forget password?</p>
                        <p className='last-line'>
                            Don't have an account?
                            <span className='register-path' onClick={handleRegister}>Create Account</span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
