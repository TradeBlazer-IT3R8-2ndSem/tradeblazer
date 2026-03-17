import React, { createContext, useState, useEffect } from 'react';

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("userPosts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  useEffect(() => {
    localStorage.setItem("userPosts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (newPost, user) => {
    const postWithId = { ...newPost, id: Date.now(), seller: user.name };
    setPosts((prev) => [postWithId, ...prev]);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
};