const express = require('express')
const cors = require('cors')

const app = express();

// 允许跨域
app.use(cors())

// 设置静态文件目录
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/web'))
app.use('/uploads', express.static(__dirname + '/uploads'))


app.use(express.json())

require('./routes/admin/index')(app)
require('./routes/web/index')(app)
require('./plugins/db')(app)

app.listen(5000, () => {
    console.log('http://localhost:5000')
})