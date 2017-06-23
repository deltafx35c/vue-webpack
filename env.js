let ENV = {}

// log environment
console.log('env is:' + process.env.NODE_ENV )
if (process.env.NODE_ENV === "development"){
    ENV.MANGODB_CONN_STR = 'mongodb://116.62.143.122:27017/'
    ENV.MANGOOSE_CONN_STR = '127.0.0.1'
    ENV.REDIS_CONN_URL = '116.62.143.122'
    ENV.REDIS_CONN_PORT = 6379
} else {
    ENV.MANGODB_CONN_STR = 'mongodb://127.0.0.1:27017/'
    ENV.MANGOOSE_CONN_STR = '127.0.0.1'
    ENV.REDIS_CONN_URL = '127.0.0.1'
    ENV.REDIS_CONN_PORT = 6379
}

module.exports = ENV
