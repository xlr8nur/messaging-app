/* eslint-disable react/no-unescaped-entities */
import "../css/login.css"
import { motion } from "framer-motion"
import GitHubLogo from "../assets/GitHubLogo"
import GoogleLogo from "../assets/GoogleLogo"
import { Link } from "react-router-dom"
import { useState } from "react"
const Login = ({setUser}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loginFailed,setLoginFailed] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // replace it with the actual username and password values
        const { username, password } = formData;

      
        fetch("https://messaging-app.fly.dev/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }), // Include user credentials in the request body
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
              // handle the successful login here, e.g., redirect the user
            } else {
              console.log("Login failed");
              // handle the failed login here, e.g., display an error message
            }
          }).then(data => {
            if(data){
            localStorage.setItem("userData", JSON.stringify(data));
            setUser(data);
            setLoginFailed(false)
            }
            else{
              setLoginFailed(true)
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
    return(
        <>
        <div className="backgroundImage">
        </div>
        <div className="login">
            <div className="header">
                <h1 style={{color:"black"}}>Let's</h1> 
                <h1><span style={{color:"white"}}>Keep<span style={{color:"black"}}>in</span>Touch!</span></h1>
            </div>
                <form className="login-form" onSubmit= {handleFormSubmit}>
                    <div className="username-container">
                        <label htmlFor="username">Username:</label>
                        <motion.input whileFocus ={{scale:1.05}} transition={{ duration: 0.5 }} type="text" id="username" name="username" className="input-field" placeholder="Username" required={true} 
                        value={formData.username} onChange={handleInputChange}/>
                    </div>
                    <div className="password-container">
                        <label htmlFor="password">Password:</label>
                        <motion.input whileFocus ={{scale:1.05}} transition={{ duration: 0.5 }} type="password" id="password" name="password" className="input-field" placeholder="Password" required={true} 
                        value={formData.password} onChange={handleInputChange}/>
                    </div>
                    {loginFailed && <p style={{textAlign:"center", fontSize:"1em", color:"red"}}>Login failed either username OR password is wrong!</p>}
                    <div className="submit-container">
                        <motion.input whileHover={{scale: 1.1}} whileTap ={{scale:.8}}type="submit" className="submit" value={"Login"}/>
                    </div>
                </form>
                <div className="sign-up">
                    <p>Or Sign Up <Link to="/sign-up" style={{color:"white"}}>Here</Link></p>
                    <p>Want to try?</p>
                    <p>Try this username: strawberry</p>
                    <p>password: abc123</p>
                </div>
                
            </div>
        </>
    )
}

export default Login