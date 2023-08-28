let corsOptions = {
    // origin: '*',
    origin: ['http://localhost:3001', 'http://localho.st:3001', 'http://192.168.1.33', 'http://10.100.102.122', "http://192.168.1.98"],
    optionsSuccessStatus: 200,
    credentials : true,
    allowedHeaders: ["Access-Control-Allow-Credentials"]
}

module.exports = corsOptions