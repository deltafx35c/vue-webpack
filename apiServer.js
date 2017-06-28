const express = require('express')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// if (process.env.NODE_ENV === "development"){
//     // 设置跨域访问
//     app.all('*',function(req,res,next){
//         res.setHeader("Access-Control-Allow-Origin","*")
//         res.setHeader("Access-Control-Allow-Headers","X-Requested-With")
//         res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
//         res.setHeader("Content-Type","application/json;charset=utf-8")
//         next()
//     })
// }

// 设置api routes
app.use('/api', require('./api/index'))

// 设置本地上传文件的静态资源服务
if (process.env.NODE_ENV === "development"){
    app.use(express.static(__dirname))
    console.log('server static resource at '+ __dirname)
}

app.listen(port, host)
console.log('app listening at http://%s:%s',host,port)