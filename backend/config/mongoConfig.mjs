import mongoose from "mongoose";

const setupMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.error(err);
  }
};

export { setupMongoDB };
