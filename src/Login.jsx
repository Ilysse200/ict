import React, { useState } from 'react';
import axios from 'axios';
import './styles/login.css';

{/*Import icons for registration */}
import { IoIosClose } from "react-icons/io";
import { SiTicktick } from "react-icons/si";

function Login({ handleRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleRegisterClick = async () => {
    try {
      const response = await axios.post('http://localhost:5009/users/register', {
        name: username,
        password: password,
        userRole: "User"
      });

      if (response.data) {
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
          handleRegister(); 
      }, 3000);
        // ✅ Flip to login view
      }
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className='container-register'>
      {/* Success Pop-up Message */}
      {successMessage && (
                <div className="success-popup">
                    <div className="success-content">
                    <SiTicktick /> <p className='success-info'>User registered Successfully</p>
                        <button className="close-btn" onClick={() => setSuccessMessage(false)}><IoIosClose/></button>
                    </div>
                    <div className="success-timer"></div>
                </div>
            )}
      <div className='LoginPage'>
        <div className='entire-form'>
          <h3>Register Account</h3>
          <form className='register-form' onSubmit={(e) => e.preventDefault()}>
            <label className='username-text'>Username</label>
            <input
              type='text'
              placeholder='Enter username'
              className='username-holder'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label className='username-text'>Password</label>
            <input
              type='password'
              placeholder='Enter password'
              className='password-holder'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type='button'
              className='register-button'
              onClick={handleRegisterClick}
            >
              Create Account
            </button>

            <p className='password-recover'>Forget password?</p>
            <p className='last-line'>
              Already have an account?
              <span className='register-path' onClick={handleRegister}>
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
