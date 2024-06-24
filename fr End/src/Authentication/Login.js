import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Autcss.css';
import IHeaders from './IHeaders';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const [resetMessage, setResetMessage] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false); // State to track invalid email
  const [previousChatText, setPreviousChatText] = useState("");
  const [chatText, setChatText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const chatData = [
    "📄 Convert your documents effortlessly! 💼",
    "🔄 Transform PDFs into images with just a click! 📷",
    "📚 Supports multiple file formats for your convenience! 📑",
    "⚡ Fast and reliable conversions every time! 🚀",
    "🔍 Preview your files before converting! 👀",
    "🎨 High-quality output to meet your needs! 🖼️",
    "📂 Organize and manage your files with ease! 📁",
    "🌐 Access your converted files from anywhere! 🌍",
    "🔒 Your data is secure and private! 🔐",
    "💬 Get instant support for all your queries! 📞"
];


  useEffect(() => {
    const intervalId = setInterval(() => {
      // Set the previous text before updating with the new text
      setPreviousChatText(chatText);
      // Display text in sequence
      setChatText(chatData[textIndex]);
      setTextIndex((prevIndex) => (prevIndex + 1) % chatData.length);
    }, 3000);

    // Cleanup the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [textIndex, chatData, chatText]);


  const handleLogin = async () => {
    try {
      setEmailError('');
      setPasswordError('');

      // Validate email and password
      if (!email) {
        setEmailError('Email is required');
        return;
      }

      if (!password) {
        setPasswordError('Password is required');
        return;
      }

      setIsLoading(true);

      const response = await fetch('http://localhost:5000/app/NLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Handle redirect URL from the server
        if (responseData.redirectTo) {
          navigate(responseData.redirectTo);
        } else {
          console.error('Redirect URL not provided by the server');
        }
      } else {
        // Handle login failure
        if (response.status === 400 && responseData.msg === 'Email not found') {
          setInvalidEmail(true);
          setResetMessage('User with this email does not exist.');
        } else {
          setResetMessage(responseData.msg || 'Login failed. Please check your credentials.');
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error occurred while logging in. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="chat-container">
        {/* <h1 className="chat-heading">Let's Chat</h1> */}
        <IHeaders/>
      </div>
      <div className="screen__content">
        <div className='onecard'>
          <form className="login">
            {/* Email */}
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className={`login__input ${invalidEmail ? 'invalid-email' : ''}`}
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setInvalidEmail(false);
                }}
              />
              {emailError && <div className="error-message">{emailError}</div>}
            </div>
            {resetMessage && <div className="reset-message">{resetMessage}</div>}

            {/* Password */}
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <div className="error-message">{passwordError}</div>}
              <br />
              <Link to="../Reset" style={{ color: "orange" }}>Forgot password?</Link>
              <br />
              <button className="button login__submit" type="button" disabled={isLoading} onClick={handleLogin}>
                <span className="button__text">{isLoading ? 'Logging in...' : 'Login'}</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </div>
            <br/>
<br/>

           <div>
           <div className="social-login"> didn't have an account 
          <Link to="../Signup"> Sign Up</Link>
        </div>
           </div>
          </form>
        </div>
        
      </div>
      <div className="screen__background">
        <span className="screen__background__shape screen__background__shape4">
          <div className="chat-text">{chatText}</div>
        </span>
        <span className="screen__background__shape screen__background__shape3"></span>
        <span className="screen__background__shape screen__background__shape2"></span>
        <span className="screen__background__shape screen__background__shape1">
          <br />
          <br /><br /><br /><br />
          <div className="chat-text">{previousChatText}</div>
          <br />
          <div className="chat-text">{chatText}</div>
        </span>
      </div>
      <div className="emojis-container">
        <div className="emoji-cloud cloud-1">😄 😍 😎</div>
        <div className="emoji-cloud cloud-2">🌟 💫 ✨</div>
        <div className="emoji-cloud cloud-3">🚀 🛸 🌌</div>
        <div className="emoji-cloud cloud-2">🎗🎀🎋</div>
        <div className="emoji-cloud cloud-3">🎒🩱👙⚾</div>
        <div className="emoji-cloud cloud-2">💎⚽</div>
        <div className="emoji-cloud cloud-3">🎸🪕🎻</div>
        <div className="emoji-cloud cloud-2">🍛🍠🥟🥪</div>
      </div>
    </>
  );
};
export default Login;
