const express = require("express");
const checkAuth = require("../../middleware/check-auth");
const bookCtrl = require("../../controllers/v1/book");
const bookRouter = express.Router();

/**
 * @swagger
 * tags:
 *  name: book
 *  description: everything about book list
 */

/**
 * @swagger
 *  definitions:
 *   createNewBook:
 *     type: object
 *     required:
 *       - title
 *       - description
 *       - price
 *       - authorName
 *       - authorEmail
 *       - authorPhone
 *       - authorGender
 *       - authorBirthDate
 *       - activeAccount
 *     properties:
 *       title:
 *         type: string
 *         minimum: 6
 *         maximum: 12
 *       description:
 *         type: string
 *         minimum: 16
 *         maximum: 42
 *       price:
 *         type: integer
 *       authorName:
 *         type: string
 *         minimum: 4
 *         maximum: 12
 *       authorEmail:
 *         type: string
 *         default: "t.taher.mean@gmail.com"
 *       authorPhone:
 *         type: integer
 *       authorGender:
 *         type: string
 *         enum: [male, female]
 *       authorBirthDate:
 *         type: string
 *         format: date
 *       activeAccount:
 *         type: boolean
 *         allowEmptyValue: true
 */

/**
 * @swagger
 * /book:
 *  post:
 *    tags: [book]
 *    summary: Create a new book.
 *    description: Use to create new book
 *    security:
 *     - authorization: []
 *    parameters:
 *      - in: header
 *        description: you can switch between tow languages 'ar' for Arabic and 'en' for English, note that changes in message content
 *        name: AppLanguage
 *        required: true
 *        default: "ar"
 *
 *      - in: body
 *        name: book
 *        description: create book
 *        schema:
 *          type: object
 *          required:
 *              - title
 *              - description
 *              - price
 *              - authorName
 *              - authorEmail
 *              - authorPhone
 *              - authorGender
 *              - authorBirthDate
 * 
 *          properties:
 *            title:
 *              type: string
 *              minimum: 6
 *              maximum: 12
 *            description:
 *              type: string
 *              minimum: 16
 *              maximum: 42
 *            price:
 *              type: integer
 *            authorName:
 *              type: string
 *              minimum: 4
 *              maximum: 12
 *            authorEmail:
 *              type: string
 *              default: "t.taher.mean@gmail.com"
 *            authorPhone:
 *               type: integer
 *               #minimum: 4
 *               #maximum: 12
 *            authorGender:
 *               type: string
 *               enum: [male, female]
 *            authorBirthDate:
 *               type: string
 *               format: date
 *            activeAccount:
 *               type: boolean
 *               allowEmptyValue: true
 *
 *
 *    responses:
 *      '404':
 *        description: no token
 *        schema:
 *          items:
 *             $ref: '#/definitions/ErrorModel'
 *
 *      '200':
 *        description: create book successful response
 *        schema:
 *          items:
 *             $ref: '#/definitions/SuccessModel'
 *
 *      '500':
 *        description: create book error response
 *        schema:
 *          items:
 *             $ref: '#/definitions/ErrorModel'
 */
bookRouter.post("", checkAuth, bookCtrl.saveNew);

/**
 * @swagger
 * /book/{id}:
 *  put:
 *    tags: [book]
 *    summary: updateOne.
 *    description: Use to get book updateOne
 *    security:
 *     - authorization: []
 *
 *    parameters:
 *      - in: header
 *        description: you can switch between tow languages 'ar' for Arabic and 'en' for English, note that changes in message content
 *        name: AppLanguage
 *        required: true
 *        default: "ar"
 *
 *      - in: path
 *        name: id
 *        description: update book
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - in: body
 *        name: book
 *        description: create book
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *              minimum: 6
 *              maximum: 12
 *            description:
 *              type: string
 *              minimum: 16
 *              maximum: 42
 *            price:
 *              type: integer
 *            authorName:
 *              type: string
 *              minimum: 4
 *              maximum: 12
 *            authorEmail:
 *              type: string
 *              default: "t.taher.mean@gmail.com"
 *            authorPhone:
 *               type: integer
 *            authorGender:
 *               type: string
 *               enum: [male, female]
 *            authorBirthDate:
 *               type: string
 *               format: date
 *            activeAccount:
 *               type: boolean
 *               allowEmptyValue: true
 *
 *
 *    responses:
 *      '404':
 *        description: no token
 *        schema:
 *          items:
 *             $ref: '#/definitions/ErrorModel'
 *
 *      '200':
 *        description: create book successful response
 *        schema:
 *          items:
 *             $ref: '#/definitions/SuccessModel'
 *
 *      '500':
 *        description: create book error response
 *        schema:
 *          items:
 *             $ref: '#/definitions/ErrorModel'
 *
 *
 */
