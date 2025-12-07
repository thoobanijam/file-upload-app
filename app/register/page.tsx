"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    firstName: "",
    lastName: "",
    country: "",
    currency: "",
    phone: "",
    agree: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // ✅ FIXED handleChange (no red line)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;

    const isCheckbox =
      target instanceof HTMLInputElement && target.type === "checkbox";

    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? target.checked : value,
    }));
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    setLoading(false);
    return;
  }

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        country: formData.country,
        currency: formData.currency,
        phone: formData.phone,
      }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Something went wrong");

    // success handling
    setSuccess(true);
    router.push("/login?message=Registration successful. Please login.");
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "150vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        marginTop: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          backgroundColor: "white",
          borderRadius: "25px",
          overflow: "hidden",
          height: "120vh",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ flex: 1, padding: "40px", width: "100%" }}>
          <div
            style={{ padding: "20px" }}
            className="bg-white rounded-2xl shadow-lg w-full text-black"
          >
            <h1 className="text-2xl font-bold mb-6">Register</h1>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  placeholder="Enter username"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-semibold">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none"
                    placeholder="First Name"
                  />
                </div>

                <div className="flex-1">
                  <label className="text-xs font-semibold">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-semibold">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  >
                    <option value="">Select Country</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="India">India</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                    <option value="UAE">UAE</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="text-xs font-semibold">Currency</label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  >
                    <option value="">Select Currency</option>
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="AUD">AUD</option>
                    <option value="CAD">CAD</option>
                    <option value="INR">INR</option>
                    <option value="JPY">JPY</option>
                    <option value="CNY">CNY</option>
                    <option value="AED">AED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="flex items-center text-xs mt-2">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="mr-2"
                />
                I agree to the{" "}
                <span className="underline">terms & conditions</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-40 bg-blue-600 text-white py-2 mt-4 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {loading ? "Processing..." : "Open Account"}
              </button>

              <p className="text-xs text-center mt-2">
                Already have an account?{" "}
                <span className="underline cursor-pointer">Sign In</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
