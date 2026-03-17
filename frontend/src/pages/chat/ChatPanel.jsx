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
  const [selectedUser, setSelectedUser] = useState(() => {
    if (selectedSeller) {
      return initialUsers.find((user) => user.name === selectedSeller) || initialUsers[0];
    }
    return initialUsers[0];
  });
  const [input, setInput] = useState("");
  const [userSearch, setUserSearch] = useState("");

  useEffect(() => {
    if (selectedSeller) {
      const seller = users.find((user) => user.name === selectedSeller);
      if (seller) {
        setSelectedUser(seller);
      } else {
        setUsers((prev) => {
          const nextId = prev.length ? Math.max(...prev.map((u) => u.id )) + 1 : 1;
          const newUser = { id: nextId, name: selectedSeller };
          return [...prev, newUser];
        });
      }
    }
  }, [selectedSeller]);

  useEffect(() => {
    if (!selectedSeller) return;
    const seller = users.find((user) => user.name === selectedSeller);
    if (seller) setSelectedUser(seller);
  }, [users, selectedSeller]);

  useEffect(() => {
    if (!selectedUser) return;
    if (!messagesByUser[selectedUser.id]) {
      setMessagesByUser((prev) => {
        const updated = {
          ...prev,
          [selectedUser.id]: [
            { id: Date.now(), from: "bot", text: `Hello ${selectedUser.name}!` },
          ],
        };
        localStorage.setItem("chat_messages", JSON.stringify(updated));
        return updated;
      });
    }
  }, [selectedUser]);

  const [messagesByUser, setMessagesByUser] = useState(() => {
    const saved = localStorage.getItem("chat_messages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        
      }
    }

    const init = {};
    initialUsers.forEach((u) => {
      init[u.id] = [{ id: 1, from: "bot", text: `Hello ${u.name}!` }];
    });
    return init;
  });

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      from: "user",
      text: input,
    };

    setMessagesByUser((prev) => {
      const prevMessages = prev[selectedUser.id] || [];
      const updated = {
        ...prev,
        [selectedUser.id]: [...prevMessages, newMessage],
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

      <div className="chat-top-header">
        <span>Chat</span>
        {onClose && (
          <button className="chat-close-btn" onClick={onClose}>×</button>
        )}
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
          {(users.filter(user => user.name.toLowerCase().includes(userSearch.toLowerCase()))).map((user) => (
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
            {(messagesByUser[selectedUser.id] || []).map((m) => (
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