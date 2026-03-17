import React, { createContext, useState, useContext } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);

  const openChatWithSeller = (sellerName) => {
    setSelectedSeller(sellerName);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setSelectedSeller(null);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <ChatContext.Provider value={{
      isChatOpen,
      selectedSeller,
      openChatWithSeller,
      closeChat,
      toggleChat
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};