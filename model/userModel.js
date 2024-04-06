//  Schema Validation

const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    surName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    dateOfBirth: {
        type: Date,
        // required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"],
        // required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: Number,
        // required: true
    },
    instituteName: {
        type: String,
        // required: true
    },
    qualification: {
        type: [String],
        // required: true
    },
    course: {
        type: String,
        enum: ["mern", "python", "java"],
        // required: true,
    },
    yearOfPassing: {
        type: Date,
        // required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    tc: {
        type: Boolean,
        // required: true
    }
})

const userModel = mongoose.model("user", userSchema)

module.exports = { userModel }