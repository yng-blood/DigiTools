import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Autcss.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('http://localhost:5000/app/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, OTP: otp, NewPassword: newPassword }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Password reset successful
        setResetMessage('Password reset successful. You can now log in with your new password.');
      } else {
        // Handle password reset failure
        setResetMessage(responseData.error || 'Password reset failed. Please check your email and OTP.');
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error resetting password:', error);
      setResetMessage('Error occurred while resetting password. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="chat-container">
        <h1 className="chat-heading">Reset Password</h1>
      </div>
      <div className="screen__content">
        <form className="login">
          {/* Email */}
          <div className="login__field">
            <i className="login__icon fas fa-user"></i>
            <input
              type="text"
              className="login__input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* OTP */}
          <div className="login__field">
            <i className="login__icon fas fa-lock"></i>
            <input
              type="text"
              className="login__input"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          {/* New Password */}
          <div className="login__field">
            <i className="login__icon fas fa-lock"></i>
            <input
              type="password"
              className="login__input"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button className="button login__submit" type="button" onClick={handleResetPassword} disabled={isLoading}>
            <span className="button__text">{isLoading ? 'Resetting Password...' : 'Reset Password'}</span>
            <i className="button__icon fas fa-chevron-right"></i>
          </button>

        </form>
        <div className="social-login">
          <Link to="/Login">Back to Login</Link>
        </div>
        {resetMessage && <div className="reset-message">{resetMessage}</div>}
      </div>
    </>
  );
};

export default ResetPassword;
