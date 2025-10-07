"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// ✅ MUI components
import { Typography, Container } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);

  console.log('entr in the app')

  useEffect(() => {
    if (token) {
      // ✅ Token exists → redirect to dashboard
      router.replace("/dashboard");
    } else {
      // ❌ No token → redirect to login
      router.replace("/login");
    }
  }, [token]);

  // ✅ Optional loading screen
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold" mb={4}>
        Welcome to POS System
      </Typography>

      <Typography variant="h6" color="textSecondary">
        Redirecting...
      </Typography>
    </Container>
  );
}
