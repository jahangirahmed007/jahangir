const mongoose = require('mongoose');

module.exports = () => {

    // mongodb+srv://jagangir:1234567890@cluster0-dcs5k.mongodb.net/webdevtest?retryWrites=true&w=majority


    mongoose.connect('mongodb://jagangir:1234567890@cluster0-shard-00-00-dcs5k.mongodb.net:27017,cluster0-shard-00-01-dcs5k.mongodb.net:27017,cluster0-shard-00-02-dcs5k.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("DB connected successfully...");
    }).catch(err => {
        return console.log(err);
    })

}