const PORT = process.env.PORT || 5000;

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const i18n = require("./i18n.config");
const app = express();

const authRouter = require("./router/v1/auth");
const bookRouter = require("./router/v1/book");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    definition: {
        info: {
            description: "This is a sample Petstore server.  You can find.\n",
            version: "1.0.0",
            title: "TODO nodeJS Swagger",
        },
        host: "localhost:5000",
        basePath: "/api/v1/",
        schemes: ["http", "https"],
        securityDefinitions: {
            authorization: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
            },
        },
    },
    apis: ["./router/v1/*.js"],
};

const sweggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(sweggerDocs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, AppLanguage"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use(async(req, res, next) => {
    await i18n.setLocale(req.headers.applanguage || "en");
    next();
});

mongoose
    .connect(
        ".................../nodejs-swagger", { useNewUrlParser: true }
    )
    .then(() => {
        console.log("Connected To Database global .......:::: DB");
    })
    .catch(() => {
        console.log("Connection Failed...:::: DB");

        mongoose
            .connect("mongodb://127.0.0.1:27017/nodejs-swagger", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log("Connected To Database local school.......:::: DB");
            })
            .catch(() => {
                console.log("Connection Failed  global && local:::: DB");
            });
    });

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500).json({
        res: res.locals,
    });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));