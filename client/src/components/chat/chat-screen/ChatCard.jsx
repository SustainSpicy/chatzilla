//components
import ActiveChat from "./ActiveChat";
import { Centered } from "../../common/common";

const ChatCard = ({ list, currentRoomData, innerRef, authData }) => {
  console.log(list);
  if (list.length) {
    return list.map((chat, index) => {
      const { otherMembers } = currentRoomData;
      return (
        <div ref={innerRef} key={index}>
          <ActiveChat data={{ ...chat, otherMembers }} authData={authData} />
        </div>
      );
    });
  }
  return <Centered>No chats to show</Centered>;
};

export default ChatCard;
