let ENV = {}

console.log('env is:' + process.env.NODE_ENV )
if (process.env.NODE_ENV === "development"){
    ENV.MANGODB_CONN_STR = 'mongodb://10.211.55.5:27017/vue-webpack'
    ENV.REDIS_CONN_URL = '10.211.55.5'
    ENV.REDIS_CONN_PORT = 6379
} else {
    ENV.MANGODB_CONN_STR = 'mongodb://127.0.0.1:27017/vue-webpack'
    ENV.REDIS_CONN_URL = '127.0.0.1'
    ENV.REDIS_CONN_PORT = 6379
}

module.exports = ENV
