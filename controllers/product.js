const Product = require("../models/Product");
const auth = require("../auth");

// Controller for ADDING product
module.exports.addProduct = (reqBody, userData) => {
  let newProduct = new Product({
    name: reqBody.name,
    description: reqBody.description,
    price: reqBody.price,
  });
  return newProduct.save().then((product, error) => {
    if (error) {
      return false;
    } else {
      return true;
    }
  });
};

// Controller for retrieving all product

module.exports.getAllProduct = () => {
  return Product.find({}).then((result) => {
    return result;
  });
};

// Controller for retrieving all ACTIVE product
module.exports.getAllActive = () => {
  return Product.find({ isActive: true }).then((result) => {
    return result;
  });
};

// Controller for retrieving a specific product

module.exports.getProduct = (reqParams) => {
  return Product.findById(reqParams.productID).then((result) => {
    return result;
  });
};

// Controller for updating a product
module.exports.updateProduct = (reqParams, reqBody) => {
  let updateProduct = {
    name: reqBody.name,
    description: reqBody.description,
    price: reqBody.price,
  };

  return Product.findByIdAndUpdate(reqParams.productID, updateProduct).then(
    (product, error) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    }
  );
};

// Controller for archiving a product
module.exports.archiveProduct = (reqParams) => {
  let updateActiveField = {
    isActive: false,
  };
  return Product.findByIdAndUpdate(reqParams.productID, updateActiveField).then(
    (product, error) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    }
  );
};

module.exports.activateProduct = (reqParams) => {
  let updateActiveField = {
    isActive: true,
  };
  return Product.findByIdAndUpdate(reqParams.productID, updateActiveField).then(
    (product, error) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    }
  );
};
