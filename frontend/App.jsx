import React, { useState } from "react";
import Container from "@mui/material/Container";
import Login from "./components/Login";
import Search from "./components/Search";

const App = () => {
  const [state, setState] = useState({
    username: null,
    token: null,
    login: (username, token) => {
      setState({
        ...state,
        username,
        token
      });
    }
  });

  return (
    <Container maxWidth="sm">
      <div className="container">
        <h1>Welcome !</h1>
      </div>
      {state.token !== null
        ? <Search state={state} />
        : <Login state={state} />
      }
    </Container>
  );
};

export default App;
