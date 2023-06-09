const mongoose = require('mongoose')

const setupDb = async (MongoURL) => {

    const connect = await mongoose.connect(MongoURL)

    connect.connection.addListener('connect', () => {
        console.log("Mongo DB was connected!");
    })
}

module.exports = {
    setupDb
}