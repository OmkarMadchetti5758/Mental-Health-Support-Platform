const Resource = require('../models/resourse.model')

const addresourse = async (req, res, next) => {
    const {title, content, category, tags} = req.body

    if(!title || !content){
        return res.status(422).json({message: "Missing required fields"})
    }
    try{
        const createdResourse = new Resource({
            title,
            content,
            category: category || "Mindfulness",
            tags: tags || [],
            author: req.params.id
        })
        await createdResourse.save()
        return res.status(200).json({message: "Resourse added", createdResourse})
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message: "server error"})
    }
}

const getResourse = async (req, res, next) => {
    try{
        const resource = await Resource.find().populate("author","userName")
        return res.status(200).json({message: "Found", resource})
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message: "Server error"})
    }
}

module.exports = {addresourse, getResourse}