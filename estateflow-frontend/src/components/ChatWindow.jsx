import { useEffect, useState, useRef, useContext } from "react";
import {
  getConversation,
  sendMessage,
  markAsRead,
} from "../services/messageService";
import { AuthContext } from "../context/AuthContext";

const ChatWindow = ({ activeChat, initialMessage }) => {
  const { user } = useContext(AuthContext);
  const currentUserEmail = user?.sub;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (!activeChat || !currentUserEmail) return;
    setLoading(true);
    loadConversation().finally(() => setLoading(false));
  }, [activeChat, currentUserEmail]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!activeChat || !currentUserEmail) return;

    const interval = setInterval(() => {
      loadConversation();
    }, 2000);

    return () => clearInterval(interval);
  }, [activeChat, currentUserEmail]);

  useEffect(() => {
    if (initialMessage) {
      setMessages((prev) => {
        if (prev.some((m) => m.id === initialMessage.id)) return prev;
        return [...prev, initialMessage];
      });
    }
  }, [initialMessage]);

  const loadConversation = async () => {
    try {
      const res = await getConversation(
        activeChat.userId,
        activeChat.propertyId,
      );

      const newMessages = Array.isArray(res.data) ? res.data : [];

      newMessages.forEach((msg) => {
        const isReceived = msg.senderEmail !== currentUserEmail;
        if (!msg.isRead && isReceived) {
          markAsRead(msg.id);
        }
      });

      setMessages((prev) => {
        const prevIds = prev.map((m) => m.id).join(",");
        const newIds = newMessages.map((m) => m.id).join(",");

        if (prevIds === newIds) return prev;
        return newMessages;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!text.trim()) return;

    const currentText = text;
    setText("");

    try {
      const res = await sendMessage({
        receiverId: activeChat.userId,
        propertyId: activeChat.propertyId,
        content: currentText,
      });

      setMessages((prev) => {
        if (prev.some((m) => m.id === res.data.id)) return prev;
        return [...prev, res.data];
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      console.error(errorMsg);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!activeChat) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 text-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Messages</h2>
          <p className="text-sm text-gray-500">
            Select a conversation to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white border">
      {/* Header */}
      <div className="px-6 py-4 border-b flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
          {activeChat.name?.charAt(0)}
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">{activeChat.name}</h2>
          <p className="text-xs text-gray-500">{activeChat.propertyTitle}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
        {loading && messages.length === 0 ? (
          <div className="text-center text-gray-400 text-sm">
            Loading conversation...
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-400 text-sm">
            Start the conversation
          </div>
        ) : (
          messages.map((msg) => {
            const isCurrentUser = msg.senderEmail === currentUserEmail;

            return (
              <div
                key={msg.id}
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow ${
                    isCurrentUser
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800 border"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t flex gap-3 bg-white">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
