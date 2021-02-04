const { admins, users } = require("../db/schemas");
const config = require("config");
const JSONWEBTOKEN = require("jsonwebtoken");

const PostingAdmin = (req, res) => {
  const { admin_password, admin_name, admin_email } = req.body;
  if (admin_password && admin_name && admin_email !== undefined) {
    if (admin_password.length && admin_name.length && admin_email.length > 0) {
      admins
        .insertMany({
          admin_name: req.body.admin_name,
          admin_password: req.body.admin_password,
          admin_email: req.body.admin_email,
        })
        .then(() => {
          return res.status(200).json({
            statusCode: 200,
            message: "Information inserted successfully",
          });
        })
        .catch((e) => {
          if (e.code === 11000) {
            return res.status(400).json({
              errorCode: 400,
              errorMessage:
                "The information sent is already used by other admin",
            });
          }
          return res.status(500).json({
            errorCode: 500,
            errorMessage: "There was an error while inserting this to the DB",
          });
        });
    } else {
      return res.status(400).json({
        errorCode: 400,
        errorMessage:
          "There are missing information such as admin name, admin email or admin password",
      });
    }
  } else {
    return res.status(400).json({
      errorCode: 400,
      errorMessage:
        "There are missing information such as admin name, admin email or admin password",
    });
  }
};

const Authorization = (req, res) => {
  if (
    "admin_password" &&
    "admin_name" in req.body &&
    req.body.admin_password.length &&
    req.body.admin_password.length > 0
  ) {
    admins
      .findOne({ admin_name: req.body.admin_name })
      .then((result) => {
        if (result === null || result.length > 0) {
          return res.status(400).json({
            errorCode: 400,
            errorMessage: "Either adminname or password information is wrong",
          });
        } else {
          if (result.admin_password === req.body.admin_password) {
            const id = result._id;
            const admin_name = result.admin_name;
            const admin_password = result.admin_password;
            const payload = { id, admin_name, admin_password };
            return res.status(200).json({
              statusCode: 200,
              message: "Admin successfully authenticated",
              token: JSONWEBTOKEN.sign(payload, config.JWTSecret, {
                expiresIn: 3600,
              }),
            });
          } else {
            return res.status(400).json({
              errorCode: 400,
              errorMessage: "Either adminname or password information is wrong",
            });
          }
        }
      })
      .catch((e) => {
        console.log(e);
        return res.status(500).json({
          errorCode: 500,
          errorMessage:
            "There was an error while trying to retrieve information from DB",
        });
      });
  } else {
    return res.status(400).json({
      errorCode: 400,
      errorMessage: "Credential information is missing",
    });
  }
};

const VerifyingAuthorization = (req, res, next) => {
  if (req.headers.authorization) {
    JSONWEBTOKEN.verify(
      req.headers.authorization.split(" ")[1],
      config.JWTSecret,
      (error, decoded) => {
        if (error) {
          return res.status(401).json({
            errorCode: 401,
            errorMessage: "Token Expired",
          });
        }
        res.decoded = decoded;
        next();
      }
    );
  } else {
    return res
      .status(401)
      .json({ errorCode: 401, errorMessage: "Unauthorized" });
  }
};

const PostingUser = (req, res) => {
  const {
    user_name,
    user_gender,
    user_job_status,
    user_birth_date,
    user_country,
  } = req.body;
  if (
    user_name &&
    user_gender &&
    user_job_status &&
    user_birth_date &&
    user_country !== undefined
  ) {
    if (
      user_name.length &&
      user_job_status.length &&
      user_gender.length &&
      user_birth_date.length &&
      user_country.length > 0
    ) {
      const newDoc = new users({
        user_name: req.body.user_name,
        user_gender: req.body.user_gender,
        user_job_status: req.body.user_job_status,
        user_birth_date: req.body.user_birth_date,
        user_country: req.body.user_country,
      });
      newDoc
        .save()
        .then(() => {
          return res.status(200).json({
            statusCode: 200,
            message: "Information sent to the DB successfully",
          });
        })
        .catch((e) => {
          if (e.code === 11000) {
            return res.status(400).json({
              errorCode: 400,
              errorMessage:
                "The information sent is already used by other user",
            });
          } else if (e._message.includes("validation failed")) {
            return res.status(400).json({
              errorCode: 400,
              errorMessage:
                "The information sent does not meet the criteria for the types of variables",
            });
          }
          return res.status(500).json({
            errorCode: 500,
            errorMessage: "There was a problem while sending information to DB",
          });
        });
    } else {
      return res.status(400).json({
        errorCode: 400,
        errorMessage: "There is information missing in order to populate DB",
      });
    }
  } else {
    return res.status(400).json({
      errorCode: 400,
      errorMessage: "There is information missing in order to populate DB",
    });
  }
};

