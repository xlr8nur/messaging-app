import { motion } from "framer-motion";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
const PeopleToChat = () => {
    const {id} = useParams();
    const [allFriends, setAllFriends] = useState([])
    const data = JSON.parse(localStorage.getItem("userData"));
 
    useEffect(() =>{
        fetch(`https://messaging-app.fly.dev/users/friends/${data._id}`)
        .then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => setAllFriends(data))
        .catch((err) =>{
            console.log(err);
        })
    },[])
    return (
        <>
        <div className="chat">
            <div className="chat-title">
                Chats
            </div>
        </div>
        <div className="friends-chat">
            {allFriends && allFriends.length !== 0 &&allFriends.map((item) => (
                item._id === id ?
                <div className="focused-container" key={item._id}>
                    <div className="chat-friend-container" style={{backgroundColor:"rgb(245,245,245)"}}>
                    <img src={item.image_url} alt={item.name} className="profile-pic"/>
                    <div className="name">{item.name}</div>
                    
                </div>
                </div>:
                <Link to={`/${item._id}`} key={item._id} style={{color: "black", textDecoration:"none"}}>
                <motion.div className="chat-friend-container" whileHover={{backgroundColor:"rgb(245,245,245)"}} style={{backgroundColor:"rgb(255,255,255)"}}>
                    <img src={item.image_url} alt={item.name} className="profile-pic"/>
                    <div className="name">{item.name}</div>
                </motion.div>
                </Link>
            ))}
        </div>
        </>
    )
}

export default FriendsToChat