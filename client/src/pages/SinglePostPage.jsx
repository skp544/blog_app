import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchUserPostsApi } from "../apis/post.js";
import toast from "react-hot-toast";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction.jsx";
import CommentSection from "../components/CommentSection.jsx";
import PostCard from "../components/PostCard.jsx";

const SinglePostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);

  const fetchRecentPosts = async () => {
    const response = await fetchUserPostsApi({ limit: 3 });

    if (!response.success) {
      return toast.error(response.message);
    }

    setRecentPosts(response.posts);
  };

  const fetchData = async () => {
    const response = await fetchUserPostsApi({ slug });
    setLoading(false);

    console.log(response);
    if (!response.success) {
      return toast.error(response.message);
    }

    setPost(response.posts[0]);
  };

  useEffect(() => {
    if (slug) {
      fetchData();
    }
    fetchRecentPosts();
  }, [slug]);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col p-3">
      <h1 className="mx-auto mt-10 max-w-2xl p-3 text-center font-serif text-3xl lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="mt-5 self-center"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.postImage}
        alt={post && post.title}
        className="mt-10 max-h-[600px] w-full object-cover p-3"
      />
      <div className="mx-auto flex w-full max-w-2xl justify-between border-b border-slate-500 p-3 text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="post-content mx-auto w-full max-w-2xl p-3"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      />
      {/*<div className="mx-auto w-full max-w-4xl">*/}
      {/*  <CallToAction />*/}
      {/*</div>*/}
      <CommentSection postId={post._id} />
      <div className="mb-5 flex flex-col items-center justify-center">
        <h1 className="mt-5 text-2xl font-semibold">Recent Articles</h1>
        <div className="mt-5 flex flex-wrap justify-center gap-5">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
};
export default SinglePostPage;
