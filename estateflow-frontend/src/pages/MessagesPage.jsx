import { useState } from "react";
import { useLocation } from "react-router-dom";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

const MessagesPage = () => {
  const location = useLocation();

  const [activeChat, setActiveChat] = useState(
    location.state
      ? {
          userId: location.state.userId,
          email: location.state.email,
          propertyId: location.state.propertyId,
        }
      : null,
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-3 gap-6 h-[650px]">
        <ChatList onSelectChat={setActiveChat} />

        <div className="col-span-2">
          <ChatWindow
            activeChat={activeChat}
            initialMessage={location.state?.initialMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
