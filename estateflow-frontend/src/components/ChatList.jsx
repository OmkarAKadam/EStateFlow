import { useEffect, useState } from "react";
import { getInbox } from "../services/messageService";

const ChatList = ({ onSelectChat }) => {

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    loadChats();
  }, []);

  const buildConversations = (messages) => {

    const map = new Map();

    messages.forEach((msg) => {
      const key = `${msg.senderId}-${msg.propertyId}`;

      if (!map.has(key)) {
        map.set(key, msg);
      }
    });

    return Array.from(map.values());
  };

  const loadChats = async () => {

    const res = await getInbox();
    const chats = buildConversations(res.data);
    setConversations(chats);

  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 h-full flex flex-col overflow-hidden">

      {/* Header */}
      <div className="px-4 py-3 border-b bg-gray-50">
        <h2 className="text-sm font-semibold text-gray-700">
          Conversations
        </h2>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">

        {conversations.length === 0 && (
          <div className="p-6 text-center text-gray-500 text-sm">
            No conversations yet
          </div>
        )}

        {conversations.map((chat) => (

          <div
            key={chat.id}
            onClick={() =>
              onSelectChat({
                userId: chat.senderId,
                email: chat.senderEmail,
                propertyId: chat.propertyId,
              })
            }
            className="px-4 py-4 border-b last:border-none cursor-pointer hover:bg-gray-50 transition"
          >

            <div className="flex flex-col gap-1">

              <p className="font-medium text-gray-800 text-sm">
                {chat.senderEmail}
              </p>

              <p className="text-sm text-gray-500 truncate">
                {chat.content}
              </p>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
};

export default ChatList;