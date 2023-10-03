const controller = require("./../../controller/usercontroller/usercontroller");
const router = require("express").Router();

// crud operation for user details
router.get("/", controller.getUsers);
router.get("/:id", controller.getUsersById);
router.post("/new", controller.saveUser);
router.delete("/:id", controller.deleteUser);
router.put("/", controller.updateUser);

module.exports = router;