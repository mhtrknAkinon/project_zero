import { connectDB } from "@/app/lib/mongodb";
import { Blogs } from "@/app/models/Post";

export const getBlogs = async () => {
  try {
    await connectDB();
    const blogs = await Blogs.find()
      .populate({
        path: "author",
        select: "-password -role -createdAt -updatedAt -phone -email", 
      })
      .populate("category")
      .exec();
    return {
      success: blogs,
    };
  } catch {
    return {
      error: "Something went wrong!",
    };
  }
};
