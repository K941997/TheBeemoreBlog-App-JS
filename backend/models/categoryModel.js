const mongoose = require('mongoose');

//model:
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const categoryModel = mongoose.model("category", categorySchema);


//export:
module.exports = categoryModel;