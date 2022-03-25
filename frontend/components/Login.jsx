import React, { useState } from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Container from "@mui/material/Container";
import axios from "axios";

const Login = ({ state }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const requestLogin = async () => {
    console.log(username, password);

    try {
      const response = await axios.post(
        "/api/login",
        {},
        { auth: { username, password } }
      );

      if (response.status === 200) {
        const payload = response.data;
        state.login(username, payload.token);
      } else {
        //Login failed
        console.log("log", "login failed");
      }
    } catch (error) {
      console.log("catch", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <div className="container">
        <div>
          <h2>LOGIN</h2>
        </div>
        <form onSubmit={ev => { ev.preventDefault(); requestLogin(); }}>
          <div>
            <InputLabel htmlFor="username" type="text">
              Username
            </InputLabel>
            <Input id="username" value={username} onChange={ev => setUsername(ev.target.value)} />
          </div>

          <div>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" value={password} onChange={ev => setPassword(ev.target.value)} />
          </div>
          <div>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Login;
