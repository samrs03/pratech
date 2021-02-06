import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Listing from "./Listing";
import Inserting from "./Inserting";
import NotFound from "./NotFound";
export default function Dashboard({ setAuthenticated, setToken, token }) {
  const loggingOut = (e) => {
    e.preventDefault();
    setToken();
    setAuthenticated(false);
  };
  return (
    <BrowserRouter>
      <section>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="/">
            Pratech
          </a>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/list">
                <button
                  type="button"
                  className="btn btn-link nav-link"
                >
                  Listing Users
                </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/add">
                <button
                  type="button"
                  className="btn btn-link nav-link"

                >
                  Add Users
                </button>
                </Link>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-link nav-link"
                  onClick={loggingOut}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </section>
      <Switch>
        <Route path="/list">
          <Listing token={token} />
        </Route>
        <Route path="/add">
          <Inserting token={token}/>
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
