import React, { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function App() {
  const [token, setToken] = useState();

  //poner esto en fallllllllllllllllllse!
  const [authenticated,setAuthenticated] = useState(false)
  if (!authenticated) {
    return <Login setToken={setToken} setAuthenticated={setAuthenticated}/>;
  }
  return <Dashboard token={token} setToken={setToken} setAuthenticated={setAuthenticated}/>;
}
