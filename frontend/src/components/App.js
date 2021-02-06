// import React, { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import useToken from "../store/store";
export default function App() {
  // function getToken () {
  //   const userToken =JSON.parse(localStorage.getItem('token'))
  //   return userToken?.token
  // }
  const { token, setToken } = useToken();

  // const [token, setToken] = useState(getToken());
  // const [authenticated,setAuthenticated] = useState(getAuthenticated())
  // console.log(authenticated)
  if (!token) {
    // return <Login setToken={setToken} setAuthenticated={setAuthenticated}/>;
    return <Login setToken={setToken} />;
  }
  // return <Dashboard token={token} setToken={setToken} setAuthenticated={setAuthenticated}/>;
  return <Dashboard setToken={setToken} token={token}/>;
}
