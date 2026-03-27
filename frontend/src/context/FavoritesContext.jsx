import React, { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:8000/api/favorites/", {
          headers: { Authorization: `Token ${token}` },
        });
        const data = await res.json();
        // Each favorite includes {id, post, post_detail, created_at}
        setFavorites(data.map(fav => ({ favoriteId: fav.id, ...fav.post_detail })));
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    };

    fetchFavorites();
  }, []);

  const toggleFavorite = async (product) => {
    const token = localStorage.getItem("token");
    const exists = favorites.find((f) => f.id === product.id);

    if (exists) {
      // remove favorite by favoriteId
      const favRes = await fetch(`http://127.0.0.1:8000/api/favorites/${exists.favoriteId}/`, {
        method: "DELETE",
        headers: { Authorization: `Token ${token}` },
      });
      if (favRes.ok) {
        setFavorites((prev) => prev.filter((f) => f.id !== product.id));
      }
    } else {
      // add favorite by post ID
      const favRes = await fetch("http://127.0.0.1:8000/api/favorites/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ post: product.id }),
      });
      if (favRes.ok) {
        const newFav = await favRes.json();
        setFavorites((prev) => [...prev, { favoriteId: newFav.id, ...newFav.post_detail }]);
      } else {
        console.error("Failed to add favorite:", await favRes.text());
      }
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};