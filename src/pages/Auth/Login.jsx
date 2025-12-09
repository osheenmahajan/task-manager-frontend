import React from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/layouts/Inputs/Input';
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from 'react';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext) 
  const navigate = useNavigate();

  //Handle Login form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login attempt with email:", email);

    if (!email) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    setError(null);

    //Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      console.log("Login response:", response);

      const { token, role } = response.data;

      if(token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        updateUser(response.data)

        //Redirect based on role
        if(role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.code === "ECONNABORTED") {
        setError("Request timed out. Please check your connection and try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  
  return <AuthLayout>
    <div className="flex flex-col justify-center w-full h-[calc(100vh-3rem)]">
      <div className="flex flex-col justify-center items-start w-full max-w-md pl-4 md:pl-0">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin} className="w-full">
          <Input 
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input 
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
          Dont't have an account?{" "}
          <Link className="font-medium text-primary underline" to="/sign-up">
            SignUp
          </Link>

          </p>
        </form>
      </div>
    </div>
  </AuthLayout>;
};

export default login
