import axios from "axios";
import React from "react";
export default function ListChild({
  documents,
  setFlag,
  token,
  setMyToggle,
  setIdToUpdate,
}) {
  let myDocuments;
  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
  const handlingElimination = (e) => {
    e.preventDefault();
    axios
      .delete(
        `http://localhost:3010/api/v1/pratech/users/delete?_id=${e.target.id}`,
        { headers: headers }
      )
      .then((r) => {
        window.alert(r.data.message);
        setFlag(false);
      })
      .catch((e) => {
        window.alert(e.response.data.errorMessage);
      });
  };
  if (documents === undefined) {
    myDocuments = null;
  } else {
    myDocuments = documents.map((element) => (
      <tr>
        <th>{element._id}</th>
        <th>{element.user_name}</th>
        <th>{element.user_gender}</th>
        <th>{element.user_job_status}</th>
        <th>{element.user_birth_date.split('T')[0]}</th>
        <th>{element.user_country}</th>
        <th>
          <button
            type="button"
            className="btn bnt-link"
            id={element._id}
            onClick={(e) => {
              e.preventDefault();
              setIdToUpdate(e.target.id);
              setMyToggle(true);

            }}
          >
            Update
          </button>
          <button
            type="button"
            className="btn bnt-link"
            id={element._id}
            onClick={handlingElimination}
          >
            Delete
          </button>
        </th>
      </tr>
    ));
  }

  return (
    <section>
      <div className="d-flex justify-content-around">
        <table className="table table-bordered w-75">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Job Status</th>
              <th>Birth Date</th>
              <th>Country</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{myDocuments}</tbody>
        </table>
      </div>
    </section>
  );
}
