import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { useEffect, useState } from "react";
import SignUp from "./SignUp";
const Router = () => {
  const initialUser = JSON.parse(localStorage.getItem("userData"));
  const [user, setUser] = useState(initialUser);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch("https://messaging-app.fly.dev/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
                });
                if (response.status === 200) {
                    const resObject = await response.json();
                    console.log(resObject.user);
                    if(resObject.user){
                      setUser(resObject.user);}
                      setLoading(false)
                } else {
                    setLoading(false)
                }
            } catch (err) {
                console.log()
            }
        }
        getUser();

        }, []);

    const router = createBrowserRouter([
    {
        path: "/login",
        element: loading ? (
            <div>Loading...</div>
          ) : user ? (
            <Navigate to="/" />
          ) : (
            <Login setUser = {setUser} setLoading={setLoading}/>
          ),
    },
    {
        path: "/",
        element: loading ? (
            <div>Loading...</div>
          ) : user ? (
            <Home setUser={setUser}/>
          ) : (
            <Navigate to="/login" />
          ),
      },
      {
        path: "/sign-up",
        element: loading ? (
            <div>Loading...</div>
          ) : user ? (
            <Navigate to="/" />
          ) : (
            <SignUp/>
          ),
      },
      {
        path: "/:id",
        element: loading ? (
            <div>Loading...</div>
          ) : user ? (
            <Home setUser ={setUser}/>
          ) : (
            <Navigate to="/login" />
          ),
      }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;