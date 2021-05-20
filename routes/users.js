var express = require("express");
var router = express.Router();
const { response } = require("express");
var express = require("express");
var router = express.Router();
const adminHelper = require("../helpers/admin_helper");
const userHelper = require("../helpers/user_helper");
/* GET home page. */
router.get("/", function (req, res, next) {
  userHelper.getAllProducts().then((data) => {
    console.log(response);
    res.render("user/product",{data})
  });
});
router.get("/login", function (req, res, next) {
  res.render("user/login");
});
router.post("/signup", (req, res) => {
  userHelper.doSignUp(req.body).then((response) => {
    console.log(response);
    res.redirect("/login");
  });
});
router.post("/login", (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    res.redirect("/");
  });
});
router.get('/details/:id',async(req,res)=>{
  let product= await userHelper.getSelectedProducts(req.params.id)
  res.render('user/details',{product})
})
router.get("/review", function (req, res, next) {
  res.render("user/review");
});
router.get("/addproducts", function (req, res, next) {
  res.render("user/addproducts");
});
router.post("/addproducts", (req, res) => {
  userHelper.addproducts(req.body, (id) => {
    let image = req.files.image;
    console.log(id);
    image.mv("./public/productimages/" + id + ".jpg", (err, done) => {
      if (!err) {
        res.render("user/addproducts");
      } else {
        console.log(err);
      }
    });
  });
});
module.exports = router;
