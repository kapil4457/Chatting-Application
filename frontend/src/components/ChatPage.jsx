import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import MyChats from "./MyChats.js";

import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "./miscellaneous/SideDrawer";
import ChatBox from "./miscellaneous/ChatBox.jsx";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
