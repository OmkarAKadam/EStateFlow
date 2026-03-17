import { useEffect, useState, useContext } from "react";
import { getAllMessages  } from "../services/messageService";
import { AuthContext } from "../context/AuthContext";

const ChatList = ({ onSelectChat }) => {

  const [conversations, setConversations] = useState([]);
  const { user } = useContext(AuthContext);
  const currentUserEmail = user?.sub;

  useEffect(() => {
    loadChats();

    const interval = setInterval(loadChats, 2000); // polling

    return () => clearInterval(interval);
  }, []);

  const buildConversations = (messages) => {

    const map = new Map();

    messages.forEach((msg) => {

      const isCurrentUser = msg.senderEmail === currentUserEmail;

      const otherUserId = isCurrentUser ? msg.receiverId : msg.senderId;
      const otherUserEmail = isCurrentUser
        ? msg.receiverEmail
        : msg.senderEmail;

      const key = `${otherUserId}-${msg.propertyId}`;

      if (!map.has(key)) {

        map.set(key, {
          ...msg,
          userId: otherUserId,
          email: otherUserEmail,
          lastMessage: msg.content,
          unreadCount: (!msg.isRead && !isCurrentUser) ? 1 : 0
        });

      } else {

        const existing = map.get(key);

        // ALWAYS track latest message properly
        if (new Date(msg.createdAt) > new Date(existing.createdAt)) {

          map.set(key, {
            ...msg,
            userId: otherUserId,
            email: otherUserEmail,
            lastMessage: msg.content,
            unreadCount: existing.unreadCount + ((!msg.isRead && !isCurrentUser) ? 1 : 0)
          });

        } else {

          existing.unreadCount += (!msg.isRead && !isCurrentUser) ? 1 : 0;

        }
      }

    });

    return Array.from(map.values()).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  const loadChats = async () => {

    const res = await getAllMessages();

    const messages = Array.isArray(res.data) ? res.data : [];

    const chats = buildConversations(messages);

    setConversations(chats);

  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 h-full flex flex-col overflow-hidden">

      <div className="px-4 py-3 border-b bg-gray-50">
        <h2 className="text-sm font-semibold text-gray-700">
          Conversations
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">

        {conversations.length === 0 && (
          <div className="p-6 text-center text-gray-500 text-sm">
            No conversations yet
          </div>
        )}

        {conversations.map((chat) => (

          <div
            key={`${chat.userId}-${chat.propertyId}`}
            onClick={() =>
              onSelectChat({
                userId: chat.userId,
                email: chat.email,
                propertyId: chat.propertyId,
              })
            }
            className={`px-4 py-4 border-b last:border-none cursor-pointer transition ${
              chat.unreadCount > 0
                ? "bg-blue-50 hover:bg-blue-100"
                : "hover:bg-gray-50"
            }`}
          >

            <div className="flex justify-between items-center">

              {/* FIX: show OTHER user, not sender blindly */}
              <p className="font-medium text-gray-800 text-sm">
                {chat.email}
              </p>

              {chat.unreadCount > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {chat.unreadCount}
                </span>
              )}

            </div>

            {/* FIX: always latest message */}
            <p className="text-sm text-gray-500 truncate mt-1">
              {chat.lastMessage}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ChatList;