import { useEffect, useState } from "react";
import { getSentMessages } from "../services/messageService";

const SentMessagesPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadSent();
  }, []);

  const loadSent = async () => {
    const response = await getSentMessages();
    setMessages(response.data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold text-gray-800">
        Sent Messages
      </h1>

      {messages.length === 0 && (
        <p className="text-gray-500">No messages sent yet.</p>
      )}

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-white p-4 rounded-lg shadow space-y-2"
          >

            <div className="flex justify-between items-center">
              <p className="text-gray-700">
                <span className="font-semibold">To:</span> {msg.receiverEmail}
              </p>

              <span
                className={`text-sm px-2 py-1 rounded ${
                  msg.isRead
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {msg.isRead ? "Read" : "Unread"}
              </span>
            </div>

            <p className="text-gray-600">
              {msg.content}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
};

export default SentMessagesPage;