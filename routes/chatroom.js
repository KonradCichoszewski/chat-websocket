const router = require('express').Router();
const { catchErrors } = require("../handlers/errorHandlers");
const chatroomController = require("../controllers/chatroomController");

const auth = require("../middlewares/auth");

router.post("/", auth, catchErrors(chatroomController.createChatroom));

module.exports = router;