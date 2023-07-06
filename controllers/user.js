const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// Controller for checking Email
module.exports.checkEmailExists = (reqBody) => {
	return User.find({email: reqBody.email}).then(result => {
		if(result.length > 0){
			return true;
		} else {
			return false;
		}
	})
};

// Controller for user registration
module.exports.registerUser = (reqBody) => {
	let newUser = new User({
		firstName : reqBody.firstName,
		lastName : reqBody.lastName,
		email : reqBody.email,
		mobileNo : reqBody.mobileNo,
		password : bcrypt.hashSync(reqBody.password, 10)
	})

	return newUser.save().then((user,error) => {
		if(error) {
			return false;
		} else {
			return true
		};
	})
};


// Controller for user authentication
module.exports.loginUser = (reqBody) => {
	return User.findOne({email : reqBody.email}).then(result => {
		if(result == null){
			return false;
		} else {
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)
			if(isPasswordCorrect){
				return {access : auth.createAccessToken(result)}
			} else {
				return false
			}
		}
	})
}


// Controller for retrieving user details
module.exports.getProfile = (data) => {
  return User.findById(data.id).then(result => {
    if (result === null) {
      return false;
    } else {
      result.password = "";
      return result;
    }
  });
};


// Checkout a product
module.exports.checkout = async (data) => {
	let isUserUpdated = await User.findById(data.userId).then(user => {
		user.orderedProduct.push({
				productId : data.productId,
		});
		return user.save().then((user, error) => {
			if(error){
				return false;
			} else {
				return true;
			}
		})
	})
	let isProductUpdated = await Product.findById(data.productId).then(product =>{
		product.userOrders.push({userId : data.userId});
		return product.save().then((product, error) => {
			if(error){
				return false;
			} else {
				return true;
			}
		})
	})
	if(isUserUpdated && isProductUpdated){
		return true;
	} else {
		return false
	}
};


// Stretch Goals
// Controller for updating user to admin
module.exports.updateUserToAdmin = (reqParams, reqBody) => {

	let updateUserToAdmin = {
		isAdmin: reqBody.isAdmin
	}

	return User.findByIdAndUpdate(reqParams.userID, updateUserToAdmin).then((user, error) => {
		if(error){
			return false;
		} else {
			return true;
		}
	})
}


// Controller for authenticated user order
module.exports.getUserOrder = (data) => {
	return User.findById(data.userId).then(result => {
		if(result == null){
			return false
		} else {
			let {orderedProduct} = result;
			return orderedProduct;
		}
	});
};


// Controller for retrieving all order(Admin)

module.exports.getAllOrder = () => {
	return User.find({orderedProduct: { $exists: true, $ne: [] } }, 'orderedProduct').then(result => {
		return result.map((user) => user.orderedProduct);
	})
}