import { useEffect, useState, useRef, useContext } from "react";
import { getConversation, sendMessage } from "../services/messageService";
import { AuthContext } from "../context/AuthContext";

const ChatWindow = ({ activeChat }) => {

  const { user } = useContext(AuthContext);

  // JWT only contains email in `sub`
  const currentUserEmail = user?.sub;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    if (!activeChat) return;
    loadConversation();
  }, [activeChat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadConversation = async () => {

    const res = await getConversation(
      activeChat.userId,
      activeChat.propertyId
    );

    setMessages(res.data);

  };

  const handleSend = async () => {

    if (!text.trim()) return;

    await sendMessage({
      receiverId: activeChat.userId,
      propertyId: activeChat.propertyId,
      content: text
    });

    setText("");
    loadConversation();

  };

  if (!activeChat) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <h2 className="text-lg font-semibold mb-2">Messages</h2>
          <p className="text-sm">Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 h-full flex flex-col overflow-hidden">

      {/* Chat Header */}
      <div className="px-5 py-3 border-b bg-gray-50 font-medium text-gray-800">
        {activeChat.email}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-gray-50">

        {messages.map((msg) => {

          const isCurrentUser = msg.senderEmail === currentUserEmail;

          return (
            <div
              key={msg.id}
              className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
            >

              <div
                className={`px-4 py-2 rounded-2xl max-w-xs text-sm leading-relaxed shadow-sm ${
                  isCurrentUser
                    ? "bg-blue-600 text-white"       // current user
                    : "bg-gray-200 text-gray-800"    // receiver
                }`}
              >
                {msg.content}
              </div>

            </div>
          );

        })}

        <div ref={bottomRef} />

      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white flex gap-3">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
        >
          Send
        </button>

      </div>

    </div>
  );
};

export default ChatWindow;