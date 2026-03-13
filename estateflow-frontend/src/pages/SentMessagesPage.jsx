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
    <div>

      <h1>Sent Messages</h1>

      {messages.length === 0 && (
        <p>No messages sent yet.</p>
      )}

      {messages.map((msg) => (

        <div key={msg.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>

          <p><strong>To:</strong> {msg.receiverEmail}</p>

          <p>{msg.content}</p>

          <p>Status: {msg.isRead ? "Read" : "Unread"}</p>

        </div>

      ))}

    </div>
  );
};

export default SentMessagesPage;