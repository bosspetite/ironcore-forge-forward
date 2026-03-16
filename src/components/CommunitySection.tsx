import { useEffect, useMemo, useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Image as ImageIcon,
  Flame,
  Trophy,
  Users,
  Trash2,
  Send,
  Check,
  X,
} from "lucide-react";

interface Comment {
  id: number;
  author: string;
  authorInitials: string;
  content: string;
  createdAt: number;
}

interface Post {
  id: number;
  author: string;
  authorInitials: string;
  role: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  liked: boolean;
  featured?: boolean;
  createdAt?: number;
  commentsList?: Comment[];
}

const STORAGE_KEY = "ironcore-community-posts";
const SHARE_MESSAGE_TIMEOUT = 2500;

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Marcus Reid",
    authorInitials: "MR",
    role: "Strength Coach",
    time: "2h",
    content:
      "Just hit a new PR on deadlifts today — 405 lbs 💪. The IronCore community keeps pushing everyone to level up. No excuses. Just results.",
    likes: 127,
    comments: 23,
    liked: false,
    featured: true,
    commentsList: [
      {
        id: 101,
        author: "IronCore Fitness",
        authorInitials: "IC",
        content: "Massive work. This is what consistency looks like.",
        createdAt: Date.now() - 1000 * 60 * 90,
      },
    ],
  },
  {
    id: 2,
    author: "IronCore Fitness",
    authorInitials: "IC",
    role: "Official Update",
    time: "5h",
    content:
      "🔥 New HIIT class drops next week. Limited spots available, serious energy guaranteed. Book in early and come train with the crew.",
    likes: 89,
    comments: 15,
    liked: true,
    commentsList: [
      {
        id: 201,
        author: "You",
        authorInitials: "YO",
        content: "This is exactly what I needed.",
        createdAt: Date.now() - 1000 * 60 * 45,
      },
    ],
  },
  {
    id: 3,
    author: "Priya Nair",
    authorInitials: "PN",
    role: "Mobility Coach",
    time: "1d",
    content:
      "Morning recovery flow was incredible today. Strength matters, but staying mobile is how you keep showing up stronger every week.",
    likes: 156,
    comments: 31,
    liked: false,
    commentsList: [],
  },
  {
    id: 4,
    author: "Jordan Lee",
    authorInitials: "JL",
    role: "Conditioning Coach",
    time: "1d",
    content:
      "Transformation check-in: 6 months of consistency, better habits, smarter training, and zero quitting. That’s what the IronCore standard looks like.",
    likes: 234,
    comments: 42,
    liked: true,
    featured: true,
    commentsList: [
      {
        id: 401,
        author: "Marcus Reid",
        authorInitials: "MR",
        content: "That discipline is showing. Keep going.",
        createdAt: Date.now() - 1000 * 60 * 60 * 8,
      },
    ],
  },
];

const stats = [
  {
    icon: Users,
    label: "Active members",
    value: "2.5K+",
  },
  {
    icon: Flame,
    label: "Weekly wins shared",
    value: "140+",
  },
  {
    icon: Trophy,
    label: "Goals smashed",
    value: "Every day",
  },
];

const formatTimeAgo = (timestamp?: number) => {
  if (!timestamp) return "Just now";

  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;

  const weeks = Math.floor(days / 7);
  return `${weeks}w`;
};

const getStoredPosts = (): Post[] => {
  if (typeof window === "undefined") return initialPosts;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialPosts;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return initialPosts;

    return parsed.map((post) => ({
      ...post,
      commentsList: Array.isArray(post.commentsList) ? post.commentsList : [],
      comments:
        typeof post.comments === "number"
          ? post.comments
          : Array.isArray(post.commentsList)
            ? post.commentsList.length
            : 0,
    }));
  } catch {
    return initialPosts;
  }
};

