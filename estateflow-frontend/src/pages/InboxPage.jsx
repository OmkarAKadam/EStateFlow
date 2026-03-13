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
        messages.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg)),
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

      console.log(msg);

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
    <div>
      <h1>Inbox</h1>

      {messages.length === 0 && <p>No messages yet.</p>}

      {messages.map((msg) => (
        <div
          key={msg.id}
          style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}
        >
          <p>
            <strong>From:</strong> {msg.senderEmail}
          </p>

          <p>{msg.content}</p>

          <p>Status: {msg.isRead ? "Read" : "Unread"}</p>

          {!msg.isRead && (
            <button onClick={() => handleMarkRead(msg.id)}>Mark as Read</button>
          )}

          <textarea
            placeholder="Reply..."
            value={replyText[msg.id] || ""}
            onChange={(e) =>
              setReplyText({
                ...replyText,
                [msg.id]: e.target.value,
              })
            }
          />

          <button onClick={() => handleReply(msg)}>Reply</button>
        </div>
      ))}
    </div>
  );
};

export default InboxPage;
