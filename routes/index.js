var express = require("express");
var router = express.Router();
const { formatDistanceToNow } = require("date-fns");

const messages = [
  {
    text: "Hi there!",
    user: "toye",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "anibi",
    added: new Date(),
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

router.get("/new", function (req, res, next) {
  res.render("form", { title: "Mini Messageboard" });
});

router.post("/new", function (req, res, next) {
  const data = req.body;
  messages.push({
    text: data.message,
    user: data.user,
    added: formatDistanceToNow(new Date(), { addSuffix: true }),
  });
  res.redirect("/");
});

module.exports = router;
