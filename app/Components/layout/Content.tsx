'use client'
import React from 'react';
import Image from "next/image";
import { useState, FormEvent } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

export const Content = () => {

     const logos = [
    { icon: <FaGithub size={15} color="#000" />, name: "GitHub" },
    { icon: <SiOpenai size={15} color="#27a0d3" />, name: "ChatGPT" },
    { icon: <FcGoogle size={15} />, name: "Google" },
  ];
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // important
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      // Sign-in successful → go to chat page (or home)
      router.push("/login"); // 👈 navigate to your protected page
    }
  } catch (err) {
    setError("An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      style={{
        borderRadius: "50px",
        width: "800px",
        height: "430px",
        background: "linear-gradient(to right, #ffffff 50%, #27a0d3 50%)",
        display: "flex",
        alignItems:"center",
        justifyContent:'center',
        marginTop:"40px",
        overflow: "hidden", // ensures border-radius is applied to children
  
    }}
    >
      {/* Left side */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap:"20px",
          flexDirection:"column"
        }}
      >
        <h1 
        style={{color: "black",
            fontWeight:'bold',
            fontSize:"20px",
        }}>Sign in</h1>

        <div className="flex gap-6">
          {logos.map((logo , index)=>(
            <div key={index}
                 style={{border:"1px solid #27a0d3",borderRadius:"50%",padding:"5px"}}
                 className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
            >
              {logo.icon}
            </div>
          ))}
        </div>

        <h1 style={{color:"gray",fontSize:"13px",cursor:"pointer"}}>
          Or Sign in using E-Mail Address
        </h1>

        {/* Form and error wrapper */}
        <div className="flex flex-col justify-center items-center px-4 sm:px-6 py-4 sm:py-6 bg-white w-full">
        
          {/* Error Message */}
          {error && (
            <div className="mb-2 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded text-sm w-full">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {/* Form */}
          <form className="space-y-2 w-full" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
             
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-3xl placeholder-gray-400 focus:outline-none transition duration-200 text-sm text-black"
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                  e.target.style.borderColor = "#b12222";
                  e.target.style.boxShadow = "0 0 0 3px rgba(177, 34, 34, 0.1)";
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "0 0 0 0 transparent";
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-3xl placeholder-gray-400 focus:outline-none transition duration-200 text-sm"
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                  e.target.style.borderColor = "#b12222";
                  e.target.style.boxShadow = "0 0 0 3px rgba(177, 34, 34, 0.1)";
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "0 0 0 0 transparent";
                }}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-center">
              <Link 
                href="#" 
                className="text-xs sm:text-sm font-medium transition duration-200"
                style={{ color: "gray" }}
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
            <button   
              type="submit"
              disabled={loading}
              className="w-40 py-2 px-2 rounded-2xl font-semibold text-white text-sm transition duration-200 flex items-center justify-center mt-6 hover:shadow-lg"
              style={{
                backgroundColor: loading ? "#20566dff" : "#0a97d3ff",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.8 : 1
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "SIGN IN"
              )}
            </button></div>
          </form>

        </div> {/* form wrapper end */}
      </div> {/* left side end */}

      {/* Right side */}
      <div
        style={{
         flex:1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
         flexDirection:'column'
        }}
      >
         <h1 style={{
         fontWeight:"bold",
         fontSize:"25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          padding:"10px"
        }}>Create Account! </h1>
       <h1  style={{
         
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
           fontSize:"13px",
        }}>Sign up if you still dont't have an account</h1> 

        <button   onClick={() => router.push("/register")}
        className="bg-transparent hover:bg-[#20566dff]"
        style={{border:"1px solid white",borderRadius:"20px",
            padding:"5px 20px",color:"white",marginTop:"20px",cursor:'pointer'
        }}>
            SIGN UP
        </button>
      </div>
    </div>
  );
};




 