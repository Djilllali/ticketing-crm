const express = require("express");
const userRouter = require("./starter/routes/userRoutes");
const ticketRouter = require("./starter/routes/ticketRoutes");
const uploadRouter = require("./starter/routes/uploadRoutes");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const path = require("path");

//  MIDLEWARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

// API security
// app.use(helmet());

//handle CORS error
app.use(cors());
app.use("/", express.static(path.resolve(__dirname, "client")));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tickets", ticketRouter);
app.use("/api/v1/upload", uploadRouter);
app.get("/download/:path", (req, res) => {
  const { path } = req.params;
  console.log("pathh", req.params);
  const file = `${__dirname}/public/generalAssets/${path}`;
  res.download(file); // Set disposition and send it.
});
const root = require("path").join(__dirname, "client", "build");
app.use(express.static(root));
app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

module.exports = app;
