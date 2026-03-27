import React, { createContext, useState, useEffect } from 'react';
import {
  getPosts,
  createPost,
  updatePostApi,
  deletePostApi
} from '../services/api';

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // Map category IDs to names
  const categoryMap = {
    1: "Electronics",
    2: "Gifts",
    3: "Fashion",
    4: "Home & Living",
    5: "Sports",
    6: "Beauty",
    7: "Clothes",
    8: "Accessories",
  };

  // Fetch posts from backend on mount
  useEffect(() => {
    const fetchPosts = async () => {
      const rawPosts = await getPosts();

      const normalized = rawPosts.map(post => ({
        ...post,
        // ✅ Always provide categoryName
        categoryName:
          post.category_name || categoryMap[post.category] || "Uncategorized",
      }));

      setPosts(normalized);
    };

    fetchPosts();
  }, []);

  const addPost = (newPost) => {
    const normalized = {
      ...newPost,
      categoryName:
        newPost.category_name || categoryMap[newPost.category] || "Uncategorized",
    };
    setPosts(prev => [...prev, normalized]);
  };

  // ✅ Delete Post (calls backend DELETE)
  const deletePost = async (postId) => {
    try {
      await deletePostApi(postId);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  // ✅ Update Post (calls backend PATCH)
  const updatePost = async (postId, updatedData) => {
    try {
      const updatedPost = await updatePostApi(postId, updatedData);
      const normalized = {
        ...updatedPost,
        categoryName:
          updatedPost.category_name ||
          categoryMap[updatedPost.category] ||
          "Uncategorized",
      };
      setPosts((prev) =>
        prev.map((post) => (post.id === postId ? normalized : post))
      );
    } catch (err) {
      console.error("Failed to update post:", err);
    }
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, deletePost, updatePost }}>
      {children}
    </PostsContext.Provider>
  );
};