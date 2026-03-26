import { useEffect, useState, useContext } from "react";
import { getAllMessages } from "../services/messageService";
import { AuthContext } from "../context/AuthContext";

const ChatList = ({ onSelectChat, activeChat }) => {
  const [conversations, setConversations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const { user } = useContext(AuthContext);
  const currentUserEmail = user?.sub;

  useEffect(() => {
    if (!currentUserEmail) return;

    loadChats();
    const interval = setInterval(loadChats, 3000);
    return () => clearInterval(interval);
  }, [currentUserEmail]);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(conversations);
    } else {
      const lower = search.toLowerCase();
      setFiltered(
        conversations.filter(
          (c) =>
            c.name.toLowerCase().includes(lower) ||
            c.propertyTitle.toLowerCase().includes(lower)
        )
      );
    }
  }, [search, conversations]);

  const buildConversations = (messages) => {
    if (!currentUserEmail) return [];

    const map = new Map();

    messages.forEach((msg) => {
      const isCurrentUser = msg.senderEmail === currentUserEmail;

      const otherUserId = isCurrentUser ? msg.receiverId : msg.senderId;
      const otherUserName = isCurrentUser
        ? msg.receiverName
        : msg.senderName;

      const key = `${otherUserId}-${msg.propertyId}`;

      if (!map.has(key)) {
        map.set(key, {
          ...msg,
          userId: otherUserId,
          name: otherUserName || "User",
          propertyTitle: msg.propertyTitle || "Property",
          lastMessage: msg.content,
          unreadCount: !msg.isRead && !isCurrentUser ? 1 : 0,
        });
      } else {
        const existing = map.get(key);

        if (new Date(msg.createdAt) > new Date(existing.createdAt)) {
          map.set(key, {
            ...msg,
            userId: otherUserId,
            name: otherUserName || "User",
            propertyTitle: msg.propertyTitle || "Property",
            lastMessage: msg.content,
            unreadCount:
              existing.unreadCount +
              (!msg.isRead && !isCurrentUser ? 1 : 0),
          });
        } else {
          existing.unreadCount +=
            !msg.isRead && !isCurrentUser ? 1 : 0;
        }
      }
    });

    return Array.from(map.values()).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  const loadChats = async () => {
    try {
      const res = await getAllMessages();
      const messages = Array.isArray(res.data) ? res.data : [];
      const chats = buildConversations(messages);
      setConversations(chats);
      setFiltered(chats);
    } catch (err) {
      console.error(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <aside className="h-full flex flex-col bg-white">
      <div className="p-4 border-b space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Conversations
        </h2>

        <input
          type="text"
          placeholder="Search chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="p-4 space-y-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-14 bg-gray-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="p-6 text-center text-gray-500 text-sm">
            No conversations found
          </div>
        )}

        <ul>
          {filtered.map((chat) => {
            const isActive =
              activeChat?.userId === chat.userId &&
              activeChat?.propertyId === chat.propertyId;

            return (
              <li key={`${chat.userId}-${chat.propertyId}`}>
                <button
                  onClick={() =>
                    onSelectChat({
                      userId: chat.userId,
                      name: chat.name,
                      propertyId: chat.propertyId,
                      propertyTitle: chat.propertyTitle,
                    })
                  }
                  className={`w-full flex items-center gap-3 p-4 transition ${
                    isActive
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
                    {getInitials(chat.name)}
                  </div>

                  <div className="flex-1 text-left min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-sm text-gray-900 truncate">
                        {chat.name}
                      </p>

                      {chat.unreadCount > 0 && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-sm truncate ${
                        chat.unreadCount > 0
                          ? "text-gray-900 font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      {chat.lastMessage}
                    </p>

                    <p className="text-xs text-gray-400 truncate">
                      {chat.propertyTitle}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default ChatList;