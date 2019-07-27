module.exports = app => {
    const express = require('express')
    
    router = express.Router()

    router.get('/hello', async (req, res) => {
        res.send('Hello');
    })
}