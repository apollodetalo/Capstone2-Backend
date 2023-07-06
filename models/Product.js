const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Product is required"]
	},
	description: {
		type: String,
		required: [true, "Description is required"]
	},
	price: {
		type: Number,
		required: [true, "Price is required"]
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		default: new Date()
	},
	userOrders: [
	{
		userId: {
			type: String,
			required: [true, "UserId is required"]
		},
		orderId: {
			type: String,
		}
	}
	]
})

module.exports = mongoose.model("Product", productSchema);