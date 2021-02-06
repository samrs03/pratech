import React, { useState } from "react";
import Register from "./Register";
import Form from "@rjsf/core";
import axios from "axios";
const schema = {
  title: "Login",
  description:
    "Insert your credentials in order to login to the APP. Both files are required.",
  type: "object",
  properties: {
    Username: {
      type: "string",
    },
    Password: {
      type: "string",
    },
  },
  required: ["Username", "Password"],
};
const uiSchema = {
  Password: {
    "ui:widget": "password",
  },
};
export default function Login({ setToken, setAuthenticated }) {
  const [flag, setFlag] = useState(false);
  const handlingSubmit = ({ formData }) => {
    axios
      .post("http://localhost:3010/api/v1/pratech/login", {
        admin_name: formData.Username,
        admin_password: formData.Password,
      })
      .then((r) => {
        setToken(r.data.token);
        setAuthenticated(true);
      })
      .catch((e) => {
        window.alert(`${e.response.data.errorMessage}`);
      });
  };
  const handlingRegister = (e) => {
    e.preventDefault();
    setFlag(true);
  };
  if (!flag) {
    return (
      <section>
         <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="/">
            Pratech
          </a>
        </nav>
        <div className="d-flex justify-content-around mt-5">
          <Form schema={schema} uiSchema={uiSchema} onSubmit={handlingSubmit}>
            <input type="submit" value="Login" className="btn btn-primary" />
          </Form>
        </div>
        <div className="d-flex justify-content-around ml-5">
          <p>
            Not an Admin yet?
            <button
              type="button"
              className="btn btn-link"
              onClick={(e) => {
                handlingRegister(e);
              }}
            >
              Register
            </button>
          </p>
        </div>
      </section>
    );
  }
  return <Register setFlag={setFlag} />;
}
