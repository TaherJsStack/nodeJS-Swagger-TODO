const Book = require("../../models/v1/book");
const i18n = require("../../i18n.config");
const mongoose = require("mongoose");

exports.saveNew = (req, res, next) => {
  const authData = req.authData;

  Book.findOne({ title: req.body.title }).then((bookExist) => {
    if (bookExist) {
      return res.status(400).json({
        message: i18n.__("NewDataExists"),
        book: bookExist,
      });
    } else {
      const book = new Book(req.body);

      book.creatorId = authData.id;
      book.creatorName = authData.name;

      book
        .save()
        .then((newBook) => {
          res.status(200).json({
            message: i18n.__("DoneSuccessfully"),
            newBook,
          });
        })
        .catch((err) => {
          let errMessage = [];

          if (err) {
            if (err.name == "ValidationError") {
              for (field in err.errors) {
                errMessage.push({
                  name: err.errors[field].path,
                  message: err.errors[field].message,
                  kind: err.errors[field].kind,
                  value: err.errors[field].value,
                });
              }
            }
          } else {
            errMessage.push(i18n.__("Error") + " " + err);
          }

          res.status(500).json({
            message: errMessage,
            status: 500,
          });
        });
    }
  });
};

exports.updateOne = (req, res, next) => {
  const updateBook = new Book({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    authorName: req.body.authorName,
    authorEmail: req.body.authorEmail,
    authorPhone: req.body.authorPhone,
    authorGender: req.body.authorGender,
    authorBirthDate: req.body.authorBirthDate,
    activeAccount: req.body.activeAccount,
    createdAt: req.body.createdAt,
    creatorId: req.body.creatorId,
  });

  Book.findByIdAndUpdate({ _id: req.params.id }, updateBook, {
    runValidators: true,
    context: "query",
  })
    .then((book) => {
      res.status(201).json({
        book,
        message: i18n.__("DoneSuccessfully"),
      });
    })
    .catch((err) => {
      let errMessage = [];

      if (err) {
        if (err.name == "ValidationError") {
          for (field in err.errors) {
            errMessage.push({
              name: err.errors[field].path,
              message: err.errors[field].message,
              kind: err.errors[field].kind,
              value: err.errors[field].value,
            });
          }
        }
      } else {
        errMessage.push(i18n.__("Error") + " " + err);
      }

      res.status(500).json({
        message: errMessage,
        status: 500,
      });
    });
};

exports.getAll = (req, res, next) => {
  const pageSize = +req.query.pageSize || 1;
  const pageNo = +req.query.pageNo || 20;
  const bookQuery = Book.find().sort({ createdAt: -1 });
  let fetchedBooks;
  if (pageSize && pageNo) {
    bookQuery.skip(pageSize * (pageNo - 1)).limit(pageSize);
  }
  bookQuery
    .then((documents) => {
      if (!documents.length) {
        res.status(200).json({
          message: i18n.__("DoneSuccessfully"),
          maxCount: documents.length,
        });
      }
      fetchedBooks = documents;
      return Book.count();
    })
    .then((count) => {
      res.status(200).json({
        message: i18n.__("DoneSuccessfully"),
        bookList: fetchedBooks,
        maxCount: count,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: i18n.__("Error") + " " + err,
        status: 500,
      });
    });
};

exports.findOne = (req, res, nex) => {
  Book.findOne({ _id: req.params.bookId })
    .then((book) => {
      res.status(200).json({
        book: book,
        message: i18n.__("DoneSuccessfully"),
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: i18n.__("Error") + " " + err,
        status: 500,
      });
    });
};

exports.deleteOne = (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: i18n.__("DoneSuccessfully"),
        status: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: i18n.__("Error") + " " + err,
        status: 500,
      });
    });
};
