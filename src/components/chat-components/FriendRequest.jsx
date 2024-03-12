import { useEffect, useState } from "react"
import Icon from '@mdi/react';
import { mdiAccountPlus, mdiCheck, mdiClose, mdiDotsHorizontalCircleOutline} from '@mdi/js';

const FriendRequest = () => {
    const [allUsers, setAllUsers] = useState(null)
    const data = JSON.parse(localStorage.getItem("userData"));
    const [friendRequests, setFriendRequest] = useState(null) 
    const [pendingRequests, setPendingRequest] = useState(null)
    useEffect(() => {
        fetch(`https://messaging-app.fly.dev/users/${data._id}`).then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                throw new Error("Network response was not ok")
            }
        }).then(data => {setAllUsers(data)})
        fetch(`https://messaging-app.fly.dev/friend-request/${data._id}`).then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                throw new Error("Network response is not OK")
            }
        }).then(data => {setFriendRequest(data)})
        fetch(`https://messaging-app.fly.dev/friend-request/pending/${data._id}`).then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                throw new Error("Network response is not OK")
            }
        }).then(data => {setPendingRequest(data)} )
    
    }
        ,[]);
    const handleSendRequest = (newRecipient) => {
        const body = {
            recipient: newRecipient.email,
            sender: data.email,
        }

        fetch("https://messaging-app.fly.dev/friend-request", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then(response => {
            if (response.ok){
                setAllUsers(users => users.filter(item => (item._id !== newRecipient._id && item._id !== data._id)));
                setPendingRequest([...pendingRequests, {
                    _id:Math.random(10),
                    recipient: {image_url: newRecipient.image_url,
                    name:newRecipient.name},
                    status:2
                }]);

            }
            else {
                throw new Error(response.status);
              }
        }).catch((err) =>
        console.log(err))
    }
    const handleAcceptRequest = (sender) => {
        const newBody = {
            recipient: data,
            sender: sender,
        }
            fetch("https://messaging-app.fly.dev/friend-request/accept", {
            method:"POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(newBody),
        }).then(response => {
            if(response.ok){
                const hello = friendRequests.filter(item => !(item.sender._id === sender._id));
                setFriendRequest(hello)        
            }
            else {
                throw new Error(response.status);
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleDeclineRequest = (sender) => {
        const newBody = {
            recipient: data,
            sender: sender,
        }
            fetch("https://messaging-app.fly.dev/friend-request/decline", {
            method:"POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(newBody),
        }).then(response => {
            if(response.ok){
                const hello = friendRequests.filter(item => !(item.sender._id === sender._id));
                setFriendRequest(hello);
            }
            else {
                throw new Error(response.status);
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (<div className="friends">
        {friendRequests && friendRequests.length !==0 &&
        <div className="friend-requests">
            <div className="friend-request-title">Friend Requests</div>
            {friendRequests.map((item) => (
                item.status === 2 &&
                <div className="friend-request" key={item._id}>
                    <div className="first-half">
                        <img src={item.sender.image_url} alt={`${item.sender.name} profile-pic`}  className="profile-pic"/>
                        <div className="friend-request-name"> {item.sender.name}</div>
                    </div>
                    <div className="second-half">
                        <Icon path={mdiCheck} size={1} style={{color:"green"}} onClick={() => {handleAcceptRequest(item.sender)}}/>
                        <Icon path={mdiClose} size={1} style={{color:"red"}} onClick={() =>{handleDeclineRequest(item.sender)}}/>
                    </div>
                </div>
            ))}
        </div>
        }
        {pendingRequests && pendingRequests.some(item => item.status === 2) &&
        <div className="pending-requests">
            <div className="pending-request-title">Pending Request</div>
            {pendingRequests.map((item) => (
                item.status ===2  &&
                <div className="friend-request" key={item._id}>
                    <div className="first-half">
                        <img src={item.recipient.image_url} alt={`${item.recipient.name} profile-pic`}  className="profile-pic"/>
                        <div className="friend-request-name"> {item.recipient.name}</div>
                    </div>
                    <div className="second-half">
                        <Icon path={mdiDotsHorizontalCircleOutline} size={1} />
                    </div>
                </div>
            ))}
        </div>}
        {allUsers && 
         allUsers.length !== 0 &&
        <div className="future-friends">
            <div className="future-friends-title">Future Friends</div>
            {allUsers.map((user) => (
                user.email !== data.email &&
                <div className="future-friend" key={user._id}>
                    <div className="first-half">
                        <img src={`${user.image_url}`} alt={`${user.name} profile pic`} className="profile-pic"/>
                        <div className="future-friend-name">{user.name}</div>
                    </div>
                    <Icon path={mdiAccountPlus} size={1} onClick={()=> (handleSendRequest(user))} />
                </div>
            ))}
        </div>}
        </div>
    )
}

export default FriendRequest