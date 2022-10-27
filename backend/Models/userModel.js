import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      minlength: [3, "User name minimum length 3 characters"],
      maxlength: [30, "User name maximum length 30 characters"],
    },
    email: {
      type: String,
      required: [true, "User Email is required"],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "User Password is required"],
      minlength: [6, "Password is too short"],
      select: false,
    },
    passwordConfirmation: {
      type: String,
      required: [true, "Please confirm your password"],
      //only work in create ,save not update
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords are not the same",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image: {
      type: String,
      default: "default.jpg",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpire: Date,
    active: {type: Boolean, default: true, select: false},

    addresses: [
      {
        id: {type: mongoose.Schema.Types.ObjectId},
        // _id: false,
        phone: String,
        city: String,
        postalCode: String,
        details: String,
      },
    ],

    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
  },
  {timestamps: true}
);
// To Get All user expect deActivate user
UserSchema.pre(/^find/, async function (next) {
  this.find({active: {$ne: false}});
  next();
});
//Hashing The Password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  //Not need to persist it to the database
  this.passwordConfirmation = undefined;
  next();
});
//passwordChangedAt Field
UserSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
// Check If The Password is Correct To LOGIN
UserSchema.methods.checkCorrectPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};
//Check The Password changed after Token issued
UserSchema.methods.changedPasswordAfter = function (JwtTimeStamp) {
  if (this.passwordChangedAt) {
    const passwordChangedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JwtTimeStamp < passwordChangedTimeStamp;
  }
};

//The Image create in DB only as name of image so, to get access the image in frontend we put a serverUrl and the img folderName
const setImageURL = (doc) => {
  if (doc.image && doc.image !== "default.jpg") {
    const imageUrl = `${process.env.BASE_URL}/users/${doc.image}`;
    doc.image = imageUrl;
  } else {
    const imageUrl = `${process.env.BASE_URL}/users/default.jpg`;
    doc.image = imageUrl;
  }
};
//init is synchronous ==> don't access for promises or next()
// schema.post('init',...} ==>this fired for findOne, findAll and update
// findOne, findAll and update
UserSchema.post("init", (doc) => {
  setImageURL(doc);
});

// schema.post('save',...} ==>this fired for CREATE, SAVE
UserSchema.post("save", (doc) => {
  setImageURL(doc);
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
