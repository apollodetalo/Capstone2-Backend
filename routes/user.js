const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../auth");
const Product = require("../models/Product");


// Route for checking emails
router.post("/checkEmail", (req, res) => {
	userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController))
});


// Route for user registration
router.post("/register", (req, res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController))
});


// Route for user authentication
router.post("/login", (req, res) => {
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController))
});


// Route for retrieving user details
router.get("/details", auth.verify, (req, res) => {
  const userData = auth.decode(req.headers.authorization);

  userController.getProfile({ id: userData.id }).then(resultFromController => res.send(resultFromController));
});

// Route for user checkout
router.post("/checkout", auth.verify, (req, res) => {
	let data = {
		userId : auth.decode(req.headers.authorization).id,
		productId : req.body.productId
	}

		userController.checkout(data).then(resultFromController => res.send(resultFromController));
	});

// Stretch Goals

// Route to set user as Admin (Admin Only)
router.put("/:userID", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	if(userData.isAdmin == true){
		console.log(req.body)
		userController.updateUserToAdmin(req.params, req.body).then(resultFromController => res.send(resultFromController))
		} else {
			res.send(false);
		}
});


// Route for retrieving authenticated orders
router.get("/AuthenticatedOrder", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);

	userController.getUserOrder({userId : req.body.id}).then(resultFromController => res.send(resultFromController));
});


// Route for retrieving all the products
router.get("/allOrder", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	if(userData.isAdmin == true){
	userController.getAllOrder().then(resultFromController => res.send(resultFromController))
		} else {
			res.send(false);
		}
});

module.exports = router;