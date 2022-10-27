//Import All Routes
import productRouter from "./productRouter.js";
import categoryRouter from "./categoryRouter.js";
import subCategoryRouter from "./subCategoryRouter.js";
import brandRouter from "./brandRouter.js";
import userRouter from "./userRouter.js";
import reviewRouter from "./reviewRouter.js";
import addressRouter from "./addressRouter.js";
import wishlistRouter from "./wishlistRouter.js";
import cartRouter from "./cartRouter.js";
import couponRouter from "./couponRouter.js";

const baseRouters = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/products", productRouter);
  app.use("/api/categories", categoryRouter);
  app.use("/api/subcategories", subCategoryRouter);
  app.use("/api/brands", brandRouter);
  app.use("/api/reviews", reviewRouter);
  app.use("/api/addresses", addressRouter);
  app.use("/api/wishlist", wishlistRouter);
  app.use("/api/coupons", couponRouter);
  app.use("/api/carts", cartRouter);
};

export default baseRouters;
