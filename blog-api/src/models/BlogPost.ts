import mongoose, { Document, Schema } from "mongoose";

enum BlogPostCategory {
    PROGRAMMING = "programming",
    CYBERSECURITY = "cyber-security",
    BLOCKCHAIN = "blockchain",
    MACHINELEARNING = "machine-learning",
    NETWORKS = "networks",
    CLOUDCOMPUTING = "cloud-computing",
    BIOLOGY = "biology",
    CHEMESTRY = "chemestry",
    MATH = "math",
    PHYSICS = "physics",
    LIFESCIENCE = "life-science",
    THEOLOGY = "theology"
  }

enum BlogStatus {
  published= "published",
  draft= "draft",
  archived= "archived"
}

interface IBlogPost extends Document {
  blogId: string
  mainTitle: string;
  introDescription: string;
  author: string;
  date: Date;
  awsUrl: string;
  category: BlogPostCategory;
  readTime: string;
  views: number;
  status: BlogStatus;
  paragraphs: Array<{
    topic: string; 
    description: string;
    hasImage: boolean;
    url: string
  }>;
  comments: Array<{ 
    user: string;
    content: string;
    date: Date
  }>;
  commentsCount: number
}

const ParagraphsSchema = new Schema({
  topic: { type: String, default: '' },
  description: { type: String, required: true },
  hasImage: { type: Boolean, default: false },
  url: { type: String, default: '' },

});

const CommentsSchema = new Schema({
  user: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const BlogPostSchema = new Schema({
    blogId: { type: String, required: true },
    mainTitle: { type: String, required: true },
    introDescription: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now },
    awsUrl: { type: String, default: '' },
    category: {
    type: String,
    enum: Object.values(BlogPostCategory), 
    required: true,
    },
    readTime: { type: String, required: true },
    views: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(BlogStatus), 
      required: true,
    },
    paragraphs: [ParagraphsSchema],
    comments: [CommentsSchema],
    commentsCount: {type: Number, default: 0 }

});


export default mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
