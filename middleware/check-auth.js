const jwt = require("jsonwebtoken");
const i18n = require("../i18n.config");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(404).json({ msg: i18n.__("NoToken") });

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    req.authData = {
      name: decodedToken.name,
      email: decodedToken.email,
      id: decodedToken.id,
    };

    next();
  } catch (e) {
    var err = new Error(i18n.__("HttpstatusUnauthorized") + " " + e);
    err.status = 404;
    next(err);
  }
};
