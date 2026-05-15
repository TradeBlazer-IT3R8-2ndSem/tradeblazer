import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get("/favorites/"); 
        const data = res.data;
        setFavorites(data.map(fav => ({ favoriteId: fav.id, ...fav.post_detail })));
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    };
    fetchFavorites();
  }, []);
  
  const toggleFavorite = async (product) => {
    const exists = favorites.find((f) => f.id === product.id);

    if (exists) {
      // remove favorite by favoriteId
      try {
        await api.delete(`/favorites/${exists.favoriteId}/`);
        setFavorites((prev) => prev.filter((f) => f.id !== product.id));
      } catch (err) {
        console.error("Failed to remove favorite:", err);
      }
    } else {
      // add favorite by post ID
      try {
        const res = await api.post("/favorites/", { post: product.id });
        const newFav = res.data;
        setFavorites((prev) => [...prev, { favoriteId: newFav.id, ...newFav.post_detail }]);
      } catch (err) {
        console.error("Failed to add favorite:", err);
      }
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};