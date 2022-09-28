import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from "url";

//Security
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";

//ErrorHandlers
import APIError from "./utils/apiError.js";
import GlobalErrorMiddleware from "./Middlewares/GlobalErrorMiddleware.js";
//Import All Routes
import productRouter from "./Routes/productRouter.js";
import categoryRouter from "./Routes/categoryRouter.js";
import subCategoryRouter from "./Routes/subCategoryRouter.js";
import brandRouter from "./Routes/brandRouter.js";
import userRouter from "./Routes/userRouter.js";

dotenv.config();
//Initialize Express App
const app = express();

//Serve static files
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "uploads")));
//__________MIDDLEWARES____________//
// 1) Helmet (best to set it early in middleware stack for sure helmet headers will be set)
app.use(helmet());

// 2) Morgan (Logger)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 3) Rate Limiting
const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP , Try again in one hour",
});
app.use("/api", limiter);

// 4) Body parser (Reading data from body to req.body)
app.use(express.json({limit: "10kb"}));

// 5) Data sanitization against NoSQL query injection (ex: email: {$gt: ""})
// mongoSanitize prevent using query signs like ($ and dots) in req.body and req.params
app.use(mongoSanitize());

// 6) Data sanitization against XSS (ex: name: "<div id="name">name</div>")
// xss convert all html and malicious code to html entity
app.use(xss());

// 7) Http Parameters Pollution
app.use(
  hpp({whitelist: ["price", "ratingAvr", "numReviews", "category", "brand"]})
);

//__________ROUTERS____________//
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/subcategories", subCategoryRouter);
app.use("/api/brands", brandRouter);

//Not Found Routes
app.use("*", (req, res, next) => {
  next(new APIError(`Cant find ${req.originalUrl} on this server`, 404));
});

//GLOBAL ERROR HANDLER
app.use(GlobalErrorMiddleware);

export default app;
