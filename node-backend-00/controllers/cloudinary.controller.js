const cloudinary = require('cloudinary')
require('dotenv').config()

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

exports.uploadImg = async(req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.body.images,{
            public_id: Date.now(),
            resource_type: 'auto',
        });
        res.status(200).json(result)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

exports.removeImg = async(req, res) => {
    try{
        let image_id = req.body.public_id
        cloudinary.uploader.destroy(image_id, (result) => {
            res.status(200).json(result)
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}