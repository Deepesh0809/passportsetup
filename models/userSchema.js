const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String
})

userSchema.plugin(plm)

const userModel = mongoose.model("user", userSchema)

module.exports = userModel