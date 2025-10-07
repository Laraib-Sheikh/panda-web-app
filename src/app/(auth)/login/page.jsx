"use client";

import { useState } from "react";
import { useDispatch } from "react-redux"; // ✅ import useDispatch
import { setCredentials } from "@/app/features/auth/authSlice"; // ✅ import your slice actions
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

export default function LoginPage() {
  const dispatch = useDispatch(); // ✅ create dispatch
  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        // ✅ dispatch user and token to Redux
        dispatch(setCredentials({ user: data.user, token: data.token }));

        // Optional: save token to localStorage if "Remember me" is checked
        if (remember && data.token) {
          localStorage.setItem("token", data.token);
        }

        alert("Login successful!");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={10}
      p={4}
      borderRadius={2}
      boxShadow={3}
      border={1}
      borderColor="grey.300"
    >
      <Typography variant="h4" mb={3}>
        Login
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          margin="normal"
          required
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
          }
          label="Remember me"
          sx={{ mt: 1 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
}
