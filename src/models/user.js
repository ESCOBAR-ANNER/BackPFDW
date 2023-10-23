const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    date: String,
    phone: String,
    address: String,
    photo: String
}, {
    timestamps: true
});

module.exports= model('User',userSchema);
