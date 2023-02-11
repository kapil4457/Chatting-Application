import React, { useEffect, useState } from "react";
import axios from "axios";
const ChatPage = () => {
  const [data, setData] = useState([]);
  const fetchChats = async () => {
    const { data } = await axios.get("/api/v1/chat");
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div>
      {data.map((item, key) => (
        <div key={key}>{item.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
