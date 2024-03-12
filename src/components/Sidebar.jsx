import Icon from '@mdi/react';
import { mdiMessage, mdiAccountMultiple, mdiChatProcessing, mdiExitToApp, mdiShopping, mdiArchive} from '@mdi/js';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState } from 'react';


const Sidebar = ({setMiddleScreen, middleScreen, setUser}) => {
    const data = JSON.parse(localStorage.getItem("userData"));
    const [chatHover,setChatHover] = useState(false);
    const [onlineHover, setOnlineHover] = useState(false);
    const [requestHover, setRequestHover] = useState(false);
    const [fakeHover, setFakeHover] = useState(false);
    const [fake2, setFake2] = useState(false)
    const logout = () => {
        console.log("Logging out...");
        setUser(null);
        localStorage.setItem("userData", null);
        console.log("User logged out");
        // Check if log messages appear in console
        }
    const chatEnter = () => {
        setChatHover(true);
    }
    const chatLeave = () => {
        setChatHover(false);
    }   
    const onlineEnter = () => {
        setOnlineHover(true);
    }
    const onlineLeave = () => {
        setOnlineHover(false);
    }
    const requestEnter = () => {
        setRequestHover(true);
    }
    const requestLeave = () => {
        setRequestHover(false);
    }
    const fakeEnter = () => {
        setFakeHover(true);
    }
    const fakeLeave = () => {
        setFakeHover(false);
    }
    const anotherFakeEnter = () => {
        setFake2(true);
    }
    const anotherFakeLeave = () => {
        setFake2(false);
    }
    return(
        <div className="side-bar">
            <nav className='top-half'>
                 {middleScreen === "chat" ?
                <div style={{backgroundColor:"rgb(245,245,245)"}}   
                onMouseEnter={chatEnter}
                onMouseLeave={chatLeave}
                 className='chat-icon'>
                    <Icon path={mdiMessage} size={1.1} color={"rgb(0,0,0"} />
                    {chatHover && <div className="chat-display-message">Chats</div>}
                </div>:
                <motion.div style={{backgroundColor:"rgb(255,255,255)"}}
                 whileHover={{backgroundColor:"rgb(245,245,245)"}} 
                 onMouseEnter={chatEnter}
                 onMouseLeave={chatLeave}
                 className='online-icon'
                 onClick={() => setMiddleScreen("chat")}>
                    <Icon path={mdiMessage} size={1.1} color={"rgb(96,98,102)"} />
                    {chatHover && <div className="online-display-message">Chats</div>}
                </motion.div>
                }
                {middleScreen === "friends" ?  <div  className='online-icon' style={{backgroundColor:"rgb(245,245,245)"}}
                 onMouseEnter={onlineEnter}
                 onMouseLeave={onlineLeave}
                 >
                    <Icon path={mdiAccountMultiple} size={1.1} color={"rgb(0,0,0)"}/>
                    {onlineHover && <div className="online-display-message">Online Friends</div>}
                </div>:                 
                <motion.div  className='online-icon' 
                onMouseEnter={onlineEnter}
                onMouseLeave={onlineLeave}
                whileHover={{backgroundColor:"rgb(245,245,245)"}}
                initial={{backgroundColor:"rgb(255,255,255)"}}
                onClick={() =>setMiddleScreen("friends")}
                 >
                    <Icon path={mdiAccountMultiple} size={1.1} color={"rgb(96,98,102)"}/>
                    {onlineHover && <div className="online-display-message">Online Friends</div>}
                </motion.div>}
                {middleScreen === "friend-request" ?
                <div  className='request-icon' 
                style={{backgroundColor:"rgb(245,245,245)"}}
                onMouseEnter={requestEnter}
                onMouseLeave={requestLeave}
                onClick={() => {setMiddleScreen("friend-request")}} >
                    <Icon path={mdiChatProcessing} size={1.1} color={"rgb(0,0,0)"}/>
                    {requestHover && <div className="request-display-message">Friend Requests</div>}

                </div>:
                
                <motion.div  className='request-icon' 
                whileHover={{backgroundColor:"rgb(245,245,245)"}}
                style={{backgroundColor:"rgb(255,255,255)"}}
                onMouseEnter={requestEnter}
                onMouseLeave={requestLeave}
                onClick={() => {setMiddleScreen("friend-request")}} >
                    <Icon path={mdiChatProcessing} size={1.1} color={"rgb(96,98,102)"}/>
                    {requestHover && <div className="request-display-message">Friend Requests</div>}

                </motion.div>
                }
                <motion.div  className='fake-icon' 
                whileHover={{backgroundColor:"rgb(245,245,245)"}}
                style={{backgroundColor:"rgb(255,255,255)"}}
                onMouseEnter={fakeEnter}
                onMouseLeave={fakeLeave}
                >
                    <Icon path={mdiShopping} size={1.1} color={"rgb(96,98,102)"}/>
                    {fakeHover && <div className="fake-display-message">Not implemented</div>}

                </motion.div>
                <motion.div  className='fake-icon' 
                whileHover={{backgroundColor:"rgb(245,245,245)"}}
                style={{backgroundColor:"rgb(255,255,255)"}}
                onMouseEnter={anotherFakeEnter}
                onMouseLeave={anotherFakeLeave}
                 >
                    <Icon path={mdiArchive} size={1.1} color={"rgb(96,98,102)"}/>
                    {fake2 && <div className="fake-display-message">Not implemented</div>}

                </motion.div>
            </nav>
            <div className="logout-profile">
                <img src={data.image_url} alt="profile-pic" className='profile-pic'/>
                <Icon path={mdiExitToApp} size={1.1} onClick={() => logout()}/>
            </div>
        </div>
    )
}
Sidebar.propTypes = {
    setMiddleScreen: PropTypes.func.isRequired,
    middleScreen: PropTypes.string.isRequired,
  };
export default Sidebar