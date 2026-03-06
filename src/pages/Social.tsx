import { useState } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Post {
  id: number;
  author: string;
  authorInitials: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  liked: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Marcus Reid",
    authorInitials: "MR",
    time: "2h",
    content: "Just hit a new PR on deadlifts today! 405lbs 💪 The IronCore community keeps pushing me further every single day. #NoExcuses #IronCoreFitness",
    likes: 127,
    comments: 23,
    liked: false,
  },
  {
    id: 2,
    author: "IronCore Fitness",
    authorInitials: "IC",
    time: "5h",
    content: "🔥 New HIIT class starting next week! Limited spots available. Our trainers are ready to push you to your limits. Sign up now!",
    likes: 89,
    comments: 15,
    liked: true,
  },
  {
    id: 3,
    author: "Priya Nair",
    authorInitials: "PN",
    time: "1d",
    content: "Morning yoga flow session was incredible today! Remember: flexibility is just as important as strength. Join us every Monday and Wednesday at 8 AM 🌅",
    likes: 156,
    comments: 31,
    liked: false,
  },
  {
    id: 4,
    author: "Jordan Lee",
    authorInitials: "JL",
    time: "1d",
    content: "Transformation Tuesday! Look at this incredible progress from one of our members. 6 months of dedication, proper nutrition, and never giving up. This is what IronCore is all about! 💯",
    likes: 234,
    comments: 42,
    liked: true,
  },
  {
    id: 5,
    author: "IronCore Fitness",
    authorInitials: "IC",
    time: "2d",
    content: "24/7 access means you can train on YOUR schedule. Early morning warrior? Night owl? We've got you covered. Your fitness journey doesn't wait for business hours.",
    likes: 98,
    comments: 18,
    liked: false,
  },
];

const Social = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  <span className="text-primary">IronCore</span> Community
                </h1>
                <p className="text-muted-foreground">Connect with members, share your journey, and stay motivated</p>
              </div>
            </div>
          </div>

          {/* Create Post Card */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                You
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="What's on your mind? Share your fitness journey..."
                  className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-4">
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <ImageIcon size={20} />
                    <span className="text-sm">Photo</span>
                  </button>
                  <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
                {/* Post Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                        {post.authorInitials}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.time}</p>
                      </div>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <p className="text-foreground whitespace-pre-line mb-4">{post.content}</p>
                  {post.image && (
                    <div className="rounded-lg overflow-hidden mb-4 bg-muted aspect-video flex items-center justify-center">
                      <ImageIcon size={48} className="text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Post Stats */}
                <div className="px-4 pb-2 flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{post.likes} likes</span>
                  <span>{post.comments} comments</span>
                </div>

                {/* Post Actions */}
                <div className="px-4 py-3 border-t border-border flex items-center gap-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 transition-colors ${
                      post.liked 
                        ? "text-red-500 hover:text-red-600" 
                        : "text-muted-foreground hover:text-red-500"
                    }`}
                  >
                    <Heart size={20} className={post.liked ? "fill-current" : ""} />
                    <span className="text-sm font-medium">Like</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle size={20} />
                    <span className="text-sm font-medium">Comment</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors ml-auto">
                    <Share2 size={20} />
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <button className="text-primary hover:underline font-medium">
              Load More Posts
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Social;

