"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  if (status === "loading") {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="font-bold">Loading...</h1>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-200">
      <div className=" mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full "
        
        >
          {/* Left side - Logo and Title */}
         <div className="flex items-center justify-start w-full" >

            <Image
                  src="/health.avif"
                  alt="Logo"
                  width={60}
                  height={60}
                  className="rounded"
                />
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center justify-center h-12 w-12">
                {/* Add logo image here if needed */}
              </Link>
            </div>
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-blue-600 "
            >
              Health & Medical Service
            </Link>
          </div>

          {/* Right side - User info and logout */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <div
                  className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg"
                  style={{ border: "1px solid red" }}
                >
                  {/* User icon */}
                  <User
                    className="h-4 w-4 text-gray-500"
                    
                  />
                  <span
                    className="text-sm font-medium text-gray-700"
                    
                  >
                    {session.user?.name || session.user?.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-300 text-gray-900 rounded-xl hover:bg-gray-400 transition flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
                 {/* Show Home icon only on /chat page */}
               {pathname === "/chat"  && (
  <FaHome 
    onClick={() => router.push("/")} 
    className="text-gray-700 cursor-pointer" 
  />
)}
{pathname === "/login"  && (
  <FaHome 
    onClick={() => router.push("/")} 
    className="text-gray-700 cursor-pointer" 
  />
)}
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => router.push("/login")}
                  className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
