import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(
      `mongodb+srv://MernShop:${process.env.DB_PASSWORD}@cluster0.kuszixb.mongodb.net/MERN-Muroexe?retryWrites=true&w=majority`,
      {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => console.log("Database Connected ✔".yellow.bold));
};

export default connectDB;
