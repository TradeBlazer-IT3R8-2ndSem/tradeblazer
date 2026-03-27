import { useState, useEffect } from "react";
import "../../styles/pages/chat/ChatPanel.css";

const initialUsers = [
  { id: 1, name: "Cypress" },
  { id: 2, name: "Shandie" },
  { id: 3, name: "Syntyche" },
  { id: 4, name: "Hanji" },
  { id: 5, name: "Jomar" },
];

export default function ChatPanel({ selectedSeller, onClose }) {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(initialUsers[0]);
  const [messagesByUser, setMessagesByUser] = useState({});
  const [input, setInput] = useState("");
  const [userSearch, setUserSearch] = useState("");

  // Handle opening chat with seller
  useEffect(() => {
    if (selectedSeller) {
      const normalized = selectedSeller.trim().toLowerCase();
      const seller = users.find((u) => u.name.toLowerCase() === normalized);

      if (seller) {
        setSelectedUser(seller);
      } else {
        const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
        const newUser = { id: nextId, name: selectedSeller.trim() };
        setUsers((prev) => [...prev, newUser]);
        setSelectedUser(newUser);
        setMessagesByUser((prev) => ({
          ...prev,
          [newUser.id]: [], // start empty
        }));
      }
    }
  }, [selectedSeller, users]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { id: crypto.randomUUID(), from: "user", text: input };
    setMessagesByUser((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
    }));
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-box">
      <div className="chat-top-header">
        <span>Chat</span>
        {onClose && <button className="chat-close-btn" onClick={onClose}>×</button>}
      </div>

      <div className="chat-sub-header">
        <div className="sub-left">
          <span>Users</span>
          <input
            type="text"
            className="chat-user-search"
            placeholder="Search users..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />
        </div>
        <div className="sub-right">{selectedUser.name}</div>
      </div>

      <div className="chat-body">
        {/* LEFT SIDE */}
        <div className="chat-users">
          {users
            .filter((u) => u.name.toLowerCase().includes(userSearch.toLowerCase()))
            .map((u) => (
              <div
                key={u.id}
                className={`user-item ${selectedUser.id === u.id ? "active" : ""}`}
                onClick={() => setSelectedUser(u)}
              >
                {u.name}
              </div>
            ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="chat-main">
          <div className="chat-messages">
            {(messagesByUser[selectedUser.id] || []).map((m, idx) => (
              <p key={idx} className={`message ${m.from}`}>
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
            <button className="send-btn" onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}