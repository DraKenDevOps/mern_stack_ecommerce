const Categories = require('../models/Category.model')

// POST
exports.createCat = async(req, res) => {
    try{
        const { name, name_en } = req.body
        const category = await Categories({name, name_en}).save()
        res.status(200).json({ message:`Category ${category._id} has been created` })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

// GET
exports.categoriesList = async(req, res) => {
    try{
        const categories = await Categories.find({}).select('-__v').exec()
        res.status(200).json(categories)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

// GET
exports.readCategory = async(req, res) => {
    try{
        const id = req.params.id
        const category = await Categories.findOne({_id:id}).select('-__v').exec()
        res.status(200).json(category)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

// PUT
exports.updateCategory = async(req, res) => {
    try{
        const id = req.params.id
        const { name, name_en } = req.body

        const category = await Categories.findOneAndUpdate(
            {_id:id}, {name:name, name_en:name_en}
        )
        res.status(200).json({ message: `Category ${category._id} has been updated` })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

// DELETE
exports.deleteCategory = async(req, res) => {
    try{
        const id = req.params.id
        const category = await Categories.findOneAndDelete({_id:id})
        res.status(200).json({ message: `Category ${category._id} has been deleted` })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}