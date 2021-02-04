const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const functions = require("../functions/functions");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.post("/api/v1/pratech/admins/add", functions.PostingAdmin);
app.post("/api/v1/pratech/login", functions.Authorization);
app.use(functions.VerifyingAuthorization);
app.post('/api/v1/pratech/users/add',functions.PostingUser)
app.get("/api/v1/pratech/users/list/", functions.GettingUsers);
app.delete('/api/v1/pratech/users/delete',functions.DeleteUser);
app.put('/api/v1/pratech/users/update',functions.PuttingUser);

mongoose
  .connect("mongodb://localhost:27017/pratech", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(config.port, () => {
      console.log(`App is running and listening on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.log(`The DB could not be initialized, the error is ${error}`);
  });
