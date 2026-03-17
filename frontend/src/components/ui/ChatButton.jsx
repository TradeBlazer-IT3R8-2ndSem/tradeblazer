import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatPanel from "../../pages/chat/ChatPanel";
import { useChat } from "../../context/ChatContext";
import "../../styles/components/ui/ChatButton.css";

function ChatButton() {
  const { isChatOpen, selectedSeller, toggleChat, closeChat } = useChat();

  return (
    <>
      <div className="chat-button" onClick={toggleChat}>
        {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </div>
      {isChatOpen && <ChatPanel selectedSeller={selectedSeller} onClose={closeChat} />}
    </>
  );
}

export default ChatButton;