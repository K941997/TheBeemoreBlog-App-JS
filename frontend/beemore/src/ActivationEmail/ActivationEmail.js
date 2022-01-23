import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar/Navbar";

function ActivationEmail() {
  const { activation_token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  console.log(useParams());

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/auth/activation", {
            activation_token,
          });
          setSuccess(res.data.msg);
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  console.log(activation_token);

  return (
    <>
      <Navbar></Navbar>
      <div className="active_page">
      <section class="px-4 pb-24 mx-auto max-w-7xl">
        <header class="flex items-center justify-center py-5 mb-5 border-b border-gray-200">
          <a href="/" title="Go to Beemore Home Page">
            <span className=" text-xl font-bold uppercase text-center text-blue-600 md:text-5xl">
              Beemore
            </span>
            <span class="sr-only">Beemore Home Page</span>
          </a>
        </header>
        <div class="w-full py-6 mx-auto md:w-3/5 lg:w-2/5">
          <h1 class="mb-1 text-xl font-medium text-center text-gray-800 md:text-3xl">
            Kích hoạt thành công
          </h1>
          

          <form class="mt-8 space-y-4">
           
            <Link to="/login"
              type="submit"
              class="w-full btn btn-primary btn-lg"
              
              
            > Đăng nhập </Link>
           

          </form>

          <p class="my-5 text-xs font-medium text-center text-gray-700">
            By clicking "Send Activate Link" you agree to our
            <a href="#" class="text-blue-700 hover:text-blue-900">
              &nbsp;Terms of Service&nbsp;
            </a>
            and
            <a href="#" class="text-blue-700 hover:text-blue-900">
              &nbsp;Privacy Policy
            </a>
            .
          </p>
        </div>
      </section>
      </div>
    </>
  );
}

export default ActivationEmail;
