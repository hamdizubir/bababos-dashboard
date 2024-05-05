import { Button, TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import { bababosImage } from "../../assets/logo";
import { useNavigate } from "react-router-dom";

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email.");
      return;
    }

    setError("");
    localStorage.setItem("isLoggedIn", true);

    return navigate("/dashboard/products", {
      replace: true,
    });
  };

  return (
    <Stack
      flex={1}
      height={"100dvh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Stack flexDirection={"column"} gap={2} width={"30%"}>
        <img src={bababosImage} alt="bababosImage" />
        <Typography fontSize={24}>Dashboard</Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </Stack>
    </Stack>
  );
}

export default LoginPage;
