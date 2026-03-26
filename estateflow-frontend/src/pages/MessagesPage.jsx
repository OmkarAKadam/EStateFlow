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

      <div className="flex flex-1 overflow-hidden rounded-2xl bg-white shadow-md border">
        <div className="w-full md:w-1/3 border-r bg-gray-50">
          <ChatList
            onSelectChat={setActiveChat}
            activeChat={activeChat}
          />
        </div>

        <div className="hidden md:flex flex-col w-2/3">
          {activeChat ? (
            <ChatWindow
              activeChat={activeChat}
              initialMessage={location.state?.initialMessage}
            />
          ) : (
            <div className="flex flex-1 items-center justify-center text-center">
              <div>
                <p className="text-gray-400 text-lg mb-2">
                  Select a conversation
                </p>
                <p className="text-gray-500 text-sm">
                  Choose a chat from the left to start messaging
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="md:hidden flex-1">
          {activeChat ? (
            <ChatWindow
              activeChat={activeChat}
              initialMessage={location.state?.initialMessage}
            />
          ) : (
            <div className="flex flex-1 items-center justify-center text-center h-full">
              <p className="text-gray-400">
                Select a chat to start
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MessagesPage;