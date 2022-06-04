const express = require("express");
const checkAuth = require("../../middleware/check-auth");
const authCtrl = require("../../controllers/v1/auth");
const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *  name: auth
 *  description: everything about auth
 */

/**
 * @swagger
 * definitions:
 *
 *  AuthLoginModel:
 *   type: object
 *   required:
 *    - email
 *    - password
 *   properties:
 *     name:
 *       type: string
 *       description: default name admin
 *     email:
 *       type: string
 *     password:
 *       type: string
 *
 *  AuthResponseModel:
 *   type: object
 *   properties:
 *     auth:
 *      type: object
 *      properties:
 *          _id:
 *            type: string
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          role:
 *            type: string
 *          createdAt:
 *            type: string
 *          password:
 *            type: string
 *     token:
 *       type: string
 *     message:
 *       type: string
 *
 *  SuccessModel:
 *   type: object
 *   properties:
 *     message:
 *       type: string
 *
 *
 *  ErrorModel:
 *   type: object
 *   properties:
 *     message:
 *       type: string
 *
 */

/**
 * @swagger
 * /auth/getToken:
 *  post:
 *    tags: [auth]
 *    summary:  get token.
 *    description: login and get token to use it on other options, add your token to Available authorizations and enjoy
 *    parameters:
 *
 *      - in: header
 *        description: you can switch between tow languages 'ar' for Arabic and 'en' for English, note that changes in message content
 *        name: AppLanguage
 *        required: true
 *        default: "ar"
 *
 *      - in: body
 *        name: auth
 *        description: fill form to get your new TOKEN
 *        schema:
 *          type: object
 *          required:
 *            - email:
 *            - password:
 *
 *          properties:
 *            name:
 *              type: string
 *              #default: "t.taher.mean@gmail.com"
 *            email:
 *              type: string
 *              required: true
 *            password:
 *              type: string
 *              required: true
 *
 *    responses:
 *      '200':
 *        description: create successful response
 *        schema:
 *          items:
 *             $ref: '#/definitions/AuthResponseModel'
 *      '500':
 *        description: create error response
 *        schema:
 *          items:
 *             $ref: '#/definitions/ErrorModel'
 *
 */
authRouter.post("/getToken", authCtrl.getToken);

module.exports = authRouter;
