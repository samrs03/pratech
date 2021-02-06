import React from "react";
import Form from "@rjsf/core";
import axios from "axios";

export default function Update({
  idToUpdate,
  setMyToggle,
  setFlag,
  document,
  token,
}) {
  const theDocument = document.filter((element) => {
    if (element._id === parseInt(idToUpdate)) {
      return element;
    }
  });
  const schema = {
    title: "Update an User:",
    description:
      "Update the fields that need to be updated. All fields are required",
    type: "object",
    properties: {
      "User Name": {
        type: "string",
        minLength: 3,
        default: theDocument[0].user_name,
      },
      "User Birth Date": {
        type: "string",
        "ui:widget": "date",
        default: theDocument[0].user_birth_date.split("T")[0],
      },
      "User Job Status": {
        type: "string",
        enum: ["Employed", "Unemployed"],
        enumNames: ["Employed", "Unemployed"],
        default: theDocument[0].user_job_status,
      },
      "User Gender": {
        type: "string",
        enum: ["Male", "Female", "Non-Binary"],
        enumNames: ["Male", "Female", "Non-Binary"],
        default: theDocument[0].user_gender,
      },
      "User Country": {
        type: "string",
        enum: ["USA", "Colombia"],
        enumNames: ["USA", "Colombia"],
        default: theDocument[0].user_country,
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
  const validate = (formData, errors) => {
    const thisDate = Date.now();
    if (thisDate - Date.parse(formData["User Birth Date"]) <= 0) {
      errors["User Birth Date"].addError(`Date can't be greater than today`);
    }
    return errors;
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const handlingSubmit = ({ formData }) => {
    axios
      .put(
        "http://localhost:3010/api/v1/pratech/users/update",
        {
          _id: idToUpdate,
          user_name: formData["User Name"],
          user_birth_date: formData["User Birth Date"],
          user_job_status: formData["User Job Status"],
          user_country: formData["User Gender"],
          user_gender: formData["User Country"],
        },
        { headers: headers }
      )
      .then((r) => {
        window.alert(r.data.message);
        setFlag(false);
        setMyToggle(false);
      })
      .catch((e) => {
        window.alert(e.response.data.errorMessage);
      });
  };
  return (
    <section>
      <div className="d-flex justify-content-around">
        <Form
          schema={schema}
          uiSchema={uiSchema}
          validate={validate}
          onSubmit={handlingSubmit}
        >
          <input type="submit" value="Update" className="btn btn-primary" />
        </Form>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setFlag(true);
          setMyToggle(false);
        }}
        className="btn btn-link"
      >
        Back
      </button>
    </section>
  );
}
