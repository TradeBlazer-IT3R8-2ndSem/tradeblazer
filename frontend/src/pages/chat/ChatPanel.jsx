import { useState } from "react";
import "../../styles/pages/chat/ChatPanel.css";

const users = [
  { id: 1, name: "Cypress" },
  { id: 2, name: "Shandie" },
  { id: 3, name: "Syntyche" },
];

export default function ChatPanel() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [input, setInput] = useState("");

  const [messagesByUser, setMessagesByUser] = useState(() => {
    const saved = localStorage.getItem("chat_messages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
       
      }
    }
    return {
      1: [{ id: 1, from: "bot", text: "Hello Cypress!" }],
      2: [{ id: 1, from: "bot", text: "Hello Shandie!" }],
      3: [{ id: 1, from: "bot", text: "Hello Syntyche!" }],
    };
  });

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      from: "user",
      text: input,
    };

    setMessagesByUser((prev) => {
      const updated = {
        ...prev,
        [selectedUser.id]: [
          ...prev[selectedUser.id],
          newMessage,
        ],
      };
      localStorage.setItem("chat_messages", JSON.stringify(updated));
      return updated;
    });

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-box">

      <div className="chat-top-header">Chat</div>

      <div className="chat-sub-header">
        <div className="sub-left">Users</div>
        <div className="sub-right">{selectedUser.name}</div>
      </div>

      <div className="chat-body">

        {/* LEFT SIDE */}
        <div className="chat-users">
          {users.map((user) => (
            <div
              key={user.id}
              className={`user-item ${
                selectedUser.id === user.id ? "active" : ""
              }`}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="chat-main">

          <div className="chat-messages">
            {messagesByUser[selectedUser.id].map((m) => (
              <p key={m.id} className={`message ${m.from}`}>
                {m.text}
              </p>
            ))}
          </div>

          <div className="chat-input-container">
            <input
              className="chat-input"
              placeholder="Type message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button className="send-btn" onClick={handleSend}>
              Send
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}