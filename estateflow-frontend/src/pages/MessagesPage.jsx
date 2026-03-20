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
          name: location.state.name,
          propertyId: location.state.propertyId,
          propertyTitle: location.state.propertyTitle,
        }
      : null
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-120px)] flex flex-col">
      
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          Messages
        </h1>
        <p className="text-sm text-gray-500">
          Manage your conversations
        </p>
      </div>

      <div className="flex flex-1 overflow-hidden border rounded-2xl bg-white">

        <div className="w-full md:w-1/3 border-r">
          <ChatList
            onSelectChat={setActiveChat}
            activeChat={activeChat}
          />
        </div>

        <div className="hidden md:flex flex-col w-2/3">
          <ChatWindow
            activeChat={activeChat}
            initialMessage={location.state?.initialMessage}
          />
        </div>

        <div className="md:hidden flex-1">
          <ChatWindow
            activeChat={activeChat}
            initialMessage={location.state?.initialMessage}
          />
        </div>

      </div>
    </main>
  );
};

export default MessagesPage;