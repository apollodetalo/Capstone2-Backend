const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const auth = require("../auth");

// Route for creating a course
router.post("/", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	if(userData.isAdmin == true){
		console.log(req.body)
		productController.addProduct(req.body).then(resultFromController =>
			res.send(resultFromController))
	} else{
		res.send(false);
	}
});


// Route for retrieving all the products
router.get("/all", (req, res) => {
	productController.getAllProduct().then(resultFromController => res.send(resultFromController)
		)
});


// Route for retrieving all ACTIVE products
router.get("/", (req, res) => {
	productController.getAllActive().then(resultFromController => res.send(resultFromController)
		)
});


// Route for retrieving a specific product
router.get("/:productID", (req, res) => {
	console.log(req.params.productID);
	productController.getProduct(req.params).then(resultFromController => res.send(resultFromController));
})


// Route for updating a product
router.put("/:productID", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	if(userData.isAdmin == true){
		console.log(req.body)
		productController.updateProduct(req.params, req.body).then(resultFromController => res.send(resultFromController))
		} else {
			res.send(false);
		}
});


// Route for archiving product
router.put("/:productID/archive", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	if(userData.isAdmin == true){
		console.log(req.body)
		productController.archiveProduct(req.params, req.body).then(resultFromController => res.send(resultFromController))
		} else {
			res.send(false);
		}
});


// Route for activating product
router.put("/:productID/activate", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	if(userData.isAdmin == true){
		console.log(req.body)
		productController.activateProduct(req.params, req.body).then(resultFromController => res.send(resultFromController))
		} else {
			res.send(false);
		}
});

module.exports = router;