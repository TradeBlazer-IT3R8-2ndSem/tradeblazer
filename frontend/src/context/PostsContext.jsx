import React, { createContext, useState, useEffect } from 'react';
import { getPosts, createPost, updatePostApi, deletePostApi } from '../services/api';

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const categoryMap = {
    1: "Electronics", 2: "Gifts", 3: "Fashion", 4: "Home & Living",
    5: "Sports", 6: "Beauty", 7: "Clothes", 8: "Accessories",
  };

  const normalizePost = (post) => ({
    ...post,
    // ✅ Support whichever field Django returns
    seller_id: post.seller_id ?? post.user ?? post.owner ?? post.user_id ?? null,
    categoryName: post.category_name || categoryMap[post.category] || "Uncategorized",
    image: post.image
      ? post.image.startsWith("http")
        ? post.image
        : `http://127.0.0.1:8000${post.image}`
      : null,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const rawPosts = await getPosts();
      setPosts(rawPosts.map(normalizePost));
    };
    fetchPosts();
  }, []);

  const addPost = (newPost) => {
    setPosts(prev => [...prev, normalizePost(newPost)]);
  };

  const deletePost = async (postId) => {
    try {
      await deletePostApi(postId);
      setPosts(prev => prev.filter(post => post.id !== postId));
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  const updatePost = async (postId, updatedData) => {
    try {
      const updatedPost = await updatePostApi(postId, updatedData);
      setPosts(prev =>
        prev.map(post => post.id === postId ? normalizePost(updatedPost) : post)
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