var express = require("express");
var router = express.Router();
const { response } = require("express");
var express = require("express");
var router = express.Router();
const adminHelper = require("../helpers/admin_helper");
const userHelper = require("../helpers/user_helper");

/* GET users listing. */
router.get('/',async function(req, res, next) {
  res.render('admin/login');
});
router.post('/login',async function(req, res, next) {
  username=req.body.username;
  password=req.body.password;
  console.log(username);
  if(username=="admin"&&password=="admin")
  {
  res.redirect('/admin/home');
  }else{
  res.redirect('/admin')  
  }
});
router.get('/home',async function(req, res, next) {
  users=await adminHelper.getuserscount()
  books=await adminHelper.getcount()
  console.log(users);
  res.render('admin/home',{users,books});
});
router.get('/books',async function(req, res, next) {
  books=await adminHelper.getAllProducts()
  res.render('admin/books',{books}); 
});
router.get('/users',async function(req, res, next) {
  users=await adminHelper.getusers()
  res.render('admin/users',{users});
});
router.get('/detete-book/:id', (req, res) => {
  let book = req.params.id
  console.log(book)
  adminHelper.deletebook(book).then((response) => {
    res.redirect('/admin/books')
  })

})
module.exports = router;
