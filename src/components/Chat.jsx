import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiCircleSmall, mdiDotsHorizontal, mdiPhone, mdiSend, mdiVideo } from '@mdi/js';
const Chat = ({socket}) => {
    const { id } = useParams();
    const messageContainerRef = useRef(null);
    const [friend,setFriend] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const data = JSON.parse(localStorage.getItem("userData"));

    useEffect (() => {
        if(id) {
        fetch(`https://messaging.fly.dev/messages/${id}/${data._id}`)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
        }).then (data => setMessages(data));
    }
        return () => {
            setMessages([]);
          };
    },[id,data._id])
    useEffect(() => {
        if(id) {
            fetch(`https://messaging-app.fly.dev/users/friend/${id}`)
            .then((response) => 
                {if(response.ok){
                    return response.json()
                }})
                .then(data => {setFriend(data)})
                .catch(err => {
                    console.log(err);
                })
        }
        return () => {
            setMessages([]);
          };

    },[id])
    useEffect(() => {
        if(socket)
{
          socket.on("private message", (message) => {
            console.log("hi")
            console.log(message)
            setMessages((prevMessages) => [...prevMessages, message]);});
        
        }
          else{
            console.log("bad")
          }
          return () => {
            setMessages([]);
          };

    },[socket])
    const handleMessageSend = (e) => {
        e.preventDefault();
        if(newMessage.length !== 0){
        const createdMessage = {
            content: newMessage,
            sender: data._id,
            recipient: id,
            date: new Date(),
            read: false
        }
        fetch("https://messaging-app.fly.dev/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createdMessage)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Posted correctly");
                }
            })
            .catch(error => {
                // handle network 
                console.error("Network error:", error);
            });
        socket.emit("private message", { id: id, message: createdMessage});
        setMessages((prevMessages) => [...prevMessages, createdMessage]);
        setNewMessage("")}
    }
    useEffect(() => {
        if (messageContainerRef.current) {
          messageContainerRef.current.scrollTop =
            messageContainerRef.current.scrollHeight;
        }
      }, [messages]);
    return (
        id ?
        <div className="chat-container">
            
                {friend && 
                    <div className="chat-header" key={friend._id}>
                        <div className="first-half">
                            <img src={friend.image_url} alt={friend.name} className="profile-pic"/>
                            
                            {friend.online ? <><div className="name">{friend.name}</div> 
                            <Icon path={mdiCircleSmall} size={1.5} color={"lightgreen"}/> </>:
                            <div className="flex"><div className="name">{friend.name}</div> 
                             <div>Last online: {friend.last_online.slice(0,10)}</div>
                             </div>}
                        </div>  
                        <div className="second-half-icons">
                            <Icon path={mdiPhone} size={1.1} color={"rgb(57, 130, 247)"}/>
                            <Icon path={mdiVideo} size={1.1} color={"rgb(57, 130, 247)"} />
                            <Icon path={mdiDotsHorizontal} size={1.1}  color={"rgb(57, 130, 247)"}/>

                        </div>
                    </div>
                }
            <div className="chat-body" ref={messageContainerRef}>
                {messages && messages.length !== 0 && messages.map((item,index) => (
                    item.recipient === id ?
                    <div key={item._id ? item._id : index} className="sender-container">
                        <div className="send-container">
                            <div className="sender-message">{item.content}</div>
                        </div>
                    </div>:
                    <div key={item._id ? item._id : index} className="receiver-container">
                        <div className="receive-container">
                            <div className="recipient-message" >{item.content}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat-footer">
                <form onSubmit={(e) => handleMessageSend(e)}>
                    <input type="text" name="message" className="message" placeholder="Aa" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
                    <button type="submit" className="submit">
                        <Icon path={mdiSend} size={1} color={"blue"}/>
                    </button>
                </form>
            </div>
        </div>:
        <div className="chat-placeholder">Select a chat to display messages</div>
    )
}

export default Chat