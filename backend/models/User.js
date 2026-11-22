const mongoose = require("mongoose"); // স্কিমা ও মডেল তৈরির জন্য Mongoose ইমপোর্ট

// ইউজারের ডেটা স্ট্রাকচার (Schema) ডিফাইন করা হচ্ছে
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String, // ইউজারের নাম টেক্সট হিসেবে সেভ হবে
      required: [true, "Name is required"], // নাম দেওয়া বাধ্যতামূলক
      trim: true, // নামের শুরু ও শেষের অপ্রয়োজনীয় স্পেস কেটে ফেলবে
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // একই ইমেইল দিয়ে দুবার অ্যাকাউন্ট খোলা যাবে না
      lowercase: true, // ইমেইল সবসময় ছোট হাতের অক্ষরে সেভ হবে
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6, // পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে
    },
  },
  {
    timestamps: true, // অটোমেটিক createdAt এবং updatedAt ফিল্ড যোগ করবে
  },
);

// 'User' নামে মডেল এক্সপোর্ট করা হলো (MongoDB-তে 'users' কালেকশন তৈরি হবে)
module.exports = mongoose.model("User", userSchema);
