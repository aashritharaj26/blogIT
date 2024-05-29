import './Signup.css'
import { useForm } from "react-hook-form";
import axios from "axios";
import {  Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [err, setErr] = useState("");
  let [state, setState] = useState(false);
  let [signupSuccess, setSignupSuccess] = useState(false);
let navigate=useNavigate()
  async function onSignUpFormSubmit(userObj) {
    if (userObj.userType==='user'){
      let res = await axios.post("http://localhost:4000/user-api/register", userObj);
      console.log(res);
       console.log(userObj)
       if (res.status === 201 || res.data.message==='user created') {
         setState(true);
         setSignupSuccess(true);
         setErr("");
         navigate('/signin')
       } else {
         setErr(res.data.message);
       }
    }
   else if(userObj.userType==='author'){
    let res = await axios.post("http://localhost:4000/author-api/register", userObj);
    console.log(res);
     console.log(userObj)
     if (res.status === 201 ||  res.data.message==='user created') {
       setState(true);
       setSignupSuccess(true);
       setErr("");
       navigate('/signin')
     } else {
       setErr(res.data.message);
     }
   }
  }

  return (
    <div className="mt-5">
      <div className="row justify-content-center mt-3 mb-4">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card box ">
            <div className="card-title text-center border-bottom">
              {signupSuccess === true ? (
                <div>
                  <p className="lead fs-3 text-center display-4 text-success">
                    User registration success
                  </p>
                  <p className="text-center fs-6 text-secondary">
                    Proceed to <Link to="/signin">Login</Link>
                  </p>
                  <p className="text-center fs-6 text-secondary">
                    Back to <Link to="/">Home</Link>
                  </p>
                </div>
              ) : (
                <h2 className="p-3">Signup</h2>
              )}
            </div>
            <div className="card-body">
              {err.length !== 0 && (
                <p className="lead text-center text-danger">{err}</p>
              )}

              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                {/* radio */}
                <div className="mb-4">
                  <label
                    htmlFor="user"
                    className="form-check-label me-3 text-primary"
                    style={{
                      fontSize: "1.2rem",
                
                    }}
                  >
                    Register as
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input "
                      id="author"
                      value="author"
                      {...register("userType", { required:true,disabled: state })}
                    />
                    <label
                      htmlFor="author"
                      className="form-check-label"
                      style={{ color: "var(--crimson)" }}
                    >
                      Author
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="user"
                      value="user"
                      {...register("userType", {required:true, disabled: state })}
                    />
                    <label
                      htmlFor="user"
                      className="form-check-label"
                      style={{ color: "var(--crimson)" }}
                    >
                      User
                    </label>
                  </div>
                </div>
                {errors.userType?.type === "required" && (
            <p className="text-danger">please select a User type</p>
          )}
                <div className="mb-4">
                  <label htmlFor="username" className="form-label fw-bold">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    {...register("username", { 
                      required: true,
                      minLength: 4,
                      maxLength: 10,
                      disabled: state })}
                  />
              {errors.username?.type === "required" && (
                <p className="text-danger">User name is required</p>
              )}
              {errors.username?.type === "minLength" && (
                <p className="text-danger">Min length should be 4</p>
              )}
              {errors.username?.type === "maxLength" && (
                <p className="text-danger">Max length should be 10</p>
              )}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register("password", { required:true,disabled: state })}
                  />
                   {errors.password?.type === "required" && (
                <p className="text-danger">Please Enter Password</p>
              )}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    {...register("email", {required:true, disabled: state })}
                  />
                   {errors.email?.type === "required" && (
                <p className="text-danger">Please Enter email</p>
              )}
                </div>

                <div className="text-end">
                  <button type="submit" className="text-light btn btn-success" disabled={state}>
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;