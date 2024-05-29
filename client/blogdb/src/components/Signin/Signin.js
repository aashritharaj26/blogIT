import "./Signin.css";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { userAuthorLoginThunk } from "../../redux/slices/userAuthorSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { isPending, currentUser, loginUserStatus, errorOccurred, errMsg } =
    useSelector((state) => state.userAuthorLoginReducer);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  function onSignInFormSubmit(userCred) {
    console.log(userCred)
    dispatch(userAuthorLoginThunk(userCred));
  
  }

  useEffect(() => {
    if (loginUserStatus) {
      console.log(currentUser)
      if (currentUser.userType === "user") {
        navigate("/user-profile");
      }
      if (currentUser.userType === "author") {
        navigate("/author-profile");
      }
    }
  }, [loginUserStatus]);

  return (
    <div className="mt-5" >
      <div className="row justify-content-center mt-3 mb-5" >
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card box">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Signin</h2>
            </div>
            <div className="card-body">
              {/* invalid cred err */}
              {errorOccurred === true && (
                <p className="text-center" style={{ color: "red" }}>
                  {errMsg}
                </p>
              )}
              <form onSubmit={handleSubmit(onSignInFormSubmit)}>
                {/* radio */}
                <div className="mb-4 ">
                  <label
                    htmlFor="user"
                    className="form-check-label me-3 text-primary"
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--light-dark-grey)",
                    }}
                  >
                    Login as
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="author"
                      value="author"
                      {...register("userType",{required:true})}
                    />
    
                    <label htmlFor="author" className="form-check-label">
                      Author
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="user"
                      value="user"
                      {...register("userType",{required:true})}
                    />
      
                    <label htmlFor="user" className="form-check-label">
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
                    {...register("username")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register("password")}
                  />
                </div>

                <div className="text-end fw-bold">
                  <button type="submit" className="btn btn-success">
                    Login
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

export default Signin;