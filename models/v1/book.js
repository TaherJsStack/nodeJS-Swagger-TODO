const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
require("mongoose-type-email");
const i18n = require("../../i18n.config");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: [6, `${i18n.__("MustBeAtLeast")} 6 ${i18n.__("Characters")}`],
        max: 12,
    },
    description: {
        type: String,
        required: true,
        min: [16, `${i18n.__("MustBeAtLeast")} 16 ${i18n.__("Characters")}`],
        max: 42,
    },
    price: { type: Number, required: true },
    authorName: {
        type: String,
        required: true,
        min: [4, `${i18n.__("MustBeAtLeast")} 4 ${i18n.__("Characters")}`],
        max: 12,
    },
    authorEmail: {
        type: mongoose.SchemaTypes.Email,
        // unique: true, ,
        required: [true, `${i18n.__("EnterEmail")}`],
    },
    authorPhone: {
        type: String,
        required: [true, "Authoe phone number required"],
        // unique: true,
        // min: [11, `${i18n.__("MustBeAtLeast")} 11 ${i18n.__("Characters")}`],
        // max: 11,
        validate: {
            validator: function(v) {
                return /^[0-9]{11}$/.test(v);
            },
            message: props => `${props.value} ${i18n.__('IsNotValidPhoneNumber')}`
        },
    },
    authorGender: {
        type: String,
        required: true,
        enum: {
            values: ["male", "female"],
            message: `${i18n.__("ValueIsNotSupported")}`,
        },
    },
    authorBirthDate: {
        type: Date,
        required: [true, `${i18n.__("ValueIsNotSupported")}`],
        message: `${i18n.__("ValueIsNotSupported")}`,
    },
    activeAccount: { type: Boolean, required: true },
    createdAt: { type: Date, required: true, default: new Date() },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: [true, "Please Login First And Get Admin Token "],
    },
});

// get  error if user email is exist
// it work by 'mongoose unique validator
// to use it but unique: true like email
bookSchema.plugin(uniqueValidator);


module.exports = mongoose.model("Book", bookSchema);