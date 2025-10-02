"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) setError(data.error);
    else alert("Registered successfully!");
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 border rounded-lg">
      <h1 className="text-2xl mb-4">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        <button className="w-full bg-blue-500 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}
