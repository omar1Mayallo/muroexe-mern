import colors from "colors";
import dotenv from "dotenv";
import express from "express";
import app from "./app.js";
import connectDB from "./Config/DB.js";

// Handle Uncaught Exception Errors
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception , Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

//Env Configuration
dotenv.config({path: "./.env"});
// DB Connection
connectDB();
// [1] GLOBAL MIDDLEWARES
// Body parser, reading data from body to req.body
app.use(express.json());

//SERVER
const server = app.listen(process.env.PORT, () => {
  console.log(
    `App Running on PORT:${process.env.PORT} in ${process.env.NODE_ENV} mode`
      .blue.bold
  );
});

//Handle Errors Outside Express
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection, Shutting Down ...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
