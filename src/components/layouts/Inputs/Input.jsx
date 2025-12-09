import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({value, onChange, label, placeholder, type}) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box">
        <input
        type={type == 'password' ? showPassword ? 'text' : 'password' : type} 
        placeholder={placeholder}
        className="w-full bg-white rounded-md shadow-sm border border-slate-200 px-4 py-3 pr-10 outline-none relative"
        value = {value}
        onChange={(e) => onChange(e)} />

        {type == "password" && (
            <>
            {showPassword ? (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                  <FaRegEye
                    size={22}
                    className="text-primary"
                    onClick={() => toggleShowPassword()}
                  />
                </div>
            ) : (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                  <FaRegEyeSlash
                    size={22}
                    className="text-slate-400"
                    onClick={() => toggleShowPassword()}
                  />
                </div>
            )}
            </>
        )}
      </div>
    </div>
  )
}

export default Input
