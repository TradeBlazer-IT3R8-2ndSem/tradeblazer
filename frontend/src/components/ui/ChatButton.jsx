import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatPanel from "../../pages/chat/ChatPanel";
import "../../styles/components/ui/ChatButton.css";

function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="chat-button" onClick={toggleChat}>
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </div>
      {isOpen && <ChatPanel />}
    </>
  );
}

export default ChatButton;