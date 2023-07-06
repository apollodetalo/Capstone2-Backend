const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String
		
	},
	lastName: {
		type: String
		
	},
	email: {
		type: String,
		required: [true, "Email is required"]
	},
	password: {
		type: String,
		required: [true, "Password is required"]
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	mobileNo: {
		type: String,
	},
		orderedProduct: [
			{
			productId: {
					type: String,
			},
			purchasedOn: {
				type: Date,
				default: new Date()
			},
			status: {
				type: String,
				default: "Purchased"
			}
		}
	]
})

module.exports = mongoose.model("User", userSchema);