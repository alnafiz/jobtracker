const mongoose = require("mongoose"); // Mongoose ইমপোর্ট

// প্রতিটি জব/ইন্টার্নশিপ অ্যাপ্লিকেশনের ডেটা স্ট্রাকচার
const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // কোন ইউজার এই অ্যাপ্লিকেশনটি যোগ করেছেন তার MongoDB ID
      ref: "User", // User মডেলের সাথে রেফারেন্স/সম্পর্ক তৈরি করা হলো
      required: true, // মালিক ছাড়া কোনো অ্যাপ্লিকেশন সেভ হতে পারবে না (Data Isolation)
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role/Position is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"], // শুধু এই ৪টি স্ট্যাটাসই অনুমোদিত
      default: "Applied", // নতুন যোগ করলে ডিফল্টভাবে 'Applied' থাকবে
    },
    workMode: {
      type: String,
      enum: ["Onsite", "Remote", "Hybrid"], // কাজের ধরন
      default: "Onsite",
    },
    appliedDate: {
      type: Date,
      default: Date.now, // তারিখ না দিলে আজকের তারিখ অটোমেটিক নেবে
    },
    jobLink: {
      type: String,
      trim: true,
      default: "", // জব সার্কুলারের লিংক (ঐচ্ছিক)
    },
    notes: {
      type: String,
      trim: true,
      default: "", // ইন্টারভিউ বা রেফারেন্স নোট (ঐচ্ছিক)
    },
  },
  {
    timestamps: true, // অটোমেটিক createdAt ও updatedAt রাখবে
  },
);

// 'Application' নামে মডেল এক্সপোর্ট করা হলো (MongoDB-তে 'applications' কালেকশন তৈরি হবে)
module.exports = mongoose.model("Application", applicationSchema);

