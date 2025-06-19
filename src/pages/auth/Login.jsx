import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.init";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

function Login() {
  const { signInUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You successfully login",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setErrorMessage("");
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((result) => {
    //     console.log(result.user);
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setErrorMessage(error.message);
    //   });
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You successfully login",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  return (
    <div>
      <Helmet>
        <title>Login | Marathon App</title>
      </Helmet>
      {/* <img src="/assets/beautiful-illustration.avif" alt="" />{" "} */}
      <h2 className="text-center text-4xl font-bold mt-4">LogIn</h2>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-8">
        <div className="card-body">
          <form onSubmit={handleLogin} className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              name="email"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              name="password"
              placeholder="Password"
            />
            <div>
              <Link to="/forget-password" className="link link-hover">
                Forgot password?
              </Link>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
            <p>
              New to this site please
              <Link to="/register" className="text-blue-400 underline">
                Register
              </Link>
            </p>
          </form>
          <button
            onClick={handleGoogleSignIn}
            className="px-4 py-2 border rounded text-3xl flex items-center gap-2 "
          >
            <FcGoogle />
            signIn with Google
          </button>
          {errorMessage && <p className="text-red-400">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