const GettingUsers = (req, res) => {
  if (req.query._id) {
    users
      .find({ _id: req.query._id })
      .then((result) => {
        return res.status(200).json({
          statusCode: 200,
          message: "Information retrieved successfully",
          data: result,
        });
      })
      .catch(() => {
        return res.status(500).json({
          errorCode: 500,
          errorMessage:
            "There was an issue while retrieving information from DB",
        });
      });
  } else {
    users
      .find()
      .then((result) => {
        return res.status(200).json({
          statusCode: 200,
          message: "Information retrieved successfully",
          data: result,
        });
      })
      .catch(() => {
        return res.status(500).json({
          errorCode: 500,
          errorMessage:
            "There was an issue while retrieving information from DB",
        });
      });
  }
};

const DeleteUser = (req, res) => {
  if (req.query._id) {
    // let _id = req.query.admin_password;
    users
      .deleteOne({ _id: req.query._id })
      .then((result) => {
        if (result.deletedCount === 0) {
          return res.status(200).json({
            statusCode: 200,
            message:
              "There was nothing deleted since there was not matching with the specified _id",
          });
        }
        return res.status(200).json({
          statusCode: 200,
          message: `the _id was deleted successfully`,
        });
      })
      .catch((e) => {
        return res.status(500).json({
          errorCode: 500,
          errorMessage:
            "There was an error while retrieving the information from the DB",
        });
      });
  } else {
    return res.status(400).json({
      errorCode: 400,
      errorMessage: "There correct information was not sent in the request",
    });
  }
};

const PuttingUser = (req, res) => {
  const {
    _id,
    user_name,
    user_gender,
    user_job_status,
    user_birth_date,
    user_country,
  } = req.body;
  if (
    _id &&
    user_name &&
    user_gender &&
    user_job_status &&
    user_birth_date &&
    user_country !== undefined
  ) {
    if (
      _id.length &&
      user_name.length &&
      user_gender.length &&
      user_job_status.length &&
      user_birth_date.length &&
      user_country.length > 0
    ) {
      users
        .updateOne(
          { _id: req.body._id },
          {
            user_name: req.body.user_name,
            user_gender: req.body.user_gender,
            user_job_status: req.body.user_job_status,
            user_birth_date: req.body.user_birth_date,
            user_country: req.body.user_country,
          }
        )
        .then((r) => {
          if (r.nModified === 0) {
            return res.status(200).json({
              status: 200,
              message:
                "There was not match with the _id provided, no documents updated",
            });
          } else {
            return res.status(200).json({
              status: 200,
              message: `The documents updated are ${r.nModified}`,
            });
          }
        })
        .catch((e) => {
          console.log(e);
          return res.status(500).json({
            errorCode: 500,
            errorMessage: "information could not be updated",
          });
        });
    } else {
      return res.status(400).json({
        errorCode: 400,
        errorMessage: "There is information missing in order to populate DB",
      });
    }
  } else {
    return res.status(400).json({
      errorCode: 400,
      errorMessage: "There is information missing in order to populate DB here",
    });
  }
};

module.exports = {
  PostingAdmin,
  Authorization,
  VerifyingAuthorization,
  PostingUser,
  GettingUsers,
  DeleteUser,
  PuttingUser,
};