const CommunitySection = () => {
  const [posts, setPosts] = useState<Post[]>(() => getStoredPosts());
  const [draft, setDraft] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [openComments, setOpenComments] = useState<Record<number, boolean>>({});
  const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>(
    {},
  );
  const [commentErrors, setCommentErrors] = useState<Record<number, string>>(
    {},
  );
  const [shareStatus, setShareStatus] = useState<Record<number, string>>({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const featuredCount = useMemo(
    () => posts.filter((post) => post.featured).length,
    [posts],
  );

  const handleLike = (postId: number) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  };

  const handleCreatePost = () => {
    const trimmedDraft = draft.trim();

    if (!trimmedDraft) {
      setSubmitError("Write something before posting.");
      return;
    }

    if (trimmedDraft.length < 8) {
      setSubmitError("Your update should be at least 8 characters long.");
      return;
    }

    const newPost: Post = {
      id: Date.now(),
      author: "You",
      authorInitials: "YO",
      role: "IronCore Member",
      time: "Just now",
      content: trimmedDraft,
      likes: 0,
      comments: 0,
      liked: false,
      createdAt: Date.now(),
      commentsList: [],
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setDraft("");
    setSubmitError("");
  };

  const handleDeletePost = (postId: number) => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId),
    );
    setOpenComments((current) => {
      const next = { ...current };
      delete next[postId];
      return next;
    });
    setCommentDrafts((current) => {
      const next = { ...current };
      delete next[postId];
      return next;
    });
    setCommentErrors((current) => {
      const next = { ...current };
      delete next[postId];
      return next;
    });
    setShareStatus((current) => {
      const next = { ...current };
      delete next[postId];
      return next;
    });
  };

  const handleClearCustomPosts = () => {
    setPosts(initialPosts);
    setDraft("");
    setSubmitError("");
    setOpenComments({});
    setCommentDrafts({});
    setCommentErrors({});
    setShareStatus({});
  };

  const toggleComments = (postId: number) => {
    setOpenComments((current) => ({
      ...current,
      [postId]: !current[postId],
    }));
  };

  const handleCommentChange = (postId: number, value: string) => {
    setCommentDrafts((current) => ({
      ...current,
      [postId]: value,
    }));

    if (commentErrors[postId]) {
      setCommentErrors((current) => ({
        ...current,
        [postId]: "",
      }));
    }
  };

  const handleAddComment = (postId: number) => {
    const trimmedComment = (commentDrafts[postId] || "").trim();

    if (!trimmedComment) {
      setCommentErrors((current) => ({
        ...current,
        [postId]: "Write a comment before posting.",
      }));
      return;
    }

    if (trimmedComment.length < 2) {
      setCommentErrors((current) => ({
        ...current,
        [postId]: "Comment is too short.",
      }));
      return;
    }

    const newComment: Comment = {
      id: Date.now(),
      author: "You",
      authorInitials: "YO",
      content: trimmedComment,
      createdAt: Date.now(),
    };

    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) return post;

        const nextComments = [...(post.commentsList || []), newComment];

        return {
          ...post,
          commentsList: nextComments,
          comments: nextComments.length,
        };
      }),
    );

    setCommentDrafts((current) => ({
      ...current,
      [postId]: "",
    }));

    setCommentErrors((current) => ({
      ...current,
      [postId]: "",
    }));

    setOpenComments((current) => ({
      ...current,
      [postId]: true,
    }));
  };

  const handleDeleteComment = (postId: number, commentId: number) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) return post;

        const nextComments = (post.commentsList || []).filter(
          (comment) => comment.id !== commentId,
        );

        return {
          ...post,
          commentsList: nextComments,
          comments: nextComments.length,
        };
      }),
    );
  };

  const handleShare = async (post: Post) => {
    const shareText = `${post.content}\n\n— ${post.author} | IronCore Community`;

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "IronCore Community",
          text: shareText,
        });

        setShareStatus((current) => ({
          ...current,
          [post.id]: "Shared successfully",
        }));
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);

        setShareStatus((current) => ({
          ...current,
          [post.id]: "Copied to clipboard",
        }));
      } else {
        setShareStatus((current) => ({
          ...current,
          [post.id]: "Sharing not supported on this device",
        }));
      }
    } catch {
      setShareStatus((current) => ({
        ...current,
        [post.id]: "Share cancelled",
      }));
    }

    window.setTimeout(() => {
      setShareStatus((current) => {
        const next = { ...current };
        delete next[post.id];
        return next;
      });
    }, SHARE_MESSAGE_TIMEOUT);
  };

  return (
    <section id="community" className="bg-section-alt py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              IronCore Community
            </p>
            <h2 className="mb-3 text-4xl font-bold">
              Train Together. Win Together.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              See what members are working on, celebrate progress, and stay
              inspired by the people building stronger bodies and stronger
              habits every day.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 lg:w-auto lg:min-w-[420px]">
            {stats.map((stat) => {
              const StatIcon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card px-4 py-5 text-center shadow-sm"
                >
                  <div className="mb-2 flex justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <StatIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary sm:h-12 sm:w-12">
                  You
                </div>

                <div className="min-w-0 flex-1">
                  <textarea
                    value={draft}
                    onChange={(e) => {
                      setDraft(e.target.value);
                      if (submitError) setSubmitError("");
                    }}
                    placeholder="Share your win, your workout, or your next goal..."
                    rows={4}
                    className="w-full resize-none rounded-lg border border-border bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />

                  {submitError && (
                    <p className="mt-2 text-sm text-red-500">{submitError}</p>
                  )}

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 self-start text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <ImageIcon className="h-4 w-4 shrink-0" />
                      <span>Add photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCreatePost}
                      className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Post update
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {posts.map((post) => {
                const isCustomPost = post.author === "You";
                const commentsAreOpen = !!openComments[post.id];
                const currentCommentDraft = commentDrafts[post.id] || "";
                const currentCommentError = commentErrors[post.id];
                const currentShareStatus = shareStatus[post.id];
                const commentsList = post.commentsList || [];

                return (
                  <article
                    key={post.id}
                    className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-colors hover:border-primary/40"
                  >
                    <div className="border-b border-border px-4 py-4 sm:px-5">
                      <div className="flex items-start justify-between gap-3 sm:gap-4">
                        <div className="flex min-w-0 items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                            {post.authorInitials}
                          </div>

                          <div className="min-w-0 pt-0.5">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                              <p className="truncate font-semibold text-foreground">
                                {post.author}
                              </p>
                              {post.featured && (
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold leading-none text-primary">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                              {post.role} •{" "}
                              {post.createdAt
                                ? formatTimeAgo(post.createdAt)
                                : post.time}
                            </p>
                          </div>
                        </div>

                        {isCustomPost ? (
                          <button
                            type="button"
                            onClick={() => handleDeletePost(post.id)}
                            className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-red-500"
                            aria-label="Delete your post"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            aria-label={`More options for ${post.author}'s post`}
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="px-4 py-4 sm:px-5">
                      <p className="whitespace-pre-line text-foreground leading-relaxed">
                        {post.content}
                      </p>
                    </div>

                    <div className="px-4 pb-3 sm:px-5">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <span>{post.likes} likes</span>
                        <span>{post.comments} comments</span>
                        {currentShareStatus && (
                          <span className="inline-flex items-center gap-1 text-primary">
                            <Check className="h-3.5 w-3.5" />
                            {currentShareStatus}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-border px-3 py-3 sm:px-4">
                      <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                        <button
                          type="button"
                          onClick={() => handleLike(post.id)}
                          className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                            post.liked
                              ? "bg-red-500/10 text-red-500 hover:bg-red-500/15"
                              : "text-muted-foreground hover:bg-muted hover:text-red-500"
                          }`}
                        >
                          <Heart
                            className={`h-4 w-4 shrink-0 ${post.liked ? "fill-current" : ""}`}
                          />
                          <span>Like</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleComments(post.id)}
                          className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                            commentsAreOpen
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-primary"
                          }`}
                        >
                          <MessageCircle className="h-4 w-4 shrink-0" />
                          <span>
                            {commentsAreOpen ? "Hide comments" : "Comment"}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleShare(post)}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary sm:ml-auto"
                        >
                          <Share2 className="h-4 w-4 shrink-0" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>

                    {commentsAreOpen && (
                      <div className="border-t border-border bg-muted/40 px-4 py-4 sm:px-5">
                        <div className="mb-4 flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                            YO
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="rounded-lg border border-border bg-background p-3">
                              <textarea
                                value={currentCommentDraft}
                                onChange={(e) =>
                                  handleCommentChange(post.id, e.target.value)
                                }
                                placeholder="Write a comment..."
                                rows={2}
                                className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                              />
                            </div>

                            {currentCommentError && (
                              <p className="mt-2 text-xs text-red-500">
                                {currentCommentError}
                              </p>
                            )}

                            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                              <p className="text-xs text-muted-foreground">
                                Join the conversation and keep the momentum
                                going.
                              </p>

                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setCommentDrafts((current) => ({
                                      ...current,
                                      [post.id]: "",
                                    }))
                                  }
                                  className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                                >
                                  <X className="h-3.5 w-3.5" />
                                  Clear
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAddComment(post.id)}
                                  className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                                >
                                  <Send className="h-3.5 w-3.5" />
                                  Post comment
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {commentsList.length > 0 ? (
                            commentsList.map((comment) => {
                              const isOwnComment = comment.author === "You";

                              return (
                                <div
                                  key={comment.id}
                                  className="rounded-lg border border-border bg-background px-4 py-3"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex min-w-0 items-start gap-3">
                                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                                        {comment.authorInitials}
                                      </div>

                                      <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                          <p className="text-sm font-semibold text-foreground">
                                            {comment.author}
                                          </p>
                                          <span className="text-xs text-muted-foreground">
                                            {formatTimeAgo(comment.createdAt)}
                                          </span>
                                        </div>
                                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                          {comment.content}
                                        </p>
                                      </div>
                                    </div>

                                    {isOwnComment && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleDeleteComment(
                                            post.id,
                                            comment.id,
                                          )
                                        }
                                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-red-500"
                                        aria-label="Delete your comment"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="rounded-lg border border-dashed border-border bg-background px-4 py-5 text-center">
                              <p className="text-sm font-medium text-foreground">
                                No comments yet
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                Be the first to jump in on this post.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="mb-2 text-xl font-bold">
                    Why members love the feed
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    The community space keeps motivation high, highlights real
                    progress, and makes the brand feel active and alive right on
                    the homepage.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClearCustomPosts}
                  className="shrink-0 rounded-md border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  Reset feed
                </button>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg bg-muted px-4 py-3">
                  <p className="text-sm font-semibold">Featured member posts</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {featuredCount} standout updates are currently getting
                    attention.
                  </p>
                </div>

                <div className="rounded-lg bg-muted px-4 py-3">
                  <p className="text-sm font-semibold">
                    Persistent local posting
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    New posts are saved in your browser, so they stay visible
                    when you refresh locally.
                  </p>
                </div>

                <div className="rounded-lg bg-muted px-4 py-3">
                  <p className="text-sm font-semibold">
                    Responsive comments & sharing
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Comment panels expand inline, and share either uses the
                    device share sheet or copies the post text for quick
                    sharing.
                  </p>
                </div>

                <div className="rounded-lg bg-muted px-4 py-3">
                  <p className="text-sm font-semibold">
                    Built for every screen
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Cards stack cleanly on mobile and open up into a balanced
                    feed layout on larger screens.
                  </p>
                </div>

                <div className="rounded-lg bg-muted px-4 py-3">
                  <p className="text-sm font-semibold">Brand-first messaging</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    This section reinforces the IronCore identity: no excuses,
                    just results.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Community energy
              </p>
              <h3 className="mb-2 text-2xl font-bold">
                More than a gym. A crew.
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Whether someone is chasing their dream body, building strength,
                or just getting started, this space helps them feel like they
                belong at IronCore.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
