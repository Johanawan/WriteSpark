const express = require('express')
const router = express.Router()

const { generateBlog } = require("../controllers/Openai.js")

router.post("/generate-blog", generateBlog)


module.exports = router