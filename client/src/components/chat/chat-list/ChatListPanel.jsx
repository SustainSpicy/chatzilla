//components
import ChatHead from "./ChatHead";
import { Centered } from "../../common/common";
import { useChatContext } from "../../../providers/chat/ChatProvider";
import SpinnerDot from "../../common/spinner/SpinnerDot";

const ChatListPanel = ({ list, tab, authData }) => {
  const { MessageInitialize, onlineUsers, utils, requesting } =
    useChatContext();
  const handleInitializeChat = async (e, room) => {
    e.preventDefault();

    MessageInitialize(room, authData);
  };

  if (list && list.length) {
    return list.map((item) => {
      return (
        <ChatHead
          key={item._id}
          data={{ ...item, status: 2 }}
          isOnline={utils.checkOnlineStatus(item, onlineUsers, authData)}
          onClick={(e) => handleInitializeChat(e, item)}
          tab={tab}
        />
      );
    });
  }
  if (requesting || !list) {
    return (
      <Centered>
        <SpinnerDot />
      </Centered>
    );
  }
  return <Centered>No data to show</Centered>;
};

export default ChatListPanel;
