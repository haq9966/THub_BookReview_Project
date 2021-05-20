var db = require('../config/connection')
var collection = require('../config/collection')
const { resolve, reject } = require('promise')
const { response } = require('express')
const bcrypt = require('bcrypt')
var objectId = require('mongodb').ObjectID
module.exports = {
    doSignUp: (userData) => {
        return new Promise(async (resolve, reject) => {
            let newPassword = userData.password.toString();
            userData.password = await bcrypt.hash(newPassword, 10)
            db.get().collection(collection.USERS_COLLECTION).insertOne(userData).then((data) => {
                resolve(data.ops[0])
            })


        })
    },
    addproducts:(products,callback)=>{
        products.price=parseInt(products.price)
        db.get().collection('books').insertOne(products).then((data)=>{

            callback(data.ops[0]._id)

        })
    },
doLogin  : (userData) => {
    return new Promise(async (resolve, reject) => {
        let loginStatus = false
        let respons = {}
        let user = await db.get().collection(collection.USERS_COLLECTION).findOne({ email: userData.emailid })
        if (user) {
            bcrypt.compare(userData.password, user.password).then((status) => {
                if (status) {
                    console.log("success");
                    response.user = user
                    response.status = true
                    resolve(response)
                } else {
                    console.log("failed");
                    resolve({ status: false })
                }
            })
        } else {
            console.log("db failed");
            resolve({ status: false })
        }
    })
}
}
