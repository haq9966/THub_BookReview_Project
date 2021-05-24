var express = require("express");
var router = express.Router();
const { response } = require("express");
var express = require("express");
var router = express.Router();
const adminHelper = require("../helpers/admin_helper");
const userHelper = require("../helpers/user_helper");
const verifylogin = (req, res, next) => {
  if (req.session.userloggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};
/* GET home page. */
router.get("/", function (req, res, next) {
  let user = req.session.user;
  userHelper.getAllProducts().then((data) => {
    console.log(response);
    res.render("user/product", { data, user });
  });
});
router.get("/english", function (req, res, next) {
  let user = req.session.user;
  userHelper.getProducts("english").then((data) => {
    console.log(response);
    res.render("user/product", { data, user });
  });
});
router.get("/malayalam", function (req, res, next) {
  let user = req.session.user;
  userHelper.getProducts("malayalam").then((data) => {
    console.log(response);
    res.render("user/product", { data, user });
  });
});
router.get("/hindi", function (req, res, next) {
  let user = req.session.user;
  userHelper.getAllProducts("hindi").then((data) => {
    console.log(response);
    res.render("user/product", { data, user });
  });
});
router.get("/fantacy", function (req, res, next) {
  let user = req.session.user;
  userHelper.getGenre("Fantasy").then((data) => {
    console.log(response);
    if (data) res.render("user/product", { data, user });
    else res.render("user/empty", { user });
  });
});
router.get("/action", function (req, res, next) {
  let user = req.session.user;
  userHelper.getGenre("Action").then((data) => {
    console.log(response);
    res.render("user/product", { data, user });
  });
});
router.get("/drama", function (req, res, next) {
  let user = req.session.user;
  userHelper.getGenre("Drama").then((data) => {
    console.log(response);
    res.render("user/product", { data, user });
  });
});
router.get("/comedy", function (req, res, next) {
  let user = req.session.user;
  userHelper.getGenre("Comedy").then((data) => {
    res.render("user/product", { data, user });
  });
});
router.get("/data/:id", function (req, res, next) {
  let user = req.session.user;
  userHelper.getbook(req.params.id).then((data) => {
    res.render("user/product", { data, user });
  });
});
router.get("/tragedy", function (req, res, next) {
  let user = req.session.user;
  userHelper.getGenre("Tragedy").then((data) => {
    console.log(response);
    res.render("user/product", { data, user });
  });
});
router.get("/slice", function (req, res, next) {
  let user = req.session.user;
  userHelper.getGenre("Slice of Life").then((data) => {
    res.render("user/product", { data, user });
  });
});
router.get("/login", function (req, res, next) {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("user/login", { loginErr: req.session.userloginErr });
    req.session.userloginErr = false;
  }
});
router.get("/signup", function (req, res, next) {
  res.render("user/signup");
});
router.post("/signup", (req, res) => {
  userHelper.doSignUp(req.body).then((response) => {
    let image = req.files.dp;
    image.mv(
      "./public/productimages/" + response.username + ".jpg",
      (err, done) => {}
    );
    console.log(response);
    res.redirect("/login");
  });
});
router.post("/search", (req, res) => {
  userHelper.search(req.body.search).then((data) => {
    res.render("user/product", { data, user: req.session.user });
  });
});
router.post("/login", (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.user = response.user;
      req.session.userloggedIn = true;

      res.redirect("/");
    } else {
      req.session.userloginErr = "invalid username & password";
      res.redirect("/login");
    }
  });
});
router.get("/details/:id", async (req, res) => {
  let product = await userHelper.getSelectedProducts(req.params.id);
  user = req.session.user;
  reviews = await userHelper.getAllReviews(req.params.id);
  console.log(reviews);
  res.render("user/details", { product, reviews, user });
});
router.get("/empty", (req, res) => {
  user = req.session.user;
  res.render("user/empty", { user });
});
router.get("/addproducts", verifylogin, function (req, res, next) {
  res.render("user/addproducts", { user: req.session.user });
});
router.post("/addproducts", (req, res) => {
  userHelper.addproducts(req.body, (id) => {
    let image = req.files.image;
    console.log(id);
    image.mv("./public/productimages/" + id + ".jpg", (err, done) => {
      if (!err) {
        res.render("user/addproducts", { user: req.session.user });
      } else {
        console.log(err);
      }
    });
  });
});
router.post("/addreview", (req, res) => {
  userHelper.addreview(req.body).then(() => {
    res.redirect("/");
  });
});
router.get("/logout", (req, res) => {
  req.session.userloggedIn = false;
  req.session.user = null;
  res.redirect("/");
});

router.get("/profile", verifylogin, async (req, res, next) => {
  user = req.session.user;
  let books = await userHelper.getbooks(user._id);
  res.render("user/profile", { user, books });
  console.log(books);
});

router.get("/user_review", verifylogin, async (req, res, next) => {
  user = req.session.user;
  let books = await userHelper.getbooks(user._id);
  res.render("user/user_review", { user });
  console.log(books);
});
router.get("/detete-book/:id", (req, res) => {
  let book = req.params.id;
  console.log(book);
  adminHelper.deletebook(book).then((response) => {
    res.redirect("/profile");
  });
});
router.get('/edit-book/:id', async (req, res) => {
  let book = await userHelper.getSelectedProducts(req.params.id)
  console.log(book);
  res.render('user/edit-book', { book })

})
router.post('/edit-book/:id', (req, res) => {
  userHelper.updatebook(req.params.id, req.body).then(() => {
    res.redirect('/profile')
    if (req.files.image) {
      let id = req.params.id
      let image = req.files.image
      image.mv('./public/hotel-images/' + id + '.jpg')
    }
  })
})
module.exports = router;
