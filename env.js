let ENV = {}

console.log('env is:' + process.env.NODE_ENV )
if (process.env.NODE_ENV === "development"){
    ENV.MANGODB_CONN_STR = 'mongodb://10.211.55.5:27017/test-vue'
} else {
    ENV.MANGODB_CONN_STR = 'mongodb://127.0.0.1:27017/test-vue'
}

module.exports = ENV
