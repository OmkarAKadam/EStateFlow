import { useState } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

const MessagesPage = () => {

  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="grid grid-cols-3 gap-6 h-[650px]">

        <ChatList onSelectChat={setActiveChat} />

        <div className="col-span-2">
          <ChatWindow activeChat={activeChat} />
        </div>

      </div>

    </div>
  );
};

export default MessagesPage;