// 登录校验中间件
const jwt = require('jsonwebtoken')
const AdminUser = require('../models/AdminUser')

module.exports = authMiddleware => {
    return async (req, res, next) => {
        const token = (req.headers.authorization || '').split(' ').pop()
        if (!token) {
            res.status(401).send({
                message: '请先登录1'
            })
        }
        const token_decoded = jwt.verify(token, 'SECRET')
        if (!token_decoded) {
            res.status(401).send({
                message: '请先登录2'
            })
        }
        const id = token_decoded
        req.user = await AdminUser.findById(id)
        if (!req.user) {
            res.status(401).send({
                message: '请先登录3'
            })
        }
        await next()
    }
}