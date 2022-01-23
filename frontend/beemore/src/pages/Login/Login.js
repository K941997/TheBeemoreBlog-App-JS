import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useRef, useContext } from "react";
import { Context } from "../../context/Context";

export default function Login() {
  //!Axios Connect FrontendBackend - Auth Login - Connect authRoutes /api/auth/login:
  const accountRef = useRef(); //dùng lưu 1 lần vào DOM thật
  const passwordRef = useRef();

  //!Context API:
  const { dispatch, isFetching } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState(null);

  //!handleSubmit:
  const handleSubmit = async (e) => {
    dispatch({ type: "LOGIN_START" });

    try {
      e.preventDefault();

      setErrorMessage(false);

      const res = await axios.post("/auth/login", {
        // /api/auth/login
        account: accountRef.current.value,
        password: passwordRef.current.value,
      });

      console.log(res);

      //!token JWT:
      const token = res.data.access_token;
      console.log(res.data.access_token);
      localStorage.setItem("token", token);

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      window.location.replace("/");
    } catch (err) {
      setErrorMessage(true);

      dispatch({ type: "LOGIN_FAIL" });
    }
  };

  return (
    <>
      <section className="h-full content-center ">
        <div className="px-4 py-20 mx-auto max-w-7xl ">
          <a
            href="/"
            title="Beemore Home Page"
            className="flex items-center justify-start sm:justify-center"
          >
            <a href="/" title="Go to Beemore Home Page">
              <span className=" text-xl font-bold uppercase text-center text-blue-600 md:text-5xl">
                Beemore
              </span>

              <span className="sr-only">Beemore Home Page</span>
            </a>
            <span className="sr-only">Beemore</span>
          </a>

          <div className="w-full px-0 pt-5 pb-6 mx-auto mt-4 mb-0 space-y-4 bg-transparent border-0 border-gray-200 rounded-lg md:bg-white md:border sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 md:px-6 sm:mt-8 sm:mb-5">
            <h1 className="mb-5 text-xl font-light text-left text-gray-800 sm:text-center">
              Log in to your account
            </h1>
            <form className="pb-1 space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="block mb-1 text-xs font-medium text-gray-700">
                  Your Email
                </span>
                <input
                  className="form-input"
                  type="email"
                  placeholder="Ex. james@bond.com"
                  inputmode="email"
                  required
                  ref={accountRef}
                />
              </label>
              <label className="block">
                <span className="block mb-1 text-xs font-medium text-gray-700">
                  Your Password
                </span>
                <input
                  className="form-input"
                  type="password"
                  placeholder="••••••••"
                  required
                  ref={passwordRef}
                />
              </label>

              {/* Error Text */}
              {errorMessage && (
                <span
                  className="error"
                  style={{
                    fontSize: "12px",
                    marginTop: "20px",
                    color: "red",
                  }}
                >
                  Đăng nhập thất bại
                </span>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="block ml-2 text-xs font-medium text-gray-700 cursor-pointer">
                    Remember me
                  </span>
                </label>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Login"
                />
              </div>
            </form>
            <div class="relative my-4">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 text-neutral-600 bg-white">
                  {" "}
                  Or continue with{" "}
                </span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="
                    w-full
                    items-center
                    block
                    px-10
                    py-3.5
                    text-base
                    font-medium
                    text-center text-blue-600
                    transition
                    duration-500
                    ease-in-out
                    transform
                    border-2 border-white
                    shadow-md
                    rounded-xl
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-gray-500
                  "
              >
                <div class="flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                  <span class="ml-4"> Log in with Google</span>
                </div>
              </button>
            </div>
          </div>
          <p className="mb-4 space-y-2 text-sm text-left text-gray-600 sm:text-center sm:space-y-0">
            <Link
              to="/forgot_password"
              href="#"
              className="w-full btn btn-sm btn-link sm:w-auto"
            >
              Forgot password
            </Link>
            <Link
              to="/register"
              className="w-full btn btn-sm btn-link sm:w-auto"
            >
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
