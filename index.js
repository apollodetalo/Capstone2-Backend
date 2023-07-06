const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

const app = express();

// Connect to our MongoDB database
mongoose.connect("mongodb+srv://apollo-255:admin123@zuitt-bootcamp.dckhweo.mongodb.net/", {
	
	useNewUrlParser: true,
	useUnifiedTopology: true

});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/users", userRoutes);
app.use("/products", productRoutes);

if(require.main === module){
	// Will use the defined port number for the application whenever an environment variable is available OR will use port 4000 if none is defined
	// This syntax will allow flexibility when using the application locally or as a hosted application
	app.listen(process.env.PORT || 3000, () => {
		console.log(`API is now online on port ${process.env.PORT || 3000}`)
	});
}

module.exports = app;
