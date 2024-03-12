import PropTypes from 'prop-types';
import FriendRequest from './chat-bar-components/FriendRequest';
import Friends from './chat-bar-components/Friends';
import FriendsToChat from './chat-bar-components/FriendsToChat';
const ChatBar = ({middleScreen}) => {
    
    return(
        <div className="chat-bar">  
        {middleScreen === "chat" && 
        <FriendsToChat/>
        }
        {middleScreen === "friend-request" &&
        <FriendRequest/>
        }
        {middleScreen === "friends" && <Friends/>}

        </div>
    )
}
ChatBar.propTypes = {
    middleScreen: PropTypes.string.isRequired,
  };
export default ChatBar