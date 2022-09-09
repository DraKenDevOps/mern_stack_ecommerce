const Products = require('../models/Product.model')

// GET
exports.productList = async(req, res) => {
    try{
        const count = parseInt(req.params.count)
        
        const products = await Products.find({}).limit(count).populate('category').sort([["createdAt","desc"]]).select('-__v').exec()
        res.status(200).json(products)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

// GET
exports.productListBy = async(req, res) => {
    try{
        const { sort, order, limit } = req.body
        
        const products = await Products.find({}).limit(limit).populate('category').sort([[sort,order]]).select('-__v').exec()
        res.status(200).json(products)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

const handleQuery = async(req, res, query) => {
    let products = await Products.find({ $text: {$search: query} }).populate('category','_id name_en').select('-__v').exec()
    res.status(200).json(products)
}
const handlePrice = async(req, res, price) => {
    let products = await Products.find({
        price:{
            $gte:price[0],
            $lte:price[1]
        }
    }).populate('category','_id name_en').select('-__v').exec()
    res.status(200).json(products)
}
const handleCategory = async(req, res, category) => {
    let products = await Products.find({category}).populate('category','_id name_en').select('-__v').exec()
    res.status(200).json(products)
}

// GET
exports.searchProduct = async(req, res) => {
    try{
        const { query, price, category } = req.body
        if(query){
            await handleQuery(req, res, query)
        }
        if(price !== undefined){
            await handlePrice(req, res, price)
        }
        if(category){
            await handleCategory(req, res, category)
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

// GET
exports.readProduct = async(req, res) => {
    try{
        const id = req.params.id
        const product = await Products.findOne({_id:id}).populate('category').select('-__v').exec()
        res.status(200).json(product)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

// GET
exports.createProduct = async(req, res) => {
    try{
        const product = await Products(req.body).save()
        res.status(200).json({ message:`Product ${product._id} has been created` })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

// UPDATE
exports.updateProduct = async(req, res) => {
    try{
        const id = req.params.id
        const product = await Products.findOneAndUpdate(
            {_id:id},
            req.body,
            {new: true}
        ).exec()
        res.status(200).json({ message:`Product ${product._id} has been updated` })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

// DELETE
exports.deleteProduct = async(req, res) => {
    try{
        const id = req.params.id
        const product = await Products.findOneAndDelete({_id:id}).exec()
        res.status(200).json({ message:`Product ${product._id} has been deleted` })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}