var express = require("express");
var router = express.Router();
const { response } = require("express");
var express = require("express");
var router = express.Router();
const adminHelper = require("../helpers/admin_helper");
const userHelper = require("../helpers/user_helper");
const verifylogin=(req,res,next)=>{
  if(req.session.userloggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}
/* GET home page. */
router.get("/", function (req, res, next) {
  let user=req.session.user
  userHelper.getAllProducts().then((data) => {
    console.log(response);
    res.render("user/product",{data,user})
  });
});
router.get("/login", function (req, res, next) {
  if(req.session.user){
    res.redirect('/')
  }else{
  res.render("user/login",{"loginErr":req.session.userloginErr});
  req.session.userloginErr=false
  }
});
router.post("/signup", (req, res) => {
  userHelper.doSignUp(req.body).then((response) => {

    let image = req.files.dp;
    image.mv("./public/productimages/" + response.username + ".jpg", (err, done) => {
    });
    console.log(response);
    res.redirect("/login");
  });
});
router.post("/login", (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    if(response.status){
      req.session.user=response.user
      req.session.userloggedIn=true
  
      res.redirect('/')
    }else{
      req.session.userloginErr="invalid username & password"
      res.redirect('/login')
    }
  });
});
router.get('/details/:id',async(req,res)=>{
  
let product=await userHelper.getSelectedProducts(req.params.id)
user=req.session.user
reviews=await userHelper.getAllReviews(req.params.id)
   console.log(reviews);
  res.render('user/details',{product,reviews,user})
})
router.get("/addproducts", verifylogin,function (req, res, next) {
  res.render("user/addproducts");
});
router.post("/addproducts", (req, res) => {
  userHelper.addproducts(req.body, (id) => {
    let image = req.files.image;
    console.log(id);
    image.mv("./public/productimages/" + id + ".jpg", (err, done) => {
      if (!err) {
        res.render("user/addproducts",{user:req.session.user});
      } else {
        console.log(err);
      }
    });
  });
});
router.post("/addreview", (req, res) => {
  userHelper.addreview(req.body).then(()=>{
    res.redirect('/')
    })
});

module.exports = router;
