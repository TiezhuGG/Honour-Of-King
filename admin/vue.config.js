module.exports = {
    // 编译输出路径
    outputDir: __dirname + '/../server/admin',
    // 设置生成的静态文件路径
    publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/'
}