import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const authoritySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter authority name"] },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: 6,
    },
    role: { type: String, default: "authority" },
    address: { type: String, required: [true, "Please enter office address"] },

    // GeoJSON point
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
  },
  { timestamps: true }
);

// 2D sphere index for geospatial queries
authoritySchema.index({ location: "2dsphere" });

// Password hashing
authoritySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

authoritySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Authority = mongoose.model("Authority", authoritySchema);
export default Authority;
