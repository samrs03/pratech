import React from "react";
import Form from "@rjsf/core";
import axios from "axios";
const schema = {
  title: "Register",
  description:
    "Insert the following information in order to register to the DB",
  type: "object",
  properties: {
    "Admin Name": {
      type: "string",
      minLength: 3,
    },
    "Admin Email": {
      type: "string",
    },
    "Admin Password": {
      type: "string",
      minLength: 4,
    },
    "Confirm Admin Password": {
      type: "string",
    },
  },
  required: [
    "Admin Name",
    "Admin Email",
    "Admin Password",
    "Confirm Admin Password",
  ],
};
const uiSchema = {
  "Admin Password": {
    "ui:widget": "password",
  },
  "Confirm Admin Password": {
    "ui:widget": "password",
  },
};

export default function Register({ setFlag }) {
  const handlingGoingBack = (e) => {
    e.preventDefault();
    setFlag(false);
  };
  const handlingSubmit = async ({ formData }) => {
    axios
      .post("http://localhost:3010/api/v1/pratech/admins/add", {
        admin_name: formData["Admin Name"],
        admin_email: formData["Admin Email"],
        admin_password: formData["Confirm Admin Password"],
      })
      .then((r) => {
        window.alert(r.data.message);
        setFlag(false);
      })
      .catch((e) => {
        window.alert(`${e.response.data.errorMessage}`);
      });
  };
  const validate = (formData, errors) => {
    const emailRegex = new RegExp(/^[\S]+@[\S]+\.com$/g);
    if (!emailRegex.test(formData["Admin Email"])) {
      errors["Admin Email"].addError("Email does not have structure required");
    }
    if (formData["Admin Password"] !== formData["Confirm Admin Password"]) {
      errors["Confirm Admin Password"].addError("Password does not match");
    }
    return errors;
  };
  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">
          Pratech
        </a>
      </nav>
      <div className="d-flex justify-content-around mt-5">
        <Form
          schema={schema}
          uiSchema={uiSchema}
          validate={validate}
          onSubmit={handlingSubmit}
        >
          <input type="Submit" value="Register" className="btn btn-primary" />
        </Form>
      </div>
      <div className="d-flex justify-content-around mt-5">
        <button
          type="button"
          className="btn btn-link"
          onClick={handlingGoingBack}
        >
          Back To Login
        </button>
      </div>
    </section>
  );
}
