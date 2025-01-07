require("dotenv").config();

const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/authMiddleware");
const connectDB = require("./db/connection");
const productRouter = require("./routes/productRoutes");
const cors = require("cors");
const cartRouter = require("./routes/cartRoutes");

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = 3000;

//routes
app.use(authRoutes);
app.use("/api/products", productRouter);
app.use("/cart", requireAuth, cartRouter);

connectDB().then(() => {
  //Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
