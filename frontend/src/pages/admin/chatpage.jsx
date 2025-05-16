import React, { useState, useRef, useEffect } from "react";

const users = [
  { id: 1, name: "Anil", online: true },
  { id: 2, name: "Neha", online: false },
  { id: 3, name: "Ravi", online: true },
  { id: 4, name: "Sana", online: true },
];

const initialChats = {
  1: [
    { sender: "Anil", text: "Hey! Did you check the latest updates?", time: "10:30 AM" },
    { sender: "Admin", text: "Yes, looks great!", time: "10:32 AM" },
  ],
  2: [
    { sender: "Neha", text: "Can you review my PR?", time: "9:45 AM" },
  ],
  3: [
    { sender: "Ravi", text: "Backup completed successfully.", time: "Yesterday" },
  ],
  4: [
    { sender: "Sana", text: "Working on chatbot integration now.", time: "Today 8:00 AM" },
  ],
};

export default function App() {
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [chats, setChats] = useState(initialChats);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to bottom when chat changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, selectedUserId]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const time = new Date();
    const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setChats((prev) => {
      const userChats = prev[selectedUserId] || [];
      return {
        ...prev,
        [selectedUserId]: [...userChats, { sender: "Admin", text: message, time: formattedTime }],
      };
    });

    setMessage("");
    setTyping(false);
  };

  // Simple emoji picker with a few emojis
  const emojis = ["😀", "👍", "🎉", "❤️", "🚀"];

  const addEmoji = (emoji) => {
    setMessage((msg) => msg + emoji);
  };

  return (
    <div className="flex h-screen bg-[#0d1117] text-white">
      {/* Sidebar */}
      <div className="w-60 bg-[#161b22] p-4 flex flex-col space-y-6">
        <div className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            className="w-16 h-16 mx-auto rounded-full border"
          />
          <h2 className="mt-2 font-semibold">Admin</h2>
        </div>
        <nav className="flex flex-col space-y-2">
          {[
            "Home",
            "Chart",
            "Finished Project",
            "Calendar",
            "Assigned Work",
            "Team Chats",
          ].map((item) => (
            <button
              key={item}
              className={`text-left py-2 px-4 rounded hover:bg-blue-700 ${
                item === "Team Chats" ? "bg-blue-600" : "hover:bg-[#1f2937]"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Chat Section */}
      <main className="flex-1 flex flex-col">
        <div className="flex border-b border-gray-700">
          {/* User List */}
          <div className="w-72 bg-[#161b22] p-4 flex flex-col space-y-4 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-2">Team Members</h2>
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`flex items-center gap-3 p-3 rounded hover:bg-[#2a3545] transition-colors ${
                  selectedUserId === user.id ? "bg-blue-600" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0d1117] ${
                      user.online ? "bg-green-500" : "bg-gray-500"
                    }`}
                    title={user.online ? "Online" : "Offline"}
                  />
                </div>
                <span>{user.name}</span>
              </button>
            ))}
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col justify-between p-4">
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
              {(chats[selectedUserId] || []).map((msg, idx) => {
                const isAdmin = msg.sender === "Admin";
                return (
                  <div
                    key={idx}
                    className={`flex mb-3 ${
                      isAdmin ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        isAdmin
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-[#2a3545] text-white rounded-bl-none"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <span className="text-xs text-gray-400 block mt-1 text-right">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            <div className="mt-4">
              {typing && (
                <div className="text-sm text-gray-400 mb-1 italic">Typing...</div>
              )}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setTyping(e.target.value.length > 0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-grow bg-[#161b22] rounded-lg px-4 py-2 text-white border border-gray-700 focus:outline-none focus:border-blue-500 resize-none"
                  rows={1}
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                  aria-label="Send message"
                >
                  Send
                </button>
              </div>
              <div className="flex gap-2 mt-2">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => addEmoji(emoji)}
                    className="text-xl hover:bg-[#2a3545] rounded px-2"
                    aria-label={`Add emoji ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}