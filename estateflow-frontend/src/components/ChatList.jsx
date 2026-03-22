import { useEffect, useState, useContext } from "react";
import { getAllMessages } from "../services/messageService";
import { AuthContext } from "../context/AuthContext";

const ChatList = ({ onSelectChat, activeChat }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const currentUserEmail = user?.sub;

  useEffect(() => {
    if (!currentUserEmail) return;

    loadChats();
    const interval = setInterval(loadChats, 3000);
    return () => clearInterval(interval);
  }, [currentUserEmail]);

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
    } catch (err) {
  const errorMsg =
    err.response?.data?.message || "Something went wrong";
  console.error(errorMsg);
} finally {
      setLoading(false);
    }
  };

  return (
    <aside className="h-full flex flex-col bg-white border-r border-gray-200">
      <div className="p-5 border-b">
        <h2 className="text-base font-bold text-gray-800">
          Conversations
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && conversations.length === 0 && (
          <div className="p-6 text-center text-gray-400 text-sm">
            Loading chats...
          </div>
        )}

        {!loading && conversations.length === 0 && (
          <div className="p-8 text-center text-gray-500 text-sm">
            No conversations yet
          </div>
        )}

        <ul className="divide-y">
          {conversations.map((chat) => {
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
                  className={`w-full text-left p-4 transition ${
                    isActive
                      ? "bg-blue-50 border-l-4 border-blue-600"
                      : "hover:bg-gray-50 border-l-4 border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-sm text-gray-900 truncate pr-2">
                      {chat.name}
                    </p>

                    {chat.unreadCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
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

                  <p className="text-xs text-gray-400 mt-1">
                    {chat.propertyTitle}
                  </p>
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