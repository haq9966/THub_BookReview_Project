var db = require('../config/connection')
var collection = require('../config/collection')
const { resolve, reject } = require('promise')
const { response } = require('express')
const bcrypt = require('bcrypt')
var objectId = require('mongodb').ObjectID;
module.exports = {
    doSignUp: (userData,callback) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collection.USERS_COLLECTION).insertOne(userData).then((data) => {
                resolve(data.ops[0])
            })


        })
    },
    addproducts:(products,callback)=>{
        db.get().collection('books').insertOne(products).then((data)=>{

            callback(data.ops[0]._id)

        })
    },
    addreview:(review)=>{
        db.get().collection('review').insertOne(review).then((data)=>{
            resolve(data)       })
    },
doLogin  : (userData) => {
    return new Promise(async (resolve, reject) => {
        let loginStatus = false
        let respons = {}
        let user = await db.get().collection(collection.USERS_COLLECTION).findOne({ emailid: userData.emailid })
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
},
getAllProducts:()=>{
    return new Promise(async(resolve,reject)=>{
        let products=await db.get().collection('books').find().toArray()
        resolve(products)
    })

},
// getAllReviews:()=>{
//     return new Promise(async(resolve,reject)=>{
//         let review=await db.get().collection('review').find().toArray()
//         resolve(review)
//     })

// },
getSelectedProducts:(id)=>{
    var myId = JSON.parse(id);
    return new Promise((resolve, reject) => {  
        console.log(id);
        db.get().collection(collection.BOOK_COLLECTION).findOne({ _id: objectId(myId)}).then((data) => {
            resolve(data)
        })
        })
}
}
