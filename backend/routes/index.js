const router = require("express").Router();
const authentication = require("./authentication");
const pet = require("./pet");

router.get("/", async (req, res) => {
  res.json({ message: "App is running" });
});

router.use(authentication);
router.use("/pet", pet);

module.exports = router;