bookRouter.put("/:id", checkAuth, bookCtrl.updateOne);

/**
 * @swagger
 * /book:
 *  get:
 *    tags: [book]
 *    summary: get All Books.
 *    description: Use to get book list
 *    security:
 *     - authorization: []
 *
 *    parameters:
 *      - in: header
 *        description: you can switch between tow languages 'ar' for Arabic and 'en' for English, note that changes in message content
 *        name: AppLanguage
 *        required: true
 *        default: "ar"
 *
 *      - name: pageNo
 *        in: query
 *        description: Number of page
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *      - name: pageSize
 *        in: query
 *        description: Number of list size
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *
 *    responses:
 *      '404':
 *        description: no token
 *        schema:
 *          items:
 *             $ref: '#/definitions/ErrorModel'
 *
 *      '200':
 *        description: create book successful response
 *        schema:
 *          items:
 *             $ref: '#/definitions/SuccessModel'
 *
 *      '500':
 *        description: create book error response
 *        schema:
 *          items:
 *             $ref: '#/definitions/ErrorModel'
 *
 *
 */
bookRouter.get("", checkAuth, bookCtrl.getAll);

/**
 * @swagger
 * /book/{bookId}/findOneById:
 *  get:
 *    tags: [book]
 *    summary: find One By Id.
 *    description: Use to get book find One By Id
 *    security:
 *     - authorization: []
 *
 *    parameters:
 *      - in: header
 *        description: you can switch between tow languages 'ar' for Arabic and 'en' for English, note that changes in message content
 *        name: AppLanguage
 *        required: true
 *        default: "ar"
 *
 *      - in: path
 *        name: bookId
 *        description: book id
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *
 *    responses:
 *      '404':
 *        description: no token
 *        schema:
 *          items:
 *             $ref: '#/definitions/ErrorModel'
 *
 *      '200':
 *        description: create book successful response
 *        schema:
 *          items:
 *             $ref: '#/definitions/SuccessModel'
 *
 *      '500':
 *        description: create book error response
 *        schema:
 *          items:
 *             $ref: '#/definitions/ErrorModel'
 *
 *
 */
bookRouter.get("/:bookId/findOneById", checkAuth, bookCtrl.findOne);

/**
 * @swagger
 * /book/{id}:
 *  delete:
 *    tags: [book]
 *    summary: deleteOne.
 *    description: Use to delete book
 *
 *    security:
 *     - authorization: []
 *
 *    parameters:
 *      - in: header
 *        description: you can switch between tow languages 'ar' for Arabic and 'en' for English, note that changes in message content
 *        name: AppLanguage
 *        required: true
 *        default: "ar"
 *
 *      - in: path
 *        name: id
 *        description: book id
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *
 *    responses:
 *      '404':
 *        description: no token
 *        schema:
 *          items:
 *             $ref: '#/definitions/ErrorModel'
 *
 *      '200':
 *        description: create book successful response
 *        schema:
 *          items:
 *             $ref: '#/definitions/SuccessModel'
 *
 *      '500':
 *        description: create book error response
 *        schema:
 *          items:
 *             $ref: '#/definitions/ErrorModel'
 */
bookRouter.delete("/:id", checkAuth, bookCtrl.deleteOne);

module.exports = bookRouter;