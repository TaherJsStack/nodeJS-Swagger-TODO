const Auth = require("../../models/v1/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const i18n = require("../../i18n.config");

/*
 * save new user
 * get token for new user assigned
 */
exports.getToken = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const newAuth = new Auth(req.body);
        newAuth.password = hash;

        console.log('getToken ====================>', newAuth)
        newAuth
            .save()
            .then((auth) => {
                const token = jwt.sign({
                        id: auth._id,
                        name: auth.name,
                        email: auth.email,
                        role: auth.role,
                    },
                    "secret_this_should_be_longer", { expiresIn: "5h" }
                );
                res.status(201).json({
                    auth,
                    token: "Bearer " + token,
                    message: i18n.__("DoneSuccessfully"),
                });
            })
            .catch((err) => {
                let errMessage;
                if (
                    err.errors.email.path == "email" &&
                    err.errors.email.kind == "required"
                ) {
                    errMessage = i18n.__("EnterEmail");
                } else if (
                    err.errors.email.path == "email" &&
                    err.errors.email.kind == "unique"
                ) {
                    errMessage = i18n.__("EmailAlreadyUsed");
                } else {
                    errMessage = i18n.__("Error");
                }

                res.status(500).json({
                    message: errMessage,
                });
            });
    });
};