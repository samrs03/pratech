import React, { useState } from "react";
import ListChild from "./ListChild";
import axios from "axios";
import Update from "./Update";
export default function Listing({ token }) {
  const [_id, set_Id] = useState("");
  const [idToUpdate, setIdToUpdate] = useState("");
  const [documents, setDocuments] = useState();
  const [myToggle, setMyToggle] = useState(false);
  const [flag, setFlag] = useState(false);
  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
  const GettingDocuments = () => {
    axios
      .get(`http://localhost:3010/api/v1/pratech/users/list?_id=${_id}`, {
        headers: headers,
      })
      .then((r) => {
        setDocuments(r.data.data);
      })
      .catch((e) => {
        window.alert(e.response.data.errorMessage);
      });
  };

  const handlingSubmit = (e) => {
    e.preventDefault();
    GettingDocuments();
  };
  const handlingChange = (e) => {
    e.preventDefault();
    set_Id(e.target.value);
  };
  if (!flag) {
    GettingDocuments();
    setFlag(true);
  }

  if (!myToggle) {
    return (
      <section>
        <div className="d-flex justify-content-around m-5">
          <form onSubmit={handlingSubmit}>
            <label className="mr-2">
              ID to filter by:
              <br />
              <input type="text" onChange={handlingChange} />
            </label>
            <input type="submit" value="search" className="btn btn-primary" />
          </form>
          <input
            type="submit"
            value="reset"
            className="btn btn-primary text-white"
            onClick={(e) => {
              e.preventDefault();
              set_Id("");
              GettingDocuments();
            }}
          />
        </div>
        <ListChild
          documents={documents}
          token={token}
          setFlag={setFlag}
          setMyToggle={setMyToggle}
          setIdToUpdate={setIdToUpdate}
        />
      </section>
    );
  } else {
    return (
      <Update
        idToUpdate={idToUpdate}
        setMyToggle={setMyToggle}
        setFlag={setFlag}
        document={documents}
        token={token}
      />
    );
  }
}
