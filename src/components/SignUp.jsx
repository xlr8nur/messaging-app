import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    image_url: "",
  });
  const [verifyEmail, setVerifyEmail] = useState(true);
  const [verifyUsername, setVerifyUsername] = useState(true);

  const onEmailBlur = () => {
    if(newUser.email.length !== 0){
    fetch(`https://messaging-app.fly.dev/users/email/${newUser.email}`)
  .then((response) => {
    return response.json()
  }).then(data =>  setVerifyEmail(data.message))}
  }
  const onUsernameBlur = () => {
    if(newUser.username.length !== 0){
    fetch(`https://messaging-app.fly.dev/users/username/${newUser.username}`)
  .then((response) => {
    return response.json()
  }).then(data =>  setVerifyUsername(data.message)).catch(error =>console.error(error))}
  }
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const handleInputChange = (e, field) => {
    const updatedUser = { ...newUser, [field]: e.target.value };
    setNewUser(updatedUser);
  };
  const handleSignUp = (e) => {
    e.preventDefault();

    if(passwordsMatch && verifyEmail && verifyUsername){
      fetch("https://messaging-app.fly.dev/users",{
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      })
      navigate("/login");
    }

  }

  return (
    <>
      <div className="backgroundImage"></div>
      <div className="sign-up-page">
        <div className="header">
          <h1>Sign Up</h1>
          <h1 style={{ color: "black" }}>Let's</h1>
          <h1>
            <span style={{ color: "purple" }}>Message</span>
            <span style={{ color: "black" }}>Your</span>
            <span style={{ color: "red" }}>Friend!</span>
          </h1>
        </div>
        <form className="sign-up-form" onSubmit={handleSignUp}>
          <div className="name-container">
            <label htmlFor="name">Full Name:</label>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              type="text"
              id="name"
              name="name"
              className="input-field"
              placeholder="Name"
              onChange={(e) => handleInputChange(e, "name")}
              value={newUser.name}
            />
          </div>
          <div className="email-container">
            <label htmlFor="email">Email:</label>
            <motion.input
              onBlur={() => onEmailBlur()}
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              type="email"
              id="email"
              name="email"
              className="input-field"
              placeholder="Email"
              onChange={(e) => handleInputChange(e, "email")}
              value={newUser.email}
            />
          </div>
          {!verifyEmail && (
            <p style={{ color: "red" , fontSize: ".8em"}}>Email already exists.</p>
          )}
          <div className="username-container" >
            <label htmlFor="username">Username:</label>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              type="text"
              id="username"
              name="username"
              className="input-field"
              placeholder="Username"
              minLength={5}
              onChange={(e) => handleInputChange(e, "username")}
              value={newUser.username}
              onBlur={() => onUsernameBlur()}
            />
            {!verifyUsername && (
            <p style={{ color: "red" , fontSize: ".8em"}}>Username already exists.</p>
          )}
          </div>
          <div className="password-container">
            <label htmlFor="password">Password:</label>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              type="password"
              id="password"
              name="password"
              className="input-field"
              placeholder="Password"
              minLength={5}
              onChange={(e) => {
                const newPassword = e.target.value;
                const confirmPassword = newUser.confirmPassword;
                setNewUser((prevUser) => ({ ...prevUser, password: newPassword }));
                setPasswordsMatch(newPassword === confirmPassword);
              }}
              value={newUser.password}
            />
          </div>
          <div className="confirm-password-container">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="input-field"
              placeholder="Confirm Password"
              minLength={5}
              onChange={(e) => {
                const newPassword = newUser.password;
                const confirmPassword = e.target.value;
                setNewUser((prevUser) => ({ ...prevUser, confirmPassword }));
                setPasswordsMatch(newPassword === confirmPassword);
              }}
              value={newUser.confirmPassword}
            />
          </div>
          {!passwordsMatch && (
            <p style={{ color: "red" , fontSize: ".8em"}}>Passwords do not match.</p>
          )}
          <div className="profile-image-container">
            <label htmlFor="profile-image">Profile Image URL:</label>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              type="text"
              id="profile-image"
              name="profile-image"
              className="input-field"
              placeholder="Image URL"
              onChange={(e) => handleInputChange(e, "image_url")}
              value={newUser.image_url}
            />
          </div>
          <div className="submit-container">
            <motion.input
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              type="submit"
              className="submit"
              value={"Sign Up"}
            />
          </div>
          <Link to="/login"style={{color:"white", textDecoration:"none", textAlign:"center", fontSize: ".8em"}}>Back to Login</Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;