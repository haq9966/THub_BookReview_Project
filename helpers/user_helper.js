var db = require("../config/connection");
var collection = require("../config/collection");
const { resolve, reject } = require("promise");
const { response } = require("express");
const bcrypt = require("bcrypt");
var objectId = require("mongodb").ObjectID;
module.exports = {
  doSignUp: (userData, callback) => {
    return new Promise(async (resolve, reject) => {
      userData.password = await bcrypt.hash(userData.password, 10);
      db.get()
        .collection(collection.USERS_COLLECTION)
        .insertOne(userData)
        .then((data) => {
          resolve(data.ops[0]);
        });
    });
  },
  addproducts: (products, callback) => {
    // product.language=product.language.toLowerCase();
    db.get()
      .collection("books")
      .insertOne(products)
      .then((data) => {
        callback(data.ops[0]._id);
      });
  },
  addreview: (review) => {
    return new Promise(async (resolve, reject) => {
      let data = await db
        .get()
        .collection(collection.REVIEW_COLLECTION)
        .insertOne(review);
      console.log(",,,,,,,,,,,,,,,,,,,,", data.ops[0]);
      resolve(data.ops[0]);
    });
  },
  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let loginStatus = false;
      let respons = {};
      let user = await db
        .get()
        .collection(collection.USERS_COLLECTION)
        .findOne({ emailid: userData.emailid });
      if (user) {
        bcrypt.compare(userData.password, user.password).then((status) => {
          if (status) {
            console.log("success");
            response.user = user;
            response.status = true;
            resolve(response);
          } else {
            console.log("failed");
            resolve({ status: false });
          }
        });
      } else {
        console.log("db failed");
        resolve({ status: false });
      }
    });
  },
  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
      let products = await db.get().collection("books").find().toArray();
      resolve(products);
    });
  },
  getProducts: (data) => {
    return new Promise(async (resolve, reject) => {
      let products = await db.get().collection("books").find({language:data}).toArray();
      resolve(products);
    });
  },
  getGenre: (data) => {
    return new Promise(async (resolve, reject) => {
      let products = await db.get().collection("books").find({Genre:data}).toArray();
      resolve(products);
    });
  },
  getbook: (data) => {
    return new Promise(async (resolve, reject) => {
      let products = await db.get().collection("books").find({_id:objectId(data)}).toArray();
      resolve(products);
    });
  },
  getAllReviews: (id) => {
    return new Promise(async (resolve, reject) => {
      let review = await db
        .get()
        .collection("review")
        .find({ bookid: id })
        .toArray();
      resolve(review);
    });
  },
  getSelectedProducts: (id) => {
    return new Promise((resolve, reject) => {
      console.log("..............ID :" + id + ".................");
      db.get()
        .collection(collection.BOOK_COLLECTION)
        .findOne({ _id: objectId(id) })
        .then((data) => {
          resolve(data);
        });
    });
  },
};
