import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';
import { backendBaseUrl, backendUrl } from '../../../utils/constants';
import { authUser } from '../../../utils/auth';
import { apiCallGet } from '../../../helpers/api';
const socket = io.connect(backendBaseUrl)
const audioPing = new Audio('/Assets/ping.mp3');

function UserLists(props) {



    const [unreadCountMap, setUnreadCountMap] = useState({});
    const [recentMessageMap, setRecentMessageMap] = useState({});
    const [hasUserInteracted, setHasUserInteracted] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const resData = await apiCallGet(`${backendUrl}/users/list/${authUser().id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('_token')}`
                    }
                });
                console.log('user resData', resData);
                props.setUsers(resData.data);
            } catch (error) {
                // console.log(error);
            }
        };
        fetchUsers()

    }, []);

    useEffect(() => {
        const receiveMessageHandler = (message) => {
            console.log(message);
            // if ((props.selectedUser && props.selectedUser.id == message.receiverId) || (props.selectedUser && props.selectedUser.id == message.senderId) ) {
            props.setChatMessages((prevChatMessages) => [...prevChatMessages, message]);
            // }


            // console.log('in recive', authUser().name, 'sender', message.senderId, 'reciver', authUser().id);
            if (message.receiverId === authUser().id) {

                setUnreadCountMap(prevMap => {
                    const updatedMap = { ...prevMap };
                    if (message.senderId in updatedMap) {
                        updatedMap[message.senderId]++;
                    } else {
                        updatedMap[message.senderId] = 1;
                    }
                    return updatedMap;
                });
                setRecentMessageMap(prevMap => {
                    const updatedMap = { ...prevMap };
                    updatedMap[message.senderId + '-message'] = message.content;
                    return updatedMap;
                });

                // if (hasUserInteracted) {
                audioPing.play().catch(error => {
                    console.error('Failed to play audio:', error);
                });
                // }
            }



            if (props.messagesEndRef.current) {
                props.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }



        };

        socket.on('receive message', receiveMessageHandler);


        // socket.on('user chat', (history) => {
        //     console.log(history, 'user chat2');
        //     console.log('in user chat2 message');
        //     props.setChatMessages(history);
        // });
        // const response = await fetch(`/api/messages?offset=${offset}`);



        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('keydown', handleUserInteraction);

        return () => {

            socket.off('receive message');
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);

        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, props.chatMessages]);

    const handleUserClick = (user) => {
        props.setSelectedUser(user);
        if (props.selectedUser) {
            if (props.selectedUser) {
                apiCallGet(`${backendUrl}/messages/list/${authUser().id}/${props.selectedUser?.id}?page=${props.page}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('_token')}`
                    }
                }).then((response) => {
                    console.log('response', response)
                    props.setHasMore(response.data.hasNextPage)
                    props.setChatMessages(response.data.messages)
                });
            }
        }
        return () => {
            // socket.disconnect();
        };
    };

    // Handle user interaction with the document
    const handleUserInteraction = () => {
        setHasUserInteracted(true);
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
    };
    return (
        <>
            {props.users?.map((user) => {
                // console.log(user);
                return (
                    <div className="item" key={'user-list-' + user.id} onClick={() => handleUserClick(user)} selected={props.selectedUser && props.selectedUser.id === user.id}>
                        <div className="image">
                            <img src="/Assets/Images/user.png" alt="user" />
                        </div>
                        <div className='content'>
                            <div className="name-section">
                                <div className="name">
                                    <span>{user.name}</span>
                                </div>
                                <div className="time">
                                    {/* <span>5 min</span> */}
                                </div>
                            </div>
                            <div className="description">
                                {recentMessageMap && recentMessageMap[user.id + '-message'] ? <span>{recentMessageMap[user.id + '-message']}</span> : user.receivedMessages.lastMessage ? <span>{user.receivedMessages.lastMessage}</span> : <span></span>}

                                {/* {unreadCountMap[user.id] && <span className="notifiction-dot">{unreadCountMap[user.id]}</span>} */}
                                {user.receivedMessages && user.receivedMessages.messageCount > 0 && <span className="notifiction-dot">{user.receivedMessages.messageCount}</span>}
                            </div>
                        </div>
                    </div>
                )
            })}</>
    )
}

export default UserLists