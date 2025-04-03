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
  //Added new states to add them in the forms
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');

  //Validations for the date
  const isToday = (dateString) => {
    const today = new Date();
    const inputDate = new Date(dateString);
    return (
      inputDate.getFullYear() === today.getFullYear() &&
      inputDate.getMonth() === today.getMonth() &&
      inputDate.getDate() === today.getDate()
    );
  };

  const isFormValid = () => {
    return (
      username.trim() !== '' &&
      password.trim() !== '' &&
      gender !== '' &&
      dob !== '' &&
      !isToday(dob)
    );
  }

  const handleRegisterClick = async () => {
    try {
      const response = await axios.post('http://localhost:5009/users/register', {
        name: username,
        password: password,
        userRole: "User",
        gender: gender,
        date: dob,
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
      <div className='LoginPage1'>
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
            {/**This is the password input */}
            <label className='username-text'>Password</label>
            <input
              type='password'
              placeholder='Enter password'
              className='password-holder'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Gender */}
            <label className='username-tex'>Gender</label>
            <select
              className='password-holder'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value=''>Select gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>

            {/* Date of Birth */}
            <label className='username-texts'>Date of Birth</label>
            <input
              type='date'
              className='password-holder'
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />

            <button
              type='button'
              className='register-button'
              onClick={handleRegisterClick}
              disabled={!isFormValid()} //disables if form is invalid
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
