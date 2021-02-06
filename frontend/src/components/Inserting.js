import React from "react";
import Form from "@rjsf/core";
import axios from "axios";

const schema = {
  title: "Add an User:",
  description:
    "Insert the information for the new user. All fields are required",
  type: "object",
  properties: {
    "User Name": {
      type: "string",
      minLength: 3,
    },
    "User Birth Date": {
      type: "string",
    },
    "User Job Status": {
      type: "string",
      enum: ["Employed", "Unemployed"],
      enumNames: ["Employed", "Unemployed"],
    },
    "User Gender": {
      type: "string",
      enum: ["Male", "Female", "Non-Binary"],
      enumNames: ["Male", "Female", "Non-Binary"],
    },
    "User Country": {
      type: "string",
      enum: ["USA", "Colombia"],
      enumNames: ["USA", "Colombia"],
    },
  },
  required: [
    "User Name",
    "User Birth Date",
    "User Job Status",
    "User Gender",
    "User Country",
  ],
};

const uiSchema = {
  "User Gender": { "ui:widget": "radio" },
  "User Birth Date": { "ui:widget": "date" },
  "User Job Status": {
    "ui:widget": "radio",
  },
};

export default function Inserting({ token }) {
  const handlingSubmit = ({ formData }) => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };
    axios
      .post(
        "http://localhost:3010/api/v1/pratech/users/add",
        {
          user_name: formData["User Name"],
          user_birth_date: formData["User Birth Date"],
          user_gender: formData["User Gender"],
          user_country: formData["User Country"],
          user_job_status: formData["User Job Status"],
        },
        { headers: headers }
      )
      .then((r) => {
        window.alert(`${r.data.message}`);
      })
      .catch((e) => {
        window.alert(`${e.response.data.errorMessage}`);
      });
  };
  const validate = (formData, errors) => {
    const thisDate = Date.now();
    if (thisDate - Date.parse(formData["User Birth Date"]) <= 0) {
      errors["User Birth Date"].addError(`Date can't be greater than today`);
    }
    return errors;
  };
  return (
    <section>
      <div className="d-flex justify-content-around">
        <Form
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={handlingSubmit}
          validate={validate}
        >
          <input
            type="Submit"
            value="Insert User"
            className="btn btn-primary"
          />
        </Form>
      </div>
    </section>
  );
}
