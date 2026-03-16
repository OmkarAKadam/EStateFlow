import { useEffect, useState } from "react";
import { getInbox, markAsRead, sendMessage } from "../services/messageService";

const InboxPage = () => {
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState({});

  useEffect(() => {
    loadInbox();
  }, []);

  const loadInbox = async () => {
    const response = await getInbox();
    setMessages(response.data);
  };

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id);

      setMessages(
        messages.map((msg) =>
          msg.id === id ? { ...msg, isRead: true } : msg
        )
      );
    } catch (error) {
      console.error("Failed to mark read", error);
    }
  };

  const handleReply = async (msg) => {
    if (!replyText[msg.id]) {
      alert("Reply cannot be empty");
      return;
    }

    try {
      await sendMessage({
        propertyId: msg.propertyId,
        receiverId: msg.senderId,
        content: replyText[msg.id],
      });

      setReplyText({
        ...replyText,
        [msg.id]: "",
      });

      alert("Reply sent");
    } catch (error) {
      console.error("Reply failed", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold text-gray-800">
        Inbox
      </h1>

      {messages.length === 0 && (
        <p className="text-gray-500">No messages yet.</p>
      )}

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-white p-4 rounded-lg shadow space-y-3"
          >

            <div className="flex justify-between items-center">
              <p className="text-gray-700">
                <span className="font-semibold">From:</span> {msg.senderEmail}
              </p>

              <span
                className={`text-sm px-2 py-1 rounded ${
                  msg.isRead
                    ? "bg-gray-200 text-gray-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {msg.isRead ? "Read" : "Unread"}
              </span>
            </div>

            <p className="text-gray-600">
              {msg.content}
            </p>

            {!msg.isRead && (
              <button
                onClick={() => handleMarkRead(msg.id)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
              >
                Mark as Read
              </button>
            )}

            <div className="space-y-2">
              <textarea
                placeholder="Reply..."
                value={replyText[msg.id] || ""}
                onChange={(e) =>
                  setReplyText({
                    ...replyText,
                    [msg.id]: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={() => handleReply(msg)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Send Reply
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default InboxPage;