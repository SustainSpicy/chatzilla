import moment from "moment";
import { Head } from "../../common/common";
const RoomHeader = ({ roomData, authData }) => {
  const { name, createdAt, members } = roomData;

  return (
    <Head>
      <div
        style={{
          margin: "0 auto",
          textAlign: "center",
          fontSize: "12px",
        }}
      >
        <p>
          Chat with{"  "} {name}
        </p>
        <p>Created: {moment(createdAt).fromNow()}</p>
        <p>{members?.length} total memebers</p>
      </div>
    </Head>
  );
};
export default RoomHeader;
