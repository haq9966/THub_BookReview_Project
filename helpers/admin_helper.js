var db = require("../config/connection");
var collection = require("../config/collection");
const { resolve, reject } = require("promise");
const { response } = require("express");
const bcrypt = require("bcrypt");
var objectId = require("mongodb").ObjectID;
module.exports = {
    getusers: () => {
        return new Promise(async (resolve, reject) => {
          let users = await db.get().collection("users").find().toArray();
          resolve(users);
        });
      },getuserscount: () => {
        return new Promise(async (resolve, reject) => {
          let users = await db.get().collection("users").find().count();
          resolve(users);
        });
      },getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
          let users = await db.get().collection("books").find().toArray();
          resolve(users);
        });
      },getcount: () => {
        return new Promise(async (resolve, reject) => {
          let users = await db.get().collection("books").find().count();
          resolve(users);
        });
      },deletebook: (book) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.BOOK_COLLECTION).removeOne({ _id: objectId(book) }).then((response) => {
                console.log(response)
                resolve(response)
            })
        })
    }
}