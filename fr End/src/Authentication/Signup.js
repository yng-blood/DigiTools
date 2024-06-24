import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Autcss.css";
import IHeaders from "./IHeaders";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const passmatch = () => {
    return password === Cpassword;
  };

  const handleSignup = async (e) => {
    e.preventDefault();


    // Check if any required field is empty
    if (!email || !password || !userName || !name || !phone || !Cpassword) {
      setError(`All fields are required.`);
      return;
    }

    // Check if password matches
    if (!passmatch()) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/app/NSignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
          UserName: userName,
          Name: name,
          Ph_No: phone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 400) {
          if (errorData.error === "UserName already exists") {
            setError("UserName already exists");
          } else if (errorData.error === "Email already exists") {
            setError("Email already exists");
          } else {
            setError(
              "Signup failed or Incorrect credentials. Please try again."
            );
          }
        } else {
          console.error("Error during signup :", response.statusText);
        }

        setIsLoading(false);
        return;
      }

      const responseData = await response.json();

      if (response.ok) {
        // Handle redirect URL from the server
        if (responseData.redirectTo) {
          navigate(responseData.redirectTo);
        }
      }
    } catch (error) {
      console.error("Error during signup :", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="chat-container">
        <IHeaders/>
      </div>
      <div className="screen__content">
        <form className="login" onSubmit={handleSignup}>
        <div className="login__field">
            <i className="login__icon fas fa-user"></i>
            <input
              type="text"
              className={`login__input ${!name && 'error'}`}
              placeholder={!name ? "Name" :"Name is required"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="login__field">
            <i className="login__icon fas fa-user"></i>
            <input
              type="text"
              className={`login__input ${!userName && 'error'}`}
              placeholder={!userName ? "User Name ":"User Name is required" }
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="login__field">
            <i className="login__icon fas fa-user"></i>
            <input
              type="text"
              className={`login__input ${!email && 'error'}`}
              placeholder={!email ?"Email":"Email is required"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login__field">
            <i className="login__icon fas fa-user"></i>
            <input
              type="text"
              className={`login__input ${!phone && 'error'}`}
              placeholder={!phone ? "Phone Number":"Phone Number is required" }
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Password confirmation */}
          <div className="login__field">
            <i className="login__icon fas fa-lock"></i>
            <input
              type="password"
              className={`login__input ${!password && 'error'}`}
              placeholder={!password ? "Password" : "Password is required"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login__field">
            <i className="login__icon fas fa-lock"></i>
            <input
              type="password"
              className={`login__input ${!Cpassword && 'error'}`}
              placeholder={!Cpassword ? "Confirm Password" : "Confirm Password is required"}
              value={Cpassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
          </div>

          <div className="error-message">{error}</div>

          <button className="button login__submit" type="submit" disabled={isLoading}>
            <span className="button__text">{isLoading ? 'Signing Up...' : 'Sign Up Now'}</span>
            <i className="button__icon fas fa-chevron-right"></i>
          </button>

          <br />
          <br />
          <br />

          <div className="social-login">
            Already have an account? <Link to="../Login">Log in</Link>
          </div>
        </form>
      </div>
      <div className="screen__background">
        {/* Background shapes */}
      </div>
      <div className="emojis-container">
        {/* Emoji clouds */}
      </div>
    </>
  );
};

export default UserSignup;
