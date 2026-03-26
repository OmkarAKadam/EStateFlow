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
  const [sending, setSending] = useState(false);

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
        activeChat.propertyId
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
    } catch {}
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!text.trim()) return;

    const currentText = text;
    setText("");
    setSending(true);

    try {
      const res = await sendMessage({
        receiverId: activeChat.userId,
        propertyId: activeChat.propertyId,
        content: currentText,
      });

      setMessages((prev) => [...prev, res.data]);
    } catch {
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!activeChat) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 text-center">
        <p className="text-gray-400">Select a conversation</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 py-4 border-b flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
          {activeChat.name?.charAt(0)}
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">{activeChat.name}</h2>
          <p className="text-xs text-gray-500">{activeChat.propertyTitle}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-gray-50">
        {loading && messages.length === 0 ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-2/3 bg-gray-200 animate-pulse rounded-lg"
              />
            ))}
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
                className={`flex flex-col ${
                  isCurrentUser ? "items-end" : "items-start"
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

                <span className="text-xs text-gray-400 mt-1">
                  {formatTime(msg.createdAt)}
                </span>
              </div>
            );
          })
        )}

        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="p-4 border-t flex gap-3 bg-white"
      >
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
          disabled={!text.trim() || sending}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
        >
          {sending ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;