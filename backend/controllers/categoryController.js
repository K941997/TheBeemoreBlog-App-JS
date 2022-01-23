const categoryModel = require("../models/categoryModel");


//Create Category:
const createCategory = async(req, res) => {
    const newCategory = new categoryModel(req.body);
    
    try {
        const existedCategory = await categoryModel.findOne({ name: req.body.name } );
        if (existedCategory) {
            return res.status(400).json("Đã có category này")
        }

        const savedCategory = await newCategory.save();

        res.status(200).json(savedCategory);

    } catch(err) {
        res.status(500).json(err)
    }
}



//Get All Categories:
const getAllCategories = async(req, res) => {
    try {
        const categories = await categoryModel.find();

        res.status(200).json(categories);

    } catch(err) {
        res.status(500).json(err);
    }
}

module.exports = {createCategory, getAllCategories};