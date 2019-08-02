// module.exports = app => {
//     const express = require('express')
//     const router = express.Router()
//     // 引入Category模型
//     const Category = require('../../models/Category')

//     // 创建分类
//     // /admin/api/categories
//     router.post('/categories', async (req, res) => {
//         const model = await Category.create(req.body)
//         res.send(model)
//     })
//     // 分类列表
//     router.get('/categories', async (req, res) => {
//         const items = await Category.find().populate('parent').limit(10)
//         res.send(items)
//     })
//     // 单个分类详情
//     router.get('/categories/:id', async (req, res) => {
//         const model = await Category.findById(req.params.id)
//         res.send(model)
//     })
//     // 编辑分类
//     router.put('/categories/:id', async (req, res) => {
//         const model = await Category.findByIdAndUpdate(req.params.id, req.body)
//         res.send(model)
//     })
//     // 删除分类
//     router.delete('/categories/:id', async (req, res) => {
//         await Category.findByIdAndDelete(req.params.id, req.body)
//         res.send({
//             success: true
//         })
//     })
//     app.use('/admin/api/', router)
// }



// 通用CRUD接口
module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })
    const jwt = require('jsonwebtoken')
    const bcryptjs = require('bcryptjs')
    const AdminUser = require('../../models/AdminUser')

    // 创建资源接口
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 资源列表接口
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })
    // 资源详情接口
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 编辑资源接口
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 删除资源接口
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resource')
    // 调用以上数据接口的通用接口
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    // 上传文件接口(使用multer中间件处理数据上传)
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '\\..\\..\\uploads' })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:5000/uploads/${file.filename}`
        res.send(file)
    })
    // 登录接口
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        // 1.查找用户是否存在
        const user = await AdminUser.findOne({ username }).select('+password')
        if (!user) {
            return res.status(422).send({
                message: '用户不存在'
            })
        }
        // 2.校验密码
        const isValid = bcryptjs.compareSync(password, user.password)
        if (!isValid) {
            return res.status(422).send({
                message: '密码错误'
            })
        }
        // 3.返回token
        const token = jwt.sign({ _id: user._id }, 'SECRET', { expiresIn: 3600 })
        res.send({ token })
    })

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })

}
