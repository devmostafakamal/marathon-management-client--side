import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.init";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet-async";

function Register() {
  const { createUser } = useContext(AuthContext);
  // const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You successfully register",
          showConfirmButton: false,
          timer: 1500,
        });
        // navigate("/");
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
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoUrl = e.target.photoURL.value;
    console.log(name, email, password);
    // reset errorMessage
    setErrorMessage("");
    // console.log(name, email, password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase) {
      setErrorMessage("Password must contain at least one uppercase letter.");
      return;
    }
    if (!hasLowerCase) {
      setErrorMessage("Password must contain at least one lowercase letter.");
      return;
    }
    if (!hasMinLength) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (!hasSpecialChar) {
      setErrorMessage(
        'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>).'
      );
      return;
    }
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((result) => {
    //     console.log(result);
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You successfully register",
          showConfirmButton: false,
          timer: 1500,
        });

        // ✅ Properly update the profile
        return updateProfile(user, {
          displayName: name,
          photoURL: photoUrl,
        });
      })
      .then(() => {
        // navigate("/");
      })
      .catch((error) => {
        console.error("Registration error:", error);
        setErrorMessage(error.message);
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
        <title>Register | Marathon App</title>
      </Helmet>
      <h2 className="font-bold text-center mt-4">Register</h2>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-8">
        <div className="card-body">
          <form onSubmit={handleRegister} className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              name="name"
              placeholder="Name"
            />
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              name="email"
              placeholder="Email"
            />
            <label className="label">Photo URL</label>
            <input
              type="text"
              className="input"
              name="photoURL"
              placeholder="Photo URL"
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              name="password"
              placeholder="Password"
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Register</button>
            <p>
              Already Have an account?
              <Link to="/login" className="text-blue-400 underline">
                Login
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

export default Register;
